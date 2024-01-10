---
icon: pen-to-square
author: Youwei Chen
date: 2023-01-08
category:
  - data structure
tag:
  - Java
  - Algorithm
  - Matrix Rotation
  - Transpose
---

# Matrix Rotation & transposing

## what is transpose

transposing refers to flipping the matrix over its diagonal, which switches the row and column indices of each element. For example, if we have a matrix:

For example, if we have a matrix:

```text
1 2 3
4 5 6
7 8 9
```

After transposing, it becomes:

```text
1 4 7
2 5 8
3 6 9
```

In the transposed matrix, the first row of the original matrix becomes the first column, the second row becomes the second column, and so on.

In terms of indices, if an element was at position `(i, j)` in the original matrix, it will be at position `(j, i)` in the transposed matrix.

## Code template for transposing a 2D matrix in Java is as follows:

```java
public void transpose(int[][] matrix) {
    int n = matrix.length;
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
}
```
