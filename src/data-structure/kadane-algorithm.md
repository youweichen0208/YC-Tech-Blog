---
icon: pen-to-square
author: Youwei Chen
date: 2024-01-07
category:
  - data structure
tag:
  - Java
  - Algorithm
  - Kadane's Algorithm
  - Dynamic Programming
  - Greedy
---

# Kadane's Algorithm

## What is Kadane's algorithm

Kadane's algorithm is a greedy/dynamic programming algorithm that can be used on array problems to bring time complexity down to O(n). It is used to calculate the maximum sum subarray ending at a particular position.

## How it works

The algorithm works by maintaining a running sum of the array elements, and at each step, it decides whether to extend the current subarray or start a new one. The maximum sum of all subarrays seen so far is kept as the result.

## base code template

```java
public int maxSubArray(int[] nums) {
    int maxSoFar = nums[0];
    int maxEndingHere = nums[0];

    for (int i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(maxEndingHere + nums[i], nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }

    return maxSoFar;
}
```

- In this code, `maxSoFar` is the maximum sum of a subarray seen so far, and `maxEndingHere` is the maximum sum of a subarray ending at the current position.
- At each step, `maxEndingHere` is updated to be the maximum of `maxEndingHere + nums[i]` and `nums[i]`, and `maxSoFar` is updated to be the maximum of `maxSoFar` amd `maxEndingHere`.

## Time Complexity: **O(n)**

The time complexity of Kadane's algorithm is O(n), where n is the length of the array, because it processes each element of the array exactly once.

## Space Complexity: **O(1)**

It only uses a constant amount of space to store variables `maxSoFar` and `maxEndingHere`.

## When should we apply Kadane's Algorithm

- **Maximum Subarray**
- **Maximum Sum Circular Subarray**
- **Longest Turbulent Array**
