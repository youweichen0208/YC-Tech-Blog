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
