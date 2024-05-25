---
icon: pen-to-square
date: 2024-02-19
category:
  - backend
tag:
  - C#
  - .net
---

# C# and .NET CORE

## Common Type System

- The common type system defines how types are declared, used, and managed in the runtime.
- Establishes a framework that enables cross-language integration, type safety, and high performance code.
- The common type system supports two types:
  - 1. Value Types (`bool`, `char`, `enum`, `struct`, `DateTime`)
  - 2. Reference Types (classes, arrays, delegates, interfaces)

### Value types vs. Reference type

1. Value types will hold the value; reference type will hold the memory address for this value.
2. Value types are stored in the stack memory; Reference types are stored in the heap memory.
3. Value types will not be collected by garbage collector; reference types will be collected by garbage collector.
4. Value types can be created by struct or enum while reference type can be created by class, interface, delegate or array.
5. Value types can not accept any null values while reference types can accept null values.

## How to differentiate value types and reference types:

- **Value types**: When we assign a value type variable to another value type variable, a copy of the value is made. If we change one variable, it doesn't affect the other. Value types are stored in the stack.

```csharp
int x = 10;
int y = x;
y = 20;
Console.WriteLine(x);  // Outputs: 10
Console.WriteLine(y);  // Outputs: 20
```

- **Reference types**: When we assign a reference type variable to another reference type variable, they both refer to the same object. If we change one variable, it affects the other. Reference types are stored in the heap.

```csharp
var x = new StringBuilder("Hello");
var y = x;
y.Append(" World");
Console.WriteLine(x);  // Outputs: Hello World
Console.WriteLine(y);  // Outputs: Hello World
```

**Note that `string` is a special case. Even though it is a reference type, it behaves like a value type because it's immutable. When we change a string, we are actually creating a new string, so it doesn't affect other strings that were assigned the same value.**

## Primitive data types in C#:

1. Numeric Types:

- `int`: 32-bit signed integer
- `long`: 54-bit signed integer
- `float`: single-precision floating point
- `double`: double-precision floating point
- `decimal`: high-precision decimal number, typically used for financial calculations.

### Notice abut decimal number: float and double:

In C#, when we write a decimal number like `1.2`, it's autotimacally interpreted as a `double`, which is the default type for decimal literals. If we want to specify that number is a `float`, we need to use the `f` or `F` suffix, like `1.2f`. The `decimal` type has its own suffix `m` or `M`, but it is not required if the context makes the type clear for decimal.

2. Boolean Type:

- `bool`: Boolean value, can be either `true` or `false`

3. Character Type:

- `char`: A single 16-bit Unicode character

4. String Type:

- `string`: a sequence of characters

## Identifiers:

- Identifiers are the names we use to identify the elements in our programs. In C#, we must adhere to the following syntax rules when choosing identifiers.
- We can use only letters (uppercase and lowercase), digits, and underscore characters.
- An identifier must start with a letter (an underscore is considered a letter).

```csharp
int productId;
int _Product
```

## String:

1. **Immutable**: Strings in C# are immutable. This means once a string is created, it cannot be changed. Any operation that appears to modify a string actually creates a new string.

```csharp
string a = "abc"; // a references the string "abc"
a = a + 'm'; // a new string "abcm" is created, a now references this new string
// The string "abc" is now eligible for garbage collection
```

2. **Concatenation**: We can concatenate strings using the `+` operator or the `string.concat` method. If we are concatenating strings in a loop, it is more efficient to use the `StringBuilder` class.

3. **Interpolation**: C# supports string interpolation, which allows us to insert expressions directly into string literals.
   We can use string interpolation by prefixing the string with a `$` and enclosing expressions in `{}`.

```csharp
int age = 25;
string name = "John";
string greeting = $"Hello, my name is {name} and I am {age} years old.";
```

- In this example above, `{name}` and `{age}` are expressions that get replaced with the values of the `name` and `age` variables.

4. **Escape Sequences**: we can include special charactrrs in strings using escape sequences, like `\n` for a newline or `\"` for a double quote.

```csharp
string s1 = "Hello\nWorld"; // Inserts a newline between "Hello" and "World"
Console.WriteLine(s1);
// Output:
// Hello
// World
```

5. **Null and Empty Strings**: A string can be null or empty. A null string does not refer to an instance of a string object and any attempt to call a method on a null string results in a `NullReferenceException`.

## StringBuilder

1. Creating a StringBuilder:

```csharp
StringBuilder sb = new StringBuilder();
```

2. Appending Strings:

```csharp
sb.Append("Hello");
sb.Append(" World");
```

3. Inserting Strings:
   we can insert strings at a specific position using the `Insert` method. The first argument is the index at which to insert the string.

```csharp
sb.Insert(0, "Say: ");
```

4. Replaceing Strings:
   we cam replace all occurrences of a substring using the `Replace` method.

```csharp
sb.Replace("Say: ", "I say: ");
```

5. Removing Characters: we can remove characters at a specific position using the `Remove method`. The first argument is the start index and the second argument is the number of characters to remove.

```csharp
sb.Remove(0, 7);
```

6. Getting the String

```
string result = sb.ToString();
```

## String vs. StringBuilder

- While working with the String class, everytime we perform some operations on our string, we recreate the entire string in the memory over and over again, whereas StringBuilder allocates some buffer space in the memory and applies modifications into that buffer space.

- As the StringBuilder object is mutable, it provides better performance as compared to the String object when heavy string manipulations are involved.

- String operations use more memory as compared to StringBuilder because String creates intermediate garbage instances after each operation.

- String is in System namespace but StringBuilder is in System.Text namespace.

## Garbage Collection

Garbage collection in C# is a process that automatically reclaims memory that was allocated by our program and is no longer in use. It's a part of the .NET runtime and is automatically performed as our program runs.

## Acess Modifiers:

### **public**: members can be accessed anywhere

### **private**: members can be accessed only in current class.

### **internal**: members can be accessed in current assembly.

### **protected**: members can be accessed in current class and children class

## Modes of parameter passing:

1. **pass by value**: when we pass a variable to a method by value, a copy of the variable is created and used inside the method. Any changes made to the variable inside the method do NOT affect the original variable. Value parameters are sometimes called in parameters because data can be transferred into the method but cannot be transferred out.

```csharp
void ChangeValue(int x)
{
    x = 10;
}

int a = 5;
ChangeValue(a);
Console.WriteLine(a); // Outputs: 5
```

2. **by reference**: In C#, we can pass parameters by reference using the `ref` or `out` keywords. This means that the method works with the same instance of the variable, NOT a copy. Any changes made to the variable inside the method affect the original variable.

```csharp
void ChangeValue(ref int x)
{
    x = 10;
}

int a = 5;
ChangeValue(ref a);
Console.WriteLine(a); // Outputs: 10
```

### The difference between **ref** and **out**:

- **ref**: when we pass a parameter using the `ref` keyword, the variable must be initialized before it's passed. The method can then read from and write to that variable.

```csharp
void ChangeValue(ref int x)
{
    x = 10;
}

int a = 5;
ChangeValue(ref a);
Console.WriteLine(a); // Outputs: 10
```

- **out**: when we pass a parameter using the `out` keyword, the variable does not have to be initialized before it's passed. However, the method must assign a value to the `out` parameter before the method returns.

```csharp
void Initialize(out int x)
{
    x = 10; // Must assign a value
}

int a; // Does not need to be initialized
Initialize(out a);
```

- In summary, use `ref` when we want the method to read from and write to the variable, and use `out` when we want the method to initialize or overwrite the variable.

## Enum in C#

An `enum` is a value type that represents a set of named constants. `enum` is used to create numeric constants in .NET framework. All members of an `enum` are of `enum` type and each has an associated integral value.

```csharp
public enum Days
{
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}
```

In this example, `Days` is an `enum` that represents the seven days of the week. By default, the first enumerator has the value 0, and the value of each successive enumerator is increased by 1. For example, `Days.Sunday` has a value of 0, `Days.Monday` has a value of 1, and so on.

We can also specify the underlying type and values of the `enum` members:

```csharp
public enum Days : byte
{
    Sunday = 1,
    Monday = 2,
    Tuesday = 3,
    Wednesday = 4,
    Thursday = 5,
    Friday = 6,
    Saturday = 7
}
```

## `using`:

At the beginning of a .cs file, `using` is used to include namespace in the file. This allows us to use classes, interfaces, enums. and delegates in the namespace without specifying the namespace each time.

```csharp
using System;
```

In this example, `System` is a namespace. After this `using` declaration, we can use classes like `Console` directly, instead of writing `System.Console`

## `?` symbol

In C#, the `?` symbol after a value type (like `int`, `bool`, `double`, etc.) declares a nullable value type.

By default, value types cannot be null. However, there are situations where we might want to represent the lack of a value, for example, when we are working with a database where numeric fields may be empty, or when we are performing a calculation that may not produce a result.

```csharp
int? price = null;
```

In this example, `price` is a nullable `int`. It can hold any value an `int` can hold, or it can hold `null`.

We can check if a nullable type has value with the `HasValue` property, and retrieve the value with the `Value` property.

```csharp
if (price.HasValue) {
    Console.WriteLine("The price is " + price.Value);
}
else {
    Console.WriteLine("The price is not set.");
}
```

## Namespace

Namespaces in C# serve a similar purpose to packages in Java. Both are used to organize code and avoid naming conflicts. In both languages, we can use namespaces/packages to group related classes, interfaces, enums, and other types. And in both languages, we can use the `using` keyword in C# (or `import` in java) to bring types from a specific namespace/package into scope, so we can refer to them by their simple names instead of their fully qualified names. However, in Java, the directory structure of our source code must match the package structure, while in C#, the organization of namespaces is not tied to the file or directory structure.

## Boxing and Unboxing in C#

1. **Boxing** is the process of converting a value type (like `int`, `bool`, `char`, etc.) to the `object` type or to any interface type implemented by this value type. When the CLR boxes a value type, it wraps the value inside a `System.Object` and stores it on the managed heap. Boxing is implicit.

```csharp
int i = 10;
object o = i; // boxing
```

In this example, the value of `i` is boxed and assigned to `o`.

### Boxing process:

- The CLR allocates a new object of type `object` on the heap.
- The CLR copies the value of the value type into the new object.
- The CLR returns a reference to the new object.

2. **Unboxing** is the process of converting the object/reference type back to the value type. Unboxing extract the value from the reference type and assign it to a value type.

```csharp
object o = 10;
int i = (int)o; // performs unboxing.
```

## What is the point of boxing and unboxing in C#?

1. **storing value types in Collections**: Before generics were introduced in .NET 2.0, collections could only store objects. If we wanted to store a value type in a collection, we had to box it. Even now, there are some older APIs and collections that require objects.

2. **Method Calls**: If we want to call a method that requires an object parameter, and all we have is a value type, we would need to box the value type.

## Default parameter in C#

In C#, a default parameter, also known as an optional parameter, is a feature that allows us to specify default values for parameters in a method. If the caller of the method doesn't provide a value for an optional parameter, the default value is used.

```csharp
public void MakeCoffee(string type = "Espresso", int sugar = 1)
{
    Console.WriteLine($"Making {type} with {sugar} sugar(s)...");
}

// Call the method
MakeCoffee(); // Outputs: Making Espresso with 1 sugar(s)...
MakeCoffee("Latte"); // Outputs: Making Latte with 1 sugar(s)...
MakeCoffee("Cappuccino", 2); // Outputs: Making Cappuccino with 2 sugar(s)...
```

## Obsolete in C#

The `Obsolete` attribute in C# is a way to indicate that certain parts of our code, such as methods, classes, properties, events, fields, or structures, are deprecated and should not be used in new development.

```csharp
[Obsolete("This method is obsolete. Use NewMethod instead.", true)]
public void OldMethod()
{
    // ...
}
```

The `Obsolete` attribute is useful for managing changes to our codebase over time, especially when we are managing a library that is used by other people. It allows us to communicate that certain parts of our code are outdated and suggest alternatives, without immediately breaking any code that uses those parts.

## Anonymous Type:

In C#, an anonymous type is a type without any name that encapsulate public read-only properties only. It cannot contain other members such as fields, methods, events, etc.

### Creating an anonymous type:

```csharp
var student = new {Id = 1, FirstName = "James", LastName = "Bond"};
```

The example above demonstrates creating an anonymous type variable `student` that contains three properties named `Id`, `FirstName`, `LastName`.

### Points to remember:

- The properties of anonymous types are read-only and cannot be initialized with a null, anonymous function, or a pointer type.
- The properties can be accessed using dot(.) notation, same as object properties.
- We cannot change the values of properties as they are read-only.

## Array vs. ArrayList

- Use Arrays when:
  - we need a fixed-size collection
  - we want type safety
  - we require better performance
- Use ArrayLists When:
  - We need a dynamically resizable collection.
  - We want to store elements of different data types
  - Not type safe.

## Non-Generic Collections vs. Generic Collections:

### Non-Generic Collections:

Non-generic collections are part of the older collection classes in C# and work with objects of type `object`. They lack type safety because they allwo storing elements of any data type.

```csharp
ArrayList list = new ArrayList();
list.Add(10);         // Adding an integer
list.Add("Hello");    // Adding a string

```

- **Not Type-Safe**:
  - Non-generic collections can store elements of any data type, but this lack of type safety can lead to runtime errors if elements are not cast properly.
- **Boxing and Unboxing**:
  - When storing value types in a non-generic collection, boxing and unboxing operations are required, leading to performance overhead

### Generic Collections:

```csharp
List<int> numbers = new List<int>();
numbers.Add(10);       // Adding an integer
// numbers.Add("Hello"); // Error: Cannot add a string to a List<int>
```

- **Type-Safe**:
  - Generic collections are type-safe, meaning they only allow elements of a specific data type.
- **No Boxing and Unboxing**:
  - Generic collections avoid the need for boxing and unboxing, resulting in better performance when working with value types.

## Explain the concept of "generics" in C#?

Generics is a feature in C# that allows the creation of classes, interfaces, and methods that can work with any data type. This allows for a more flexible and reusable code.

## IEnumerable vs. IQueryable

### IEnumerable

`IEnumerable` is the most basic interface for iterating over a collection of objects. It is part of the System.Collections namespace. Operations on `IEnumerable` are performed in-memory, meaning that data is loaded into memory before any operations are executed. Suitable for in-memory collections such as arrays, lists, or collections where data is already in memory.

### IQueryable

`IQueryable` is part of the System.Linq namespace. Operations on `IQueryable` are typically not executed immediatley. They are deferred until the data is actually needed. Suitable for querying remote data sources or databases where queries can be translated into optimized queries for underlying data store.

### Key Differences:

1. `IEnumerable` executes queries in-memory, while `IQueryable` allows for deferred execution and query translation.
2. Use `IEnumerable` for in-memory collections or scenarios where data is already in memory. Use `IQueryable` when querying external data sources or databases.

## Extension Methods:

Extension methods are a feature in C# that allows us to add new methods to existing types without modifying them. Extension methods are defined as static methods in static classes, and they are called in a way that looks like instance methods of the extended type.

### Examples of Built-in Extention Methods:

1. LINQ Methods:

- LINQ provides numerous extension methods for querying collections.

```csharp
// Example: Where is an extension method on IEnumerable<T>
var filteredList = myList.Where(item => item > 5);
```

2. String Methods:

- The `string` class has several extension methods for common

```csharp
// Example: ToUpper is an extension method on string
string upperCaseString = myString.ToUpper();

```

## Creating Custom Extension Methods:

1. Create a Static class
2. Define the static Extension Method. The first parameter of the method specifies the type being extended, MUST BE preceded by `this` keyword.

```csharp
public static class MyExtensions
{
    public static string Reverse(this string input)
    {
        char[] charArray = input.ToCharArray();
        Array.Reverse(charArray);
        return new string(charArray);
    }
}

```

## Exception:

An exception is an abnormal event or error condition that occurs during the execution of a program. The `Exception` class is the base class for all the built-in exception class in .NET framework.

### Exception Handling in C#:

C# provides built-in support to handle the exception using `try`, `catch`, & `finally` blocks.

```csharp
try {
    //
}
catch {

}
finally {

}
```

- **try block**: Any suspected code that may raise exceptions should be put inside a `try{ }` block. If an exception occurs, the flow of the control jumps to the first matching `catch` block

- **catch block**: The `catch` block is an exception handler block where we can perform some action such as logging and auditing an exception.

- **finally block**: The `finally` block is an optional block and should come after a `try` or catch block. The `finally` block will always be executed whether or not an exception occurred. **The finally block generally used for cleaning-up code e.g., disposing of unmanaged objects.**

### Throwing Exceptions:

We can manually throw exceptions using the `throw` keyword

```csharp
public int Divide(int numerator, int denominator)
{
    if (denominator == 0)
    {
        throw new DivideByZeroException("Denominator cannot be zero.");
    }
    return numerator / denominator;
}

```

### Custom Exceptions:

We can create our own custom exception classes by inheriting from the `Exception` class.

```csharp
public class CustomException : Exception
{
    public CustomException(string message) : base(message)
    {
    }
}

// Usage
try
{
    throw new CustomException("This is a custom exception.");
}
catch (CustomException ex)
{
    Console.WriteLine(ex.Message);
}

```
