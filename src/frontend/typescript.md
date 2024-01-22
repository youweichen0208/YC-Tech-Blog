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
