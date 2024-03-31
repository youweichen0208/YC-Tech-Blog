---
icon: pen-to-square
date: 2024-03-06
category:
  - backend
tag:
  - C#
  - .NET CORE
---

# .NET CORE

## .NET Core Overview

.NET Core is a new version of .NET Framework. Compared to .NET that runs primarily on Microsoft Windows, .NET Core is a cross-platform framework that runs on Windows, macOS, and Linux operating systems. The main objective of .NET Core is to make .NET Framework open-source, cross-platform compatible that can be used in a wide variety of place.

## Kestrel

Kestrel is a cross-platform, lightweight, and open-source web server developed by Microsoft. It is the default web server used by ASP.NET Core applications. Kestrel is designed to be fast, efficient, and scalable, making it suitable for hosting modern web applications.

## Entry Point of .NET Core Application

By default, Program.cs file in ASP.NET Core MVC application is an entry point of an application. It contains logic to start the server and listen for the requests and also configure the application.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

// register services with the dependency injection container using build
var app = builder.Build();

// configure middleware (request pipeline) using app object here

// start the application
app.run();
```

- The `CreateBuilder()` method set up the internal web server which is kestrel. It also specifies the content root and read application settings file `appsettings.json`.

- Using `builder` object, we can configure various things for our web application, such as dependency injection, middleware, and hosting environment.

- The builder object has the `Services()` method which can be used to add services to the dependency injection container.

- The `AddControllersWithViews` adds MVC services to the application's dependency injection container. This includes services for controllers and views, which are used to handle HTTP requests and generate responses.

- `var app = builder.Build()` sets up the application's dependency injection container and configures the middleware pipeline based on services and configurations that have been added to the builder.

## ASP.NET MVC Architecture

### Model:

model represents the shape of the data. A class in C# is used to describe a model. Model objects store data retrieved from the database.

### View:

view in MVC is a user interface. View display model data to the user and also enables them to modify them.

### Controller:

the controller handles the user request. Typically, the user uses the view and raises an HTTP request, which will be handled by the controller. The controller processes the request and returns the appropriate view as a response. In other words, controller is the request handler.

## Routing in MVC

ASP.NET introduced Routing to eliminate the needs of mapping each URL with a physical file. Routing enables us to define a URL pattern that maps to the request handler. This request handler can be a file or class. For example, http://domain/students can be mapped to http://domain/studentsinfo.aspx in ASP.NET webforms, and the same URL can be mapped to Student Controller and Index action method in MVC.

### URL pattern

- **URL Pattern**:
  In ASP.NET Core, we define routes using URL patterns. These patterns can include placeholders for values that will be filled in with data from the actual URL.

- **After the Domain Name**:
  The URL pattern is applied to the part of the URL that comes after the domain name (and port number, if specified). For example, in the URL `http://localhost:1234/Products/Details/5`, the domain name is `localhost:1234` and the rest (`Products/Details/5`) is where the URL pattern is applied.

- **Example**:
  The text provides an example of a URL pattern: `{controller}/{action}/{id}`. In this pattern, `{controller}` is a placeholder for the name of the controller, `{action}` is a placeholder for the name of the action method, and `{id}` is a placeholder for an optional id parameter.

- **Controller**:
  According to the given pattern, anything after `localhost:1234/` in the URL is considered as the controller name. For example, in the URL `http://localhost:1234/Products/Details/5`, `Products` is the controller name.

### Configure routing for MVC controllers in an ASP.NET Core application:

We can configure a general pattern of routing in the `Program.cs` file after .NET 6.

```csharp
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
```

- `"default"`: This is the name of the route. Naming routes is optional, but it can be useful for generating URLs later.
- `{controller=Home}/{action=Index}/{id?}`: this is the route template. It defines the pattern for the URLs that this route will match. The placeholders `{controller}`, `{action}`, and `{id}` are replaced with actual values from the incoming URL.
  - `{controller=Home}`: This segment matches the controller part of the URL. The `=Home` part specifies that if no controller is specified in the URL, it should default to `Home`.
  - `{action=Index}`: This segment matches the action method part of the URL. The `=Index` part specifies that if no action is specified in the URL, it should default to `Index`.
  - `{id?}`: This segment matches an optional id parameter in the URL. The `?` makes it optional.

### Points to remember:

1. The controller handles incoming URL requests. MVC routing sends requests to the appropriate controller and action method based on URL and configured Routes.
2. All the public methods in the Controller class are called Action methods.
3. The Controller class must be derived from System.Web.Mvc.Controller class.
4. The Controller class name must end with "Controller".
5. A new controller can be created using different scaffolding templates. We can create a custom scaffolding template also.

## Action method:

All the public methods of the `Controller` class are called `Action` methods. They are like any other normal methods with the following restrictions:

1. Action method must be public. It cannot be private or protected.
2. Action method cannot be overloaded.
3. Action method cannot be a static method.

### ActionResult:

The `ActionResult` class is a base class of all the result classes, so it can be the return type of action method that returns any result listed above.

![Action Result methods](/assets/images/action-result.jpg)

As we can see in the above table, the `View()` method returns the `ViewResult`, the `Content` method returns a string, the `File` method returns the content of a file, and so on. Use different methods mentioned in the above table to return a different type of result from an action method.

### Points to remember:

1. All the public methods in the Controller class are called Action methods.
2. The Action method has the following restrictions.

- Action method must be public. It cannot be private or protected.
- Action method cannot be overloaded.
- Action method cannot be a static method.

3. ActionResult is a base class of all the result type which returns from the Action method.
4. The base controller class contains methods that return appropriate result type. e.g. View(), Content(), File(), JavaScript() etc.
5. The Action method can include Nullable type parameters.

## Action Selectors:

Action selector is the attribute that can be applied to the action methods. It helps the routing engine to select the correct action method to handle a particular request.

### ActionName

The `ActionName` attribute allows us to specify a different action name than the method name.

```csharp
public class StudentController : Controller {
  public StudentController(){

  }

  [ActionName("find")]
  public ActionResult GetById(int id) {

    // get student form the database
    return View();
  }
}
```

In the above example, we have applied `ActionName("find")` attribute to the `GetById()` action method. So now, the action method name is `Find` instead of the `GetById`. So now, it will be invoked on `http://localhost/student/find/1` request instead of `http://localhost/student/getbyid/1` request.

### NonAction

Use the `NonAction` attribute when we want public method in a controller but do not want to treat it as an action method.

```csharp
public class StudentController : Controller {
  public string Index(){
    return "This is Index action method of StudentController";
  }

  [NoAction]
  public Student getStudent(int id) {
    // get student form the database
    return studentList.where(s=>s.StudentId == id).FirstOrDefault();
  }
}
```

In the following example, the `Index()` method is an action method, but the `GetStudent()` is not an action method.

## Create Views in ASP.NET MVC

A view is used to display data using the model class object. The **Views** folder contains all the view files in the ASP.NET MVC application. A controller can have one or more action methods, and each action method can return a different view. In short, a controller can render one or more views. So, for easy maintainance, the MVC framework requires a separate sub-folder for each controller with the same name as a controller, under the **Views** folder.

For example, all the views rendered from the `HomeController` will resides in the **Views** > **Home** folder. In the same way, views for `StudentController` will resides in **Views** > **Student** folder, as shown below.

## View Helper method:

A view helper method has many overloads that can be used in many ways:

- An explicit view to return:

```csharp
return View("Orders");
```

- A view model to pass to the view:

```csharp
return View(Orders);
```

- Both a view and a model:

```csharp
return View("Orders", Orders);
```

## DTO data transfer object:

A Data Transfer Object (DTO) is a design pattern used in software architecture, DTOs are simple objects that are used to transport data between layers in an application. They do not contain any business logic but only attribute fields.

DTOs are often used in conjunction with Object-Relational Mapping(ORM) frameworks to select, insert, or update data in a database. They can also be used in APIs to define the shape of data that's sent over the network.

## Bind Query String to an Action Method Parameters in MVC

In ASP.NET Core MVC, we can bind query string values to action method parameters directly. The model binding system takes care of this for us.

```csharp
public IActionResult Index(string name, int id) {
  // Action logic here...
}
```

In this example, if we navigate to a URL like `/Home/Index?name=John&id=5`, the `name` parameter will be bound to "John" and the `id` parameter will be bound to 5. The names of the query string parameters in the URL must match the names of the action method parameters. The model binding system is case-insensitive, so a query string parameter of `Name` will match to a method parameter of `name`.

### Binding to complex types:

in ASP.NET Core, when binding form data to a model class, the names of the form input fields must match the property names in the model class. This is how the model binding system knows which form field corresponds to which property in the model.

## Razor Syntax:

Razor is one of the view engines supported in ASP.NET MVC. Razor allows us to write a mix of HTML and server side code using C# or Visual Basic. Razor view with visual basic syntax has `.vbhtml` file extension and C# syntax has `.cshtml` file extension.

### Inline Expression

Start with `@` symbol to write server-side C# or VB code with HTML code. For example, write @Variable_Name to display the value of a server-side variable, e.g., DateTime.Now returns the current date and time. So, write `@DateTime.Now` to display the current date and time.

### Multi-statement Code block:

We can write multiple lines of server-side code enclosed in braces `@{...}`. Each line must end with a semicolon the same as C#.

### Display Text from Code Block:

Use `@:` or `<text></text>` to display texts within code block.

```csharp
@{
  var date = DateTime.Now.ToShortDateString();
  string message = "Hello World!";
  @: Today's date is: @date <br />
  @message
}
```

### if-else condition

Write if-else condition starting with `@` symbol. The if-else code block must be enclosed in braces `{ }`, even for a single statement.

```csharp
@if (DateTime.IsLeapYear(DateTime.Now.Year))
{
  @DateTime.Now.Year @:is a leap year.
}
else {
  @DateTime.Now.Year @:is not a leap year.
}
```

### for loop

```csharp
@for (int i = 0; i < 5; i++) {
  @i.ToString() <br/>
}
```

### Model

Use @model to use model object anywhere in the view.

```csharp
@model Student
<h2>Student Detail: </h2>
<ul>
  <li>Student Id: @Model.StudentId</li>
  <li>Student Name: @Model.StudentName</li>
  <li>Age: @Model.Age</li>
</ul>
```

### Declare Variables

Declare a variable in a code block enclosed in brackets and then use those variables inside HTML with `@` symbol

```csharp
@{
  string str = "";
  if (1 > 0) {
    str = "Hello World";
  }
}

<p>@str</p>
```

### @Html.ActionLink()

In ASP.NET MVC, `@Html.ActionLink()` is a helper method used to generate hyperlinks(anchor tags `<a>`) that invoke controller actions in our application.

```csharp
@Html.ActionLink(linkText, actionName, controllerName, routeValues, htmlAttributes)
```

Example:

```csharp
@Html.ActionLink("Home", "Index", "Home")
```

### @Html.DisplayNameFor()

In ASP.NET MVC, `@Html.DisplayNameFor()` is a Razor helper method that is used to generate display names for model properties. It is typically used within views to automatically generate the label or display name for a specific property of a model.

```csharp
<label for="FirstName">@Html.DisplayNameFor(model => model.FirstName)</label>
```

### @Html.DisplayFor()

`@Html.DispayFor()` is a Razor helper method in ASP.NET MVC that is used to render the value of a model property.

```csharp
@model YourNamespace.YourModel

<p>@Html.DisplayFor(model => model.PropertyName)</p>
```

### `asp-controller` Tag Helper

The `asp-controller` specifies the controller for the link.

```csharp
<a asp-controller="Home" asp-action="Index">Home</a>
```

### `asp-route` Tag Helper:

The **asp-route** specifies route values for the link. It allows us to pass parameters to the controller action.

```csharp
<a asp-controller="Home" asp-action="Details" asp-route-id="123">Details</a>

```

In this example, the link points to the "Details" action in the `Home` controller and passes a route value with the key "id" and value "123".

## Hot Reload

The `dotnet watch run` command is a tool in .NET Core that automatically rebuilds and reruns our application whenever it detects changes in the source code. This is often referred to as "hot reloading".

## HttpContext

The HttpContext object encapsulates all the HTTP-specific information about a single HTTP request. When an HTTP request arrives at the server, the server processes the request and builds an HttpContext object. This object represents the request and its content which our application code can use to create the response. Some.

Here are some of its important properties:

- `Request`: This property is of type `HttpRequest` and provides information about the HTTP request including headers, query strings, and body.
- `Response`: This property is of type `HttpResponse` and allows us to control the HTTP response sent back to the client, including setting headers, status code, and writing to the response body.

- `User`: This property is used for authentication and authorization.

-- `Session`: This property provides a way to store data and is associated with a specific user across multuple requests.

-- `Items`: This property is a key-value conenction that can be used to store data while processing a single request.

**Remember that `HttpContext` is specific to a single request and response pair, so it is NOT shared across different HTTP requests.**

## N-Layer architecture:

As applications grow in complexity, one way to manage that complexity is to break up the application according to its responsibilities and concerns. This approach follows the separation of concerns principle and can help keep a growing database organized so that developers can easily find where certain functionality is implemented.

- Presentation Layer:

This is the user interface layer. It could be a web page, desktop application, or a mobile app. It is responsible for displaying data to the user and handling user input.

- Business Logic Layer (Service Layer):

This layer contains the core business logic of the application. It coordinates the application's response to user input and drives the business process of the application.

- Data Access Layer:

This layer is responsible for communicating with the database or any other storage system. It might contain code for querying database, mapping the results to objects, and saving objects back to the database.

### Disadvantage of N-Layer approach:

The compile-time dependencies run from the top to the bottom. The User Interface layer depend on the Business Logic Layer. Business Logic Layer depends on the Data Access Layer. In a traditional N-Layer architecture without the use of interfaces or dependency inversion, the Business Logic Layer (BLL) would directly instantiate and use classes from the Data Access Layer. This means that the Business Logic Layer (which holds the most important logic in the application) is dependent on data access implementation details (and often on the existence of a database). Testing business logic in such an architecture is often difficult, requiring a test database.

## ORM:

Object-relational mapping (ORM) is a technique that allows developers to work with a database using an object-oriented model, rather than using SQL statements. ORM frameworks provide a mapping between the object-oriented model and the relational model of the database, allowing developers to work with objects and collections of objects in their code, rather than with tables and rows in a database.

## Entity Framework (EF):

Entity Framework (EF) Core is a lightweight, extensible, open source and cross-platform library to access database. EF Core serves as ORM by mapping between database objects and .NET objects. It helps developers save time by eliminating the need to write most of the data access code that otherwise can be time consuming.

### The downsides of EF Core ORM:

Even though EF Core ORM has many advantages and helps developers in many ways, there are some downsides to it.

EF Core hides the database so well that sometimes we forget what's happening behind the scenes on the databse side of things. Sometimes we might write C# code that works well in .NET world but does not necessarily translate well in the database world. Sometimes we might write C# LINQ code that is complex and EF Core might generate a SQL statement which is not necessarily an optimized SQL.

## Clean Architecture

Clean architecture puts the business logic and application model at the center of the application. Instead of having business logic depend on data acess or other infrastructure concerns, this dependency is inverted: insfrastructure and implementation details depend on the Application Core. This functionality is achieved by defining abstractions, or interfaces.

### Organizing code in Clean Architecture:

In a Clean Architecture solution, each project has clear responsibilities. As such, certain types **belong in each project**.

### Application Core

The Application Core holds the business model, which includes entities, services, and interfaces.

- Entities (business model classes that are persisted)
- Interfaces (For Respositories and Services)
- Domain Services
- Custom Exceptions and Guard Clauses

### Insfrastructure:

The Infrastructure project typically includes data access implementations. In a typical ASP.NET Core web application, these implementations include the Entity Framework (EF) DbContext, any EF Core Migration objects that have been defined, and data access implementation classes. The most common way to abtract data access implementation code is through the use of the Repository design pattern.

In addition to data access implementations, the Infrastructure project should contain implementations of services that must interact with infrastructure concerns. These services should implement interfaces defined in the Application Core, and so infrastructure should have a reference to the Application Core project.

- EF Core types (DbContext, Migration)
- Data access implementation types (Respositories)
- Infrastructure-specific services.

### UI/API Layer:

The uer interface layer in an ASP.NET Core MVC application is the entry point for the application. This project should reference the Application Core project, and its types should interact with infrastructure strictly through interfaces defined in Application Core. No direct instantiation of or static calls to the infrastructure layer types should be allowed in the UI layer.

- Controllers
- Custom Filters
- Custom Middleware
- Views, Partial Views & View Components
- Startup/Program.cs

## Dependency Injection:

### Dependency Inversion Principle:

1. Dependency Inversion Principle states that High-level modules should not depend on low-level modules. Both should depend on abstractions.
2. Abstractions should not depend on details. Details should depend on abstractions.

For example, if a high-level module like a `Service` class depends on a low-level module like a `DataAccess` class, then the `Service` class is directly dependent on the specific implemntation of `DataAccess`. By introducing an interface (like `IDataAccess`), both `service` and `DataAccess` can depend on this abstraction, and the `Service` class can work with any class that implements `IDataAccess`. This makes the `Service` class more flexible and easier to test, because the data acess implementation can be easily swapped or mocked.

### Constructor Injection

In .NET Core, if we are using constructor injection to inject dependencies, we need to register these dependencies in the DI container. This is typically done in `Program.cs` file.

Register IProductService in the `Program.cs`:

```csharp
builder.Services.AddTransient<IProductService, ProductService>();
builder.Services.AddTransient<IProductRepository, ProductRepository>();
```

Once a service is registered, it can be injected into the constructors of our controllers, Razor PaGES, or other services. The DI container will automatically create and inject the appropriate instance when needed.

```csharp
public class ProductsController : Controller
    {
        private readonly IProductService _productService;
        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }
        public IActionResult ProductsByCategory(string category, int pageSize = 30, int pageNumber = 1)
        {
            var products = _productService.GetProductsByCategory(category, pageSize, pageNumber);
            return View("PagedIndex", products);
        }
        public IActionResult ProductDetail(int id)
        {
            var product = _productService.GetProductByIdAsync(id);
            return View(product);
        }
    }
```

### Service Lifetimes:

- `AddTransient`: a new instance is created every time the service is requested.
- `AddScoped`: A new instance is created once per request/session scope
- `AddSingleton`: A single instance is created and used for the entire application lifetime.

## DB Context:

`DbContext` is a fundamental class in Entity Framework, which is an Object-Relational Mapping (ORM) developed by Microsoft for .NET applications. The `DbContext` class represents a session with the database and provides a set of APIs for performing database operations, such as querying, inserting, updating, and deleting records. It acts as the bridge between our model and the relational database.

### DbSet:

In Entity Framework, `DbSet` is a class provided by the framework that represents a collection of entities in the context of a database.

1. Entity Representation:

- Each `DbSet` property in a class derived from `DbContext` represents a table or view in the underlying database.
- For example, if we have a `DbSet<User>` property, it typically corresponds to a table named `Users` in the database.

2. CRUD Operations:

- `DbSet` provides methods for performing common database operations such as querying, inserting, updating, and deleting entities.

- For example, we can use methods like `Add`, `Remove`, `Find`, and LINQ queries to interact with the entities in the set.

3. LINQ Queries:

- We can use LINQ to query entities in a `DbSet`. This allows us to write expressive and type-safe queries against our database.

### DbContext class constructor

the constructor that accepts `DbContextOptions<YourDbContext>` is required for our `DbContext` class. This constructor is necessary for Entity Framework to configure the database connection and other options for our application.

```csharp
public class TrainingDbContext:DbContext
{
    public TrainingDbContext(DbContextOptions<TrainingDbContext> options) : base(options)
    {

    }

    public DbSet<Employee> Employees { get; set; }

    public DbSet<Department> Departments { get; set; }
}
```

### Necessary dependencies to use Entity Framework Core application:

- **Microsoft.EntityFrameworkCore**:
  This is the core Entity Framework package that provides the fundamental functionality working with databases.
- **Microsoft.EntityFrameworkCore.SqlServer**:
  If we are using SQL Server as our database provider, we'll need this package. It includes the necessary components to interact with SQL Server databases using Entity Framework Core.

- **Microsoft.EntityFrameworkCore.Tools**:
  This package includes additional tools for working with Entity Framework Core, especially during development. It can be useful for generating entity classes and a `DbContext` based on an existing database.

- **Microsoft.EntityFrameworkCore.Design**:
  This package contains the design-time components for Entity Framework Core. It's needed for migrations and other design-time operations during development

## Steps before Migrations:

1. Create DbContext class in Data folder
2. Configure "ConnectionStrings" in appsettings.json file

```json
 "ConnectionStrings": {
    "ShippingDB": "Server=localhost;Database=ShippingDB;User=SA;Password=<YourStrong@Passw0rd>;TrustServerCertificate=True"
  }
```

3. Configure Entity Framework Core in an ASP.NET Core Application

```csharp
builder.Services.AddDbContext<ShippingDbContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("ShippingDB"));
});
```

- The `AddDbContext` method is used to register the `ShippingDbContext` (which is a class that I've created to interact with my database using Entity Framework Core) with ASP.NET Core's dependency injection container. This means that an instance of `ShippingDbContext` can be automatically provided (or "injected") into our controllers or other classes that need it.

- The ` option.UseSqlServer(builder.Configuration.GetConnectionString("ShippingDB"))` part of the code is configuring the `ShippingDbContext` to use SQL Server as the database provider and specifying the connection string to use to connect to the database.

- So overall, this code is registering a "context of session with the database" with the application and configuring it to use a specific database and connection string.

## Migrations in the DbContext

In Entity Framework Core, a migration is a way to represent the changes we make to our database schema over time. Migrations are used to update the database to reflect changes in our data model (e.g., adding or removing tables, columns, or relationships).

### Migration Steps:

1. Create or Modify Entities
2. Generate a Migration
3. Review the Migration
4. Apply and Update the Migration

## ModelState.IsValid

`ModelState.IsValid` is a property in ASP.NET Core MVC that indicates whether the submitted form data is valid or not. When a form is submitted in an ASP.NET Core MVC application, the data in the form is bound to a model object. This process is known as model binding.

As part of model binding, validation rules are checked against the data that was submitted. These validation rules can be specified using data annotation attributesd like `[Required]`, `[StringLength]`, `[Range]`, etc, on the properties of the model class.

If all validation rules pass, `ModelState.IsValid` will be `true`. If any validation rule fails, `ModelState.IsValid` will be false, and `ModelState` will contain information about which rules failed.

## Repositories

In the context of Clean Architecture, the Repository pattern is a way to abstract away the details of data access from the rest of the application.

### Repositories in Application Core:

In the Application Core, we would define interfaces for our repositories. These interfaces represent the operations that our application needs to perform on our entities, like adding, updating, deleting, or retrieving them. By defining these as interfaces in the Application Core, our business logic can depend on these interfaces without knowing anything about how data access is actually implemented.

```csharp
public interface IBaseRepository<T> where T:class
{
    int Add(T entity);
    int Update(T entity);
    int Delete(int id);

    IEnumerable<T> GetAll();

    T GetById(int id);
}
```

- `IBaseRepository<T>` is a generic interface that defines common CRUD operations for any entity class `T`. The `where T : class` constraint ensures that this interface can only be used with reference types.

```csharp
public interface ICustomerRepository : IBaseRepository<Customer>
{

}
```

- By extending `IBaseRepository<Customer>`, `ICustomerRepository` inherits methods for adding, updating, deleting, and retrieving `Customer` entities. We can also add additional methods in `ICustomerRepository` that are specificc to handling `Customer` entities.

### Repositories in Infrastructure

In the Infrastructure layer, we would implement these repository interfaces. These implementations would contain the actual data access code, which might use Entity Framework, Dapper, ADO.NET, or any other data access technology.

```csharp
public class BaseRepository<T> : IBaseRepository<T> where T : class
{
    protected readonly ShippingDbContext _shippingDbContext;

    public BaseRepository(ShippingDbContext context)
    {
        _shippingDbContext = context;
    }
    public int Add(T entity)
    {
        _shippingDbContext.Set<T>().Add(entity);
        return _shippingDbContext.SaveChanges();
    }
}
```

- `protected readonly ShippingDbContext _shippingDbContext`: This line declares a protected, read-only field for the `ShippingDbContext`. This is the Entity Framework context that will be used to interact with the database.

- `public BaseRepository(ShippingDbContext context){  _shippingDbContext = context}`: This is the constructor for the `BaseRepositpory<T>` class. It takes a `ShippingDbContext` as a parameter and assigns it to the `_shippingDbContext` field. The reason for doing this is to use depenedency injection to create the instance of ShippingDbContext.

- `public int Add(T entity) {...}`: This is the implementation of the `Add` method from the `IBaseRepository<T>` interface. It adds the given entity to the `DbSet<T>` for that entity type in the `ShippingDbContext`, and then calls `SaveChanges` to save the changes to the database.

## Dapper

## Fluent API

Fluent API is a way of designing APIs in a more readable and expressive manner, often used in .NET Core for configuring and building complex objects. In Entity Framework Core, Fluent API is commonly used for configuring database models.

### Fluent API vs Annotations:

1. Fluent API provides a more readable and expressive way of configuring entity models; Annotations are often more concise and preferable for simple configurations.
2. Fluent API allows us to centralize configuration logic in the `OnModelCreating` method of our `DbContext`, promoting a sepration of concerns.
3. Fluent API provides more flexibility for advanced configurations that might now be achivable with annotations alone. It allows us to handle complex relationships, indexes, and other aspects of database modeling.

### OnModelCreating

`OnModelCreating` is a method that is part of the `DbContext` class in Entity Framework Core. It is called when the model for a derived context has been initialized. The primary purpose of `OnModelCreating` is to configure the database model. This includes defining entities, specifying keys, configuring relationships, and setting up various aspects of how the entities map to the database schema.

### ModelBuilder

`ModelBuilder` is a class provided by Entity Framework Core within the `OnModelCreating` method. It represents the entry point for configuring the database model. We use it to define the mapping between our domain classes (entities) and the database tables, columns, and relationships.

- **Entity Configuration:**
  - Configuring various aspects of our entites, such as setting primary keys, defining column types, specifying required properties, etc.
- **Relationship Configuration:**
  - Configuration relationships between entites, including one-to-one, one-to-many, and many-to-many relationships. This is often done using Fluent API.
- **Table and Column Naming:**
  - Customizing the names of tables and columns in the database to match our application's conventions or requirements.
- **Index and Key Configuration**:
  - Defining indexes and unique constraints on columns.

### One to many relationships in Fluent API:

Assume we have the following classes:

```csharp
public class Author
{
    public int AuthorId { get; set; }
    public string Name { get; set; }

    // Navigation property for the one-to-many relationship
    public ICollection<Book> Books { get; set; }
}

public class Book
{
    public int BookId { get; set; }
    public string Title { get; set; }
    public int AuthorId { get; set; }

    // Navigation property for the many-to-one relationship
    public Author Author { get; set; }
}

```

Let's configure one-to-many relationship using Fluent API in our `OnModelCreating` method:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // Configure the one-to-many relationship between Author and Book
    modelBuilder.Entity<Author>()
        .HasKey(a => a.AuthorId); //this method is used to configure the primary key of Author entity.

    modelBuilder.Entity<Book>()
        .HasKey(b => b.BookId)
        .Property(b => b.Title)
        .IsRequired();

    // Define the one-to-many relationship
    modelBuilder.Entity<Author>()
        .HasMany(a => a.Books)        // One Author has many Books
        .WithOne(b => b.Author)       // Each Book has one Author
        .HasForeignKey(b => b.AuthorId); // Foreign key on the Book table
}

```

- `.Property()` method in Entity Framework Core's Fluent API is used to configure the properties of an entity type. The `Property(b=>b.Title)` method is used to get a reference to the `Title` property of the `Book` entity. Once we have this reference, we can chain additional methods to configure the property.
- In this case, `.IsRequired()` is chained to the `Property` method, which configures the `Title` property to be required. This means that the database column for `Title` will be created as **NOT NULL**, and Entity Framework will validate that this property is not null before saving an entity to the database.
- `HasKey(a=>a.AuthorId)`: This method is used to configure the primary key of an entity. In this case, it's saying that the `AuthorId` property is the primary key of the `Author` entity.
- `HasMany(a=>a.Books)`: This method is used to configure the many side of a one-to-many relationship. In this case, it's saying that an `Author` entity can be associated with many `Book` entities.
- `HasForeignKey(b=>b.AuthorId)`: This method is used to configure the foreign key for a relationship. In this case, it's saying that the `AuthorId` property on the `Book` entity is the foreign key for the relationship with the `Author` entity.

### Many to many relationships in Fluent API:

In Entity Framework Core, many-to-many relationships involve an entity that has a collection of another entity, and vice versa. For example, a `Post` entity might have a collection of `Tag` entities (because a post can have multiple tags), and a `Tag` entity might have a collection of `Post` entities (because a tag can be associated with multiple posts). In EF Core 5.0 and later, many-to-many relationships can be configured without explicitly defining a join/junction entity (table).

```csharp
public class Post
{
    public int PostId { get; set; }
    public string Title { get; set; }
    public ICollection<Tag> Tags { get; set; }
}

public class Tag
{
    public string TagId { get; set; }
    public ICollection<Post> Posts { get; set; }
}

public class BlogContext : DbContext
{
    public DbSet<Post> Posts { get; set; }
    public DbSet<Tag> Tags { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Post>()
            .HasMany(p => p.Tags)
            .WithMany(p => p.Posts);
    }
}
```

In this code, the `Post` entity has a collection of `Tag` entities, and the `Tag` entity has a collection of `Post` entities. The `HasMany` and `WithMany` methods are used to configure the many-to-many relationship.

Behind the scenes, EF Core will create a join table to manage the many-to-many relationship. However, we don't need to create an entity class for this join table unless we want to add additional properties to it.

## REST APIs and RESTful web services

### What are REST APIs?

A REST API, sometimes also referred to as RESTful API, is an application programming interface (API or web API) that conforms to the contraints of REST Architectural style and rules and allows for interaction with RESTful web services. REST stands for representational state transfer. These APIs are a way for us to connect the front end of our application to our backend, since if our backend is built as an API our frontend Angular application can simply make HTTP requests to the API in order to fetch data, create user accounts, handle authentication and password checking, and everything we could need to do.

### What are the architectural constraints of a REST API?

1. **Client-server architecture:**
   An API's job is to connect two pieces of software without limiting their own functionalities, which means that the client. which makes the requests, and the server, that gives the responses, stay separate and independent. When this is done properly, the client and server can update and evolve in different directions without it having an impact on the quality of their data exchange, which is especially important when a server has plenty of clients they have to send data to, as it increases reusability.

2. **Statelessness:**
   Statelessness means that the API has to hanlde calls independently of each other. This means that each and every API call has to contain the data and commands necessary to complete the desired action. For example, for a non-stateless API perhaps only the first call made has to contain the API key or user authentication token, which is then stored server side, and following calls would depend on that first call since it provides the client's credentials. In a stateless API, each and every call will contain the API key, and the server will expect to see proof of access each time. The advantage to this is that one bad or failed call doesn't affect or derail the ones that come after it.

3. **Uniform Interface:**
   While we said the client and server can change in different ways, there still has to be some uniformity to the API so that it can still facilitate communication. Due to that, REST APIs have to use a uniform interface that can easily accomodate all connected clients or software. In most cases, that interface is based on the HTTP protocols. Besides tha fact it sets rules as to how the client and the server may interact, it als has the advantage of being widely known and used on the internet. Data is stoted and exchanged through JSON files because of their versatility.

4. **Layered System**:
   In order to keep the API easy to understand and improve scalability, RESTful architecture dictates that the design of the API is structured into layers that operate together, such as a business logic layer, a data access layer, etc. With a clear hierarchy for these layers, executing a command means that each layer does its function and then sends the data to the next layer. Connected layers can communicate with each other, but not with every component of the program.

5. **Cacheability:**
   Cacheability means that option to temporarily "cache" data or store it on the client's side, usually used for data that is repetitive or will be used a lot throughout the application. The reason this is necessary for REST APIs is that it is common for a stateless API's requests to have a large overhead, and in some cases that's unavoidable, but for repeated requests that need the same data over and over again, caching that information can make a huge difference. That way the server only has to send that data to the client once, and instead of the client making serveral difficult or costly requests, they can just use that stored version of the data when they need it. This cuts down our API requests' overhead and improves our application's performance.

6. **Code on Demand:**
   Code on Demand is a concept that essentially boils down to allowing code or applets to be sent through the API and used for the application by the clients. Unlike the previous constraints, this last one is optional, The reason is that code on demand can be a big security risk to an API, especially those used by the general public. Allowing unknown code from a shady or unverified source can have terrible consequences for our application and the security of our data, so it is best to leave this constraint for internal APIs where we have less to fear from hackers and people with bad intentions. The advantage of this feature is that it can essentially help the client implement their own features on the go, meaning it permits the whole system to be much more scalable and agile.

## Dapper

Dapper is a simple object mapper for .NET and micro-ORM in terms of speed and is virtually as fast as using a raw ADO.NET data reader.

### ADO.NET:

ADO.NET is a data access technology provided by Microsoft as part of the .NET Framework.

### Why Dapper?

- Dapper is the second fastest ORM.
- Perform CURD operations directly using IDBConnection object.
- Provide querying static and dynamic data over database.
- Get generic result for simple or complex data type.
- Dapper allow to store bulk data at once.

### How Dapper Works

- Dapper has three steps to work
- Create an IDbConnection object
- Write a query to perform CRUD operations.
- Pass query as a parameter in Execute method.

### Methods:

Dapper extends IDbConnection interface with multiple methods

- Execute
- Query
- QueryFirst
- QueryFirstOrDefault
- QuerySingle
- QuerySingleOrDefault
- QueryMultiple

### Dapper - Execute

Execute is an extension method which can be called from any object of type IDbConnection. It can execute a command one or multiple times and return the number of affected rows. This method is usually used to execute:

- Stored Procedure
- INSERT Statement
- UPDATE Statement
- DELETE Statement

```csharp
   public int Insert(Department entity)
        {

            var conn = trainingDbContext.GetDbConnection();

            return conn.Execute("Insert into Departments values (@Name,@Location)", entity);
        }
```

### Dapper - Query

The `Query` method in Dapper is used to execute a SQL query and map the results to a strongly typed list.

```csharp
  var departments = connection.Query<Department>("SELECT * FROM Departments");
```

### Configuration of Dapper in DbContect

```csharp
public class DapperDbContext
{
    private readonly string _connectionString;

    public DapperDbContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    public IDbConnection GetDbConnection()
    {
        return new SqlConnection(_connectionString);
    }
}
```

`DapperDbContext` takes a connection string as a parameter and stores it. When we need to execute a query, we can call `GetDbConnection` to get a new `SqlConnection`.

## Starting the Web API:

### Registering controllers for handling incoming HTTP requests and sending HTTP responses

In the context of a Web API, we should enable the framework to handle incoming HTTP requests, route them to the correct controller actions, bind request data to action parameters, and serialize responses. So we should add services and dependency injection for API controllers in the `Program.cs` file.

```csharp
builder.Services.AddControllers();
```

### `[Route]`:

This attribute is used to define the route template that the controller's actions will use. For example, if we have a `ProductsController` and we apply the `[Route("api/products")]` attribute to it, the actions in the controller will be available under the `/api/products` path. We can also use tokens in the route template, like `[Route("api/[controller]")]`, where `[Controller]` will be replaced with the name of the controller.

### `[ApiController]`:

This attribute is used to mark a controller as an API controller and enables certain API-specific behaviors. For example, it enables attribute routing, automatic HTTP 400 responses when model validation fails, and binding source parameter inference. It's typically used in controllers that serve HTTP API responses, as opposed to controllers that serve views in an MVC application.

```csharp
[HttpGet]
public IActionResult Index(int? page)
{
    if (page > 0)
    {
        var products = _productRepository.pagination(page.Value);
        return Ok(products);
    }
    else
    {
        var allProducts = _productRepository.GetAll();
        return Ok(allProducts);
    }
}
```

- `page` is declared as `int?`, which means it is a nullable integer. Nullable types are instances of the `Systen.Nullable<T>` struct. A nullable type can represent the normal range of values for its underlying value type, plus an additional null value.

- When we check `page.HasValue` and it's `true`, it means that page is not null and contains a valid integer value. We can then access this value using `page.value`.

- If we try to use `page` directly without checking `HasValue` or calling `Value`, we might encounter a `InvalidOperationException` if `page` is null. This is why it is a good practice to check `HasValue` before accessing `Value`.

## HTTP status code:

In ASP.NET Core Web API, we can return HTTP status code using various helper methods available in the `ControllerBase` class.

### 200 OK:

This indicates that the request has succeeded. We can return this status code using the `Ok` method. For example:
`return Ok(product)`

### 201 Created:

This indicates that the request has been fulfilled and has resulted in one or more new resources being created. You can return this status code using the `CreatedAtAction` or `CreatedAtRoute` methods.

### 204 No Content:

This indicates that the server has successfully fulfilled the request and there is no additional content to send in the response payload body. We can return this status code using the `NoContent` method. For example, `return NoContent();`.

### 400 Bad Request:

This indicates that the server could not understand the request due to invalid syntax, We can return this status code using the `BadRequest` method. For example: `return BadRequest("Invalid input");`.

### 401 Unauthorized:

This indicates that the request requires user authentication. We can return this status code using the `Unauthorized` method. For example: `return Unauthorized();`.

### 403 Forbidden:

This indicates that the server understood the request, but it is refusing to authorize it. We can return this status code using the `Forbid` method. For example: `return Forbid();`

### 404 Not Found:

This indicates that the server cab't find the requested resource. We can return this status code using the `NotFound` method. For example: `return NotFound();`

### 500 Internal Server Error:

This indicates that the server encountered an unexpected condition that prevented it from fulfilling the request. We can return this status code using the `StatusCode` method. For example, `return StatusCode(500, "Internal server error");`.

```csharp
  [HttpPost]
    public IActionResult AddProduct([FromBody]Product product)
    {
        if (product == null)
        {
            return BadRequest("Product cannot be null");
        }

        _productRepository.Add(product);
        return CreatedAtAction(nameof(GetProduct), new { id = product.ProductId }, product);
    }
```

- `[FromBody]` attribute tells the framework to get the value of the `product` parameter from the body of the HTTP request, and to attempt to deserialie it into a `Product` object.

- `if (product == null) { return BadRequest("Product cannot be null"); }` checks if the `product` parameter is null. If it is, the method returns a 400 Bad Request response with a custom error message.
- `return CreatedAtAction(nameof(GetProduct), new { id = product.ProductId }, product);` the method returns a 201 Created response. The `CreatedAtAction` method is used to generate the `Location` header of the response, which provides the URI of the newly created product. The newly created product is included in the response body.

## AutoMapper

AutoMapper is a library in .NET that simplifies the process of mapping one object to another. It can be particularly useful in a Web API project when we need to map domain models to DTOs (Data Transfer Objects).

1. Installl the AutoMapper.Extensions.Microsoft.DependencyInjection Nuget package.
2. Create our DTOs. For example:

```csharp
public class ProductDto
{
    public string ProductName { get; set; }
    public decimal ProductPrice { get; set; }
    public string ProductCategory { get; set; }
    public string ProductSeller { get; set; }
}
```

3. Create a mapping profile. This is where we define how to map our objects.

```csharp
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Product, ProductDto>();
        CreateMap<ProductDto, Product>();
    }
}
```

4. Register AutoMapper in our `Program.cs`

```csharp

builder.Services.AddAutoMapper(typeof(Program));
// other services...

```

5. Inject IMapper into our controller and use it to map our objects

```csharp
public class ProductsController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IProductRepository _productRepository;

    public ProductsController(IMapper mapper, IProductRepository productRepository)
    {
        _mapper = mapper;
        _productRepository = productRepository;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var products = _productRepository.GetAll();
        var productDtos = _mapper.Map<IEnumerable<ProductDto>>(products);
        return Ok(productDtos);
    }
}
```

In this example, AutoMapper is used to map a list of `Product` objects to a list of `ProductDto` objects. The mapping is defined in the `MappingProfile` class.

## Microservices

Microservices is an architectural style that structures an application as a collection of small autonomous services, modeled around a business domain.

In the context of .NET, microservices are typically small, independently deployable applications that communicate with each other via APIs. They can be developed, deployed, and scaled independently, which makes them a good choice for large, complex applications.

- **Autonomous**: Each microservice can be developed, deployed, updated, and scaled independently.
- **Distributed Development**: Different teams can develop different microservices using the technologies they are most comfortable with, as long as they adhere to the defined APIs for communication.
- **Isolation of Faults**: If one microservice fails, it doesn't affect the others.
- **Data Isolation**: Each microservice can have its own separate database, ensuring data consistency within the service boundary.
- **Scalability**: Individual components can be scaled independently, allowing for more efficient use of resources.

## HttpClient

### Introduction

In a microservice architecture, services often need to communicate with each other over HTTP. The `HttpClient` class in .NET Core is designed to send HTTP requests and receive HTTP responses from a resource identified by URI. It provides a modern, asynchronous, and composable API for sending HTTP requests and receiving responses.

### Create an instance of HttpClient

First, we need to create an instance of `HttpClient`. It's recommended to use `HttpClientFactory` to create `HttpClient` instances to avoid socket exhaustion that can occur when maunally creating `HttpClient` instances.

```csharp
public class MyService
{
    private readonly IHttpClientFactory _clientFactory;

    public MyService(IHttpClientFactory clientFactory)
    {
        _clientFactory = clientFactory;
    }
}
```

### Send a GET request

We can send a GET request using the `GetAsync` method. This method sends a GET request to the specified Uri and returns the response body as a string.

```csharp
public async Task<string> GetPageAsync(string url)
{
    var client = _clientFactory.CreateClient();
    var response = await client.GetAsync(url);

    if (response.IsSuccessStatusCode)
    {
        return await response.Content.ReadAsStringAsync();
    }
    else
    {
        return null;
    }
}
```

### Send a POST request

We cans send a POST request using the `PostAsync` method. This method sends a POST request to the specified Uri as an asynchronous operation.

```csharp
public async Task<string> PostDataAsync(string url, object data)
{
    var client = _clientFactory.CreateClient();
    var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
    var response = await client.PostAsync(url, content);

    if (response.IsSuccessStatusCode)
    {
        return await response.Content.ReadAsStringAsync();
    }
    else
    {
        return null;
    }
}
```

### Error handling

It is important to handle potential errors that might occur during the request. We can do this by checking the `IsSuccessStatusCode` property of the `HttpResponseMessage` object.

```csharp
public async Task<string> GetPageAsync(string url)
{
    var client = _clientFactory.CreateClient();
    var response = await client.GetAsync(url);

    if (response.IsSuccessStatusCode)
    {
        return await response.Content.ReadAsStringAsync();
    }
    else
    {
        throw new HttpRequestException($"Request to {url} failed with status code {response.StatusCode}");
    }
}
```
