---
icon: pen-to-square
author: Youwei Chen
date: 2023-12-26
category:
  - data structure
tag:
  - Java
  - Algorithm
  - Heap
---

# Heaps

## What is heap?

A heap can also find the max elements instead of min elements. If a heap is configured to find/remove the min element, it's called a min heap. If it's configured to find/remove the max element, it's called a max heap. A heap is a data structure that is an implementation of the priority queue.

## The interface for a heap

```java
// In Java, we will use the PriorityQueue interface and the
// PriorityQueue implementation. By default, this implements
// a min heap
PriorityQueue<Integer> heap = new PriorityQueue<>();

// Add to heap
heap.add(1);
heap.add(2);
heap.add(3);

// Check minimum element
heap.peek(); // 1

// Pop minimum element
heap.remove(); // 1

// Get size
heap.size(); // 2

// Bonus: if you want a max heap instead, you can pass
// Comparator.reverseOrder() to the constructor:
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());
```

## Time Complexity of heap

- `add()`: O(log n), as it needs to maintain the heap invariant after adding an element.
- `peek()`: O(1), as it retrieves the minimum element (for a min heap) or maximum element (for a max heap) which is at the root of the heap.
- `remove()`: O(log n), as it removes the root and then reconstructs the heap.
- `size()`: O(1), as it simply returns the number of elements in the queue

## Space complexity of heap

The space complexity for a `PriorityQueue` is O(n), where n is the number of elements in the queue.

## Find top K elements with heap code template:

```java
public int[] fn(int[] arr, int k) {
    PriorityQueue<Integer> heap = new PriorityQueue<>(CRITERIA);
    for (int num: arr) {
        heap.add(num);
        if (heap.size() > k) {
            heap.remove();
        }
    }

    int[] ans = new int[k];
    for (int i = 0; i < k; i++) {
        ans[i] = heap.remove();
    }

    return ans;
}
```
