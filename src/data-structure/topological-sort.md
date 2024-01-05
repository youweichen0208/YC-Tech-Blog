---
icon: pen-to-square
author: Youwei Chen
date: 2024-01-05
category:
  - data structure
tag:
  - Java
  - Algorithm
  - Topological Sort
---

# Topological Sort

## Directed Acyclic Graphs (DAGs)

Directed Acyclic Graphs, or DAGs, are a type of graph that is directed, meaning the edges have a direction, and acyclic, meaning it doesn't contain any cycles.

![DAG](/assets/images/DAG.png)

## What is topological sort

Topological Sort is an algorithm used on DAG to produce a linear ordering of its vertices such that for every directed edge UV from vertex U to vertex V, U comes before V in the ordering.

## Cycle Detection with Topological Sort

Topological sort can also be used to detect cycles in a graph. If a graph contains a cycle, it cannot be topologically sorted. When we attempt to perform a topological sort on a graph with a cycle, we'll end up with some vertices that we can't visit because they depend on themselves either directly or indirectly. This property can be used as a way to detect cycles in a graph.

## Performing Topological Sort using Kahn's Algorithm

Kahn's algorithm is a popular method to perform topological sorting on a DAG. The algorithm works by choosing vertices in the same order as the eventual topological sort. Here are the steps:

1. Find a list of "start vertices" which have no incoming edges and insert them into a set S; at least one such node must exist in a non-empty acyclic graph.
2. While S is non-empty, do the following:
   a. Remove a node n from S.
   b. Add n to tail of the topological sort list.
   c. For each node m with an edge e from n to m, remove edge e from the graph. If m has no other incoming edges then insert m into S.
3. If graph has edges, then graph has at least one cycle. If graph has no edges, then the algorithm has completed successfully.

The topological sorting is the vertices in the order they were added to the topological sort list.

## Code template for topological sort

```java

    void topologicalSort() {
        int[] indegree = new int[vertices];

        for (int i = 0; i < vertices; i++) {
            LinkedList<Integer> temp = (LinkedList<Integer>) adj[i];
            for (int node : temp) {
                indegree[node]++;
            }
        }

        Queue<Integer> q = new LinkedList<Integer>();
        for (int i = 0; i < vertices; i++) {
            if (indegree[i] == 0) {
                q.add(i);
            }
        }

        while (!q.isEmpty()) {
            int node = q.poll();
            System.out.print(node + " ");

            Iterator<Integer> it = adj[node].listIterator();
            while (it.hasNext()) {
                int adjNode = it.next();
                if (--indegree[adjNode] == 0) {
                    q.add(adjNode);
                }
            }
        }
    }
```

- **Time Complexity: O(V + E)**

  The time complexity of the topological sort algorithm is O(V+E), where V is the number of vertices and E is the number of edges in the graph. This is because every vertex and every edge will be explored in the algorithm. The algorithm will visit each vertex once when it's added to the queue and each edge once when it's removed from the graph.

- **Space Complexity: O(V + E)**

  The space complexity of the topological sort algorithm is also O(V+E), where v is the number of vertices and E is the number of edges in the graph.
