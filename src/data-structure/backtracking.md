---
icon: pen-to-square
author: Youwei Chen
date: 2023-12-14
category:
  - data structure
tag:
  - Java
  - Algorithm
  - Backtracking
---

# Backtracking

## 1. What exactly is backtracking

Backtracking is an optimization that involves abandoning a "path" once it is determined that the path cannot lead to a
solution. The idea is similar to binary search trees - if we are looking for a value x, and the root node has a value
greater than x, then we know we can ignore the entire right subtree.

```text
To summarize the difference between exhaustive search and backtracking:

In an exhaustive search, we generate all possibilities and then check them for solutions. In backtracking, we prune paths that cannot lead to a solution, generating far fewer possibilities.
```

## 2. Implementation:

```text
// let curr represent the thing you are building
// it could be an array or a combination of variables

function backtrack(curr){
    if (base case) {
        Increment or add to answer
        return;
    }
    
    for (iterate over input) {
        Modify curr
        backtrack(curr)
        Undo modification to curr
    }
}
```
