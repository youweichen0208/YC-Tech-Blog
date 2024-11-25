---
icon: pen-to-square
date: 2024-11-13
category:
  - backend
tag:
    - C#
    - Unit-of-Work Pattern
    - Backend
---

# Unit-of-Work Pattern

## Introduction
The Unit-of-Work pattenr is a behavioral design pattern that faciliates the efficient tracking and management of changes to multiple entities within a transactional boundary. It serves as an essential mechanism in maintaining data consistency and integrity while optimizing database interactions.

## The Need for Unit-of-Work 
When dealing with complex business operations that span multiple entities and database interactions, maintaining data integrity become a challenge. In such scenarios, the Unit-of-Work pattern comes to the rescue by encapsulating these interactions and managing them as a single logical unit. This ensures that all changes are committed together or rolled back entirely in case of an error, preserving data consistency.


## Achieving the Objectives:
1. `Atomic Transactions`: By treating multiple operations as a single unit, the UoW ensures that either all changes succeed or none of them take effect. This guarantees atomicity, preventing partial updates that could lead to data inconsistencies.
2. `Performance Optimization`: Rather than committing each individual change separately, the Unit-Of-Work pattern consolidates the changes and performs bulk updates. This reduces the number of database round-trips, leading to significant performance improvements, especially in scenarios involving numerous data manipulations.
3. `Simplified Business Logic`: With the Unit-of-Work pattern, developers can focus on writing business logic without worrying about managing transactional behavior. 


## Impleting the Unit of Work in EF Core
Let's implement Unit of Work pattern for the example application `Shipping Application` that is responsible for creating and updating customers, orders, and shipments for ordered products. This application has the following entities:
- Customers 
- Orders, OrderItems
- Shipments, ShipmentItems


### Entity classes

**Customer class:**

```csharp
    public class Customer
{
    public Guid Id { get; private set; }
    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public string Email { get; private set; }
    public string PhoneNumber { get; private set; }
    public IReadOnlyList<Order> Orders => _orders.AsReadOnly();

    private readonly List<Order> _orders = [];

    private Customer() { }

    public static Customer Create(
        string firstName,
        string lastName,
        string email,
        string phoneNumber)
    {
        return new Customer
        {
            Id = Guid.NewGuid(),
            FirstName = firstName,
            LastName = lastName,
            Email = email,
            PhoneNumber = phoneNumber
        };
    }

    public void AddOrder(Order order)
    {
        _orders.Add(order);
    }
}
```

**Order Class**
```csharp
public class Order
{
    public Guid Id { get; private set; }

    public string OrderNumber { get; private set; }

    public Guid CustomerId { get; private set; }

    public Customer Customer { get; private set; }

    public DateTime Date { get; private set; }

    public IReadOnlyList<OrderItem> Items => _items.AsReadOnly();

    private readonly List<OrderItem> _items = new();

    private Order() { }

    public static Order Create(string orderNumber, Customer customer, List<OrderItem> items)
    {
        return new Order
        {
            Id = Guid.NewGuid(),
            OrderNumber = orderNumber,
            Customer = customer,
            CustomerId = customer.Id,
            Date = DateTime.UtcNow
        }.AddItems(items);
    }

    private Order AddItems(List<OrderItem> items)
    {
        _items.AddRange(items);
        return this;
    }
}

```

- `Controlled Object Creation`: By setting the constructor to `private`, we prevent external code from instantiating the `Order` object directly. This means that the only way to 
create an `Order` object is through the static `Create` method, which ensures that the object is always created in a valid state.

- The `Create` method acts as a factory that enforces domain rules when constructing the `Order`. For example, it ensures that the `Customer` is provided, and the `OrderNumber` is valid when creating the object. This guarantees that an `Order` cannot be created in an incomplete or inconsistent state, which could happen if a public constructor where used.


**OrderItem class**

```csharp
public class OrderItem
{
    public Guid Id { get; private set; }

    public string Product { get; private set; } = null!;

    public int Quantity { get; private set; }

    public Guid OrderId { get; private set; }

    public Order Order { get; private set; } = null!;

    private OrderItem() { }

    public OrderItem(string productName, int quantity)
    {
        Id = Guid.NewGuid();
        Product = productName;
        Quantity = quantity;
    }
}
```



### interfaces

```csharp
public interface ICustomerRepository
{
    Task AddAsync(Customer customer, CancellationToken cancellationToken);

    Task UpdateAsync(Customer customer, CancellationToken cancellationToken);

    Task<Customer?> GetByIdAsync(Guid customerId, CancellationToken cancellationToken);

    Task<bool> ExistsByEmailAsync(string email, CancellationToken cancellationToken);
}

public interface IOrderRepository
{
    Task AddAsync(Order order, CancellationToken cancellationToken);

    Task UpdateAsync(Order order, CancellationToken cancellationToken);

    Task<Order?> GetByNumberAsync(string orderNumber, CancellationToken cancellationToken);

    Task<bool> ExistsByNumberAsync(string orderNumber, CancellationToken cancellationToken);
}

public interface IShipmentRepository
{
    Task<bool> ExistsByOrderIdAsync(Guid orderId, CancellationToken cancellationToken);

    Task AddAsync(Shipment shipment, CancellationToken cancellationToken);

    Task<Shipment?> GetByNumberAsync(string shipmentNumber, CancellationToken cancellationToken);
}

```


## Scenario
When creating an order, we also need to create a respective shipment, we need to have both operations atomic. If we implement two database calls, we can end up with inconsistent data if an order is created in the database and shipment is not:

```csharp
await orderRepository.AddAsync(order, cancellationToken);
await shipmentRepository.AddAsync(shipment, cancellationToken);
```

In such a case, we can use `IUnitOfWork` to solve our consistency problem. Let's implement it. First, we need to define `IUnitOfWork` interface:

```csharp
public interface IUnitOfWork
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
```

## Build the Unit of Work

Use EF Core DbContext as it already implements the `IUnitOfWork` pattern out of the box.

```csharp
public class ShippingDbContext(DbContextOptions<ShippingDbContext> options)
    : DbContext(options), IUnitOfWork
{
    public DbSet<Shipment> Shipments { get; set; }
    public DbSet<ShipmentItem> ShipmentItems { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Customer> Customers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.HasDefaultSchema("shipping");

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ShippingDbContext).Assembly);
    }
}
```

We need to register the `IUnitOfWork` interface and resolve the `ShippingDbContext` from the current scope:

```csharp
services.AddScoped<IUnitOfWork>(c => c.GetRequiredService<ShippingDbContext>());
```

Now let's rework the `AddAsync` methods of all our repositories and remove the `SaveChangesAsync` call to the DbContext:
```csharp
public async Task AddAsync(Order order, CancellationToken cancellationToken)
{
    await context.Set<Order>().AddAsync(order, cancellationToken);
}
```

The saving changes is delegated to our `Unit of Work`, we can update our code as follows:
```csharp
await orderRepository.AddAsync(order, cancellationToken);
await shipmentRepository.AddAsync(shipment, cancellationToken);
await unitOfWork.SaveChangesAsync(cancellationToken);
```
The main idea is that all repositories make corresponding changes in the EF Core's **Change Tracker** and UnitOfWork saves them all in a single atomic transaction.

```csharp

public async Task<ErrorOr<OrderResponse>> Handle(
    CreateOrderCommand request,
    CancellationToken cancellationToken)
{
    var customer = await customerRepository.GetByIdAsync(request.CustomerId, cancellationToken);
    if (customer is null)
    {
        logger.LogWarning("Customer with ID '{CustomerId}' does not exist", request.CustomerId);
        return Error.NotFound($"Customer with ID '{request.CustomerId}' does not exist");
    }

    var order = Order.Create(
        orderNumber: GenerateNumber(),
        customer,
        request.Items.Select(x => new OrderItem(x.ProductName, x.Quantity)).ToList()
    );

    var shipment = Shipment.Create(
        number: GenerateNumber(),
        orderId: order.Id,
        address: request.ShippingAddress,
        carrier: request.Carrier,
        receiverEmail: request.ReceiverEmail,
        items: []
    );

    var shipmentItems = CreateShipmentItems(order.Items, shipment.Id).ToList();
    shipment.AddItems(shipmentItems);

    await orderRepository.AddAsync(order, cancellationToken);
    await shipmentRepository.AddAsync(shipment, cancellationToken);
    await unitOfWork.SaveChangesAsync(cancellationToken);

    logger.LogInformation("Created order: {@Order} with shipment: {@Shipment}", order, shipment);

    var response = order.MapToResponse();
    return response;
}
```
In our application, we could have a use case when a new customer makes on order on the website, and we need to:
- Create customer 
- Create an order with order items
- Create shipment with ship items

in a single operation.

With a UnitOfWork pattern it will be as easy as the following:
```csharp
await customerRepository.AddAsync(customer, cancellationToken);
await orderRepository.AddAsync(order, cancellationToken);
await shipmentRepository.AddAsync(shipment, cancellationToken);
await unitOfWork.SaveChangesAsync(cancellationToken);
```

## Summary
In simple terms, the `SaveChangesAsync()` method is typically moved into the `Unit of Work` in the Unit of Work pattern to manage the final `commit` of changes made to entities. This means that instead of calling `SaveChangesAsync()` directly on the repository or entity, we call it through the Unit of Work to ensure all changes are tracked and persisted together in a single transaction.