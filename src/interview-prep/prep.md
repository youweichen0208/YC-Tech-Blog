---
icon: pen-to-square
date: 2024-07-12
category:
  - interview
tag:
  - interview questions
star: true
sticky: true
---

# Most asked interview questions:

## What is OpenID?

OpenID is an authentication protocol that allows users to log in to multiple websites using a single set of credentials. This eliminates the need for users to create and remember separate usernames and passwords for each site.

### How it works:

- Users can use their existing accounts from OpenID providers (such as Google, Facebook, or Twitter) to sign into websites that support OpenID.
- The website (relying party) redirects the user to the OpenID provider's login page.
- The user logs in at the OpenID provider
- The OpenID provider authenticates the user and sends an authentication token back to relying party.
- The relying party uses this token to log the user in.

### Use Cases:

- Single sign-on (SSO) for web applications.
- Simplying user management by leveraging existing credentials from trusted providers.

## What is OAuth

OAuth is an authorization protocol that allows third-party applications to access a user's resources without sharing the user's credentials.

### How It Works

- The user wants to give a third-party application access to their data hosted on a resource server (such as Google Drive, Github, etc).
- The third-party application redirects the user to the resource server's authorization page.
- The user logs in and consents to the access request.
- The resource server issues an authorization code to the third-party application.
- The third-party application exchanges the authorization code for an access token.
- The third-party application uses the access token to access the user's data on the resource server.

### SOLID Principle:

The SOLID principles are a set of five design principles in software development that are aimed at making software designs more understandable, flexible, and maintainable.

1. **Single Responsiblity Principle:**

- A class should have one, and only one, reason to change. This means that a class should only have one job or responsiblity.

2. **Open/Closed Principle (OCP)**

- Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modidication. This means we should be able to add new functionality without changing existing code.

3. **Liskov Substitution Principle (LSP)**

- Objects of a superclass should be replacable with objects of a subclass without affecting the correctness of the program. This principle is about ensuring that a subclass can stand in for its superclass.

4. **Interace Segregation Principle (ISP)**

- No client should be forced to depend on methods it does not use. This principle suggests that it is better to have many smaller, client-specific interfaces than one large, general-purpose interface.

5. **Dependency Inversion Principle (DIP)**

- High-level modules should not depend on low-level modules. Both should depend on abstractions. Additionally, abstractions should not depend on details; details should depend on abstractions. This principle is about decoupling software modules.

## LINQ

LINQ stands for Language Integrated Query. It provides a powerful feature that introduces query capabilities into the C# language.

### Key Features:

1. `Integrated Query Syntax:` LINQ provides a consistent query syntax that can be used across different data sources.
2. `Deferred Execution`: LINQ queries are not executed until we iterate over the query variable.
3. `Strongly Typed`: LINQ queries are checked at compile time for type safety, which reduces runtime errors.

### Why we use deferred execution?

1. `Performance Optimization`: it ensures that query is executed only once, at the moment when the data is actually needed.
2. `Up-to-Date Data`: it guarantees that the data retrieved is the most current, as the query is executed at the last possible moment, reflecting any changes made to the underlying data source.
3. `Efficient Resource Usage`: By delaying execution, we avoid consuming resources until they are truly needed.

## What is EF?

Entity Framework is an object-relational mapper (ORM) for .NET applications. It allows developers to work with a database using .NET objects, eliminating the need for most of the data-access code that developers need to write.

## New features in EF 8.0

1. `Improved Performance`:

- EF 8.0 includes optimizations for translating LINQ queries into SQL, resulting in more efficient SQL generation.

2. `Temporal Tables`:

- EF8.0 includes support for temporal tables, which allows us to track historical changes over time.

3. `JSON columns`:

- EF 8.0 supports mapping JSON columns in the database directly to .NET types, enabling easy querying and manipulation of JSON data stored in the database.

4. `Raw SQL Enhancements`:

- Enhancements in handling raw SQL queries allow for more flexible and secure execution of raw SQL commands, including better support for parameterized queries.

## New features in .net core 8.0?

- `Developer Productivity`:

1. `Hot Reload Enhancements`: Improve hot reload support for faster development cycles.
2. Enhanced tools for diagnosing and profiling .NET applications.

- `Cross-platform support`:

1. Better support for ARM 64
2. MacOS and Linx Enhancements

## New Features in C#12

1. Primary Constructors for Classes
   A primary constructor in `C#12` allows us to define constructor parameters directly in the class declaration. This feature simplifies the initialization of class properties and reduces the boilerplate code.
2. Enhanced Interpolated Strings
3. Required Members
   - Required Properties: Allows the declaration of required properties that must be set during object initialization.

## Angular 16

### Signals:

- `Reactice State Management:` Signals are a new reactive primitive in Angular 16 that simplify state management and change detection.
- `Automatic Change Detection`: Signals automatically tracks dependencies and re-compute values when dependencies change.

### RxJS

RsJS Observables are a powerful tool for managing asynchronous data streams in JavaScript. Observables provide a way to work with data that changes over time.

## Use Cases:

### RxJS

1. `Event Handling`: Ideal for handling complex event streams.
2. `Http Requests`: Managing HTTP requests and responses in a reactive manner.
3. `Real-Time Data`: working with real-time data streams.

### Angular Signals:

1. `State Managament`: Managing component state and ensuring efficient change detection in Angular applications.
2. `Component Communication`: Facilitating communication and state sharing between Angular components.

## Azure Services

### Computing Services

1. Azure Virtual Machines
2. Azure Kubernetes Services
3. Azure App Service

### Storage Services

1. Azure Blob Storage
2. Azure File Storage
3. Azure Disk Storage

### Database Services

1. Azure SQL Database
2. Azure Database for MySQL

## How do you handle angular routing?

1. Set up the Angular Router
2. Define Routes
3. Add RouterOutlet in our template
4. Link to Routes using RouterLink

## What is the intent of this SQL?

```sql
SELECT

PC.CaseNumber

,PC.LoginID

,COUNT(1)

FROM

Case_Payment PC

GROUP BY

PC.CaseNumber, PC.LoginID

HAVING

COUNT(1) > 1
```

The intent of this SQL code is to select records from the `Case_payment` table that have more than one payment record for the same `CaseNumber` and `LoginID`.

## Explain AsNoTracking and Include

```csharp
var entity = DbContext.

   PageTable.

   AsNoTracking().

   Include(p => p.Content).

   FirstOrDefault(x => x.Id == query.Id);
```

1. `AsNoTracking()`: This method is used to tell Entity Framework not to track the changes to the returned entity. This means that EF won't keep information about the entity instance in its chaneg tracker.
2. `Inlcude(p=>p.Content)`: This method is used to specify related data to be included in the query results.

## Introduce yourself

My name is Adam. I am a full stack developer with .NET for backend services and Angular for the frontend. I love building smooth and scalable applications and have focused my career on mastering these technologies. I enjoy solving complex problems, bringing ideas to life, and continously learning to stay updated with tech trends.

I am also good at communicating and working with others. I believe that a team with good communication can always lead to success. I like to share ideas and listen to other teammates' user stories in the scrum meeting. I am a hard working person. My priority is to ensuring that the projects are done efficiently and effectively within the schedule.

## Explain your most recent project and its architecture?

The most project I worked on is using the clean architecture. The clean architecture has 3 different layers: application layer, infrastructure layer, and API layer. The application layer holds the business model such as entities and services. Infrastructure layer includes data access implementations such as using Entity Framework. API layer is the entry point of the application. It has controllers, filters and middleware. Compared to the traditional MVC model that business layer depends on the data access layer, the data access layer and API layer both relies on the application layer. The reason that we chose to use clean architecture is because it is more scalable and the core business logic is independent of frameworks. The project has multiple microservices such as telemetry service and simulation service. Some of the microservices are interdependent. So clean architecture will ensure that it provides a boundary between different concerns within the service and allow each service to scale independently.

## When should we use Promises vs Observables

Promises are ideal for one-time events or asychronous operations. Use Observables when dealing with a stream of data that arrives over time.

## Explain normalization in a few sentences

Normalizaton is to minimize redundancy and dependency by dividing the large tables into smaller ones and defining relationships between them. The main goals of normalization are to reduce data duplication, ensure data integrity, and simplify the database structure.
