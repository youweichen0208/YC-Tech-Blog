---
icon: pen-to-square
date: 2024-01-11
category:
  - backend
tag:
  - Java
  - Spring

star: true
sticky: true
---

# Spring framework

## What is Spring Framework?

Spring is a powerful open-source, loosely coupled, lightweight, Java framework meant for reducing the complexity of developing enterprise-level applications.

## What is Spring Container?

![Spring Container](/assets/images/spring-container.png)

The JVM is responsible for low-level concerns such as memory management, garbage collection, and providing a runtime environment for Java code to execute. The Spring container, on the other hand, provides a high level, application-focused environment for managing Java objects (known as beans in Spring terminology). It handles the instantiation, configuration, and wiring together of these beans. It also manages their lifecyle, and can inject dependencies. So while the Spring container does a "better job" than the JVM in certain areas, it's important to note that they operate at different levels and have different responsibilities. The Spring container builds upon the capabilities provided by the JVM to offer a more feature-rich environment for building complex enterprise applications.

- **Spring Container:** Manages Spring beans & their lifecycle.
- **Bean Factory:** Basic Spring Container
- **Application Context:** Advanced Spring Container with enterprise-specific features:
  - Easy to use in web applications
  - Easy internationalization
  - Easy integration with Spring AOP
- **Which one to use?:** Most enterprise applications use ApplicationContext
  - Recommended for web applications, web services - REST API and microservices.

## How to create the Spring container in Java?

Creating a Spring container involves creating an instance of `ApplicationContext`, which is the central interface in Spring's IoC container. It provides a way to manage and access beans.

For example:

```java
var context = new AnnotationConfigApplicationContext(HelloWorldConfiguration.class)
```

In this example, `HelloWorldConfiguration` is a Java class annotated with **@Configuration** that defines our beans and their dependencies.

## define Spring Configuration class

A Spring configuration class is needed to define and configure the beans (objects) that make up our application. It is essentially a blueprint for our spring application.

## Annotations we used in the Configuration class:

### `@Bean`: The `@Bean` annotation is a method-level annotation within a class that is annotated with `@Configuration`. The `@Bean` annotation tells Spring that the return value of the method should be registered as a bean within the Spring's ApplicationContext. The method name itself is default used as the bean ID. However, we can override this by providing a name attribute to the `@Bean` annotation. The value we provide for `name` will be used as the bean's ID in the Spring ApplicationContext.

```java
@Configuration
public class AppConfig {

    @Bean
    public DataSource dataSource() {
        // Create and return a DataSource
        return new DataSource("jdbc:mysql://localhost:3306/mydb", "user", "password");
    }

    @Bean
    public MyBean myBean(DataSource dataSource) {
        // Use the DataSource bean
        return new MyBean(dataSource);
    }

    @Bean(name = "stringBean")
    public String stringBean() {
        // Return a String
        return "Hello, World!";
    }

    @Bean
    public List<String> listBean() {
        // Return a List
        return Arrays.asList("A", "B", "C");
    }
}
```

- The `dataSource()` method is a `@Bean` that creates and returns a `DateSource`. This could be a connection to a database.
- The `myBean()` method is a `@Bean` that takes a `DataSource` as a parameter. This `DataSource` is another bean that Spring will automatically inject.
- The `stringBean()` method is a `@Bean` that returns a `String`. The `name` attribute is used to give the bean a custom name and id.
- The `listBean()` method is a @Bean that returns a `List<String>`. This demonstrates that beans can be any type, not just custom classes.

### `@Primary`: The `@Primary` annotation in Spring is used to give higher preference to a bean where they are multiple beans of the same type. This is particularly useful when we are autowiring beans by type, and there are multiple beans of that type to choose from.

### `@Qualifier`: The `@Qualifier` annotation in Spring is used tp resolve ambiguity where they are multiple beans of the same type and we want to wire only one of them with a property.

### `@Qualifier` has higher priority than @Primary

## How to retrieve beans from the Spring Application Context by its name or ID?

To get a bean object in the main method of a Spring application, we can use the `ApplicationContext.getBean()` method.

```java
var context = new AnnotationConfigApplicationContext(HelloWorldConfiguration.class);
context.getBean("name");
context.getBean(Person.class);
```

## Exploring Java Bean vs POJO vs Spring Bean

- **Java Bean:** Classes adhering to 3 constraints:

  1. Have public default(no argument) constructors
  2. Allow access to their properties using getter and setter methods
  3. Implement java.io.Serializable

- **POJO**: Plain Old Java Object

  - No constraints
  - Any Java objects is a POJO!

- **Spring Bean:** Any Java object that is managed by Spring
  - Spring uses IOC Container (Bean Factory or ApplicationContext) to manage these objects.

## Dependency Injection

In Spring framework, Dependency Injection (DI) is a design pattenr and a fundamental concept that deals with how components get their dependencies. The primary purpose of DI is to achieve loose coupling between classes and promote easier testing and maintainability.

For example, imagine we have a toy car. This toy car needs batteries to work. Now instead of putting the batteries inside the car ourselves, we have a friendly robot assistant who puts the batteries in for us. In the world of programming, the toy car is like our program or application, and the batteries are like the things our program need to work (we call them dependencies). Dependency Injection(DI) is like having that helpful robot(DI container) automatically provide and connect these necessary things for our program.

### 1. Constructor-Based Dependency Injection:

```java
public class MyClass {
    private final MyDependency dependency;
    public MyClass(MyDependency dependency) {
        this.dependency = dependency;
    }
    // rest of the class...
}
```

- We don't need to use `@Autowired` directly on the constructor and on setter methods. Instead, Spring automatically recognizes constructors with parameters and injects the dependencies based on the types of parameters.
- **Pros:**
  - Promotes immutability
  - Ensures that the object is fully initialized before use.
  - Well-suited for mandatory dependencies
  - always recommended

## 2. Setter-Based Dependency Injection:

```java
public class MyClass {
    private MyDependency dependency;

    public void setDependency(MyDependency dependency) {
        this.dependency = dependency;
    }

    // rest of the class...
}
```

- Dependencies are injected through setter methods
- **Pros**:
  - Provides flexibility as dependencies can be changed after object creation
  - Useful when we have optional dependencies.

## 3. Field-Based Dependency Injection:

```java
import org.springframework.beans.factory.annotation.Autowired;

public class MyClass {
    @Autowired
    private MyDependency dependency;

    // rest of the class...
}

```

- Dependencies are injected directly into fields of a class, often using annotations like `@Autowired`.
- **Pros**:
  - Concise and requires less boilerplate code.
  - Suitable for cases where we don't need to enforce encapsulation for the dependency.
- **Cons**:
  - Can make testing more challenging.
  - May violate encapsulation principles if used for mandatory dependencies.

Using `@Autowired` is a way to inform Spring's IoC container about the dependencies that need to be injected. It's more commonly associated with field injection, but for constructor and setter injection, Spring infers the injection points based on the method signatures.

## @Component:

`@Component` is a stereotype annotation used to indicate that a class is a Spring component. Components are Java objects managed by the Spring IoC container. They are typically represent and manage the various parts of our application, such as services, controllers, repositories, etc.

```java
import org.springframework.stereotype.Component;

@Component
public class MyComponent {
    // class implementation...
}
```

- By annotating a class with `@Component`, we are telling Spring to automatically detect and register this class as an bean in the application context.

## @ComponentScan:

`@ComponentScan` is used at the class level to enable component scanning in Spring. It tells Spring where to look for components (classes annotated with `@Component`, `@Service`, `@Reposotpru`, etc.) in our project.

```java
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "com.example")
public class AppConfig {
    // configuration class...
}
```

- In the example above, `@ComponentScan` is used in a configuration class (`@Configuration`). The `basePackages` attribute specifies the base package where Spring should look for components.
- Spring will scan the specified package and its sub-packages, identifying classes annotated with `@Component` (or related annotations) and registering them as beans in the application context.
- `@ComponentScan` is often used in conjunction with `@Configuration` to define the configuration for the Spring application context.
  - `@ComponentScan` allows us to specify the base package(s) where Spring should scan for components, and it automatically registers those components as beans in the context.
  - `@Configuration` allows us to define additional beans, configure aspects of the container, and manage other settings.
  - Tother, they provide a powerful mechanism for setting up a Spring application context without the need for extensive manual bean registration.

## Autowiring:

Autowiring is a feature in the Spring framework that allows the Spring IoC(Inversion of Control) container to automatically inject dependencies into a Spring bean. Instead of manually specifying the dependencies or using explicit injection methods, autowiring lets Spring handle the wiring of beans automatically.
