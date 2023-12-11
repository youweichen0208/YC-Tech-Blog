---
icon: pen-to-square
author: Youwei Chen
date: 2023-12-10
category:
  - data structure
tag:
  - Java
  - Algorithm
  - Dynamic Programming
---

# Dynamic Programming

### 1. What exactly is DP?

In short, dynamic programming is optimized recursion. The arguments that a recursive function takes represents a state. When we looked at tree problems, we never visited a node more than once in our DFS, which means that a state can be repeated, usually an exponential number of times. To avoid repeating computation, we use something called memoization. When we find the answer (the return value) for a given state, we cache that value(usually in hashmap). Then in the future, if we ever see the same state again, we can just refer to the cached value without the needing to re-calculate it.

### 2. Top-down vs. bottom-up

##### Top-down:

we start from the top(the original problem) and move down toward the base case. For example, we wanted the nth Fibonacci number, so we started by calling `fibonacci(n)`. We move down with recursion until we reach the base cases (`F(0)` and `F(1)`).

##### Bottom-up:

In bottom-up, we start at the bottom (base cases) and work our way up to larger problems.

### 3. When should I consider using DP?

1. The problem will be asking for an optimal value (max or min) of something or the number of ways to do something.
   1. What is the minimum cost of doing...
   2. What is the maximum profit of ...
   3. How many ways are there to ...
   4. What is the longest possible ...
2. At each step, you need to make a "decision", and decisions affect future decisions.
   1. A decision could be picking two elements
   2. Decisions affecting future decisions could be something like "if you take an element x, then you can't take an element y in the future"

### 4. Framework for DP:

1. A function or data structure that will compute/contain the answer to the problem for any given state.
2. A recurrence relation to transition between states.
3. Base cases
