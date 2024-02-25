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

## Standard query operators:

### Where

The Where operator (Linq extension method) filters the collection based on a given criteria expression and returns a new collection. The criteria can be specified as lambda expression or Func delegate type.

Example:

```csharp
class Program
{
    public static void Main()
    {
        IList<Student> studentList = new List<Student>()
        {
            new Student() { StudentID = 1, StudentName = "John", Age = 13 },
            new Student() { StudentID = 2, StudentName = "Moin", Age = 21 },
            new Student() { StudentID = 3, StudentName = "Bill", Age = 18 },
            new Student() { StudentID = 4, StudentName = "Ram", Age = 20 },
            new Student() { StudentID = 5, StudentName = "Ron", Age = 15 }
        };

        var teenAgeStudent = from student in studentList
            where student.Age > 13 && student.Age < 20
            select student;
        Console.WriteLine("Teen age Students: ");
        foreach (var student in teenAgeStudent)
        {
            Console.WriteLine(student.StudentName);
        }
    }
}
```

Alternatively, we can also use a Func type delegate with an anonymous method to pass a predicate function as below.

```csharp
  Func<Student, bool> isTeenAger = delegate(Student s) { return s.Age > 13 && s.Age < 20;};
        var result = from student in studentList
            where isTeenAger(student)
            select student;
```

### Where extention method in Method Syntax

```csharp
public static IEnumerable<TSource> Where<TSource>(this IEnumerable<TSource> source, Func<TSource, bool> predicate);
```

In this signature, `TSource` is the type of the items in the collection, `source` is the collection to filter, and `predicate` is a `Func<TSource, bool>` delegate that defines the condition to filter the items.

```csharp
var filteredResult = studentList.Where(s => s.Age > 13 && s.Age < 20);
```

## OrderBy

OrderBy sorts the values of a collection in `ascending` or `descending` order. It sorts the collection in ascending order by default because ascending order keyword is optional here. Use the `descending` keyword to sort the collection in descending order.

```csharp
 var resultList = from student in studentList
            orderby student.Age descending
            select student;
```

### OrderBy in Method syntax

#### ascending:

```csharp
var resultList = studentList.OrderBy(s => s.Age);
```

#### descending:

```csharp
var resultList = studentList.OrderByDescending(s => s.Age);
```

### Multiple Sorting:

We can sort the collection on multiple fields separated by comma. The given collection would be first sorted based on the first field and then if value or first field would be the same for two elements then it would use second field for sorting and so on.

#### query syntax

```csharp
 var resultList = from student in studentList
            orderby student.StudentName, student.Age
            select student;
```

#### method syntax:

```csharp
var resultList = studentList.OrderBy(s => s.StudentName).ThenBy(s => s.Age);
```

In the example above, `OrderBy` sorts the students by name, and then `ThenBy` sorts the students with the same name by age. The result is a sequence of students sorted first by name and then by age. We can chain as many `ThenBy` or `ThenByDescending` calls as we need to perform additional sorts. For example, if the `Student` class also had a `Grade` property, we could sort by name, then age, then grade like this.

```csharp
var sortedStudents = students.OrderBy(s => s.Name).ThenBy(s => s.Age).ThenBy(s => s.Grade);
```

### Points to rememeber:

1. LINQ includes five sorting operators: OrderBy, OrderByDescending, ThenBy, ThenByDescending
2. LINQ query syntax does not support OrderByDescending, ThenBy, ThenByDescending. It only supports `orderby` clause with `ascending` and `descending` sorting direction.
3. LINQ query syntax supports multiple sorting fields separated by comma whereas we have to use `ThenBy` & `ThenByDescending` for secondary sorting.

## Grouping Operators: GroupBy

when we use the `group` keyword in LINQ, it creates a sequence of `IGrouping<TKey, TElement>` objects, where `TKey` is the type of the key we are grouping by, where `TKey` is the type of the key we are grouping by, and `TElement` is the type of the elements in the group. Each `IGrouping<TKey, TElement>` object represents a group of elements that have the same key.

### GroupBy in query syntax:

```csharp
     var resultList = from s in studentList
            group s by s.StudentName;

        foreach (var group in resultList)
        {
            foreach (var student in group)
            {
                Console.WriteLine(student.StudentName + " " + student.StudentID);
            }
        }
```

In the first `foreach` loop, `student` is not a `Student` object, but an `IGrouping<string, Student>` object. We can access the key of the group with the `key` property, and we can enumerate the students in the group with a nested `foreach` loop.

### GroupBy in method syntax:

```csharp
var resultList = studentList.GroupBy(s => s.StudentName);
```

## Join Operator:

### Join in method syntax

```csharp
var joinResult = list1.Join(
    list2,
    item1 => item1.Key,  // Outer key selector
    item2 => item2.Key,  // Inner key selector
    (item1, item2) => new { Item1 = item1, Item2 = item2 }  // Result selector
);
```

- `item1 => item1.Key` is the outer key selector. It's a function that takes an element from the outer sequence (`list1`) and returns the key for that element.
- `item2 => item2.Key` is the inner key selector. It's a function that takes an element from the inner sequence (`list2`) and returns the key for that element.
- We **CANNOT** switch the order of the outer and inner key selectors in a LINQ join operation. The outer key selector must correspond to the first (or "outer") collection we are joining, and the inner key selector must correspond to the second (or "inner") collection we are joining.

equivalent sql:

```sql
SELECT stu.StudentName, std.StandardName
FROM studentList stu JOIN standardList std ON stu.StandardID = std.StandardID
```

### Join in Query Syntax:

```csharp
from ... in outerSequence
      join ... in innerSequence
      on outerKey equals innerKey
      select ...
```

#### Example

```csharp
  var innerJoinResult = from student in studentList
            join standard in standardList
                on student.StandardID equals standard.StandardID
            select new { StudentName = student.StudentName, StandardName = standard.StandardName };
```

## DefaultIfEmpty

The DefaultIfEmpty() method returns a new collection with the default value if the given collection on which DefaultIfEmpty() is invoked is empty. Another overload method of DefaultIfEmpty() takes a value parameter that should be replaced with default value.

```csharp
        IList<string> emptyList = new List<string>();

        var newList1 = emptyList.DefaultIfEmpty();
        var newlist2 = emptyList.DefaultIfEmpty("None");

        Console.WriteLine("newlist1 Count: {0}", newList1.Count());
        Console.WriteLine("newlist1 Value: {0}", newList1.ElementAt(0));

        Console.WriteLine("newlist2 Count: {0}", newlist2.Count());
        Console.WriteLine("newlist2 Count: {0}", newlist2.ElementAt(0));
```

In the above example, `emptyList.DefaultIfEmpty()` returns a new string collection with one element value whose value is null because null is a default value of string. Another method `emptyList.DefaultIfEmpty("none")` returns a new string collection with one element whose value is "None" instead of null.

## GroupJoin

In a grouped join, for each element in the outer sequence, a result element is created. This result element contains the element from the outer sequence and a collection of all matching elements from the inner sequence. If an element in the outer sequence has no matching elemeents in the inner sequence, the collection for that element will be empty.

### GroupJoin in Method Syntax

```csharp
var groupedResult = standardList.GroupJoin( //outer sequence
    studentList,  // Inner sequence
    std => std.StandardID,  // Outer key selector
    s => s.StandardID,  // Inner key selector
    (std, studentsGroup) => new  // Result selector
    {
        Students = studentsGroup,
        StandardName = std.StandardName
    }
);
```

- In the `GroupJoin` method, the third parameter is a result selector that takes two arguments: an element from the outer sequence and a collection of all matching elements from the inner sequence.
- From the example above, `std` is an element from the outer sequence standardList
- `studentGroup` is a collection of all matching elements from the inner sequence (`orders`).

### GroupJoin in Query Syntax:

```csharp
from ... in outerSequence
join ... in innerSequence
on outerKey equals innerKey
into groupedCollection
select ...
```

Example:

```csharp
var students = new List<Student> { /* ... */ };
var standards = new List<Standard> { /* ... */ };

var groupedJoin = from s in standards
                  join stu in students on s.StandardID equals stu.StandardID into standardGroup
                  select new { Standard = s, Students = standardGroup };
```

## Left Join:

```csharp
        var resultList = from standard in standardList
            join student in studentList on standard.StandardID equals student.StandardID
                into tmpList
            from co in tmpList.DefaultIfEmpty()
            select new { Standard = standard, Student = co };
```

- `join...into` performs a group join of `standardList` and `studentList` based on `StandardID`. The result is a temporary collection `tmpList` that contains all matching students for each standard.
- `from co in tmpList.DefaultIfEmpty()` is used to ensure that all elements from outer sequence are included in the final result, even if they don't have any matching elements in the inner sequence.

## Quantifier Operators

The quantifier operators evaluate elements of the sequence on some condition and return a boolean value to indicate that some or all elements satisfy the condition.

### All

Checks if all the elements in a sequence satisfies the specified condition.

```csharp
bool checkAge = studentList.All(s=> s.Age > 19 && s.Age < 21);
```

### Any

Checks if any of the elements in a sequence satisfies the specified condition.

```csharp
bool checkAge = studentList.Any(s=> s.Age > 19 && s.Age < 21);
```

## First & FirstOrDefault:

### First

The First element operator returns the first record when there is one or more matching value found and if no matching record got found, it will throw an exception.

### FirstOrDefault:

The FirstOrDefault operator returns the first record and when there is no matching values found,then assign null value.

## Single & SingleOrDefault

### Single

It will return matched single record but if we can not find any matching record, it will throw a NoMatchException. If we have more than one record found,
it will also throw MoreThanOneMatchException.

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };

// Using Single
int singleNumber = numbers.Single(n => n == 3);  // singleNumber will be 3
```

### SingleOrDefault:

It will return the matched single record, but if no matching record found, then it will assign a default value. And if there is more than
one matching record got found, it will throw an exception.
