---
icon: pen-to-square
date: 2024-01-12
category:
  - backend
tag:
  - Java
  - Functional Programming
---

# Functional Programming

## Streams API

- In Java 8, the Streams API was introduced to provide a more functional and expressive way to work with collections of data.
- A stream is a sequence of elements that can be processed in parallel or sequantially.
- Streams don't store data; they operate on the source data (e.g., a collection) and produce a result.

### Creating Streams:

Streams can be created from various sources such as collections, arrays(`Arrays.stream(...)`), or even from I/O channels.

```java
List<String> myList = Arrays.asList("apple", "orange", "banana");

// Creating a stream from a collection
Stream<String> stream = myList.stream();

```

## Method References:

Method references in Java provide a shorthand notation for writing lambda expressions when the lambda expression essentially calls a method.

### 1. Reference to a Static Method

- Syntax: `ClassName::staticMethodName`

```java
// Lambda expression
Function<Integer, String> lambda = x -> Integer.toString(x);

// Method reference
Function<Integer, String> reference = Integer::toString;

```

### 2. Reference to an Instance Method of a Particular Object:

- Syntax: `instance:instanceMethodName`

```java
// Lambda expression
StringJoiner joiner = new StringJoiner(", ");
BiConsumer<String, String> lambda = (s1, s2) -> joiner.add(s1).add(s2);

// Method reference
BiConsumer<String, String> reference = joiner::add;

```

### 3.Reference to an Instance Method of an Arbitrary Object of a Particular Type:

```java
// Lambda expression
List<String> list = Arrays.asList("apple", "banana", "orange");
Collections.sort(list, (s1, s2) -> s1.compareToIgnoreCase(s2));

// Method reference
Collections.sort(list, String::compareToIgnoreCase);
```

## Lambda Expression

Lambda expressions in Java provide a concise way to express instances of single-method interfaces (functional interfaces). They were introduced in Java 8 to support functional programming constructs and make code more readable and expressive.

## Common Examples of using functional programming:

Example 1:

```java
// Example: Sorting a list of strings using lambda expression
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.sort((s1, s2) -> s1.compareTo(s2));
```

Example 2:

```java
// Example: Filtering and collecting even numbers from a list
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);
List<Integer> evenNumbers = numbers.stream()
                                   .filter(n -> n % 2 == 0)
                                   .collect(Collectors.toList());

```

Example 3:

```java
// Example: Method reference in the context of the Streams API
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.forEach(System.out::println);

```

Example 4:

```java
        numbers.stream()
                .map(x->x*x)
                .filter(a -> a % 2 == 0)
                .forEach(System.out::println);

```

Example 5:

```java
List<String> fruits = Arrays.asList("apple", "banana", "orange");
List<String> filteredFruits = fruits.stream()
                                   .filter(s -> s.startsWith("a"))
                                   .collect(Collectors.toList());

```

Example 6:

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 1, 2, 4, 5);
List<Integer> distinctNumbers = numbers.stream()
                                       .distinct()
                                       .collect(Collectors.toList());

```
