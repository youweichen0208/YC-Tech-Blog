---
icon: pen-to-square
date: 2024-02-23
category:
  - backend
tag:
  - C#
  - LINQ
---

# LINQ

## What is LINQ?

LINQ (Language-Integrated Query) is a set of features in the .NET framework that provides a standardized way of querying data from different types of data sources. The LINQ provides a consistent query experience to query objects (LINQ to objects), relational databases (LINQ to SQL), and XML (LINQ to XML).

LINQ is a uniform query syntax in C# and VB.NET to retrieve data from different sources and formats.

LINQ queries return results as objects. It enables us to use object-oriented approach on the result set and not to worry about transforming different formats of results into objects.

## Why LINQ?

1. **Consistency**: LINQ provides a consistent way to query various types of data sources, such as collections, XML, databases, etc. We can use the same LINQ syntax and methods to query different data sources, which makes our code more consistent and easier to understand.

2. **Intellisense and Compile-time Checking**: Because LINQ is integrated into C#, we get benefits like intellisense and compile-time error checking. This can help us write correct code quickly and catch errors earlier in the development process.

3. **Readability**: LINQ queries can often be more readable than traditional loops and conditional statements.

4. **Producticity**: LINQ can help us write complex queries and data transformations with less code.

5. **Flexibility**: LINQ provides a lot of flexibility for querying and manipulating data. We can filter, sort, group, transform, and aggregate data in many ways with LINQ's standard query operators.

## LINQ Query Syntax:

Query syntax in LINQ provides a declaretive and SQL-like way of expressive queries. It allows us to query collections and other data sources using a syntax that resembles SQL queries. The query syntax is useful when dealing with complex queries involving multiple conditions, joins, and projections.

### Basic Structure:

```csharp
var result = from variable in collection
             [where condition]
             [orderby property]
             select projection;

```

- `from` clause: specifies the range variable (often referred to as the iteration variable) and the data source.
- `where` clause: Optional. Specifies one or more conditions that the elements must satisfy. It filters the data source based on the specified criteria.
- `orderby` clause: Optional. Specifies the sorting order for the elements in the result set. We can order by one or more properties in ascending or descending order.

- `select` clause: Specifies the projection, i.e., what should be included in the result set. It defines the shape of the output.

### Example:

```csharp
List<Student> students = GetStudents(); // Assume a list of Student objects

var query = from student in students
            where student.Marks > 80
            orderby student.LastName
            select new { student.FirstName, student.LastName };

foreach (var result in query)
{
    Console.WriteLine($"{result.FirstName} {result.LastName}");
}
```

- `students` is the data source
- `from student in students` establishes the range variable (`student`) and the data source (`students`).
- `select new { student.FirstName, student.LastName }` defines the projection, creating an anonymous type with first and last names.

```csharp
var query = from student in students
            join course in courses on student.CourseId equals course.Id
            where student.Marks > 80
            orderby student.LastName
            select new { student.FirstName, student.LastName, course.CourseName };

```

In this case, the `join` clause is used to combine data from two collections based on a specified key (`CourseId` and `Id` in this example).

## LINQ Method Syntax:

Method syntax is more concise and may be preferable in certain situations, especially for simpler queries or when working with developers more familiar with method chaining.

### Basic structure

```csharp
var result = collection
    .Where(item => condition)
    .OrderBy(item => property)
    .Select(item => projection);

```

- `Where` method: filters the elements based on a specified condition.
- `OrderBy` method: sorts the elements in ascending order based on a specified property. We can also use `OrderByDescending` for descending order.
- `Select` method: specifies the projection, defining what should be included in the result set.
