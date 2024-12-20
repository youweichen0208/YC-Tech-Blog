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


## `IEnumerable<T>` and `IQueryable`:
### Key Differences Between IEnumerable<T> and IQueryable<T>

| **Feature**           | **IEnumerable<T>**                     | **IQueryable<T>**                        |
|-----------------------|-----------------------------------------|------------------------------------------|
| **Source**            | In-memory collections (e.g., `List<T>`) | Remote data sources (e.g., database)     |
| **Execution Location**| Client-side                            | Server-side                              |
| **Query Translation** | Does not translate queries             | Translates LINQ queries into SQL, etc.   |
| **Performance**       | Loads all data into memory first       | Fetches only the required data           |
| **Use Case**          | Small datasets, in-memory operations   | Large datasets, querying external sources|
| **Namespace**         | `System.Collections.Generic`           | `System.Linq`                            |

## Common LINQ commands:
### Where
The `Where` method in LINQ is used to **filter** a sequence based on a condition. It returns a new sequence(`IEnumerable<T>` or `IQueryable<T>`, depending on the source) that includes only the elements satisfying the condition.

1. **Deferred Execution**: the filtering logic is only executed when the resulting sequence is enumerated.
2. **Chainable**: can be combined with other LINQ methods like `Select`, `OrderBy`, etc.
3. **Type Preservation**: the elements in the resulting sequence are of the same type as the input.

### OrderBy
returns a new sequence(`IEnumerable<T>` or `IQueryable<T>`
#### Ascending: `OrderBy`
```csharp
var result = collection.OrderBy(item=>key);
```
#### Descending: `OrderByDescending`
```csharp
var result = collection.OrderByDescending(item=>key);
```

### Quantifier Operators

The quantifier operators evaluate elements of the sequence on some condition and return a boolean value to indicate that some or all elements satisfy the condition.

#### All

Checks if all the elements in a sequence satisfies the specified condition.

```csharp
bool checkAge = studentList.All(s=> s.Age > 19 && s.Age < 21);
```

#### Any

Checks if any of the elements in a sequence satisfies the specified condition.

```csharp
bool checkAge = studentList.Any(s=> s.Age > 19 && s.Age < 21);
```

### First & FirstOrDefault:

#### First

The First element operator returns the first record when there is one or more matching value found and if no matching record got found, it will throw an exception.

#### FirstOrDefault:

The FirstOrDefault operator returns the first record and when there is no matching values found,then assign null value.

### Single & SingleOrDefault

#### Single

It will return matched single record but if we can not find any matching record, it will throw a NoMatchException. If we have more than one record found,
it will also throw MoreThanOneMatchException.


#### SingleOrDefault:

It will return the matched single record, but if no matching record found, then it will assign a default value. And if there is more than
one matching record got found, it will throw an exception.


### Select 
In LINQ, `Select()` is a method used to project or transform elements of a collection into a new form. It allows us to define a transformation function to apply to each element in the collection and returns `IEnumerable<T>` or `IQueryable<T>` of the projected elements.

- elements projection
```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

var doubledNumbers = numbers.Select(n => n * 2);

foreach (var number in doubledNumbers)
{
    Console.WriteLine(number);  // Output: 2, 4, 6, 8, 10
}

```

- selecting properties from objects
```csharp
class Employee
{
    public string Name { get; set; }
    public int Salary { get; set; }
}

List<Employee> employees = new List<Employee>
{
    new Employee { Name = "Alice", Salary = 60000 },
    new Employee { Name = "Bob", Salary = 50000 },
    new Employee { Name = "Charlie", Salary = 70000 }
};

// Select only the names of the employees
var employeeNames = employees.Select(e => e.Name);

foreach (var name in employeeNames)
{
    Console.WriteLine(name);  // Output: Alice, Bob, Charlie
}

```


### **Aggregating Numbers**

- `Sum`: it calculates the total sum of the elements in a collection.

```csharp
using System;
using System.Linq;

public class HelloWorld
{
    public static void Main(string[] args)
    {
        int[] numbers = { 5, 3, 8, 1, 2 };

        int sum = numbers.Sum();
        Console.WriteLine($"Sum: {sum}");  // Output: Sum: 19
    }
}

```

- `Average`: it calculates the average value of the elements in a collection.

```csharp
using System;
using System.Linq;

public class HelloWorld
{
    public static void Main(string[] args)
    {
        int[] numbers = { 5, 3, 8, 1, 2 };

        double average = numbers.Average();
        Console.WriteLine($"Average: {average}");  // Output: Average: 3.8
    }
}

```

- `Max`: it finds the maximum value in a collection

```csharp
using System;
using System.Linq;

public class HelloWorld
{
    public static void Main(string[] args)
    {
        int[] numbers = { 5, 3, 8, 1, 2 };

        int max = numbers.Max();
        Console.WriteLine($"Max: {max}");  // Output: Max: 8
    }
}

```

- `Min`: it finds the minimum value in a collection

```csharp
using System;
using System.Linq;

public class HelloWorld
{
    public static void Main(string[] args)
    {
        int[] numbers = { 5, 3, 8, 1, 2 };

        int min = numbers.Min();
        Console.WriteLine($"Min: {min}");  // Output: Min: 1
    }
}

```

### TakeWhile
the `TakeWhile()` is used to return elements from a sequence as long as a specified condition is true. As soon as the condition fails, it stops and returns the elements (`IEnumerable` and `IQueryable`) at that point.

```csharp
int[] numbers = { 1, 2, 3, 4, 5, 6, 7 };

var result = numbers.TakeWhile(n => n < 5);

foreach (var number in result)
{
    Console.WriteLine(number);  // Output: 1, 2, 3, 4
}

```