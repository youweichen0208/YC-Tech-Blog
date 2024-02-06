---
icon: pen-to-square
date: 2024-01-16
category:
  - backend
tag:
  - Java
  - Spring
  - SpringMVC
  - Interview
---

# Spring MVC

## `@Controller`

- **Purpose**: Marks a class as a Spring MVC controller.
- **Usage**: Typically applied to a class that handles HTTP requests and contains methods annoted with `@RequestMapping`
- **Example**:

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MyController {

    @RequestMapping("/hello")
    public String hello() {
        return "helloPage";
    }
}
```

- **Explanation:** The `@Controller` annotation indicates that the class is a controller, and the method `@hello()` is mapped to the URL "/hello". The return value "helloPage" refers to the logical view name.

## `@ResponseBody`:

- **Purpose**
  - `@ResponseBody` is used to annotate methods in Spring MVC controllers to indicate that the return value should be treated as the response body.
- **Return Type**

  - When a method is annotated with `@ResponseBody`, the framework serializes the return type to the HTRP response body. The return type can be an object, a collection, or any other type, and Spring will convert it to the appropriate format (JSON, XML)

- **Common Use Case:**

  - It is commonly used when building RESTful web services with Spring MVC. When a method in a RESTful controller is annotated with `@ResponseBody`, the return type is serialized directly to the response body, allowing for the creation of API endpoints that produce data rather than rendering views.

- **Example**:

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MyController {

    @RequestMapping("/hello")
    @ResponseBody
    public String hello() {
        return "Hello, World!";
    }
}
```

## `@RestController`:

- **Purpose**: Combines `@Controller` and `@ResponseBody`. Primarily used for creating RESTful web services that return JSON or XML responses.
- **Usage**: Applied to a class that handles HTTP requests and contains methods annotated with `@RequestMapping`.

```java
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyRestController {

    @RequestMapping("/api/hello")
    public String hello() {
        return "Hello, REST!";
    }
}
```

-**Explanation**: The `@RestController` annotation indicates that the class is a controller for RESTFUL services. The method `hello()` returns a plain text response ("Hello, REST!").

## `@RequestMapping`

- **Purpose**: Maps HTTP requests to specific methods or classes
- **Usage**: Applied to methods or classes to specify the URL patterns they should handle.
- **Example**:

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/example")
public class MyController {

    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    public String hello() {
        return "helloPage";
    }
}
```

- **Explanation**: The `RequestMapping` annotation at the class level("/example") specifies a base URL for all methods in the class. The method-level `@RequestMapping` ("/hello") further refines the URL mapping. Additionally, the `method` attribute specifies that it handles HTTP GET requests.

## spring.mvc.view.prefix/suffix:

The configuration `spring.mvc.view.prefix` and `spring.mvc.view.suffix` in Spring MVC is used to specify where Spring MVC should look for JSP files associated with logical view names returned by controllers. If we were to use `@ResponseBody` in a controller method, it would typically indicate that the method returns the response body directly (e.g. a JSON string) rather than a logical view name. The view resolution wouldn't be involved in such cases.

```properties
spring.mvc.view.prefix=/WEB-INF/jsp/
spring.mvc.view.suffix=.jsp
```

- `spring.mvc.view.prefix=/WEB-INF/jsp/` specifies the prefix that will be added to the logical view names returned by controllers to form the actual path to the JSP files. In this case, it indicates that JSP files are located in the `/WEB-INF/jsp/` directory.
- `spring.mvc.view.suffix=.jsp`: This property specifies the suffix that will be added to the logical view names. In this case, it indicates that the view names correspond to JSP files, and their file extension is `.jsp`.

## @RequestParam

The `RequestParam` annotation in Spring MVC is used to extract values from the query parameters or form data of an HTTP request. This is commonly used when we need to retrieve data from the URL or form submissions.

```java
    @RequestMapping("/login")
    public String gotoLoginPage(@RequestParam String name, ModelMap model) {
        model.put("name", name);
        System.out.println("Request param is " + name); //not recommended for production code
        return "login";
    }
```

`ModelMap` is a class in the Spring Framework that implements the `Model` interface. It is used to pass data from a controller method to the view in a Spring MVC application.

```jsp
<html>
<head><title>Login</title>
</head>

<body>
Hello, welcome to the Login page! ${name}
</body>
</html>
```

## MVC pattern

The MVC(Model-View-Controller) pattern is a software architectural pattern used for designing and structuring applications, especially in the context of user interfaces and web applications.

1. Model:

- The Model represents the application's data and business logic.
- In the context of web applications, the Model typically interacts with a database, performs data processing, and encapsulates the application's core functionality.

2. View:

- The View is responsible for presenting the data to the user and handling user interfaces.
- Views are often the graphical user interfaces, web pages, or any other represnetation of data that users can perceive.

3. Controller:

- The Controller acts as an intermediary between the Model and the View.
- Controllers are responsible for handling user requests, managing the flow of control, and updating the Model and View as needed.

## Dispatcher Servlet and Front Controller

In a Spring MVC application, the Dispatcher Servlet is a pre-configured and acts as the front controller, which receives all incoming HTTP requests and delegates the processing to the appropriate controllers, which we define using the `@Controller` annotation.

### Dispatcher Servlet Dispatching:

- When an HTTP request is received, the Dispatcher Servlet is responsible for determining which controller should handle the request based on the URL mappings
- The Dispatcher Servlet then invokes the appropriate method in the chosen controller to process the request
- The result of the controller method (a logical view or a response) is returned to the Dispatcher Servlet.

In summary, controllers marked with `@Controller` are indeed the sub-controllers that handle specific requests. The Dispatcher Servlet is the central controller that takes the overall request-handling process, determining which controller should handle a particular request and coordinating the flow of request through the application.

## Session vs Request Scopes:

- All requests from browser are handled by our web application deployed on a server

- **Request Scope**: Active for a single request **ONLY**
  - Once the response is sent back, the request attributes will be removed from memory
  - These cannot be used for future requests
  - Recommended for most use cases
- **Session Scope**: Details stored across multiple requests
  - Be careful about what we store in session (Takes additional memory as all details stored on server)

## SessionAttributes

`@SessionAttributes` is a Spring MVC annotation used to declare session-level attributes in a controller. It allows us to specify model attributes that should be stored in the HTTP session between multiple requests. The specified attribures are not only stored in the session but are also implicitly added to the model. This means we can access these attributes throug the `Model`, `ModelMap`, or `ModelAndView` in our controller methods.

## Model in the MVC controller

In Spring MVC, the "Model" refers to the component responsible for representing the application's data and business logic. The `Model` interface in Spring MVC provides a way for a controller to pass data to the view. It allows the controller to add attributes (key-value pairs) thay will be exposed to the view for rendering. The view(e.g. jsp files)can then access and display this data.

### Passing Data to the View:

```java
@Controller
public class MyController {

    @RequestMapping("/example")
    public String handleRequest(Model model) {
        // Add attributes to the model
        model.addAttribute("message", "Hello, World!");

        // Return the view name
        return "examplePage";
    }
}

```

### Accessing Data in the View:

```jsp
<div>${message}</div>
```

## The difference between using the `Model` in Spring MVC and using `@ResponseBody`

1. Using `Model`:

- Rendering Views: if our controller method is responsible for rendering a view (HTML, JSP, Thymeleaf, etc) and we need to pass data to that view, using `Model` is a natural choice.

2. Using `@ResponseBody`:

- RESTful Endpoints: If our controller is primarily serving as a RESTful endpoint and we want to return data directly without rendering an HTML view, then using `@ResponseBody` is a suitable choice.
- AJAX Requests: When handling AJAX requests and we need to send data back to the client as part of the response body, using `@ResponseBody` simplifies the process.

```java
@RestController
public class MyRestController {

    @GetMapping("/api/example")
    public ResponseEntity<String> handleApiRequest() {
        String message = "Hello, World!";
        return ResponseEntity.ok(message);
    }
}
```

## What is the difference between @RequestMapping and @GetMapping?

In summary, while `@RequestMapping` is a more general-purpose annotation that can handle multiple HTTP methods and can be used at both class and method levels, `@GetMapping` is a specialized annotation specifically designed for handling HTTP GET requests. Using `@GetMapping` can make our code more concise and easier to understand when we are specifically dealing with GET requests.

## What is @PathVariable

The `@PathVariable` annotation in Spring MVC is used to extract values from the URI template and bind them to method parameters. It allows us to capture values from the URI and use them in our controller methods.

```java
@Controller
@RequestMapping("/example")
public class ExampleController {

    @GetMapping("/greet/{name}")
    public String greetUser(@PathVariable String name) {
        // The value of {name} from the URI will be bound to the 'name' parameter
        return "Hello, " + name + "!";
    }
}
```

Key points about `@PathVariable`:

1. Annotation Usage:

- `@PathVariable` is used as a method parameter annotation in the controller methods.

2. Variable Binding:

- It binds the value of a URI template variable (e.g. `{name}` in the example) to a method parameter.

3. Specifying URI Template Variables:

- We can use the `value` attribute of `@PathVariable` to explicitly specify the name of the URI template variable.

```java
@GetMapping("/user/{userId}")
public String getUserById(@PathVariable(value = "userId") Long id) {
    // ...
}

```

4. Optional Variables:

- we can make path variables optional by specifying the `required` attribute.

```java
@GetMapping("/user/{userId}")
public String getUserById(@PathVariable(name = "userId", required = false) Long id) {
    // ...
}
```

## What is DAO?

DAO stands for "Data Access Object". A DAO is a design pattern that provides an abstract interface to some type of database or other persistence mechanism. **It separates the business logic of an application from the details of how data is accessed and manipulated.**

## Service:

- In the context of web services, a service is a broader term referring to a component or module that provides specific functionality. A service can include business logic, coordination of multiple operations, and interaction with various components, including DAOs.

Example of a simple service using DAO:

```java
@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    public User getUserById(Long id) {
        return userDao.findById(id);
    }

    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    public void saveUser(User user) {
        userDao.save(user);
    }

    // Other business logic...
}
```

- **JPA(Java Persistence API) is not a DAO itself; instead, JPA is a technology or specification that can be used to implement Data Access Objects (DAOs) in Java applications.**

## @RequestBody

The `@RequestBody` annotation in Spring is used to indicate that a method parameter should be bound to the body of the HTTP request. When a method parameter is annotated with `@RequestBody`, Spring will automatically deserialize the content of the request body into the corresponding Java object.

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        // Process the user object received in the request body
        // (Assuming User is a class representing user data)

        // Return a response, e.g., a success message
        return ResponseEntity.ok("User created successfully");
    }
}
```

In this example, the `createUser` method receives a `User` object as a parameter, and the `@RequestBody` annotation instructs Spring to deserialize the JSON or XML content from the request body into a `User` object.

Key points about `@RequestBody`:

1. Annotation Usage:

- `@RequestBody` is used as a method parameyer annotation in Spring MVC controllers.

2. Data Binding:

- It binds the content of the HTTP request body to a method parameter

3. Supported Content Types:

- `@RequestBody` supports a variety of content types, including JSON, XML, form data, and more. The appropriate message converter is chosen based on the `Content-Type` header of the request.

4. Deserialization:

- Spring uses the configured message converters to deserialize the request body content into the specific parameter type.

## ResponseEntity

`ResponseEntity` is a class in Spring Framework that represents the entire HTTP response, including the status code, headers, and body. It is commonly used in Spring MVC controllers to customize the response sent back to the client. `ResponseEntity` provides a flexible and expressive way to build and customize HTTP responses.

## URI Location

`URI Location` is a variable that represents a Uniform Resource Identifier (URI) pointing to the newly created resource. In this specific scenario, the URI is constructed for the recently saved user.

```java
    @PostMapping("/users")
    public ResponseEntity<Object> createUser(@RequestBody User user){
        User savedUser = service.save(user);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedUser.getId()).toUri();
        // location - /users/4
        return ResponseEntity.created(location).build();
    }
```

1. ` URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedUser.getId()).toUri();`:

- This line constructs a URI for the newly created resource(`savedUser`). It uses the `ServletUriComponentBuilder` to get the current request's URI, appends "/{id}" to it (where `{id}` is a path variable for the user's ID), and then expands it with the actual ID of the saved user.

2. `return ResponseEntity.created(location).build();`:

- This method returns a `ResponseEntity` with a status of 201 Created.
- The `location` header of the response is set to the URI of the newly created resource, indicating where the client can find the resource.
- The `build()` method finalizes the `@ResponseEntity` and completes the response.

This aligns with RESTFUL API principles, making it clear to the client where the newly created resource can be located.

## Implement Generic Exception Handling:

### @ControllerAdvice

`@ControllerAdvice` is an annotation in the Spring Framework that allow us to define global advice or exception handlers that apply to all controllers or a subset of controllers. It is commonly used to centralize exception handling and other cross-cutting concerns in a Spring MVC application.

### ResponseEntityExceptionHandler

- `@ResponseEntityExceptionHandler` is a base class provided by the Spring Framework that is intended for global exception handling in a Spring MVC application.
- When we create a class that extends `ResponseEntityExceptionHandler`, we can override its methods to handle specific exceptions and return custom `@ResponseEntity` instances. This is commonly used for responding to exceptions with specific HTTP status codes, headers, and bodies.

Let's take a look at the example code:

```java
@ControllerAdvice
public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ErrorDetails> handleAllException(Exception ex, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(LocalDateTime.now(), ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<ErrorDetails>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public final ResponseEntity<ErrorDetails> handleUserNotFoundException(Exception ex, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(LocalDateTime.now(), ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<ErrorDetails>(errorDetails, HttpStatus.NOT_FOUND);
    }
}
```

- `@ExceptionHandler(Exception.class)`: This annotation on the `handleAllException` method specifies that this method will handle exceptions of type `Exception`. In other words, it is a generic exception handler for any unhandled exception in our application.
- `public final ResponseEntity<ErrorDetails> handleAllException(Exception ex, WebRequest request)`: This method takes an exception (`Exception` class) and a `WebRequest` as parameters. It creates an `ErrorDetails` object containing the current timestamp, the exception message, and a description of the request.
- `@ExceptionHandler(UserNotFoundException.class)`:
  This annotation on the `handleUserNotFoundException` method specifically handles exceptions of type `UserNotFoundException`. This allows for more specific handling for this particular exception.

## Validations for Rest API

### JSR-303 Bean Validation(Annotations):

Spring supports the Bean Validation standard through annotations. We can annotate our model classes with validation constraints.

```java
public class UserDTO {
    @NotBlank
    @Size(min = 5, max = 50)
    private String username;

    @Email
    private String email;

    // Other fields and methods
}
```

In this example, `@NotBlank` ensures that the `username` is not empty, and `@Email` ensures that the `email` is a valid email address.

## REST API Documentation

In Spring Boot, we can use Swagger for documenting our RESTFUL APIs. Swagger provides a set of tools for generating API documentation from our Spring-based application. Starting our Spring Application. Swagger UI should now be accessible at `http://localhost:8080/swagger-ui/index.html`. We can explore our API documentation, test endpoints, and see example requests and responses.
