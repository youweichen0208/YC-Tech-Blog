---
icon: pen-to-square
author: Youwei Chen
date: 2023-12-23
category:
  - data structure
tag:
  - Java
  - Algorithm
  - Depth-First Search
---

# Breadth-first search (BFS)

## What is BFS?

In BFS, **we traverse all nodes at a given depth before moving on to the next depth.**
![BFS graph](/assets/images/bfs.jpg)
A BFS performed on the above tree would visit the nodes in the same order as their values. We visit all nodes at a depth `d` before visiting any node at a depth of `d+1`

## When to use BFS vs DFS?

It doesn't matter if we choose preorder, inorder, or postorder DFS, the important thing is that we just visit all nodes. If we have a problem like this, then it doesn't matter if we use BFS either, because every "visit" to a node will store sufficient information irrespective of visit order.

On the flip side, there are quite a few problems where using BFS makes way more sense algorithmically than using DFS. Usually, this applies to any problem where we want to handle the nodes according to their level.

In terms of space complexity, DFS uses space linear with the height of the tree (maximum depth), whereas BFS uses space linear with the level that has the most nodes. In some cases, DFS will use less space, in other cases, BFS will use less.

For example, in a **perfect binary tree**, DFS would use **O(logn)** space, whereas BFS would use **O(n)**. The final level in a perfect binary tree has **n/2** nodes, but the tree only has a depth of **logn**.

However, if we have a **lopsided tree (like a straight line)**, then BFS will have an **O(1)** space complexity while DFS will have **O(n)**.

## BFS code template

```java
public int fn(TreeNode root) {
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    int ans = 0;

    while (!queue.isEmpty()) {
        int currentLength = queue.size();
        // do logic for current level

        for (int i = 0; i < currentLength; i++) {
            TreeNode node = queue.remove();
            // do logic
            if (node.left != null) {
                queue.add(node.left);
            }
            if (node.right != null) {
                queue.add(node.right);
            }
        }
    }

    return ans;
}
```

### Time Complexity: O(N)

The time complexity of BFS is O(n), where n is the total number of nodes in the tree. This is because the algorithm visits each node exactly once.

### Space Complexity: O(W)

The space complexity of BFS is O(w), where w is the maximum width of the tree. In the worst case, this is the number of nodes at the level with the most nodes. For a complete binary tree, this would be approximately n/2 nodes at the last level, so the space complexity in such a case would be O(n).
