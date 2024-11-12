---
icon: pen-to-square
date: 2024-11-08
category:
  - backend
tag:
  - C#
  - DDD
---

# DDD(Domain Driven Design)
## CQRS(command query responsibility segregation)
The fundamental idea is that we should divide an object's methods into two sharply separated categories:
1. `Queries`: return a result and do not change the observable state of the system(are free of side effects).
2. `Commands`: change the state of a system but do not return a value.

### why separating methods that change state (modifiers/commands) from those that don't (queries) is so valuable in practice:
1. `Predictability and Debugging`:
- Query methods are "safe" - we can call them multiple times or in any order without side effects.
- If something goes wrong, we know how to focus on the modifier methods first, since queries can't be the cause of state-related bugs.

2. `Testing and Maintenance`:
- Queries are easier to test since we just need to verify return values.
- Modifiers require testing state changes and potential side effects.

3. `Parallelization and Caching`:
- Query results can be safely cached.
- Multiple queries can run in parallel without lock coordination.
- Modifiers need careful synchronization to avoid race conditions.

4. `Database Separation`:
    1. Commands(Modifiers) on the Main Database:
        - Modifiers are responsible for changing the state of the system, such as creating, updating, or deleting records in the database. Since these operations can affect the integrity and consistency of the data, they need to be directed to the main database where the data is authoritative and can be modified.
        - By ensuring that `commands` always go to the master database, we can maintain consistency and ensure the state is updated correctly. Thisalso allows proper handling of transactions, which is often required for modifying data.
    2. Queries on Read Replicas:
        - `Queries` on the other hand `only read data` without modifying it. These operations can be safely executed on read replicas because they don't change the data's state. Since replicas are usually eventually consistent, they can serve read requests without the risk of disrupting data consistency.
        - Using replcias for queries offloads work from the main database, allowing it to focus on write-heavy operations. This improves `performance`, `scalability`, and `availability`.
    3. Consistency and Data Integrity:
        - When `modifiers` are directed to the `main database`, we ensure that write operations are consistent and properly synchronized, and that `transactional integrity` is maintained.
        - On the other hand, queries are less critical in terms of consistency, since they do not affect the data, and read replicas can serve slightly outdated data, without compromising overall system reliability.
    

## Applying simplified CQRS and DDD patterns in a microservice
The separation aspect of CQRS is achieved by grouping query operations in one layer and commands in another layer. Each layer has its own data model. Each layer has its own data model(note that we say model, not necessarily a different database) and is built using its own combination of patterns and technologies. More importantly, the two layers can be within the same tier or microservice. Or they can be optimized and scaled out separately without affecting one another.

![Simplified CQRS and DDD microservice](/assets/images/simplified-ddd-image.png)

The important design aspect here is that the microservice has split the queries and ViewModels(data models especially created for the client applications) from the commands, domain model, and transactions following the CQRS pattern.

## Design a DDD-oriented microservice
DDD descibes independent problem areas as Bounded Contexts(each Bounded Context correlates to a microservice). Where to draw the  boundaries is the key task when designing and refining a microservice. DDD patterns help us understand the complexity in the domain. For the domain model for each Bounded Context, we identify and define the entities, value objects, and aggregates that model our domain. We build a domain model that is contained within a boundary that defines our context.

Determing where to place boundaries between Bounded Contexts balances two competing goals. Our services should handle all responsibilities related to our domain internally. But we should also ensure that communication between different bounded contexts is kept to a minimum. Too many cross-service communication introduces `complexity`, `latency`, and `failture risks`.

![Layers in a Domain-Driven Design Microservice](/assets/images/domain-driven-design-microservice.png)


Each layer is a VS project. Application layer is Ordering.API, Domain layer is Ordering.Domain and the Infrastructure layer is Ordering.Infrastructure.

## Design a microservice domain model
### Domain model structure in a custom .NET Standard Library
![Ordering Microservice Domain Model](/assets/images/ordering-microservice-container.png)

As we can see, in the domain model, there are two aggregates: the order aggregate and the buyer aggregate. Each aggregate is a group of domain entities and value objects, although we could have an aggregate compsoed of a single domain entity(the aggregate root or root entity).

### Structure aggregates in a custom .NET Standard library
An aggregate refers to a cluster of domain objects grouped together to match transactional consistency. Those objects could be instances of entities. Transactional consistency means that an aggregate is guaranteed to be consistent and up to date at the end of a business action. 
![Order Aggregate](/assets/images/vs-solution-explorer-order-aggregate.png)

### Value Object within Aggregate 
![Value Object within Aggregate](/assets/images/value-object-within-aggregate.png)

As we can see, the attribute `address` is simply a complex-value composed of country/region, street, city, etc., and has no identity in this domain, must be modeled and treated as a value object.

#### Important Characteristics of Value Objects:
- They have no identity.
- They are immutable.

The values of a value object `MUST BE` immutable once the object is created. Therefore, when the object is created, we must provide the required values, but we must not allow them to change during the object's lifetime.

Value objects allow us to perform certain tricks for performance. This is especially true in systems where there may be thousands of value object instances, many of which have the same values. Their immutable nature allows them to be reused; they can be interchangeable objects, since their values are the same and they have no identity. This type of optimization can sometimes make a difference between software that runs slowly and software with good performance.


## Domain events
1. `Purpose`: Domain events represent something meaningful that happened within our domain/business logic(e.g., "OrderPlaced", "PaymentReceived")
2. `Scope`: Usually handled within the same bounded context or application
3. `Timing`: Typically synchronous and immediate within the application
4. `State`: Immutable, representing a fact that happened at a specific point in time.
5. `Usage`: Often used for maintaining consistency within a bounded context and updateing different parts of our application.


## MediatR in C# to achieve CRRS 
`MediatR` is a popular open-source library for .NET designed to simplify and decouple the communication between different parts of an application. It implements the `Mediator` design pattern, which is useful for managing complex communication by providing a centralized way to send messages, commands, or queries between objects. 

### `IRequest<TResponse>`
In MediaR, the `IRequest<TResponse>` interface is used to represent a request for data or an action, and the `TResponse` type indicates the type of the expected response. When a class implements `IRequest<TResponse>`, it is essentially marking that class as a `request` that will be handled by a corresponding `handler`. The `handler` is therefore responsible for executing the logic associated with the request and returning a response of type `TResponse`.

### Queries in MediatR:

```csharp
public class GetUserQuery : IRequest<User>
{
    public int UserId { get; set; }
}

```
In this example:
- `GetUserQuery` class:
  - This class represents a query(request for data) to get a user
  - `UserId` can be considered as the parameters that will be encapsulated into the query 
- `IRequest<User>`:
  - The `IRequest<TResponse>` interface indicates that this query expects a `response of type User` when processed.
  - In this case, `TResponse` is the `User`, meaning the result of executing this query should be a `User` object.
   
  ### Handler in Queries
  ```csharp
    public class GetUserQueryHandler : IRequestHandler<GetUserQuery, User>
  {
      // Example constructor injection for database service, if needed
      private readonly IUserRepository _userRepository;

      public GetUserQueryHandler(IUserRepository userRepository)
      {
          _userRepository = userRepository;
      }

      public async Task<User> Handle(GetUserQuery request, CancellationToken cancellationToken)
      {
          // Logic to fetch user from database or another data source using UserId
          var user = await _userRepository.GetUserByIdAsync(request.UserId);
          
          // Return the user object
          return user;
      }
  }

  ```

  In this example, `IRequestHandler<GetUserQuery, User>` tells the handler to handle the `GetUserQuery` query and returns `User` as the result. 
  **SAME RULE APPLIES TO THE COMMANDS AND COMMAND HANDLERS** 