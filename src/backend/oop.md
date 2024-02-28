---
icon: pen-to-square
date: 2024-02-25
category:
  - backend
tag:
  - C#
  - OOP
---

# OOP

## Object Oriented Programming in C#:

- **Classes**: A class defines the structure using methods(behavior) and properties(data) that is like the blueprint for creating objects.

- **Methods**: a method performs a specific task and represents a particular behavior.

-- **Properties**: properties hold the data temporarily during the execution of an application.

-- **Objects**: Objects are instances of classes. They represent real-world entities and are created based on the structure defined by a class. Each object has its own set of data stored in properties and can invoke the methods of its class.

-- **Interfaces**: An interfacer is a contract that defines a set of methods and properties that a class or struct agrees to implement. Interfaces are used to achieve polymorphism.

## Abstraction:

Abstraction in object-oriented programming is the process of hiding the implemtation details and showing only the functionality to the user. It allows us to focus on what the object does instead of how it does it. In other words, abstraction is focusing on business requirement instead of focusing on implementation details.

Abstaction can be achieved in two ways: 1. **Abstract class** 2. **Interfaces**

### What is the difference between abstract class and interface in C#?

1. **instantiation**: an abstract class cannot be instantiated, but it can have a constructor. An interface cannot be instantiated and does not have a constructor.

2. **implementation**: an abstract class can provide an implementation for some of its methods, leaving the rest to be implemented by any derived classes. An interface cannot provide an implementation for any of its methods.

3. **inheritance**: a class can inherit from multiple interfaces, but it can only inherit from one abstract class.

4. **access modifiers**: members of an abstract class can have access modifiers like `public`, `private`, `protected`. Members of an interface are implicitly public and cannot have access modifiers.

## Encapsulation

Encapsulation refers to the bundling of data (attributes or properties) and methods (functions or procedures) that operate on the data into a single unit known as a class.

### key concepts related to encapsulation:

1. Data Hiding:
2. Access Modifiers:
3. Public Interface:
4. Security and Validation:
5. Flexibility and Maintenance:

## What is the difference between abstraction and encapsulation?

Abstraction is a way of thinking, whereas encapsulation is a technique to implement abstraction. Encapsulation is a technique to implement abstraction in code. Create classes and their members with appropriate access modifiers to show or hide details and complexity.

## Inheritance:

Inheritance allows one class to inherit the members(fields, methods, properties) of another class.

### Roles of Access Modifiers in Inheritance

1. **Public Members**: the public members of the base class are accessible in the derived class and also become part of the derived class object.

2. **Private Members**: the private members of the base class cannot be accessed directly from the derived class and cannot be part of the derived class object.

3. **Protected Members**: the protected members of the base class can be accessible in the derived class but cannot be a part of the derived class object.

4. **Internal Members**: internal members are accessible in the derived class and are part of the derived class object. But compared to public access modifer, internal access modifier are accessible only within the same assembly (typically the same project or assembly).

### Important Points:

- A class cannot inherit from a struct.
- An interface can inherit from one or more interfaces but cannot inherit from a class or a struct.
- Constructors cannot be inherited.

## Polymorphism:

Polymorphism means multiple forms or shapes.

### Compile-time Polymorphism (Method Overloading):

C# allows us to define more than one method with the same name but with different signatures. This is called method overloading.

#### Rules for Method Overloading:

- Method names should be the same but method signatures must be different. Either the number of parameters, type of parameters, or order of parameters must be different.
- The return type of the methods does not play any role in the method overloading. If the return type is different, it will give a compile time error.
- Method overloading is a form of compile-time polymorphism because the decision about which method to call is made by the compiler at compile time based on the method signature and the types of arguments.

### Runtime Polymorphism: Method Overriding:

Method Overriding is a feature that allows a derived class to provide a specific implementation of a method that is already provided by its parent class or super class. In C#, all the members of a class are sealed and cannot be redefined in the derived class. Use the `virtual` keyword with a member of the base class to make it overridable, and use the `override` keyword in the derived class to indicate that this member of the base class is being redefined in the derived class.

#### Rules for Overriding:

- A method, property, indexer, or event can be overriden in the derived class.
- Static methods cannot be overridden.
- Must use virtual keyword in the base class methods to indicate that the methods can be overridden.
- Must use the override keyword in the derived class to override the base class method.
- Method overriding is a form of runtime polymorphism because the decision about which method to call is made at runtime based on the actual type of the object.

## Solid Principles

Solid is an acronym for the five design principles. These principles are used to design software applications maintainable and testable.

### Single Responsilbity Principle:

A class should have only one responsibility and therefore it should have only one reason to change its code.

### Open-Closed Principle

Software entities(classes, modules, functions, etc.) should be open for extension, but closed for modification. It recommends us to use polymorphism or other techniques to change what it does.

### Liskov Subsitition Principle

When we derived a class from a base class, then the derived class should correctly implement all the methods of the base class.

### Interface Segregation Principle

A class should not be forced to implement interfaces it does not use.

### Dependency Inversion Principle:

High-level modules should not depend on low-level modules, but both should depend on abstractions. This principle promotes the use of interfaces or abstract classes to decouple high-level and low-level modules, making the system more flexible and easier to maintain.
