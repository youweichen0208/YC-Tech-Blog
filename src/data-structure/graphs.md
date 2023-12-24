---
icon: pen-to-square
author: Youwei Chen
date: 2023-12-23
category:
  - data structure
tag:
  - Java
  - Algorithm
  - Graphs
  - DFS
  - BFS
---

# Graphs

## What is graphs?

A graph is any collection of nodes and connections between those nodes. Another term for nodes is `vertices`, and the connections between the nodes are called `edges`. One of the difference between trees and graphs is that the trees cannot contain any cycles.

## First graph input format: array of edges

In this input format, the input will be a 2D array. Each element of the array will be in the form `[x,y]`, which indicates that there is an edge between `x` and `y`.

![Graph example](/assets/images/graph1.jpg)

This example graph can be represented by an array of directed edges: `edges = [[0, 1], [1, 2], [2, 0], [2, 3]]`.

However, **At every node, we would need to iterate over the entire input to find the neighbors.** This is very slow!

Before starting the traversal, we can pre-process the input so that we can easily find all neighbors of any given `node`. Ideally, we want a data structure where we can give `node` as an argument and be returned a list of neighbors. The easiest way to accomplish this is using a hashmap.

```java
public Map<Integer, List<Integer>> buildGraph(int[][] edges) {
    Map<Integer, List<Integer>> graph = new HashMap<>();
    for (int[] edge: edges) {
        int x = edge[0], y = edge[1];
        if (!graph.containsKey(x)) {
            graph.put(x, new ArrayList<>());
        }
        graph.get(x).add(y);

        // if (!graph.containsKey(y)) {
        //     graph.put(y, new ArrayList<>());
        // }
        // graph.get(y).add(x);

        // uncomment the above lines if the graph is undirected
    }

    return graph;
}
```

## Second graph input format: adjacency list

In an adjacency list, the nodes will be numbered from `0` to `n - 1`. The input will be a 2D integer array, let's call it `graph`. `graph[i]` will be a list of all the outgoing edges from the ith node.

![Graph example](/assets/images/graph1.jpg)

The graph in the image above can be represented by the adjacency list `graph = [[1], [2], [0, 3], []]`.

## Third graph input format: adjacency matrix

The next format is an adjacency matrix. Once again, the nodes will be numbered from `0` to `n - 1`. We will be given a 2D matrix of size `n*n`, let's call it `graph`. If `graph[i][j] == 1`, that means there is an outgoing edge from node `i` to node `j`.

![Graph Example](/assets/images/graph2.jpg)

## Graphs - DFS

### Graph: DFS code template

```java
public int fn(int[][] graph) {
    Stack<Integer> stack = new Stack<>();
    Set<Integer> seen = new HashSet<>();
    stack.push(START_NODE);
    seen.add(START_NODE);
    int ans = 0;

    while (!stack.empty()) {
        int node = stack.pop();
        // do some logic
        for (int neighbor: graph[node]) {
            if (!seen.contains(neighbor)) {
                seen.add(neighbor);
                stack.push(neighbor);
            }
        }
    }

    return ans;
}
```

- To avoid cycles with undirected graphs, we need to use a set `seen` to track which nodes we have already visited. After performing a DFS on a connected component, all nodes in that component will be inside `seen` (because the DFS will visit every node in the component).
- **DFS traversal**: while the `stack` is not empty, the algorithm keeps popping nodes from the `stack`, perform some logic, and then pushes all unseen neighbors of the current node to the `stack`.
- **Return the result:** After the DFS traversal is complete, the function returns `ans`, which holds the result of the logic performed during the travsersal.

### Time complexity:

The time complexity for DFS on graphs is O(n+e), where n is the number of nodes and e is the number of **edges**.

- **Visiting each node**: DFS starts at a certain node and explores as far as possible along each branch before backtracking. This means that every node in the graph will be visited exactly once, contributing O(n) to the time complexity.

- **Exploring each edge**: For each node, the algorithm checks all its adjacent nodes. In other words, it explores every edge that is connected to the node. Since each edge in the graph will be looked at exactly once, this contributes O(e) to the time complexity.

### Space Complexity:

When we build `graph`, we are storing all the edges in arrays. Therefore the space complexity is O(n+e)

## Graphs - BFS

In graphs, it is mostly the case when we are asked to find the **shortest path**.

### Graph: BFS

```java
public int fn(int[][] graph) {
    Queue<Integer> queue = new LinkedList<>();
    Set<Integer> seen = new HashSet<>();
    queue.add(START_NODE);
    seen.add(START_NODE);
    int ans = 0;

    while (!queue.isEmpty()) {
        int node = queue.remove();
        // do some logic
        for (int neighbor: graph[node]) {
            if (!seen.contains(neighbor)) {
                seen.add(neighbor);
                queue.add(neighbor);
            }
        }
    }

    return ans;
}
```

```text
With an efficient queue, BFS has the same time and space complexity as DFS.
```
