---
icon: pen-to-square
date: 2024-01-15
category:
  - backend
tag:
  - Java
  - Spring
  - SpringBoot
  - Interview

star: true
sticky: true
---

# SpringBoot

## What is SpringBoot?

SpringBoot is an open-source framework within the larger Spring ecosystem designed to simplify the development, configuration, and deployment of production-ready applications based on the Spring Framework. It provides a set of conventions, defaults, and tools to accelerate the development process and reduce boilerplate code.

## World before SpringBoot

### Dependency Management

### web.xml

### Spring Configuration

### Non Functional Requirements(NFRs)

- Setting up Spring Projects before SpringBoot was NOT easy.
  - Dependency Management (pom.xml)
  - Define Web App Configuration (web.xml)
  - Manage Spring Beans (context.xml)
  - Implements Non Functional Requirements (NFRs).
- AND repeat this for every project
- Typically takes a few days to set up for each project (and countless hours to maintain).

## What's the Most Important Goal of Spring Boot?

### Before Spring Boot:

- Developers had to manually manage dependencies in the project's build configuration(e.g. Maven or Gradle)
- Specifying the version numbers of each library and ensuring compatibility was a manual process.
- Dependencies for Spring modules, third-party libraries, and other components had to be explicitly listed.

### Example of Maven Configuration **Without** Spring Boot:

```xml
<!-- pom.xml -->

<dependencies>
    <!-- Spring Core -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.3.9</version>
    </dependency>

    <!-- Spring Web -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-web</artifactId>
        <version>5.3.9</version>
    </dependency>

    <!-- Other dependencies... -->
</dependencies>

```

### Example of Maven Configuration **After** Spring Boot:

```xml
<!-- pom.xml -->

<dependencies>
    <!-- Spring Boot Starter for Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- Other starters or custom dependencies... -->
</dependencies>

```

### Example of web.xml for Servlet Configuration **Without** Spring Boot:

```xml
<!-- web.xml -->

<web-app>
    <servlet>
        <servlet-name>myServlet</servlet-name>
        <servlet-class>com.example.MyServlet</servlet-class>
    </servlet>

    <servlet-mapping>
        <servlet-name>myServlet</servlet-name>
        <url-pattern>/myservlet</url-pattern>
    </servlet-mapping>

    <!-- Other servlet and filter configurations... -->
</web-app>

```

### Example of **Spring Boot Servlet Configuration**

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MySpringBootApplication {

    public static void main(String[] args) {
        SpringApplication.run(MySpringBootApplication.class, args);
    }

    @Bean
    public ServletRegistrationBean<MyServlet> myServlet() {
        return new ServletRegistrationBean<>(new MyServlet(), "/myservlet");
    }
}
```

With Spring Boot, traditional XML based servlet configurations in `web.xml` are often replaced by annotations and Java-based configurations. In this example, `@SpringBootApplication` indicates that this class is the main entry point of the Spring Boot application. It also implicitly enables component scanning and auto-configuration.

### Example of Non-Functional Requirements:

#### Before Spring Boot:

- Meeting non-functional requirements, such as security, logging, and monitoring, required manual configuration.
- Developers had to integrate third-party libraries and tools to fultill these requirements.
- Setting up production-ready features was often a manual and error-prone process.

```xml
<!-- Security Configuration Before Spring Boot -->

<beans:beans xmlns="http://www.springframework.org/schema/security"
             xmlns:beans="http://www.springframework.org/schema/beans"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://www.springframework.org/schema/security
                                 http://www.springframework.org/schema/security/spring-security.xsd
                                 http://www.springframework.org/schema/beans
                                 http://www.springframework.org/schema/beans/spring-beans.xsd">

    <http>
        <intercept-url pattern="/secure/**" access="ROLE_USER" />
        <!-- Other security configurations... -->
    </http>

    <authentication-manager>
        <authentication-provider>
            <user-service>
                <user name="user" password="password" authorities="ROLE_USER" />
            </user-service>
        </authentication-provider>
    </authentication-manager>
</beans:beans>

```

#### With Spring Boot Security Configuration:

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public UserDetailsService userDetailsService() {
        return new InMemoryUserDetailsManager(
            User.withDefaultPasswordEncoder()
                .username("user")
                .password("password")
                .roles("USER")
                .build()
        );
    }
}

```

With Spring Boot, configuring non-functional requirements like security is significantly streamlined.

SpringBoot can help us build **PRODUCTION READY** apps **QUICKLY**

- Build **Quickly**
  - Spring Initializer
  - Spring Boot Starter Project
  - Spring Boot Auto Configuration
  - Spring Boot DevTools
- Be **Production Ready**
  - Logging
  - Different Configuration for Different Environments.
    - Profiles, ConfigurationProperties
    - Monitoring (Spring Boot Actuator)
  - Simplify deployment with Spring Boot embedded servers.

## Exploring Spring Boot Starter Project:

- I need a lot of frameworks to build application features:

  - **Build a REST API**: I need Spring, SpringMVC, Tomcat, JSON conversion...
  - **Write Unit Tests**: I need Spring Test, JUnit, Mockito

- How can I group them and make it easy to build applications?
  - **Starters:** Convenient **dependency descriptors** for diff.features.
- **Spring Boot** provides variety of starter projects:
  - **Web Application & REST API** - Spring Boot Starter Web (SpringMVC, Spring-web, Spring-boot-starter-tomcat, Spring-boot-starter-json)
  - **Unit Tests** - Spring Boot Starter Test
  - **Talk to database using JPA** - Spring Boot Starter Data JPA
  - **Talk to database using JDBC** - Spring Boot Starter JDBC
  - **Secure our web application or REST API** - Spring Boot Starter Security
- (REMEMBER) **Starters:** Define all application dependencies
- Advantages:
  - streamlined development
  - easier upgrades
  - reduced configuration errors
  - enhance productivity
  - ecosystem integration

## Simplify Deployment with Spring Boot Embedded Servers:

### Old Approach:

1. Install Java
2. Install Web/Application Server
3. Deploy the application WAR (WEB Archive)
   - complex to setup

### **Embedded Server** - Simpler alternative

1. Install Java
2. Run JAR file

## Spring Boot Auto Configuration

Spring Boot autoconfiguration is a feature that simplifies the configuration of Spring applications by automatically configuring beans based on the project's dependencies and the environment. It aims to reduce the amount of boilerplate code developers need to write when setting up a Spring application.

When we include the necessary dependencies in our project's configuration (`pom.xml` file for Maven or `build.gradle` for Gradle) and provide relevant configuration values in `application.properties` or `application.yml`, Spring Boot's autoconfiguration takes care of the rest.

1. **Include Dependencies**"
   - Add the required Spring Boot starter dependencies to our project configuration. These starters contain pre-packaged configurations for common tasks, such as data access, web development, and more.
2. **Define Configuration Properties**
   - Set configuration properties in `application.properties` or `application.yml` to customize the behavior of our application. For example, we might define database connection details, server ports, or other settings.
3. **Let Spring Boot Autoconfigure:**
   - With the dependencies and configuration properties in place, Spring Boot's autoconfiguration kicks in. It automatically configures beans, components, and other settings based on conventions and the provided configuration.
4. **Focus on Business Logic**:
   - As a developer, we can focus more on writing business logic and application features. Spring Boot handles the boilerplate configuration and setup, allowing us to build on top of a solid foundation.

## Understanding the Glue - @SpringBootApplication

The `@SpringBootApplication` is a composite annotation that includes several other annotations, such as `@Configuration`, `@EnableAutoConfiguration`, and `@ComponentScan`. This combination helps reduce boilerplate code and simplifies the configuration of a Spring application.

## Monitor Applications using Spring Boot Actuator

Spring Boot Actuator is a set of production-ready features that help us monitor and manage our Spring Boot application. It provides various endpoints that expose information about our application's health, metrics, environment, and more.

### 1. Add Actuator Dependency:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

### 2. Configure Actuator Endpoints:

We can customize which endpoints to enable and configure them in our `application.properties` or `application.yml`. For example, to enable all endpoints, add the following to our configuration:

```properties
management.endpoints.web.exposure.include=*
```

### 3. Run our Application

url: http://localhost/actuator

## Logger

In Spring Boot, a `Logger` is an interface provided by the SLF4j logging framework. It is used for logging messages at various levels of severity, such as debug, info, warn, and error.

### Logger Initialization:

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MyClass {
    private Logger logger = LoggerFactory.getLogger(MyClass.class);

    // ...
}
```

In a class, we typically declare a private `Logger` instance using the LoggerFactory

### Logging Levels:

```java
logger.debug("This is a debug message");
logger.info("This is an info message");
logger.warn("This is a warning message");
logger.error("This is an error message");
```

we can use different logging levels to indicate the severity of the message.

### Parameterized Logging:

```java
String user = "John";
int age = 25;
logger.info("User {} is {} years old", user, age);
```

we can use parameterized logging to improve performance and readability.

### configure the logging levels for specific packages in a Spring Boot application.

```properties
logging.level.org.springframework=info
logging.level.com.miniproject.springboot.miniprojectdemo=debug
```

- `logging.level.org.springframework=info`: This line sets the logging level for the `org.springframework` package to info. This means that log messages at the `debug` level (and below) will NOT be included in the logs. Log messages at the `info` level and higher (e.g. `warn`, `error`) will be included.
- `logging.level.com.miniproject.springboot.miniprojectdemo=debug`: This line sets the logging level for the package `com.miniproject.springboot.miniprojectdemo` to `debug`. This means that log messages at the `trace` level `debug`, `info`, and higher will be included in the logs for classes in this specific package.

## Build Faster with Spring Boot DevTools:

Spring Boot DevTools is a set of tools that makes the process of developing Spring Boot applications more convenient.

- Automatic Restart: DevTools monitors our classpath for changes and automatically restarts the application when it detects a change. This saves us from having to manually stop and start our application every time we make a change.
- Live Reload: DevTools includes a LiveReload server that can automatically refresh our browser when it detects changes to our files.
- **Remember:** For pom.xml dependency changes, we will need to restart server manually

```xml
       <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
```

## Cross Origin Resource Sharing

It is a security feature implemented by web browsers to control how web pages in one domain can request and interact with resources from another domain. For example, `http://localhost:3000` is a different origin from `http://localhost:8080`

### Enable cross-origin requests in Spring Boot

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedMethods("*")
                        .allowedOrigins("http://localhost:3000");
            }
        };
    }
}

```

The provided `WebMvcConfigurer` bean for CORS configuration in a Spring Boot allows cross-origin requests from `http://localhost:3000` and permits all HTTP methods for all paths.
