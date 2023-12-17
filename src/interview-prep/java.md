---
icon: pen-to-square
date: 2023-12-13
category:
  - interview
tag:
  - Java

star: true
sticky: true
---

# Java Interview Questions

## Core Java: Basics of Java Interview Questions

### What do you understand by Java virtual machine?

Java Virtual Machine is a virtual machine that enables the computer to run the Java program. JVM acts like a run-time engine which calls the main method present in the Java code. JVM is a part of the JRE (Java Runtime Environment). The Java code is compiled by JVM to be a Bytecode which is machine independent.

### Compare JDK vs. JVM vs. JRE

#### JVM (Java Virtual Machine)

This is the heart of the Java Platform. It is a virtual machine that interprets Java bytecode and executes it as native code on the host machine. JVM is a part of the Java Runtime Environment.

###### Internal architecture of JVM

![JVM architecture](/assets/images/jvmArchitecture.jpg)
It contains classloader, memory area, execution engine etc.

#### JRE (Java Runtime Environment)

JRE is the environment where Java programs run. This is the system that takes our Java code, and combines it with the necessary libraries, and starts the JVM to execute it. JRE is a part of the Java Development Kit

#### JDK (Java Development Kit)

This is the tool necessary to compile, document, and package Java programs. It includes JRE.

### How many types of memory areas are allocated by JVM?

There are five types of memory areas that are allocated by JVM:

1. **Class(Method) Area:** It stores per-class structures such as the runtime constant pool, field, method data, and the code for methods.
2. **Heap:** It is the runtime data area in which objects are allocated.
3. **Stack:** Java Stack stores frames. It holds local variables and partial results, and plays a part in method invocation and return. Each thread has a private JVM stack, created at the same time as thread. A new frame is created each time a method is invoked. A frame is destroyed when its method invocation completes.
4. **Program Counter Register:** PC (program counter) register is created for each thread. It contains the address of the Java virtual machine instruction currently being executed.
5. **Native Method Stack:** It contains all the native methods used in the application.

### What is JIT compiler?

JIT stands for Just-In-Time compiler in Java. It is a program that helps in converting the Java bytecode into instructions that are sent directly to the processor. By default, the JIT compiler is enabled in Java and is activated whenever a Java method is invoked. The JIT compiler compiles the bytecode of that method into native machine code, compiling it "just in time" to execute. Once the method has been compiled, the JVM summons the compiled code of that method directly rather than interpreting it. This is why it is often responsible for the performance optimization of Java applications at the run time.

### What is classloader?

Classloader is a subsystem of JVM that is used to load class files. Whenever we run the java program, it is loaded first by the classloader. There are three built-in classloaders in Java:

1. **Bootstrap ClassLoader:** It loads JDK internal classes, typically loads rt.jar and other core classes.
2. **Extension ClassLoader:** It loads classes from the JDK extension directory, usually $JAVA_HOME/lib/ext directory.
3. **System/Application ClassLoader:** It loads classes from the current classpath that can be set while invoking a program using -cp or -classpath command line options.

### What is the default value of the local variables?

The local variables are not initialized to any default value, neither primitives nor object references. If you try to use these variables without initializing them explicitly, the compiler will not compile the program.

### What are the advantages of packages in Java?

There are various advantages of using packages in Java:

- Packages avoid the name clashes
- The Package provides easier access control
- We can also have hidden classes that are not visible outside and used by the package.
- It is easier to locate the related classes.

## Core Java - OOPs Concepts:

### What are the main features of OOP?

1. **Encapsulation:** The process of combining data and functions into a single unit called class is known as encapsulation. It keeps the data safe from outside interface and misuse. The data can be accessed only by using relevant functions. It is also known as data hiding.
2. **Abstraction:** The process of hiding the internal details and describing things in simple terms is known as abstraction. For example, a method that adds two integers. We don't need to know how it internally adds two integers. We just need to know that it adds two integers.
3. **Inheritance:** The process of deriving a new class from an old one is known as inheritance. The new class will have the combined features of both the classes. It helps in reusing the code and establishes a relationship between different classes.
4. **Polymorphism:** The process of performing one task by different ways is known as polymorphism. For example, to convince the customer differently, to draw something e.g. shape or rectangle etc.

### What is an object?

The object is an entity having some state and behavior. In Java, Object is an instance of the class having the instance variables as the state of the object and the methods as the behavior of the object. The object of a class can be created by using the `new` keyword.

### What is the difference between an object-oriented programming language and object-based programming language?

- Object-oriented languages follow all the concepts of OOPs whereas, the object-based language doesn't follow all the concepts of OOPs like inheritance and polymorphism.
- Object-oriented languages do not have the inbuilt objects whereas, object-based languages have the inbuilt objects, for example, JavaScript has window object.
- Examples of object-oriented languages are Java, C++, Smalltalk, etc. Examples of object-based languages are JavaScript, VBScript, etc.

### What will be the initial value of an object reference which is defined as an instance variable?

All object references are initialized to null in Java. If you try to access an object using a null reference, you will get a `NullPointerException`.

## Core Java - OOP Concepts: Constructor Interview Questions:

### What is a constructor?

The constructor can be defined as the special type of method that is used to initialize the state of an object. It is invoked when the `new` keyword is used for the object of the class. Every time an object is created using the `new()` keyword, at least one constructor is called. It calls a default constructor if there is no constructor available in the class. In such case, Java compiler provides a default constructor by default. The name of the constructor must be similar to the class name. The constructor must not have an explicit return type.

### Is constructor inherited?

No, the constructor is not inherited in Java. If you want to use a parent class constructor, use the super keyword.

### Can you make a constructor final?

No, the constructor can't be final.

### Can we overload the constructors?

Yes, the constructors can be overloaded by changing the number of arguments or by changing the data type of the arguments.

### What are the differences between constructors and methods?

| Constructor                                                                                   | Method                                                       |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Constructor is used to initialize the state of an object.                                     | Method is used to expose the behavior of an object.          |
| Constructor must not have an explicit return type.                                            | Method must have an explicit return type.                    |
| The Java compiler provides a default constructor if we don't have any constructor in a class. | The method is not provided by the compiler in any case.      |
| The constructor name must be same as the class name.                                          | The method name may or may not be similar to the class name. |

### What are the various access specifiers in Java?

- **public**: the classes, method, or variables which are defined as public, can be accessed by any class or method.
- **protected**: protected can be accessed by the class of the same package, or by the sub-class of this class, or within the same class.
- **default**: Default are accessible within the package only. By default, all the classes, methods, and variables are of default scope.
- **private**: the private class, methods, or variables defined as private can be accessed within the class only.

## Core Java - OOPs Concepts: static keyword Interview Questions:

### What is the static variable?

The static variable is used to refer to the common property of all objects (that is not unique for each object), e.g., The company name of employees, college name of students, etc. Static variable gets memory once only in the class area at the time of class loading. Using a static variable makes our program memory efficient (i.e., it saves memory). The static variable belongs to the class rather than the object. It can be accessed by using the class name.

![static_variable](/assets/images/static_variable.jpg)

### What is the static method?

- A static method belongs to the class rather than the object
- There is no need to create the object to call the static methods.
- A static method can access and change the value of static variable

### What are the restrictions that are applied to the Java static methods?

- The static method can not use non-static data member or call the non-static method directly.
- This and super cannot be used in static context as they are non-static

### Why is the main method static?

Because the object is not required to call the static method. If we make the main method non-static, JVM will have to create its object first and then call main() method which will lead to extra memory allocation.

### Can we override the static methods?

No, we can't override static methods.

### What is the static block?

Static block is used to initialize the static data member. It is executed before the main method, at time of classloading.

```java
class A2 {
    static{
        System.out.println("static block is invoked");
    }

    public static void main(String args[]){
        System.out.println("Hello main");
    }
}
```

```text
Output: static block is invoked
    Hello main
```

### Can we execute a program without main() method?

No

### What is the difference between static(class) method and instance method?

| static or class method                                                                                                                 | Instance Method                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| A method that is declared as static is known as the static method.                                                                     | A method that is not declared as static is known as the instance method  |
| We don't need to create the objects to call the static methods                                                                         | The object is required to call the instance methods                      |
| Non-static (instance) members cannot be accessed in the static context (static method, static block, and static nested class) directly | Static and non-static variables both can be accessed in instance methods |

### Can we make constructors static?

As we know that the static context (method, block, or variable) belongs to the class, not the object. Since the constructors are invoked only when the object is created, there is no sense to make the constructors static.

## Core Java - OOPs Concepts: Inheritance Interview Questions:

### Can we assign the reference to `this` variable?

No, this cannot be assigned to any value becasue it always points to the current class object and this is the final reference in Java. However, if we try to do so, the compiler error will be shown.

### Can `this` keyword be used to refer static members?

Yes, it is possible to use this keyword to refer static members because this is just a reference variable which refers to the current class object. However, as we know that, it is unnecessary to access static variables through objects.

### What is the Inheritance?

Inheritance is a mechanism by which one object acquires all the properties and behavior of another object of another class. It is used for `Code Reusability` and `Method Overriding`. The idea behind inheritance in Java is that we can create new classes that are built upon existing classes. When we inherit from an existing class, we can reuse methods and fields of parent class. Moreover, we can add new methods and fields in our current class.

### Why is Inheritance used in Java?

- Inheritance provides code reusability. The derived class does not need to redefine the method of base class unless it needs to provide the specific implementation of the method.
- Runtime polymorphism cannot be achieved without using inheritance
- Inheritance provides data hiding. The base class can hide some data from the derived class by making it private.
- Method overriding cannot be achieved without inheritance. By method overriding, we can give a specific implementation of some basic method contained by the base class.

### Which class is the superclass for all the classes?

The object class is the superclass of all other classes in Java.

### What is aggregation?

Aggregation can be defined as the relationship between two classes where the aggregate class contains a reference to the class it owns.

```java
class Address {
    String city;
    String country;

    Address(String city, String country) {
        this.city = city;
        this.country = country;
    }
}

class Person {
    String name;
    // Person HAS-A Address
    Address address;

    Person(String name, Address address) {
        this.name = name;
        this.address = address;
    }
}

public class Main {
    public static void main(String[] args) {
        Address address = new Address("New York", "USA");
        Person person = new Person("John", address);
    }
}
```

### What is composition?

Holding the reference of a class within some other class is known as composition. When an object contains the other object, if the contained object cannot exist without the existence of container object, then it is called composition.

```java
class Brain {
    // Brain class
}

class Person {
    // Person class
    private Brain brain; // Person HAS-A Brain

    Person() {
        this.brain = new Brain(); // Brain is created when Person is created
    }
}

public class Main {
    public static void main(String[] args) {
        Person person = new Person(); // Person and Brain are created together
    }
}
```

In this example, `Person` has a `Brain`. This is a composition relationship because a person is composed of a brain, among other things. The `Brain` cannot exist without the `Person`, and if the `Person is deleted`, the `Brain` is also deleted.

### Why does Java not support pointers?

- `Simplicity`
- `Security:` Pointers can lead to unauthorized access of memory areas in a program. By eliminating pointers, Java provides better security
- `Reliability:` Incorrect use of pointers can lead to problems such as memory leaks and unexpected program behavior.
- `Garbage Collection:` Java manages memory automatically, so we don't need to allocate and deallocate memory explicitly in the code.

### Can we use this() and super() both in a constructor?

No, because this() and super() must be the first statement in the class constructor.

## Core Java - OOPas Concepts: Method Overloading Interview Questions:

### What is method overloading?

Method overloading is a polymorphism technique which allows us to create multiple methods with the same name but different signature. We can achieve method overloading in two ways.

- By changing the number of arguments
- By changing the data type of arguments

### Why is method overloading not possible by changing the return type in Java?

In Java, method overloading is not possible by changing the return type of the program due to avoid the ambiguity.

```java
class Adder {
    static int add(int a, int b){return a + b;}
    static double add(int a, int b){return a + b;}
}

class TestOverloading3 {
    public static void main(String[] args) {
        System.out.println(Adder.add(11, 11));
    }
}
```

This will cause compiler error: method add(int, int) is defined in class Adder

### Can we overload the methods by making them static?

We cannot overload methods by changing only the static keyword or the return type. The method name and the number and types of parameters are what matter for overloading. Two methods with the same name and parameter list are considered to be the same method for the purposes of overloading, regardless of whether they are static or not, or whether they have different return types.

### Can we overload the main() method?

Yes, we can have any number of main methods in a Java program by using method overloading.

## Core Java - OOPs Concepts: Method Overriding Interview Questions:

### What is method overriding?

If a subclass provides a specific implementation of a method that is already provided by its parent class, it is known as Method Overriding. It is used for runtime polymorphism and to implement the interface methods.

##### Rules for Method Overriding:

- The method must have the same name as in the parent class
- The method must have the same signature as in the parent class
- Two classes must have an IS-A relationship between them.

### Can we override the static method?

No, we can't override the static method because they are part of the class, not the object.

### Why can't we not override static method?

It is because the static method is the part of the class, and it is bound with class whereas instance method is bound with the object, and static gets memory in class area, and instance gets memory in a heap.

### Can we override the overloaded method?

Yes.

### Differences between method Overloading and Overriding?

| Method Overloading                                          | Method Overriding                                                                                               |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Method overloading increases the readability of the program | Method overriding provides the specific implementation of the method that is already provided by its superclass |
| Method overloading occurs within the class.                 | Method overriding occurs in two classes that have IS-A relationship between them.                               |
| In this case, the parameters must be different              | In this case, the parameters must be the same                                                                   |

### Can we override the private methods?

No, we cannot override the private methods because the scope of private methods is limited to the class and we cannot access them outside of the class.

### Can we change the scope of the overridden method in the subclass?

Yes, we can change the scope of the overriden method in the subclass. However, we must notice that we cannot decrease the accessility of the method (which means we can't change public to private, but we can change private to public).

### Can we modify the throws calsue of the superclass method while overriding it in the subclass?

Yes, we can modify the throws clause of the superclass method while overriding it in the subclass. However, there are some rules which are to be followed while overriding while overriding in case of exception handling.

- If the superclass method does not declare an exception, subclass overridden method cannot declare the checked exception, but it can declare the unchecked exception.
- If the superclass method declares an exception, subclass overridden method can declare same, subclass exception or no exception but cannot declare parent exception.

```java
import java.io.IOException;

class SuperClass {
    void method() throws IOException {
        // Superclass method throws IOException
    }
}

class SubClass extends SuperClass {
    @Override
    void method() throws IOException {
        // Subclass method can throw IOException
    }
}

class SubClass2 extends SuperClass {
    @Override
    void method() {
        // Or it can throw no exception
    }
}

class SubClass3 extends SuperClass {
    @Override
    void method() throws FileNotFoundException {
        // Or it can throw a child exception of IOException (FileNotFoundException is the child class of IOException)
    }
}

// This would not compile
/*
class SubClass4 extends SuperClass {
    @Override
    void method() throws Exception {
        // It cannot throw a parent exception of IOException
    }
}
*/
```

### What is covariant return type?

Covariant return type refers to the ability of a method in a subclass to return a type that is a subclass of the type returned by the same method in the superclass. This feature was introduced in Java 5.

```java
class SuperClass {
    SuperClass get() {
        return this;
    }
}

class SubClass extends SuperClass {
    @Override
    SubClass get() {
        return this;
    }
}

public class Main {
    public static void main(String[] args) {
        new SubClass().get();
    }
}
```

## Core Java - OOPs Concepts: final keyword Interview Questions:

### What is the final variable?

In Java, the final variable is used to restrict the user from updating it. If we initialize the final variable, we can't change its value. In other words, we can say that the final variable once assigned to a value, can never be changed after that.

- stop value change
- stop method overriding
- stop inheritance

### What is the final blank variable?

A final variable, not initialized at the time of declaration, is known as the final blank variable. We can't initialize the final blank variable directly. Instead, we have to initialize it by using the class constructor. It is useful in the case when the user has some data which must not be changed by others.

### Can we initialize the final blank variable?

Yes, if it is not static, we can intialize it in the constructor. If it is static blank final variable, it can be intialized only in the static block.

### Can we declare the main method as final?

Yes, we can declare the main method as public static final void main(String[] args){}.

### Can we declare a constructor as final?

The constructor can never be declared as final because the interface must be implemented by some class to provide its definition. Therefore, there is no sense to make an interface final. However, if we try to do so, the compiler will show an error.

### What is the difference between the final method and abstract method?

The main difference between the final method and abstract method is that the abstract method cannot be final as we need to override them in the subclass to give its definition.

## Core Java - OOPs: Polymorphism Interview Questions:

### What is the difference between compile-time polymorphism and runtime polymorphism?

| SN  | Compile-time polymorphism                                                                                                                     | Runtime polymorphism                                                                                                                                                                                                                                    |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | In compile-time polymorphism, call to a method is resolved at compile-time.                                                                   | In runtime polymorphism, call to an overriden method is resolved at runtime                                                                                                                                                                             |
| 2   | It is also known as static binding, early binding, or overloading.                                                                            | It is also known as dynamic binding, late binding, overriding, or dynamic method dispatch                                                                                                                                                               |
| 3   | Overloading is a way to achieve compile-time polymorphism in which, we can define multiple methods or constructors with different signatures. | Overriding is a way to achieve runtime polymorphism in which, we can redefine some particular method or variable in the derived class. By using overriding, we can give some specific implementation to the base class properties in the derived class. |
| 4   | It provides fast execution because the type of an object is determined at compile time.                                                       | It provides slower execution as compare to compile-time because the type of an object is determined at run-time.                                                                                                                                        |
| 5   | Compile-time polymorphism provides less flexibility because all the things are resolved at compile-time.                                      | Run-time polymorphism provides more flexibility because all the things are resolved at runtime.                                                                                                                                                         |

### Can we achieve Runtime Polymorphism by data members?

No, because method overriding is used to achieve runtime polymorphism and data members cannot be overriden. We can override the member functions but not the data members.Consider the example below.

```java
class Bike {
    int speedlimit = 90;
}

class Honda3 extends Bike {
    int speedlimit = 150;
    public static void main(String args[]) {
        Bike obj = new Honda3(); //upcasting
        System.out.println(obj.speedlimit);
    }
}
```

### What is the difference between static binding and dynamic binding?

In case of the static binding, the type of the object is determined at compile-time whereas, in the dynamic binding, the type of the object is determined at runtime.

### What is Java `instanceOf` operator?

The `instanceof` in Java is also known as type comparison operator because it compares the instance with type. It returns either true or false. If we apply the `instanceof` operator with any variable that has a null value, it returns false. Consider the following example.

```java
class Simple {
    public static void main(String[] args) {
        Simple1 s = new Simple1();
        System.out.println(s instanceof Simple1);//true
    }
}
```

An object of subclass type is also a type of parent class. For example, if Dog extends Animal then object of Dog can be referred by either Dog or Animal class.

## Core Java - OOPs Concepts: Abstraction Interview Questions:

### What is abstraction?

Abstraction is the process of hiding the implementation details and showing only functionality to the user. It displays just the essential things to the user and hides the internal information, for example, sending SMS where we type the text and send the message. We don't know the internal processing about the message delivery. Abstraction enables us to focos on what the object does instead of how it does it.

In Java, there are two ways to achieve the abstraction.

- Abstract class
- Interface

### What is the difference between abstraction and encapsulation?

Abstraction hides the implementation details whereas encapsulation wraps code and data into a single unit.

### What is the abstract class?

A class that is declared as abstract is known as an abstract class. It needs to be extended and its method implemented. `It cannot be instantiated.` It can have abstract methods, non-abstract methods, constructors, and static methods. It can also have the final methods which will force the subclass not to change the body of the method.

### Can there be an abstract method without an abstract class?

No, if there is an abstract method in a class, the class must be abstract.

### Can we use abstract and final both with a method?

No, because we need to override the abstract method to provide its implementation, whereas we can't override the final method.

### What is the interface?

The interface is a blueprint for a class that has static constants and abstract methods. It can be used to achieve full abstraction and multiple inheritance. It is a mechanism to achieve abstraction. There can be only abstract methods in the Java Interface, not method body. It is used to achieve abstraction and multiple inheritance in Java. In Java interface, we can declare variables, but they are implicitly `public`, `static`, and `final`, meaning they are constants. We must provide a value for these variables at the time of declaration, and once assigned, their value cannot be changed.

### Can we declare an interface method static?

No, because methods of an interface are abstract by default, and we can not use static and abstract together. The abstract method is a form of dynamic binding (runtime polymorphism), and a static method is a form of static binding (compile-time polymorphism).

### What is a marker interface?

A marker interface in Java is an interface with no fields or methods.

### What are the differences between abstract class and interface?

| Abstract class                                                                         | Interface                                                               |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| An abstract class can have a method body (non-abstract methods.)                       | The interface has only abstract methods.                                |
| An abstract class can have instance variables                                          | An interface cannot have instance variables                             |
| An abstract class can have the constructor.                                            | The interface cannot have the constructor                               |
| An abstract class can have static methods.                                             | The interface cannot have static methods                                |
| We can extend one abstract class                                                       | We can implement multiple interfaces.                                   |
| The abstract class `can provide the implementation of the interface.`                  | The interface `can't provide the implementation of the abstract class`. |
| The `abstract keyword` is used to declare an abstract class.                           | The `interface keyword` is used to declare an interface.                |
| An `abstract` class can be extended using keyword `extends`                            | An `interface class` can be implemented using keyword `implements`      |
| An abstract class can extend another Java class and implement multiple Java interfaces | An interface can extend another Java interface only                     |
| A Java `abstract class` can have class members like private, protected, etc            | Members of a Java interface are public by default                       |

### Can we define private and protected modifiers for the members in interfaces?

No, they are implicitly public.

### When can an object reference be cast to an interface reference?

An object reference can be cast to an interface reference when the object implements the referenced interface.

### How to make a read-only class in Java?

A class can be made read-only by making all of the fields private. The read-only class will have only getter methods which return the private property of the class to the main method. We cannot modify this property because there is no setter method available in the class.

### How to make a write-only class in Java?

A class can be made write-only by making all of the fields private. The write-only class will have only setter methods which set the value passed from the main method to the private fields. We cannot read the properties of the class because there is no getter method in this class.

### What are the advantages of Encapsulation in Java?

- By providing only the setter or getter method, we can make the class read-only or write-only.
- It provides us the control over data. Suppose we want to set the value of id which should be greater than 100 only, we can write the logic inside the setter method. We can write the logic not to store the negative numbers in the setter methods.
- It is a way to achieve data hiding in Java because other class will not be able to access the data through the private data members.
- The encapsulate class is easy to test. So, it is better for unit testing.
- The standard IDE's are providing the facility to generate the getters and setters. So, it is easy and fast to create an encapsulated class in Java.

## Core Java - OOPs Concepts: Package Interview Questions

### What is the package?

A package is a group of similar type of classes, interfaces, and sub-packages. It provides access protection and removes naming collision. The packages in Java can be categorized into two forms, in-built package, and user-defined package. There are many built-in packages such as Java, lang, awt, javax, swing, sql, etc.

![java_packages](/assets/images/java_packages.jpg)

### What are the advantages of defining packages in Java?

By defining packages, we can avoid the name conflicts between the same class names defined in different packages. Packages also enable the developer t organize the similar classes more effectively. For example, one can clearly understand that the classes present in java.io package are used to perform io related operations.

### Do we need to import java.lang package any time? why?

No. it is by default loaded internally by the JVM.

### Can I import the same package/class twice? Will the JVM load the package twice at runtime?

One can import the same package or the same class multiple times. Neither compiler nor JVM complains about it. However, the JVM will internally load the class only once no matter how many times we import the same class or package.

## Java: Exception Handling Interview Questions

### How many types of exception can occur in a Java program?

There are mainly two types of exceptions: checked and unchecked. Here, an `error` is considered `unchecked` exception. According to Oracle, there are three types of exceptions:

- **Checked Exception:** Checked exceptions are the one which are checked at compile-time. For example, SQLException, ClassNotFoundExceptionm, etc.
- **Unchecked Exception:** Unchecked exceptions are the one which are handled at runtime because they can not be checked at compile-time. For example, ArithmaticException, NullPointerException, ArrayIndexOutOfBoundsException, etc.
- **Error:** Error cause the program to exit since they are not recoverable. For example, OutOfMemoeryError, AssertionError, etc.

### What is Exception Handling?

Exception Handling is a mechanism that is used to handle runtime errors. It is used primarily to handle checked exceptions. Exception handling maintains the normal flow of the program. There are mainly two types of exceptions: checked and unchecked.

### Explain the hierarchy of Java Exception classes?

The java.lang.Trowable class is the root class of Java Exception hierarchy which is inherited by two subclasses: Exception and Error. A hierarchy of Java Exception classes are given below:

![Java_Exception](/assets/images/java_exception.jpg)

### What is the difference between Checked Exception and Unchecked Exception?

- **Checked Exception:**
  The classes that extend Throwable except RuntimeException and Error are known as checked exceptions, e.g., IOException, SQLException, etc. Checked Exceptions are checked at compile time.
- **Unchecked Exception:**
  The classes that extend RuntimeException are known as unchecked exceptions, e.g., ArithmeticException, NullPointerException, etc. Unchecked Exceptions are not checked at compile-time.

### What is the base class for Error and Exception?

The throwable class is the base class for Error and Exception

### Can finally block used without a catch?

Yes, according to the definition of finally block, it must be followed by a try or catch block, therefore, we can use try block instead of catch.

### Is there any case when finally will not be executed?

Finally block will not be executed if program exits.

### What is the difference between throw and throws?

| throw keyword                                                  | throws keyword                                                                                  |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| The **throw** keyword is used to throw an exception explicitly | The **throws** keyword is used to declare an exception                                          |
| The checked exceptions cannot be propagated with throw only    | The checked exception can be propagated with throws                                             |
| The **throw** keyword is follwed by an instance                | The **throws** keyword is followed by class.                                                    |
| The **throw** keyword is used within the method.               | The **throws** keyword is used with the method signature.                                       |
| We cannot throw multiple exceptions                            | We can declare multiple exceptions, e.g., public void method() throws IOException, SQLException |

### Can subclass overriding method declare an exception if parent class method doesn't throw an exception?

Yes but only unchecked exception not checked.

### What is exception propagation?

Exception propagation refers to the process by which an exception is handled in a program. When an exception is thrown in a method, and it is not caught within that method, the method terminates and the exception is passed up (or "propagated") to the method that called it. This process continues up the call stack until the exception is caught and handled, or until it reaches the top of the call stack and terminates the program.

```java
public void method1() {
    method2();
}

public void method2() throws IOException {
    throw new IOException("Exception thrown in method2");
}
```

## Java: String Handling Interview Questions:

### What is String Pool?

The String pool in Java is a special area in the Heap memory where String literals are stored by the JVM. When a String is created using double quotes, the JVM first checks the String pool. If the String already exists in the pool, a reference to the pooled instance is returned. If the String doesn't exist in the pool, a new String object is created and placed in the pool, and its reference is returned.

This mechanism can lead to more efficient memory usage because identical String literals share memory in the String pool. However, it only applies to Strings created with double quotes, not to those created with the new keyword.

```java
String str1 = "Hello";  // This will be put in the String pool
String str2 = "Hello";  // This will not create a new String. It will reference the same String as str1 in the pool
String str3 = new String("Hello");  // This will create a new String object in heap memory, not in the String pool
```

In this case, `str1` and `str2` point to the same object in the String pool, while `str3` points to a different String object in the heap memory.

### What is the meaning of immutable regarding String?

In Java, String is immutable once string object has been created, its value can't be changed.

```java
class Testimmutablestring{
    public static void main(String[] args) {
        String s = "Sachin";
        s.concat("Tendulkar"); //concat() method appends the string at the end
        System.out.println(s); //will print Sachin because strings are immutable objects
    }
}
```

### Why are the objects immutable in Java?

Because Java uses the concept of the string literal. Suppose there are five reference variables, all refer to one object "sachin". If one reference variable changes the value of the object, it will be affected by all the reference variables. That is why string objects are immutable in Java.

### Why Java uses the concept of the string literal?

To make Java more memory efficient (because no new objects are created if it exists already in the string constant pool).

### How many objects will be created in the following code?

```java
String s = new String("welcome");
```

Two objects. One in the String Constant Pool (This is where the literall "welcome" is placed). One in the Heap (The `new` keyword guarantees that a new object will be created in the heap memory. This object will have the value "welcome")

### What are the differences between String and StringBuffer?

| String                                                                                                                           | StringBuffer                                                                |
| -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| The String class is immutable                                                                                                    | The StringBuffer class is mutable                                           |
| The String is slow and consumes more memory when we concat too many strings because every time it creates a new instance         | The StringBuffer is fast and consumes less memory when we concat strings.   |
| The String class overrides the equals() method of Object class. So we can compare the contents of two strings by equals() method | The StringBuffer class doesn't override the equals() method of Object class |

### What are the differences between StringBuffer and StringBuilder?

| StringBuffer                                                                                                                 | StringBuilder                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| StringBuffer is synchronized, i.e., thread safe. It means two threads can't call the methods of StringBuffer simultaneously. | StringBuilder is non-synchronized, i.e., not thread safe. It means two threads can call the methods of StringBuilder simultaneously. |
| StringBuffer is less efficient than StringBuilder                                                                            | StringBuilder is more efficient than StringBuffer                                                                                    |

### Why CharArray() is preferred over String to store the password?

String stays in the string pool until the garbage is collected. If we store the password into a string, it stays in the memory for a longer period, and anyone having the memory-dump can extract the password as clear text. On the other hand, Using CharArray allows us to set it to blank whenever we are done with the password. It avoids the security threat with the string by enabling us to control the memory.

## Core Java: Nested classes and Interfaces Interview Questions

### What are the advantages of Java inner classes?

- Nested classes represent a special type of relationship that is it can access all the members of the outer class including private.
- Nested classes are used to develop a more readable and maintainable code because it logically gorups classes and interfaces in one place only
- `Code Optimization:` it requires less code to write.

### What are the disadvantages of using inner classes?

- Inner classes increase the total number of classes used by the developer and therefore increases the workload of JVM since it has to perform some routine operations for those extra classes which result in slower performance.
- IDEs provide less support to the inner classes as compare to the top level classes and therefore it annoys the developers while working with inner classes.

### Is there any difference between nested classes and inner classes?

Yes, inner classes are non-static nested classes. In other words, we can say that inner classes are the part of nested classes.

### Can a class have an interface?

Yes, an interface can be defined within the class. It is called nested interface.

```java
public class MyClass {
    public interface MyInterface {
        void myMethod();
    }
}

public class ImplementingClass implements MyClass.MyInterface {
    @Override
    public void myMethod() {
        System.out.println("Implementing the nested interface method");
    }
}
```

### Can an Interface have a class?

Yes, they are static implicitly.

## Garbage Collection Interview Questions

### What is Garbage Collection?

Garbage collection is a process of reclaiming the unused runtime objects. It is performed for memory management. In other words, we can say that it is the process of removing unused objects from the memory to free up space and make this space available for JVM. Due to garbage collection Java gives 0 as output to a variable whose value is not set, i.e., the variable has been defined but not initialized.For this purpose, we were using free() function in the C language and delete() in C++. In Java, it is performed automatically. So, Java provides better memory management.

### What is gc()?

The gc() method is used to invoke the garbage collector for cleanup processing. This method is found in System and Runtime classes. This function explicitly makes the JVM free up the space occupied by the unused objects so that it can be utilized or reused.

```java
public class TestGarbage1{
    public void finalize(){System.out.println("object is garbage collected");}
    public static void main(String[] args) {
        TestGarbage1 s1 = new TestGarbage1();
        TestGarbage1 s2 = new TestGarbage1();
        s1 = null;
        s2 = null;
        System.gc();
        //output:
        //object is garbage collected
        //object is garbage collected
    }
}
```

### How is garbage collection controlled?

Garbage Collection is managed by JVM. It is performed when there is not enough space in the memory and memory is running low.

### How can an object be unreferenced?

- By nulling the reference.
  ```java
  Employee e = new Employee();
  e = null;
  ```
- By assigning a reference to another.

```java
Employee e1 = new Employee();
Employee e2 = new Employee();
e1 = e2;
```

- By anonymous object.
  ```java
  new Employee();
  ```

### What is the purpose of the finalize() method?

The finalize() method is invoked just before the object is garbage collected. It is used to perform cleanup processing. This is typically necessary for objects that hold non-Java resources, such as file handles or database connections, and need to clean them up before they are garbage collected.

### What is the purpose of the Runtime class?

The Runtime class in Java is used to interact with the Java runtime environment. The Runtime class is part of java.lang package. It provides methods to execute a process, invoke garbage collection, get the amount of free memory, etc.

```java
Runtime runtime = Runtime.getRuntime();
long memoryBefore = runtime.freeMemory();
System.out.println("Free memory before creating new objects: " + memoryBefore);

// Create some objects here...

long memoryAfter = runtime.freeMemory();
System.out.println("Free memory after creating new objects: " + memoryAfter);

System.out.println("Memory used by new objects: " + (memoryBefore - memoryAfter));
```

### How will you invoke any external process in Java?

In Java, we can use the `Runtime.exec()` method or the ProcessBuilder class to invoke an external process.

```java
public class Runtime1 {
    public static void main(String args[]) throws Exception {
        Runtime.getRuntime().exec("notepad");//will open a new notepad
    }
}
```

## I/O Interview Questions:

### What do you understand by an IO stream?

The stream is a sequence of data that flows from source to destination. It is composed of bytes. In Java, three streams are created for us automatically.

- System.out: standard output stream
- System.in: standard input stream
- System.err: standard error stream

### what is the difference between the Reader/Writer class hierarchy and the InputStream/OutputStream class hierarchy?

- The Reader/Writer class hierarchy is character-oriented. These are character streams and are used for reading and writing text data (characters).
- The InputStream/OutputStream class hierarchy is byte-oriented.These are byte streams and are used for reading and writing binary data. They are suitable for handling raw binary data like images, audio, video, etc.

### What are the super most classes for all the streams?

All the stream classes can be divided into two types of classes that are ByteStream classes and CharacterStream classes. The ByteStream classes are further divided into InputStream classes and OutputStream classes. CharacterStream classes are also divided into Reader classes and Writer classes. The SuperMost classes for all the InputStream classes is **java.io.InputStream** and for all the output stream classes is **java.io.OutputStream**. Similarly, for all the reader classes, the super-most class is **java.io.Reader**, and for all the writer classes, it is **java.io.Writer**.

### What are the FileInputStream and FileOutputStream?

##### FileOutputStream:

**Java FileOutputStream** is an output stream used for writing data to a file. If we have some primitive values to write into a file, use FileOutputStream class. We can write byte-oriented as well as character-oriented data through the FileOutputStream class. However, for character-oriented data, it is preferred to use FileWriter than FileOutputStream.

```java
import java.io.FileOutputStream;
public class FileOutputStreamExample {
    public static void main(String[] args) {
        try {
            FileOutputStream fout = new FileOutputStream("D:\\testout.txt");
            fout.write(65);
            fout.close();
            System.out.println("success...");
        } catch(Exception e) {System.out.println(e);}
    }
}
```

##### FileInputStream:

**Java FileInputStream class** obtains input bytes from a file. It is used for reading byte-oriented data (streams of raw bytes) such as image data, audio, video, etc. We can also read character-stream data. However, for reading streams of characters, it is recommended to use FileReader class.

```java
import java.io.FileInputStream;
public class DataStreamExample {
    public static void main(String[] args) {
        try {
            FileInputStream fin = new FileInputStream("D:\\testout.txt");
            int i = fin.read();
            System.out.print((char)i);

            fin.close();
        } catch(Exception e) {System.out.println(e);}
    }
}
```

### What is the purpose of using BufferedInputStream and BufferedOutputStream classes?

Java BufferedOutputStream class is used for buffering an output stream. It internally uses a buffer to store data. It adds more efficiency than to write data directly into a stream. So it makes the performance fast. Whereas, Java BufferedInputStream class is used to read information from the stream. It internally uses the buffer mechanism to make the performance fast.

### What are FilterStreams?

**FilterStream classes** are used to add additional functionalities to the other stream classes. FilterStream classes act like an interface which read the data from a stream, filters it, and pass the filtered data to the caller. The FilterStream classes provide extra functionalities like adding line numbers to the destination file, etc.

### What is an I/O filter?

An I/O filter is an object that reads from one stream and writes to another, usually altering the data in some way as it is passed from one stream to another. Many Filter classes that allow a user to make a chain using multiple input streams. It generates a combined effect on several filters.

### In Java, how many ways we can take input from the console?

- Using `Scanner` class: The `java.util.Scanner` class is a simple text scanner which can parse primitive types and strings. It breaks its input into tokens using a delimiter pattern, which by default matches whitespace.

```java
Scanner scanner = new Scanner(System.in);
String input = scanner.nextLine();
```

- Using `BufferedReader` and `InputStreamReader` classes:The `java.io.BufferedReader` class reads text from a character-input stream, buffering characters so as to provide for the efficient reading of characters, arrays, and lines. The `java.io.InputStreamReader` is a bridge from byte streams to character streams.

```java
BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
String input = reader.readLine();
```

- Using `Console` class: The `java.io.Console` class provides methods to access the character-based console device, if any, associated with the current Java virtual machine.

```java
Console console = System.console();
String input = console.readLine();
```

## Serialization Interview Questions:

### What is serialization?

Serialization in Java is a mechanism of converting the state of an object into a byte stream. It's mainly used in Hibernate, RMI, JPA, EJB and JMS technologies. It's used where data needs to be transmitted over the network or stored in files, databases, or caches.

### How can we make a class serializable in Java?

In Java, you can make a class serializable by implementing the `java.io.Serializable` interface.

### Can a Serialized object be transferred via network?

Yes, we can transfer a serialized object via network because the serialized object is stored in the memory in the form of bytes and can be transmitted over the network. We can also write the serialized object to the disk or the database.

### What is the transient keyword?

If we define any data member as transient, then it will not be serialized.

### What is the difference between Serializable?

`Serializable` and `Externalizable` are both interfaces in Java that are used for object serialization. The main difference between them lies in the level of control they offer over the serialization process. `Serializable` is a marker interface (it does not have any methods) so the serialization process is automatic, and Java handles the entire process internally. We don't have control over the serialization process. `Externalizable` adds two methods: writeExternal() an readExternal(). When a class implements Externalizable, we have full control over the serialization process. We need to override these two methods and define exactly what to do during the serialization and deserialization.

## Miscellaneous Interview Questions:

### What are wrapper classes?

Wrapper classes in Java provide a way to use primitive data types (int, boolean, char etc.) as objects. For every primitive type, there is a corresponding wrapper class. These are all part of the java.lang package, which is imported by default into all Java programs.

- `byte`: Byte
- `short`: Short
- `int`: Integer
- `long`: Long
- `float`: Float
- `double`: Double
- `boolean`: Boolean
- `char`: Character

### what are autoboxing and unboxing? when does it occur?

Autoboxing and unboxing are mechanisms in Java that allow automatic conversion between primitive types and their corresponding wrapper classes.

- Autoboxing: Autoboxing is the automatic conversion of a primitive type to its corresponding wrapper class. This happens when a primitive value is assigned to a variable of the corresponding wrapper class.
  ```java
  Integer myInteger = 5;  // Autoboxing from int to Integer
  ```
- Unboxing: Unboxing is the automatic conversion of a wrapper class to its corresponding primitive type. This happens when a value of a wrapper class is assigned to a variable of the corresponding primitive type.
  ```java
  int myInt = myInteger;  // Unboxing from Integer to int
  ```

### What is object cloning?

Object cloning in Java is the process of creating an exact copy of an object. It means the cloned object will have the same state as the original object.

```java
int[] originalArray = {1, 2, 3, 4, 5};
int[] clonedArray = originalArray.clone();

// Now clonedArray is a copy of originalArray
```

### What are the advantages and disadvantages of object cloning?

##### Advantages of Object Cloning:

- **Simplicity**: Cloning an object is easier and faster than creating a new object and copying each property individually, especially for complex objects.
- **Performance**: If object creation involves time-consuming operations (like reading from a database), cloning can be more efficient because it doesn't require those operations.
- **Independence**: The cloned object is independent of the original object. Changes to the cloned object do not affect the original object.

##### Disadvantages of Object Cloning:

- **Security**: Cloning can be a security risk because it allows for the creation of an exact copy of an object. If the object represents a sensitive resource, this could be a problem.
- **Clonable Interface**: We have to implement the Clonable interface while it does not have any methods in it. We have to use it to tell the JVM that we can perform a clone() on our object.
  - Object.clone() is protected, so we have to provide our own clown() and indirectly call Object.clone() from it.
  - Object.clone() does not invoke any constructor, so we do not have any control over object construction.
- **Shallow Copy**: In a shallow copy, a new object is created and the non-static fields of the current object are copied to the new object. If the field is a value type, a copy of the value is made. However, if the field is a reference type, the reference is copied but the referred object is not; therefore, the original object and its clone refer to the same object.

### What is shallow copy and deep copy?

- **Shallow Copy**: In a shallow copy, a new object is created and the non-static fields of the current object are copied to the new object. If the field is a value type, a copy of the value is made. However, if the field is a reference type, the reference is copied but the referred object is not; therefore, the original object and its clone refer to the same object.

```java
ArrayList<String> originalList = new ArrayList<>();
// add elements to originalList...
ArrayList<String> shallowCopy = (ArrayList<String>) originalList.clone();
```

In this example, `originalList` and `shallowCopy` are different lists, but they refer to the same elements. If we change an element in one list, it changes in the other list.

- **Deep Copy**: In a deep copy, a new object is created and the non-static fields of the current object are copied to the new object. If the field is a value type, a copy of the value is made. If the field is a reference type, a new copy of the referred object is made and the new object refers to the copy. Deep copy is more complex because it involves creating copies of all nested objects.

```java
ArrayList<String> originalList = new ArrayList<>();
// add elements to originalList...
ArrayList<String> deepCopy = new ArrayList<>(originalList);
```

In this example, originalList and deepCopy are different lists and they refer to different elements. If we change an element in one list, it does not affect the other list.

### What is the purpose of the strictfp keyword?

The **strictfp** keyword in Java is used to restrict the precision and rounding of floating point calculations to ensure portability. In Java, floating point calculations are generally platform dependent, which means they can produce different results on different platforms.

```java
public strictfp class MyClass {
    // All floating point calculations in this class conform to IEEE 754.
}
```

### What is the purpose of the System class?

The `System` class in Java provides several useful class fields and methods. It cannot be instantiated, that is, objects cannot be created from the class. Instead, most of its functionality is accessible through static methods and fields.

- Standard input
- Error output streams
- Standard output
- load files and libraries

### What is a singleton class?

A singleton class in Java is a class that allows only a single instance of itself to be created and gives access to that created instance. It contains static variables that can accommodate unique and private instances of itself. It is used in scenarios where a single instance of a class needs to be shared across multiple parts of an application.

```java
public class Singleton {
    // Create a private static instance of the class
    private static final Singleton instance = new Singleton();

    // Make the constructor private so it can't be instantiated from outside the class
    private Singleton() {}

    // Provide a public static method to get the instance of the class
    public static Singleton getInstance() {
        return instance;
    }
}
```
