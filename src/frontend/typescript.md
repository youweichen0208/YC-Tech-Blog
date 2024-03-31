---
cover: /assets/images/secondhand-project.jpg
icon: pen-to-square
date: 2024-01-22
category:
  - frontend
tag:
  - TypeScript
---

# TypeScript

## Understanding Type Annotations in TypeScript

### What is typescript?

TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript. It was developed by is maintained by Microsoft.

- **Static Typing**: TypeScript introducrs static typying to JavaScript, which can help catch errors at compile time rather than runtime. This is useful in large codebases.

- **Class-Based Object-Oriented Programming:** TypeScript includes full support for classes, interfaces, and inheritance, much like object-oriented languages such as Java or C#.

- **Type Inference**: TypeScript can often infer types based on variables and functions are used.
- **ESNext Features**: TypeScript supports newer JavaScript features, including async/await, decorators, and modules.

### What is Type Annotation in TypeScript

TypeScript uses type annotations to explicitly specify types for identifiers such as variables, functions, objects, etc. TypeScript uses the syntax `:type` after an identifier as the type annotation, which `type` can be any valid type. **Once an identifier is annotated with a type, it can be used as that type only. If the identifier is used as a different type, the TypeScript compiler will issue an error.**

```typescript
let variableName: type;
let variableName: type = value;
const constantName: type = value;
```

Example:

```typescript
let name: string = "John";
let age: number = 25;
let active: boolean = true;
```

### Type Annotation examples:

#### **Arrays**

```typescript
let arrayName: type[];
```

Examples:

```typescript
let names: string[] = ["John", "Jane", "Peter", "David", "Mary"];
```

#### **Objects**:

```typescript
let person: {
  name: string;
  age: number;
};

person = {
  name: "John",
  age: 25,
}; // valid
```

## Introduction to TypeScript object type:

To explicitly specify properties of the `employee` object, we first use the following syntax to declare the `employee` object:

```typescript
let employee: {
  firstName: string;
  lastName: string;
  age: number;
  jotTitle: string;
};
```

And then we assign the `employee` object to a literal object with the described properties:

```typescript
employee = {
  firstName: "John",
  lastName: "Doe",
  age: 25,
  jobTitle: "Web Developer",
};
```

## TypeScript functions:

### Introduction to TypeScript functions:

TypeScript functions are the building blocks of readable, maintainable, and reusable code.

```typescript
function name(parameter: type, parameter, ...): returnType {
    // do something
}
```

Example:

```typescript
function add(a: number, b: number): number {
  return a + b;
}
```

### Function Overloadings:

In TypeScript, function overloadings allow us to establish the relationship between the parameter types and result types of a function.

```typescript
function add(a: number, b: number): number;
function add(a: string, b: string): string;

function add(a: any, b: any): any {
  if (typeof a === "string" && typeof b === "string") {
    return a + b; // concatenate strings
  } else if (typeof a === "number" && typeof b === "number") {
    return a + b; // add numbers
  }
}

console.log(add(1, 2)); // Outputs: 3
console.log(add("Hello, ", "World!")); // Outputs: 'Hello, World!'
```

## Introduction to the TypeScript Class

```typescript
function add(a: number, b: number): number;
function add(a: string, b: string): string;

function add(a: any, b: any): any {
  if (typeof a === "string" && typeof b === "string") {
    return a + b; // concatenate strings
  } else if (typeof a === "number" && typeof b === "number") {
    return a + b; // add numbers
  }
}

console.log(add(1, 2)); // Outputs: 3
console.log(add("Hello, ", "World!")); // Outputs: 'Hello, World!'
```

In this example, `Person` is a class with a property `name` and a method `greet()`. The `constructor` is a special method for creating and initializing an object created with a class.

## Woring with Union Types:

Union types are a way in TypeScript to describe a value that can be one of several types. We can use `|` operator to separate each type, hence the term "union".

```ts
let id: number | string;
id = 123; //correct
id = "123"; //correct
id = true; // NOT correct
```

## Assigning Type Aliases:

Type aliases in TypeScript allow us to create a new name for a type. We can use the `type` keyword to create an alias. Once a type alias is defined, it can be used anywhere a type can be used.

```ts
type Point = {
  x: number;
  y: number;
};

let p: Point = { x: 10, y: 20 };
console.log(p);

type StringArray = string[];
let arr: StringArray = ["Java", "C#"];
console.log(arr);
```

In these examples, `Point` is a type alias for an object type with `x` and `y` properties, and `StringArray` is a type alias for an array of strings.

## Function & Function Types

In TypeScript, we can define functions just like in JavaScript, but with the added benefit of type annotations for parameters and return values.

```ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}
console.log(greet("Alice")); // ok
console.log(greet(123)); // error
```

## Understanding Generics:

Generics in TypeScript are a way to create reusable components that can work with a variety of types, while still maintaining type safety. They are often used with classes, interfaces, and functions.

```ts
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
```

In this example, `T` is a type variable - a stand-in for any type. The `identity` function takes an argument `arg` of type `T` and returns `T`. When we call `identity`, we also specify what `T` should be.

Generics are also commonly used with interfaces and classes. Here's an example with an interface:

```ts
interface GenericIdentityFn<T> {
  (arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

## Classes in TypeScript

Classes are a fundamental feature of TypeScript, which is an object-oriented programming language. They provide a way to define reusable blueprints for creating objects with specific properties (fields) and behaviors (methods). Classes in TypeScript supprot features such as inheritance, access modifiers (`public`, `private`, `protected`), and static properties and methods. They are a key part of TypeScript's type system and provide powerful object-oriented programming features.

```ts
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");
console.log(greeter.greet());
```

## Interfaces in typescript

Interfaces in TypeScript are a powerful way to define constracts within our code. They are used to define the shape of an object, ensuring that the object has certain properties with specific types.

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
};
```

In this example, `SearchFunc` is an interface for a function type. It specifies that a function must have two parameters, both of type `string`, and must return a `boolean`.

Interfaces are a key part of TypeScript's type sysmtem and provide a way to ensure objects and functions have the correct shape and behavior.
