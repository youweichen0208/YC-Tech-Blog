---
icon: pen-to-square
author: Youwei Chen
date: 2023-12-26
category:
  - data structure
tag:
  - Java
  - Algorithm
  - Binary Search
---

# Binary Search

## What is Binary search

Binary search is a search algorithm that runs in O(log n) in the worst case, where n is the size of the search space. Normally, binary search is done on an array of sorted elements.

## Binary Search code template:

```java
public int fn(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            // do something
            return mid;
        }
        if (arr[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    // left is the insertion point
    return left;
}
```

- Declare `left = 0` and `right = arr.length - 1`. These variables represent the inclusive bounds of the current search space at any given time. Initially, we consider the entire array
- While `left <= right`:
  - Calculate the middle of the current search space, `mid = left + (right - left) / 2`
  - Check `arr[mid]`. There are 3 possiblities:
    - If `arr[mid] = x`, then the element has been found, return.
    - If `arr[mid] > x`, then halve the search space by doing `right = mid - 1`.
    - If `arr[mid] < x`, then halve the search by doing `left = mid + 1`.
- If we get to this point without `arr[mid] = x`, then the search was unsuccessful. The `left` pointer will be at the index where `x` would need to be inserted to maintain `arr` being sorted.
