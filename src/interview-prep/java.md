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

## What do you understand by Java virtual machine?

Java Virtual Machine is a virtual machine that enables the computer to run the Java program. JVM acts like a run-time engine which calls the main method present in the Java code. JVM is a part of the JRE (Java Runtime Environment). The Java code is compiled by JVM to be a Bytecode which is machine independent.

## Compare JDK vs. JVM vs. JRE

### JVM (Java Virtual Machine)

This is the heart of the Java Platform. It is a virtual machine that interprets Java bytecode and executes it as native code on the host machine. JVM is a part of the Java Runtime Environment.

### Internal architecture of JVM

![JVM architecture](/assets/images/jvmArchitecture.jpg)
It contains classloader, memory area, execution engine etc.

### JRE (Java Runtime Environment)

JRE is the environment where Java programs run. This is the system that takes our Java code, and combines it with the necessary libraries, and starts the JVM to execute it. JRE is a part of the Java Development Kit

### JDK (Java Development Kit)

This is the tool necessary to compile, document, and package Java programs. It includes JRE.

## How many types of memory areas are allocated by JVM?

There are five types of memory areas that are allocated by JVM:

1. **Class(Method) Area:** It stores per-class structures such as the runtime constant pool, field, method data, and the code for methods.
2. **Heap:** It is the runtime data area in which objects are allocated.
3. **Stack:** Java Stack stores frames. It holds local variables and partial results, and plays a part in method invocation and return. Each thread has a private JVM stack, created at the same time as thread. A new frame is created each time a method is invoked. A frame is destroyed when its method invocation completes.
4. **Program Counter Register:** PC (program counter) register is created for each thread. It contains the address of the Java virtual machine instruction currently being executed.
5. **Native Method Stack:** It contains all the native methods used in the application.

## What is JIT compiler?

JIT stands for Just-In-Time compiler in Java. It is a program that helps in converting the Java bytecode into instructions that are sent directly to the processor. By default, the JIT compiler is enabled in Java and is activated whenever a Java method is invoked. The JIT compiler compiles the bytecode of that method into native machine code, compiling it "just in time" to execute. Once the method has been compiled, the JVM summons the compiled code of that method directly rather than interpreting it. This is why it is often responsible for the performance optimization of Java applications at the run time.

## What is classloader?

Classloader is a subsystem of JVM that is used to load class files. Whenever we run the java program, it is loaded first by the classloader. There are three built-in classloaders in Java:

1. **Bootstrap ClassLoader:** It loads JDK internal classes, typically loads rt.jar and other core classes.
2. **Extension ClassLoader:** It loads classes from the JDK extension directory, usually $JAVA_HOME/lib/ext directory.
3. **System/Application ClassLoader:** It loads classes from the current classpath that can be set while invoking a program using -cp or -classpath command line options.

## What is the default value of the local variables?

The local variables are not initialized to any default value, neither primitives nor object references. If you try to use these variables without initializing them explicitly, the compiler will not compile the program.

## What are the advantages of packages in Java?

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
