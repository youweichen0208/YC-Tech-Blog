---
icon: pen-to-square
author: Youwei Chen
date: 2023-12-16
category:
  - data structure
tag:
  - Java
  - Algorithm
  - Prefix Sum
---

# Prefix Sum

## What is Prefix Sum?

Prefix sum is a technique that can be used on arrays (of numbers). The idea is to create an array `prefix` where `prefix[i]` is the sum of all elements up to the index `i` (inclusive). For example, given `nums = [5, 2, 1, 6, 3, 8]`, we would have `prefix = [5, 7, 8, 14, 17, 25]`

## Pseudocode:

```java
public int[] fn(int[] arr) {
    int[] prefix = new int[arr.length];
    prefix[0] = arr[0];

    for (int i = 1; i < arr.length; i++) {
        prefix[i] = prefix[i - 1] + arr[i];
    }

    return prefix;
}
```

## When should we use Prefix Sum?

- `Range Sum Queries:` If we have an array of numbers and we need frequenly find the sum of numbers between two indices, we can use the prefix sum to answer these queries in constant time, after an initial preprocessing of the array.
- `Cumulative Frequency:` If we need to know the cumulative frequency of elements in an array up to a certain index, prefix sum can be used.
- `Subarray Problems:` Prefix sum is often used in problems involving subarrays, especially when we need to find a subarray with a given sum, or a subarray that satisfies certain conditions.

## Time Complexity: O(n)
