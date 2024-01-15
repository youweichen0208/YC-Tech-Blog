---
icon: pen-to-square
date: 2024-01-11
category:
  - backend
tag:
  - Java
  - Spring
  - Interview

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

## What is the difference between BeanFactory and ApplicationContext

BeanFactory is the **basic container** whereas Application Context is the **advanced container**. ApplicationContext extends the BeanFactory interface.

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

## Spring Bean Lifecycle

1. **Instantiation:**

   - The container creates an instance of the bean. This can be done using a default constructor or a custom factory method.

2. **Populating Properties (Dependency Injection):**

   - The container injects the values for the properties and collaborators of the bean. This is often done using setter injection, constructor injection, or field injection.

3. **Bean Post-Processing (Initialization Callbacks):**

   - Before and after the initialization of the bean, the container allows for custom processing through `BeanPostProcessor` interfaces. Methods like `postProcessBeforeInitialization` and `postProcessAfterInitialization` can be implemented to perform custom initialization.

4. **Initialization (InitializingBean and @PostConstruct):**

   - If the bean implements the `InitializingBean` interface, the `afterPropertiesSet` method is called. Alternatively, if the bean has methods annotated with `@PostConstruct`, they are executed.

5. **Bean Ready for Use:**

   - At this point, the bean is fully initialized and ready for use by other beans or components in the application.

6. **Bean Destruction (DisposableBean and @PreDestroy):**

   - If the bean implements the `DisposableBean` interface, the `destroy` method is called during the destruction phase. Additionally, methods annotated with `@PreDestroy` are executed.

7. **Custom Destruction (Destruction Callbacks):**
   - Similar to the initialization phase, custom processing can be done before and after the destruction of the bean through `BeanPostProcessor` interfaces. Methods like `postProcessBeforeDestruction` can be implemented for this purpose.

It's important to note that not all beans go through every phase. For example, beans with a scope of "prototype" may not go through the destruction phase since they are not managed by the container after creation.

Developers can influence the bean life cycle by implementing certain interfaces or using annotations to define initialization and destruction methods. Additionally, they can leverage `BeanPostProcessor` implementations for custom processing during the life cycle phases. Understanding the bean life cycle is crucial for effective configuration and management of beans in a Spring application.

## Dependency Injection

The main idea in Dependency Injection is that we don't have to create our objects but we just have to describe how they should be created.

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
- Doesn't override the setter property
- create new instance if any modication occurs.

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
- doesn't create new instance if we change the property value.
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

## Explain the difference between constructor and setter injection:

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

### the autowiring modes are given below:

1. **no**: this is the default mode, it means autowiring is not enabled. If we don't use any autowiring annotations(`@Autowired`, `@Inject`), this mode is in effect.
2. **byName:** this can be replaced by using `@Autowired` along with `@Qualifier`. `@Qualifier` allows us to specify the name of the bean that should be wired.

```java
@Autowired
@Qualifier("beanName")
private MyBean myBean;
```

3. **byType**: this can be replaced by using `@Autowired` or `Inject`. These annotations tell Spring to autowire by type.

4. **constructor**: This can be replaced by using `@Autowired` or `@Inject` on the constructor. This tells Spring to autowire the constructor arguments.

```java
@Autowired
public MyClass(MyBean myBean) {
    this.myBean = myBean;
}
```

## Component vs @Bean

- **Scope and Location**:
  - `@Bean` is used at the method level within `@Configuration` classes, allowing for fine-grained control over individual bean definitions.
  - `@Component` is used at the class level and is part of the broader component scanning mechanism for automatic bean registration.
- **Customization**:

  - With `@Bean`, we have more control over the creation and configuration of the bean instance we define a method to create the bean.
  - `@Component` relies on default behaviors for bean creation, but we can still customize the bean by using other annotations like `@Autowired`, `@Value`, etc.

- **Configuration Class**:

  - `@Bean` is often used within `@Configuration` classes, which are specifically designated for configuration in Spring.
  - `@Component` is used directly on classes, and the component scanning mechanism automatically detects and registers these classes as beans.

- **Usage Scenario:**
  - Use `@Bean` when we want to define beans explicitly within a `@Configuration` class, especially when we need custom configuration or instantiation logic.
  - Use `@Component` when we want Spring to automatically discover and register a class as a bean based on component scanning.

## Lazy Initialization of Spring Beans:

Lazy Initialization of Spring beans refer to the concept of delaying the creation of a bean until it is actually requested. By default, Spring initializes beans eagerly during the application context startup. However, in some scenarios, we might want to postpone the creation of certain beans until they are needed, which can be more resource-efficient.

### Lazy Initialization of individual Beans:

```java
@Configuration
public class AppConfig {

    @Lazy
    @Bean
    public MyBean myLazyBean() {
        return new MyBean();
    }
}
```

### Lazy Initialization of Components Scanned Beans:

```java
@Component
@Lazy
public class MyLazyComponent {
    // Class definition and logic
}
```

| Heading                                          | Lazy Initialization                                              | Eager Initialization                             |
| ------------------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------ |
| Initialization time                              | Bean initialized when it is first made use of in the application | Bean initialized at startup of the application   |
| Default                                          | Not Default                                                      | Default                                          |
| Code Snippet                                     | @Lazy or @Lazy(value = true)                                     | @Lazy(value = false) or (absence of @Lazy)       |
| What happens if there are errors in initializing | Errors will result in runtime exceptions                         | Errors will prevent application from starting up |
| Usage                                            | Rarely used                                                      | Very frequently used                             |
| Memory Consumption                               | Less (until bean is initialized)                                 | All beans are intialized at startup              |
| Recommended Scenario                             | Beans very rarely used in our app                                | Most of our beans                                |

## Spring Bean Scopes:

Spring Framework supports several bean scopes which determine the lifecyle and the instances of the beans.

- **Singleton(default):** Only one instance of the bean is created for each Spring IoC container. This single instance is stored in a cache of such singleton beans, and all subsequent requests and references for that named bean return the cached object.
- **Prototype:** A new instance is created each time a bean is requested.
- **Request:** A single instance is created for each HTTP request. This scope is only valid in the context of a web-aware Spring `ApplicationContext`.
- **Session:** A single instance is created for each HTTP session. This scope is also only valid in the context of a web-aware Spring `ApplicationContext`.
- **Application:** A single instance is created for the lifecycle of a Servlet `ServletContext`. This scope is also only valid in the context of a web-aware Spring `ApplicationContext`.
- **Websocket:** A single instance is created for the lifecyle of a `WebSocket`. This is only available in a web-aware Spring `ApplicationContext`.

We can specify the scope of a bean using the `@Scope` annotation in our bean definition

```java
@Component
@Scope("prototype")
public class MyPrototypeBean {
    // ...
}
```

## Prototype VS Singleton Bean Scope

```java
@Component
public class MySingletonBean {
    // ...
}

@Component
@Scope("prototype")
public class MyPrototypeBean {
    // ...
}
```

In this example, `MySingletonBean` is a Singleton bean, and only one instance of `MySingletonBean` will be created per Spring IoC container. `MyPrototypeBean` is a Prototype bean, and a new instance of `MyPrototypeBean` will be created each time it is requested from the container.

## Evolution of Jakarta EE, J2EE, JavaEE

- Enterprise capabilities were initially built into JDK
- With time, they were separated out:
  - **J2EE** - Java 2 Platform Enterprise Edition
  - **Java EE** - Java Platform Enterprise Edition
  - **Jakarta EE** (Oracle gave Java EE rights to the Eclipse Foundation)
    - **Important Specifications**
      - Jakarta Server Pages (JSP)
      - Jakarta Contexts and Dependency Injection (CDI)
    - Supported by Spring 6 and Spring Boot 3

## Jakarta Contexts & Dependency Injection (CDI)

- Spring Framework V1 was released in 2004
- **CDI specification** introduced into Java EE 6 platform in December 2009.
- Now called **Jakarta Contexts and Dependency Injection (CDI)**
- CDI is a **specification (interface)**
  - Spring Framework **implements** CDI
- **Important** Inject API Annotations:
  - Inject (~Autowired in Spring)
  - Named (~Component in Spring)
  - Qualifier
  - Scope
  - Singleton

## XML Configuration in Spring

In Spring, XML configurations are one of the traditional ways to configure the Spring IoC container. XML configuration files define the strucuture of the application context, including the beans and their relationships.

### Defining Beans:

#### a. Singleton Bean:

```xml
<!-- Definition of a singleton-scoped bean -->
<bean id="mySingletonBean" class="com.example.MySingletonBean"/>
```

#### b. Prototype Bean:

```xml
<!-- Definition of a prototype-scoped bean -->
<bean id="myPrototypeBean" class="com.example.MyPrototypeBean" scope="prototype"/>

```

#### c. Dependency Injection:

```xml
<!-- Dependency injection using constructor-arg -->
<bean id="myBean" class="com.example.MyBean">
    <constructor-arg ref="anotherBean"/>
</bean>

<!-- Dependency injection using property -->
<bean id="anotherBean" class="com.example.AnotherBean"/>
<bean id="myBean" class="com.example.MyBean">
    <property name="dependency" ref="anotherBean"/>
</bean>
```

## Spring Stereotype Annotations

Spring Stereotype Annotations help Spring in identifying and configuring the beans in the application context. Stereotype annotations are part of the Spring component scanning mechanism, which automatically detects and registers beans during the application startup.

### **@Component**

- Spring automatically detects and registers beans annotated with `@Component` during component scanning.
- Example:

```java
@Component
public class MyComponent {
    // Class definition and logic
}
```

### **@Controller**

- typically used in a Spring MVC web application
- similar to `@Component` but specialized for controllers.
- Example:

```java
@Controller
public class MyController {
    // Controller logic
}
```

### **@Service**:

- Used to indicate that a class provides some business logic or service.
- similar to `@Component`, but it indicates that it's a service layer bean.
- Example:

```java
@Service
public class MyService {
    // Service logic
}
```

### **@Repository:**

- Used to indicate that a class is a Data Access Object (DAO) and should be responsible for encapsulating the interaction with a database.
- Similar to `@Component`, but indicates that it's a repository layer bean.
- Example:

```java
@Repository
public class MyRepository {
    // Data access logic
}
```

### **@Configuration:**

- Used in conjunction with `@Bean` methods to define beans and their configurations
- Example:

```java
@Configuration
public class AppConfig {
    // Configuration methods with @Bean annotations
}
```

### **@RestController**:

- Combines `@Controller` and `@ResponseBody`
- Used in Spring MVC to create RESTful web services.
- Similar to `@Controller`, but automatically includes `@ResponseBody` for every method.

```java
@RestController
public class MyRestController {
    // RESTful service logic
}
```

These annotations help Spring to identify different types of beans and manage their lifecyle within the application context. When the component scanning is enabled, Spring will automatically detect classes annotated with these stereotypes and register them as beans during the application startup.
