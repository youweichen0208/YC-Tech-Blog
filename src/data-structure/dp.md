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

## 1. What exactly is DP

Dynamic programming is a method for solving a complex problem by breaking it down into a collection of simpler sub-problems. These subproblems can be solved using patterns and recursive functional relationships. The idea is to address each sub-problem once to prevent redundant calculations. A classic illustration of a dynamic programming problem is the Fibonacci sequence.

## 2. Example: Climbing stairs (leetcode 70)

You are climbing a staircase. It takes n steps to reach the top.Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

- If we wanna reach 10th floor, we need to either reach 8th floor and take 2 more steps or reach 9th floor and take 1 more step.
- Similarily, if we wanna reach 9th floor, we need to either reach 7th floor and take 2 more steps or reach 8th floor and take 1 more step.

Let dp[i] denote the number of ways to reach on ith step:

```
dp[i] = dp[i-1] + dp[i-2]
```

### solution

```java
class Solution {
    public int climbStairs(int n) {
        if (n == 1)
            return 1;
        if (n == 2)
            return 2;

        int[] dp = new int[n];
        dp[0] = 1;
        dp[1] = 2;
        for (int i = 2; i < n; i++) {
            dp[i] = dp[i-1] + dp[i-2];
        }
        return dp[n-1];

    }
}
```

##### Complexity Analysis

- Time complexity: O(n). Single loop upto n.
- Space Complexity: O(n). dp array of size n is used.

## 3. Top-down vs. bottom-up

##### Top-down:

we start from the top(the original problem) and move down toward the base case. For example, we wanted the nth Fibonacci number, so we started by calling `fibonacci(n)`. We move down with recursion until we reach the base cases (`F(0)` and `F(1)`).

##### Bottom-up

In bottom-up, we start at the bottom (base cases) and work our way up to larger problems.

## 4. When should I consider using DP

1. The problem will be asking for an optimal value (max or min) of something or the number of ways to do something.
   1. What is the minimum cost of doing...
   2. What is the maximum profit of ...
   3. How many ways are there to ...
   4. What is the longest possible ...
2. At each step, you need to make a "decision", and decisions affect future decisions.
   1. A decision could be picking two elements
   2. Decisions affecting future decisions could be something like "if you take an element x, then you can't take an element y in the future"

## 5. Framework for DP

1. A function or data structure that will compute/contain the answer to the problem for any given state.
2. A recurrence relation to transition between states.
3. Base cases
