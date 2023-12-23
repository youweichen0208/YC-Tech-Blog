---
icon: pen-to-square
author: Youwei Chen
date: 2023-12-22
category:
  - data structure
tag:
  - Java
  - Algorithm
  - Depth-First Search
---

# Binary trees - Depth-first search (DFS)

## template code:

```java
public int dfs(TreeNode root) {
    if (root == null) {
        return 0;
    }

    int ans = 0;
    // do logic
    dfs(root.left);
    dfs(root.right);
    return ans;
}
```

- **ans** is the final answer or the answer at the each step.

## Illustration:

![DFS graph](/assets/images/dfs.jpg)

- **Inorder Traversal:**
  Traverse the left subtree first, then visit the root, and finally traverse the right subtree. For binary search trees, this will give nodes in ascending order.

  ```java
  public void inorderDfs(Node node) {
    if (node == null) {
        return;
    }

    inorderDfs(node.left);
    System.out.println(node.val);
    inorderDfs(node.right);
    return;
  }
  ```

- **Preorder Traversal:**
  Visit the root first, then traverse the left subtree, and finally the right subtree.

  ```java
  public void preorderDfs(Node node) {
    if (node == null) {
        return;
    }

    System.out.println(node.val);
    preorderDfs(node.left);
    preorderDfs(node.right);
    return;
  }
  ```

- **Postorder Traversal:**
  Traverse the left subtree first, then the right subtree, and finally visit the root.

  ```java
  public void postorderDfs(Node node) {
    if (node == null) {
        return;
    }

    postorderDfs(node.left);
    postorderDfs(node.right);
    System.out.println(node.val);
    return;
  }
  ```

### Time Complexity:

The time complexity of DFS is O(N), where N is the number of nodes in the tree. This is because DFS visits each node exactly once.

### Space Complexity:

The space complexity of DFS is O(H), where H is the height of the tree. This is because in the worst-case scenario, the maximum amount of space is used when the algorithm needs to store information for traversing all the way down to the leaf node along a single branch, which corresponds to the height of the tree.
