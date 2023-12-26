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

## 2. Backtracking code template:

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

## 3. Example: Leetcode 46

Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

##### Example 1:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

##### Example 2:

Input: nums = [0,1]
Output: [[0,1],[1,0]]

##### Example 3:

Input: nums = [1]
Output: [[1]]

```java
class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> list = new ArrayList<>();
        backtracking(result, list, nums);
        return result;
    }

    public void backtracking(List<List<Integer>> ans, List<Integer> curr, int[] input){
        if (curr.size() == input.length) {
            ans.add(new ArrayList<>(curr));
            return;
        }

        for (int val : input) {
            if (!curr.contains(val)){
                curr.add(val);
                backtracking(ans, curr, input);
                curr.remove(curr.size()-1);
            }
        }

    }
}
```

##### Time complexity of this code is O(n\*n!), where n is the length of the input array:

- There are n! permutations of the array
- For each permutation, the code makes a deep copy of the current permutation and adds it to the result list. This operation takes O(n) time.
- Therefore, the total time complexity is O(n\*n!)

##### The space complexity of this code is O(n)

the maximum depth of the recursion (the maximum length of the `curr` list). This is because the code uses recursion to generate permutations, and each recursive call adds a new element to the `curr` list.

## 4. When should we use backtracking?

- Permutations and Combinations: If we need to generate all permutations or combinations of a set of items, we can use backtracking to build each possibility one item at a time, and abandon a partial permutation or combination as soon as we know it can't be extended to a valid one.
- Path Finding: In problems where we need to find a path from one pointer to another, such as in a maze or a graph, backtracking can be used to incrementally build paths, and abandon a path as soon as we know it doesn't lead to the destination.
- Subset Sum and Partitioning Problems: Backtracking can be used to find subsets of items that meet certain criteria, like a subset of numbers that adds up to a particular sum.
