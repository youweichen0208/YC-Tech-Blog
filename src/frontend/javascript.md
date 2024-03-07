---
cover: /assets/images/secondhand-project.jpg
icon: pen-to-square
date: 2024-01-21
category:
  - projects
tag:
  - JavaScript
---

# JavaScript

## `()` in JavaScript

The `()` is used to invoke or call a function. When we have a function reference followed by parentheses, it means we are executing or calling that function.

### Function Invocation:

```javascript
function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("John"); // This calls the greet function with the argument 'John'.
```

### Immediately Invoked Function Expression (IIFE):

```javascript
(function () {
  console.log("This is an IIFE.");
})();
```

The function is defined and immediately invoked. The `(function(){/* code */})()` syntax creates a function expression and then immediately executes it.

### function without parentheses

When we have a function reference without parentheses, it refers to the function itself without executing it.

```java
function hello() {
  const name = "hello world";

  function world() {
    console.log(name);
  }

  return world;
}

const closureFunction = hello();
closureFunction();

```

When we invoke `hello()`, it returns `world` function (without executing it). This is possible due to closures - the `world` function retains access to the `name` variable, even though it's outside of its own scope. The `world` function is essentially a closure that "closes over the `name` variable.

## Closure

In JavaScript, a closute is created when a function is defined inside another function (the outer function) and has access to the outer function's variables.

```javascript
function outerFunction() {
  let outerVariable = "I am from the outer function";

  function innerFunction() {
    console.log(outerVariable);
  }

  return innerFunction;
}

const closureFunction = outerFunction();
closureFunction(); // Outputs: I am from the outer function
```

### Why we use Closures

1. Variable Encapsulation:

- Closures allow for the creation of private variables. Variables declared in the outer function are not accessible from outside, providing a form of encapsulation.

2. Data Persistence:

- Closures enable functions to maintain access to the variables from their lexical environment, even after the outer function has completed execution. This is helpful for preserving state across multile function calls.

```javascript
function countNum() {
  var count = 0;

  return function () {
    count++;
    console.log("count is ", count);
  };
}

const val = countNum();
val();
val();
```

output:

```text
count is  1
count is  2
```

## Understanding Object Literals:

In JavaScript, an object literal is a way to create and initialize an object. It consists of key-value
pairs enclosed in curly braces `{}`.

```javascript
const person = {
  name: "John",
  age: 30,
  sayHello: function () {
    console.log("Hello!");
  },
};

console.log(person.name); // Outputs: John
person.sayHello(); // Outputs: Hello!
```

### Method Definition in Object Literal

1. Using Function Expression:

```javascript
const person = {
  name: "John",
  sayHello: function () {
    console.log("Hello, " + this.name + "!");
  },
};

person.sayHello(); // Outputs: Hello, John!
```

2. Using Shorthand Method Syntax (ES6):

```javascript
const person = {
  name: "John",
  sayHello() {
    console.log("Hello, " + this.name + "!");
  },
};

person.sayHello(); // Outputs: Hello, John!
```

3. Object Methods in Object-Oriented Programming:

```javascript
function Dog(name, age) {
  return {
    name,
    age,
    bark() {
      console.log("Woof! Woof!");
    },
  };
}

const myDog = Dog("Buddy", 3);
console.log(myDog.name); // Outputs: Buddy
myDog.bark(); // Outputs: Woof! Woof!
```

Here, the `Dog` function acts as a constructor, creating and returning an object with properties (`name` and `age`) and a method (`bark`).

## Array in JavaScript

### Creating Arrays

```javascript
const fruit = [];
```

### Common Array Methods

JavaScript provides several built-on methods for working with arrays.

- push: add one or more elements to the end of an array

```javascript
const fruits = ["apple", "orange", "banana"];
fruits.push("kiwi");
console.log(fruits); // Outputs: ['apple', 'orange', 'banana', 'kiwi']
```

- pop: removes the last element from an array

```javascript
const fruits = ["apple", "orange", "banana"];
const removedFruit = fruits.pop();
console.log(removedFruit); // Outputs: banana
console.log(fruits); // Outputs: ['apple', 'orange']
```

- shift: removes the first element from an array

```javascript
const fruits = ["apple", "orange", "banana"];
const removedFruit = fruits.shift();
console.log(removedFruit); // Outputs: apple
console.log(fruits); // Outputs: ['orange', 'banana']
```

- unshift: adds one or more elements to the beginning of an array

```javascript
const fruits = ["apple", "orange", "banana"];
fruits.unshift("kiwi", "grape");
console.log(fruits); // Outputs: ['kiwi', 'grape', 'apple', 'orange', 'banana']
```

- slice: returns a portion of an array

```javascript
const numbers = [1, 2, 3, 4, 5];
const slicedNumbers = numbers.slice(1, 4);
console.log(slicedNumbers); // Outputs: [2, 3, 4]
```

## Functional Composition

Function composition is a technique in functional programming where two or more functions are combined to produce a new function.

```javascript
// Function to compose two functions
const compose = (f, g) => (x) => f(g(x));

// Example functions
const addTwo = (x) => x + 2;
const multiplyByThree = (x) => x * 3;
const subtractFive = (x) => x - 5;

// Compose the functions
const composedFunction = compose(
  addTwo,
  compose(multiplyByThree, subtractFive)
);

// Test the composed function
const result = composedFunction(10);
console.log(result); // Outputs: ((10 - 5) * 3) + 2 = 17
```

- The `compose` function takes two functions (`f` and `g`) and returns a new function that represents their composition
- The example functions `addTwo`, `multipleByThree`, and `subtractFive` are then composed using the `compose` function to create a new function (`composedFunction`).
- The result is the composition of the three functions applied to the input value `10`.

## reduceRight

In JavaScript, the `reduceRight` method is an array method that is used to reduce the elements of an array from right to left, applying a provided callback function to each element and accumulating the result. The `reduceRight` method is similar to the `reduce` method, but it processes the array from the last element to the first.

```javascript
array.reduceRight(
  callback(accumulator, currentValue, index, array),
  initialValue
);
```

Here's a simple example of using `reduceRight`:

```javascript
const numbers = [1, 2, 3, 4];

const sum = numbers.reduceRight((accumulator, currentValue) => {
  console.log(accumulator, currentValue);
  return accumulator + currentValue;
}, 0);

console.log(sum); // Outputs: 4 3, 7 2, 9 1, 10
```

## apply()

In JavaScript, the `apply` method in JavaScript is used to call a function with a given `this` value and arguments provided as an array.

```javascript
func.apply(thisArg, [argsArray]);
```

- `thisArg`: The value of `this` provided for the call to `func`
- `argsArray`: an array-like object, specifying the arguments with which `func` should be called, or `null` or `undefined` if no arguments should be provided to the function.

```javascript
let numbers = [5, 6, 2, 3, 7];

let max = Math.max.apply(null, numbers);

console.log(max); // Outputs: 7
```

In this example, `apply()` is used to find the maximum element in an array. `Math.max` normally takes a list of numbers as arguments, but `apply()` allows us to pass an array instead.

Example 2:

```javascript
function greet(name, age) {
  console.log(`Hello, ${name}! You are ${age} years old.`);
}

const person = { name: "Alice", age: 30 };

// Using apply to invoke the greet function with 'person' as the 'this' value
greet.apply(person, ["Bob", 25]);
// Outputs: Hello, Bob! You are 25 years old.
```

In this example, the `apply()` method is used to call the `greet` function with `person` as the `this` value and an array `['Bob', 25]` as the arguments. The `thisArg` is set to `person`, so within the `greet` function, `this` refers to the `person` object.

## JSON.stringify()

`JSON.stringify()` is a method in JavaScript that converts a JavaScript object or value to a JSON string.

### Syntax

```javascript
JSON.stringify(value);
```

### Example

```javascript
let obj = { name: "John", age: 30, city: "New York" };

let jsonString = JSON.stringify(obj);

console.log(jsonString); // Outputs: '{"name":"John","age":30,"city":"New York"}'
```

### Why we need JSON.stringify()?

In JavaScript, when we use an object(including arrays) as a key in another object, the key is not the actual object, but a reference to that object. That means two identical-looking objects or arrays are not considered the same key, because they are different instances and thus have different references.

## Cookies, LocalStorage, Session Storage

### Cookies:

- Cookies are small pieces of data stored by the browswer and sent to the server with every HTTP request.
- Cookies have a storage limit size up to 4KB
- Cookies can be set to persist for a specified duration or persist until the user closes the browser.
- Cookies can be made secure by setting the Secure and HttpOnly flags, which prevent them from being sent over encrypted connections or accessed via JavaScript.

### LocalStorage:

- LocalStorage is a way to store data on the client's computer. It allows the storage of larger amounts of data.
- The data in localstorage persists indefinitely, until explicitly deleted by the user or the web application.
- Unlike Cookies, localstorahe data is never sent to the server

### SessionStorage:

- Session Storage is similar to localStorage, but it has a shorter lifespan. Data in sessionStorage is cleared when the page session ends (when the browser tab is closed).
- Like localStorage, sessionStorage can store larger amounts of data (up to 5MB or more), and the data is never sent to the server.
