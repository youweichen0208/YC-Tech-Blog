---
icon: pen-to-square
author: Youwei Chen
date: 2023-12-16
category:
  - data structure
tag:
  - Java
  - Algorithm
  - Two Pointers
---

# Two Pointers

## What is Two Pointers Algorithm?

Two pointers is an extremely common technique used to solve array and string problems. It involves using two pointers that traverse through an array or a list, at different speeds or directions.

## Common Types of Two Pointers techniques:

1. Opposite Direction:
   The pointers start at opposite ends of the array and move towards each other. This is often used for problems involving sorting or searching in a sorted array, such as finding a pair of elements that sum to a target value.
2. Same Direction (Fast and Slow Pointers):
   One pointer moves faster than the other. This technique is often used for problems involving linked lists or arrays, such as detecting a cycle in a linked list or finding a peak element in an array.
3. Same Direction (Sliding Window):
   We will specifically talk about this in another file.

## Code template:

### Two pointers: one input, opposite ends

```java
public int fn(int[] arr) {
    int left = 0;
    int right = arr.length - 1;
    int ans = 0;

    while (left < right) {
        // do some logic here with left and right
        if (CONDITION) {
            left++;
        } else {
            right--;
        }
    }

    return ans;
}
```

1. Starting one pointer at the first index 0 and the other pointer at the last index `input.length - 1`
2. Use a while loop until the pointers are equal to each other
3. At each iteration of the loop, move the pointers towards each other. This means either increment the pointer that started at the first index, decrement the pointer that started at the last index, or both. Deciding which pointers to move will depend on the problem we are trying to solve.

##### Time Complexity: O(n)

### Two pointers: two inputs, exhaust both

The following method is application when the problem is applicable when the problem has two iterables in the input, for example, two arrays.

```java
public int fn(int[] arr1, int[] arr2) {
    int i = 0, j = 0, ans = 0;

    while (i < arr1.length && j < arr2.length) {
        // do some logic here
        if (CONDITION) {
            i++;
        } else {
            j++;
        }
    }

    while (i < arr1.length) {
        // do logic
        i++;
    }

    while (j < arr2.length) {
        // do logic
        j++;
    }

    return ans;
}
```

1. Create two pointers, one for each iterable. Each pointer should start at the first index.
2. Use a while loop until one of the pointers reaches the end of its iterable.
3. At each iteration of the loop, move the pointers forward. This means incrementing either one of the pointers or both of the pointers. Deciding which pointers to move will depend on the problem we are trying to solve.
4. Because our while loop will stop when one of the pointers reaches the end, the other pointer will not be at the end of its respective iterable when the loop finishes. Sometimes, we need to iterate through all elements - if this is the case, we will need to write extra code here to make sure both iterables are exhausted.

##### Time Complexity: If sorted, then O(n). If not, then O(n \* logn)
