---
icon: pen-to-square
date: 2024-01-22
category:
  - backend
tag:
  - Java
  - Hibernate
---

# JPA and Hibernate

## What is JDBC

JDBC stands for Java Database Connectivity. It is a Java-based API that allows Java applications to interact with relational databases. JDBC provides a standard interface for connecting to databases, executing SQL queries, and processing the results

## JDBC to Spring JDBC

![JDBC to Spring JDBC](/assets/images/spring-jdbc.png)

- JDBC:
  - Write a lot of SQL queries!
  - And write a lot of Java code
- Spring JDBC:
  - Write a lot of SQL queries
  - BUT lesser Java code

### schema.sql in SpringBoot

In Spring Boot, the `schema.sql` file is used for defining the database schema, and it plays a role in the automatic initialization of the database.

1. Automatic Database Initialization:

- When Spring Boot detects the presence of a file named `schema.sql` in the classpath (usually in the `src/main/resources` directory), it automatically executes the SQL statements from the file during the application startup.

2. Defining Database Schema:

- The `schema.sql` file contains SQL statements for creating tables, indexes, and other database objects. It serves as a blueprint for the initial structure of the database.

3. Customization with `data.sql`:

- In Spring Boot, the `data.sql` file is used for automatically populating the database with initial data during the application setup (like insert statements).
- Apart from `schema.sql`, Spring Boot also recognizes a file named `data.sql` for initializing data. If both `schema.sql` and `data.sql` are present, the schema is created first, followed by the insertion of data.

## H2 in Spring

In Spring Boot, H2 is a popular in-memory database that is often used for development, testing, and prototyping. An in-memory database is a type of database system that primarily relies on main memory (RAM) for temporarily storing and managing data.

### Add H2 Dependency

```xml
	<dependency>
			<groupId>com.h2database</groupId>
			<artifactId>h2</artifactId>
			<scope>runtime</scope>
	</dependency>
```

In this case, `<scope>runtime</scope>` means that the H2 dependency is only needed during the runtime phase of our application and is not required for compilation. The H2 library is used by the application when it is running, but it is not necessary during the compilation and build process.

### Configure the properties in applications.properties

```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password
spring.h2.console.enabled=true
```

1. `spring.datasource.url=jdbc:h2:mem:testdb`

- This property sets the JDBC URL for the H2 in-memory database. The URL `jdbc:h2:mem:testdb` indicates that an in-memory database named "testdb" will be used. This type of database is created in memory and doesn't persist data beyond the application's lifecycle.

2. `spring.datasource.driverClassName=org.h2.Driver`:

- Specifies the fully qualified name of the JDBC driver class to use for the H2 database. In this case, it is set to the H2 database driver class, `org.h2.Driver`.

3. `spring.datasource.username=sa`:

- Sets the username for connecting to the H2 database. In this example, the username is set to "sa".

4. `spring.datasource.password=password`:

- Sets the password for connecting to the H2 database. In this example, the password is set to "password"

5. `spring.h2.console.enabled=true`:

- This property enables the H2 console, which is a web-based console provided by H2 for interacting with the in-memory database. If set to `true`, we can access the H2 console at `http://localhost:8080/h2-console`

## @Repository

In Spring Framework, the `@Repository` annotation is part of the stereotype annotations and is used to indicate that a class is a Data Access Object(DAO). The primary purpose of the `@Repository` annotation is to specify that the annotated class is responsible for encapsulating the interaction with a data source, typically a database.

1. DAO Design Pattern:

- The DAO pattern separates the data access code from the business logic, providing a clean and modular way to interact with the data source.

2. Component Scanning:

- When component scanning is enabled in a Spring application, classes annotated with `@Repository` are automatically discovered and registered as Spring beans.

3. Automatic Bean Definition:

- Classes annotated with `@Repository` are automatically considered as Spring beans, and Spring manages their lifecyle. This means that we can inject instances of these classes into other components, such as services or controllers.

## JdbcTemplate

In Spring Framework, `JdbcTemplate` is a class that simplifies database access and interaction with relational databases using JDBC. It is part of the JDBC support provided by the Spring Framework and is used to streamline common database operations without the need for boilerplate code. JDBC serves as the standard Java API for connecting and interacting with relational databases. It provides a set of interfaces and classes that allow Java applications to communicate with databases by executing SQL queries, updates and other database operations. JDBC acts as the medium or bridge between Java classes and relational databases.

## Spring JDBC

Spring JDBC facilitates database access in Java applications by handling many of the low-level details, reducing the amount of boilerplate code required, and offering features to enhance productivity and maintainability.

### 1. autowire the JdbcTemplate

```java
@Autowired
private JdbcTemplate springJdbcTemplate;
```

Use dependency injection and autowire the `JdbcTemplate` bean into the classes that need to interact with the database. Autowiring simplifies the process of obtaining a `JdbcTemplate` instance and promotes a cleaner and more modular design.

### 2. write the SQL

```java
    private static String INSERT_QUERY =
            """
                insert into course (id, name, author) values (?, ?, ?);
            """;
```

- we are using the triple double-quotes(`"""`) to define a multi-line string literal in Java.
- The placeholders(`?, ?, ?`) are typically used for parameterized queries where we later provide actual values during execution.

### 3. execute an SQL

```java
public void insert(Course course) {
    springJdbcTemplate.update(INSERT_QUERY, course.getId(), course.getName(), course.getAuthor());
}
```

- `update` method: The `update` method of `JdbcTemplate` is used for executing SQL statements that modify data in the database (e.g. insert, update, delete). It takes the SQL statement and an array of parameters as arguments.

## RowMapper in Spring JDBC

A `RowMapper` is an interface used to map a row of `ResultSet` to an object. It is commonly used in JDBC operations where the result of a query needs to be converted into Java objects. The `RowMapper` interface provides a mechanism to customize how the data from the result set is mapped to the corresponding Java object.

Example:

```java
public Course findById(int id) {
    // Resultset -> Bean => Row Mapper =>
    return springJdbcTemplate.queryForObject(SELECT_QUERY, new BeanPropertyRowMapper<>(Course.class), id);
}

```

- `queryForObject` method: this method is used to execute a `SELECT` query and retrieve a single result, mapping it to a Java object.
- `new BeanPropertyRowMapper<>(Course.class)`: this is an instance of `BeanPropertyRowMapper`, a built-in implementation of `RowMapper` provided by Spring JDBC. It maps the result set to a Java object using JavaBeans conventions, assuming that the property names in the `Course` class match the column names in the result set.
- The `queryForObject` method takes care of executing the SQL query, binding parameters, and converting the result set to a Java object. If the query returns no results or more than one result, it will throw a `IncorrectResultSizeDataAccessException`, so we need to ensure that our query always returns exactly one result for the specified ID.

## CommandLineRunner

In Spring Framework, `CommandLineRunner` is an interface that can be implemented by Spring beans to indicate that they should run when the application is started.

### run

```java
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyCommandLineRunner implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        // Your custom initialization logic goes here
        System.out.println("Application started. Performing initialization tasks...");
    }
}
```

The `run` method is called by the Spring Boot application after the application context has been loaded and just before the application starts running. This is particularly useful for tasks that need to be executed at application startup, such as database initialization, data loading, or any other custom initialization steps.

## What is JPA?

JPA stands for Java Persistence API. It is a Java specification for managing, persisting, and accessing data between Java objects and a relational database. Persistence refers to the process of saving a new entity object to the database.

1. Entity Classes:

- JPA introduces the concept of entity classes, which are regular Java classes representing objects that can be stored in a database. Each entity class is associated with a table in the database.

2. Object-Relational Mapping(ORM):

- JPA enables developers to map Java objects to database tables and vice versa. This mapping is done through annotations or XML configurations, and it allows for transparent and bidirectional data and bidirectional data exchange between Java objects and the database.

3. Annotations:

- JPA uses annotations to define the mapping between entity classes and database tables. Annotations like `@Entity`, `@Table`, `@Id`, and others are used to specify the structure and behavior of entities.

4. EntityManager:

- The `EntityManager` is a key interface in JPA that provides methods for performing CRUD operations on entities.

### @Entity, @Column, @Id

- @Entity:
  - The `@Entity` annotation is used to mark a Java class as a JPA entity. An entity represents a table in a relational database. Each instance of the entity class corresponds to a row in the database table. The `@Entity` annotation is typically placed on the class level.
- @Id:
  - The `@Id` annotation designates a field or property as the primary key of the entity. It indicates that the corresponding attribute uniquely identifies each record in the database table.
- @Column:
  - The `@Column` annotation is sued to customize the mapping of an entity attribute to a database table column. It allows us to specify various properties such as column name, length, etc.

```java
@Entity
public class Course {
    @Id
    private long id;

    @Column(name="name")
    private String name;

    @Column(name="author")
    private String author;
}
```

### @Transactional

`@Transactional` helps manage transactions effectively when interacting with a relational database.

1. Atomicity of Operations:

- Transactions in JPA ensure that a sequence of database operations either all succeed or all fail as a single, atomic unit.

2. Consistency and Data Integrity:

- Transactions help maintain data consistency and integrity by ensuring that the database transitions from one consistent state to another. Without transactions, multiple database operations might lead to inconsistencies if some operations succeed while others fail.

3. Synchronization with EntityManager:

- JPA relies on the `EntityManager` to manage the lifecycle of persistent objects. The `@Transactional` annotation ensures that the `EntityManager` is aware of the transactional context, and it manages the synchronization of changes made to entities with the underlying database.

### @PersistenceContext, EntityManager

In JPA, the `@PersistenceContext` annotation is used to inject an `EntityManager` into a Spring-managed bean. The `EntityManager` is a key interface in JPA that provides methods for interacting with the underlying database. The `@PersistenceContext` annotation is typically used in Spring components, such as service classes or repositories, to obtain and manage the `EntityManager` for performing CRUD operations.

```java
@Repository
@Transactional
public class CourseJpaRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public void insert(Course course) {
        entityManager.merge(course);
    }

    public Course findById(long id) {
       return entityManager.find(Course.class, id);
    }

    public void delete(long id) {
        Course course = entityManager.find(Course.class, id);
        entityManager.remove(course);
    }
}
```

### Spring Data JPA

Spring Data JPA allows you to use the full power of Spring and JPA together, with only a minimal amount of coding. It provides a way to implement JPA repositories without needing to write a lot of code or SQL.

1. Repository Interfaces:

- Spring Data JPA introduces the concept of repository interfaces. A repository interface is an interface that defines a set of methods for performing CURD operations on entities. These interfaces are not implemented by developers; Instead, Spring Data JPA dynamically generates the implementation at runtime based on method names and conventions.

2. Entity Management:

- Spring Data JPA simplifies entity management by automatically providing implementations for common database operations. Developers can create repository interfaces for their entities and use them to interact with the underlying database without writing boilerplace code for basic CRUD operations.

3. Method Query derivation:

- The ability to generate queries dynamically simplifies the development process by reducing the need for developers to write explicit JPQL.
- The method name is parsed to identify specific keywords that convey the intended operation. For example, keywords like `findBy`, `deleteBy`, or `countBy` signal the type of operation(selecting, deleting, or counting records)

4. Pagination and Sorting:

- Spring Data JPA supports built-in pagination and sorting for query results. Developers can include `Pageable` and `Sort` parameters in repository methods to retrieve paginated and sorted lists of entities.

```java
public interface CourseSpringDataJpaRepository extends JpaRepository<Course, Long> {

    List<Course> findByAuthor(String author);
    List<Course> findByName(String name);
}
```

## Hibernate vs JPA

- JPA defines the specification. It is an API

  - how do we define entities?
  - how do we map attributes?
  - who manages the entities?

- Hibernate is one of the popular implementations of JPA.
