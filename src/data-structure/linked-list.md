---
icon: pen-to-square
author: Youwei Chen
date: 2023-12-20
category:
  - data structure
tag:
  - Java
  - Algorithm
  - Linked List
---

# Linked List

## Fast and slow pointer:

Fast and slow pointers is an implementation of the two pointers technique. This could mean that they move at different "speeds" during iteration, begin iteration from different locations, or any other abstract difference.

### template code:

```java
public int fn(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;
    int ans = 0;

    while (fast != null && fast.next != null) {
        // do logic
        slow = slow.next;
        fast = fast.next.next;
    }

    return ans;
}
```

### When should we apply fast and slow pointer algorithm?

- **Detecting a cycle in a linked list:** If there's a cycle in the linked list, the fast pointer will eventually meet the slow pointer.
- **Finding the middle of a linked list**: When the fast pointer reaches the end of the list, the slow pointer will be at the middle of the list.
- **Finding the start of a cycle in a linked list**: If there's a cycle in the list, after detecting the cycle, you can reset the fast pointer to the head of the list and move both pointers at the same speed. They will meet at the start of the cycle.
- **Determining the length of a cycle in a linked list**: Once the two pointers meet inside the cycle, we can keep one pointer stationary and move the other until they meet again, counting the steps it takes.
- **Finding the kth element from the end of a linked list**: move the fastest pointer k steps ahead first, then move both pointers at the same speed. When the fast pointer reaches the end, the slow pointer will be at the kth element from the end.

### Time Complexity: O(n)

In the worst-case scenario, we will need to traverse all the nodes in the linked list once. Here, N is the total number of nodes in the list.

### Space Complexity: O(1)

The fast and slow pointers are the only extra space used, and the amount of space does not change with the size of the linked list, hence the space complexity is constant.

## Reversing a linked list

### template code

```java
public ListNode fn(ListNode head) {
    ListNode curr = head;
    ListNode prev = null;
    while (curr != null) {
        ListNode nextNode = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextNode;
    }

    return prev;
}
```

### Time Complexity: O(n)

### Space Complexity: O(1)

## What is dummy node and when should we use the dummy node?

Using a dummy node in a linked list is a technique that can simplify certain operations and edge cases.

- **Simplifying Insertions and Deletions:**
  When dealing with insertions and deletions at the beginning of a linked list, having a dummy node as the head can simplify the code. It ensures that tghe actual head of the list is always a valid node, even if the list is initially empty.
- **Avoiding Special Cases:**
  If we don't use a dummy node, operations like inserting at the beginning may require additional checks to handle the case where the list is initally empty. A dummy node eliminates the need for such special-case handling.
- **Avoiding Null-Check Headaches:**
  With a dummy node, we can avoid null-checks when traversing or manipulating the list. This can make the code cleaner and less error-prone.

## Comparison between ArrayList and LinkedList

- **Underlying Data Structure**:
  - **Array List:** An array list is based on an array data structure. It's essentially a dynamic array that automatically resizes itself when it gets too full or too empty.
  - **Linked List:** A linked list is made up of nodes where each node contains a value and a reference to the next node in the sequence.
- **Memory Layout:**
  - **Array List:** In an array list, elements are stored in contiguous memory locations, which makes array lists preferable for random access and iteration
  - **Linked List:** In a linked list, nodes can be stored anywhere in memory. Each node maintains a reference to the next node, forming a chain-like structure.
- **Access Time:**
  - **Array List:** Array lists provide constant-time O(1) access to any element by its index because they're backed by an array.
  - **Linked List:** Linked lists provide linear-time O(N) access to elements by index because to access an element, you need to traverse from the head node to the desired node.
- **Insertion/Deletion Time:**
  - **Array List:** Insertions or deletions in an array list are O(N) in the worst case, as elements need to be shifted to fill or create gaps.
  - **Linked List:** Insertions or deletions in a linked list are O(1), provided that you already have a reference to the node you're dealing with. If you need to find a specific element for deletion, it would be O(N) due to the search time.
- **Memory Overhead:**
  - **Array List:** Array lists don't have much memory overhead per element, as they store only data and the size.
  - **Linked List:** Each element in a linked list needs to store the data and the reference to the next (and possibly previous, in a doubly linked list) element, leading to higher memory usage.
- **Use Cases:**
  - **Array List:** Array lists are preferable when you need to access elements frequently by their index and when the list size remains relatively constant.
  - **Linked List:** Linked lists are preferable when you need to frequently add and remove elements, but the order of elements and random access isn't important.
