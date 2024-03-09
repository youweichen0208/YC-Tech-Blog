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
