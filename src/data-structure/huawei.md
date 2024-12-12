---
icon: pen-to-square
author: Youwei Chen
date: 2024-09-18
category:
  - data structure
tag:
  - Java
  - Algorithm
  - Circular Behavior
---

# Algorithm

## Circular Arithmetic for Circular Indexing

### Right Engine (Next Engine)

If we are at position `p` and we want to find the next engine to the right:

- The next engine is at position `p + 1`
- If you're at the last engine `N-1`, the next engine should be `0`.

So the formula is

```java
int right = (p + 1) % N;
```

### Left Engine (Previous Engine)

If we are at position `P` and want to find the previous engine to the left:

- The previous engine is at position `p - 1`.
- If we are at the first engine `0`, the previous engine should wrap around to `N - 1`

```java
int left = (p - 1 + N) % N;
```
