---
icon: pen-to-square
date: 2024-02-23
category:
  - backend
tag:
  - C#
  - Delegates
---

# Delegates in C#

## C# - Delegates:

The delegate is a reference type data type that defines method signature. We can define variables of delegate, just like other data type. A delegate can point to a method that has the same return type and parameters. We can invoke (or call) the method through the delegate. Delegates are used to pass methods as arguments to other methods.

### Three steps involved while working with delegates:

1. Declare a delegate:

```csharp
[access modifier] delegate [return type] [delegate name] ([parameters])
```

example:

```csharp
public delegate void MyDelegate(string msg);
```

- Above, we have declared a delegate `MyDelegate` with a void return type and a string parameter.
- A delegate can be declared outside of the class or inside the class.

2. Create an instance and reference a method
   After declaring an delegate, we need to set the target method or a lambda expression. We can do it by creating an object of the delegate usoing the new keyword and passing a method whose signature matches the delegate signature.

```csharp
public delegate void MyDelegate(string msg); // declare a delegate

// set target method
MyDelegate del = new MyDelegate(MethodA);

// or
MyDelegate del = MethodA;

// or set lambda expression
MyDelegate del = (string msg) => Console.WriteLine(msg);

// target method
static void MethodA(string message) {
    Console.WriteLine(message);
}
```

3. Invoke a delegate

```csharp
del.Invoke("Hello World!");
// or
del("Hello World!");
```

full example:

```csharp
public delegate void MyDelegate(string message);

class Program
{
    public static void Main()
    {
        MyDelegate myDelegate = new MyDelegate(A.MethodA);
        myDelegate("Hello World");

        myDelegate = new MyDelegate(B.MethodB);
        myDelegate("Hello World");
    }
}

class A
{
    public static void MethodA(string message)
    {
        Console.WriteLine("Called ClassA.MethodA() with parameter: " + message);
    }
}

class B
{
    public static void MethodB(string message)
    {
        Console.WriteLine("Called ClassB.MethodB() with parameter: " + message);
    }
}
```

### A method can have a parameter of the delegate type.

### Multicast Delegate

The delegate can point to multiple methods. A delegate that points multiple methods is called a multicast delegate. The `+` or `+=` operator adds a function to the invocation list, and the `-` and `-=` operator removes it.

```csharp
public delegate void MyDelegate(string message);

class Program
{
    public static void Main()
    {
        MyDelegate del1 = new MyDelegate(A.MethodA);
        MyDelegate del2 = new MyDelegate(B.MethodB);

        MyDelegate del = del1 + del2; // combines del1 + del2
        del("Hello World"); // it will execute MethodA first then MethodB

        MyDelegate del3 = (string msg) => Console.WriteLine("Called lamda expression: " + msg);
        del += del3;
        del("Hello World"); // it will execute MethodA, then MethodB, then the lambda expression


        del = del - del2; // removes del2
        del("Hello World"); //it will execute Method A and lambda expression
    }
}

class A
{
    public static void MethodA(string message)
    {
        Console.WriteLine("Called ClassA.MethodA() with parameter: " + message);
    }
}

class B
{
    public static void MethodB(string message)
    {
        Console.WriteLine("Called ClassB.MethodB() with parameter: " + message);
    }
}
```

If a delegate returns a value, then the last assigned target method value will be return when a multicast delegate called.

```csharp
public delegate int MyDelegate();

class Program
{
    public static void Main()
    {
        MyDelegate del1 = new MyDelegate();
        MyDelegate del2 = new MyDelegate();
        MyDelegate del = del1 + del2;
        Console.WriteLine(del()); // 200
    }
}

class A
{
    public static int MethodA(string message)
    {
        return 100;
    }
}

class B
{
    public static int MethodB(string message)
    {
        return 200;
    }
}
```

## Generic Delegate

A generic delegate can be defined in the same way as a delegate but using generic type parameters or return type. The generic type MUST be specified when we set a target method.

For example, consider the following generic delegate that is used for int and string parameters.

```csharp
public delegate T Add<T>(T param1, T param2);

public class Program
{
    public static void Main()
    {
        Add<int> add = new Add<int>(Program.Sum);
        Add<string> con = new Add<string>(Program.Concat);
        Console.WriteLine(add(30, 50));
        Console.WriteLine(con("Hello", "World"));
        //output
        //80
        //HelloWorld
    }

    public static int Sum(int val1, int val2)
    {
        return val1 + val2;
    }

    public static string Concat(string str1, string str2)
    {
        return str1 + str2;
    }
}
```

## C# - Func Delegate

The `Func` delegate is a buit-in generic delegate in C# that represents a function which can take up to 16 input parameters and returns a value. The last type parameter is the return type of the function, and the types before it are the input parameters.

```csharp
Func<int, int, int> add = (x, y) => x + y;
int result = add(3, 4);
```

In this example, `add` is a `Func` delegate that takes two `int` parameters and returns an `int`. The lambda expression `(x, y) => x + y` is assigned to the delegate, which adds the two parameters together.

If we want a `Func` delegate that doesn't take any parameters, we can do something like this:

```csharp
Func<int> getRandomNumber = ()=> new Random().Next();
int randomNumber = getRandomNumber(); // randomNumber is a random integer.
```

### example

```csharp
class Program
{
   static int Sum(int x, int y)
   {
      return x + y;
   }

   public static void Main()
   {
      Func<int, int, int> add = Sum;
      Console.WriteLine(add(5, 10));
   }
}
```

output: 15

### Points to remember about Func:

1. Func is built-in delegate type
2. Func delegate type must return a value.
3. Func delegate type can have zero to 16 input parameters
4. Func delegate does not allow ref and out parameters
5. Func delegate type can be used with an anonymous method or lamda expression.

## Action Delegate

`Action` is a delegate type defined in the `System` namespace. An Action type delegate is the same as `Func delegate` except that the Action delegate doesn't return a value. In other words, an Action delegate can be used with a method that has a void return type.

```csharp
Action<string> printMessage = message => Console.WriteLine(message);
printMessage("Hello, World!");  // Prints "Hello, World!" to the console
```

In this example, `printMessage` is an `Action` delegate that takes a single `string` parameter and doesn't return anything. The lambda expression `message => Console.WriteLine(message)` is assigned to the delegate, which prints the message to the console.

### `Action` delegate with no parameters:

```csharp
Action printHelloWorld = () => Console.WriteLine("Hello, World!");
printHelloWorld();  // Prints "Hello, World!" to the console
```

### Advantages of Action and Func Delegates:

1. Easy and quick to define delegates
2. Makes code short
3. Compatible type throughout the application.

## Predicate Delegate

`Predicate` is the delegate like Func and Action delegates. It represents a method containing a set of criteria and checks whether the passed parameter meets those criteria. A predicate delegate methods must take one input parameter and return a boolean - true or false. The `Predicate` delegate is defined in the `System` namespace.

```csharp
Predicate<int> isGreaterThanTen = number => number > 10;
bool result = isGreaterThanTen(15);  // result is true
```

In this example, `isGreaterThanTen` is a `Predicate<int>` delegate that takes an `int` parameter and returns a `bool`.

### Points to remember about `Predicate<T>`:

1. Predicate delegate takes one input parameter and boolean return type.
2. Anonymous method and lambda expression can be assigned to the predicate delegate.

## Anonymous Method:

As the name suggests, an anonymous method is a method without a name. Anonymous methods in C# can be defined using the delegate keyword and can be assigned to a variable of delegate type.

```csharp
public delegate void Print(int value);

static void Main(string[] args) {
    Print print = delegate(int val) {
        Console.WriteLine("Inside Anonymous method. Value: {0}", val);
    };
    print(100);
}
```

```csharp
   public delegate int Sum(int val1, int val2);
   public static void Main()
   {

      Sum sum = delegate(int val1, int val2) { return val1 + val2; };
      Console.WriteLine("Sum is " + sum(5, 10));
   }
```

### Anonymous methods can be passed to a method that accepts delegate as a parameter

```csharp
public delegate void Print(int value);

class Program {
    public static void PrintHelperMethod(Print printDel, int val) {
        val += 10;
        printDel(val);
    }

    static void Main(string[] args) {
        PrintHelperMethod(delegate(int val) {Console.WriteLine("Anonymous method: {0}", val);}, 100);
    }
}
```

## Points to remember:

1. Anonymous method can be defined using the delegate keyword
2. Anonymous method must be assigned to a delegate
3. Anonymous method can access outer variables or functions
4. Anonymous method can be passed as parameter
5. Anonymous method can be used as event handlers.
