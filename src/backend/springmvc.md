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
