---
icon: pen-to-square
author: Youwei Chen
date: 2023-12-22
category:
  - data structure
tag:
  - Java
  - Algorithm
  - Sorting
  - Quick Sort
---

# Quick Sort Algorithm

## What is Quick Sort Algorithm

Quicksort is a divide-and-conquer sorting algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then recursively sorted.

## Base Code Template:

```java
public class QuickSort {
    void quickSort(int arr[], int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi-1);
            quickSort(arr, pi+1, high);
        }
    }

    int partition(int arr[], int low, int high) {
        int pivot = arr[high];
        int i = (low-1);
        for (int j=low; j<high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i+1];
        arr[i+1] = arr[high];
        arr[high] = temp;
        return i+1;
    }
}
```

- `quickSort` function: This is the main function that implements the Quicksort algorithm. It takes an array and two indices, `low` and `high`, which specify the range of the array to be sorted.
  - **Base case**: If `low` is not less than `high`, the function returns, as there are no more elements to sort.
  - **Partition the array**: Call the `partition` function to partition the array around a pivot. The `partition` function returns the index of the pivot in the partitioned array.
  - **Recursively sort the sub-arrays**: Call `quicksort` recursively sort the elements to the left and right of the pivot.
- `partition` function: This function takes an array and two indices, `low` and `high`, and partitions the array around a pivot.
  - **Choose a pivot**: The pivot is chosen as the element at the `high` index.
  - **Initialize the partition index**: The partition index `i` is initialized to `low - 1`. This index is used to swap elements that are less than the pivot.
  - **Partition the array**: Iterate over the elements from `low` to `high - 1`. If an element is less than the pivot, increment `i` and swap the element at `i` with the element at `j`.
  - **Place the pivot**: After partitioning the array, place the pivot at its correct position by swapping it with the element at `i + 1`.
  - **Return the pivot index**: Return `i + 1` as the pivot index.

## Time Complexity:

- Best Case: O(nlogn) - This is the case when the pivot element is always the median of the array. This causes the array to be divided into two nearly equal halves, leading to the logarithmic time complexity.
- Average Case: O(nlogn) - Even in the average case, quicksort has a time complexity of O(n log n). This is one of the reasons it's a popular choice for sorting large data sets.
- Worst Case: O(n^2) - The worst case occurs when the pivot element is the smallest or the largest in the array, causing an unbalanced partition. In this case, quicksort degrades to a complexity of O(n^2). However, this case is quite rare, especially if the pivot is chosen randomly.

## Space Complexity:

- Best Case & Average Case: O(log n) - This is the case when the pivot is always the median, causing the array to be divided into two nearly equal halves. Each recursive call to quicksort finishes before the next one starts, so they don't all need to be stored on the call stack.
- Worst Case: O(n) - This is the case when the pivot is the smallest or the largest element, causing an unbalanced partition. Each recursive call to quicksort doesn't finish until the next one starts, so they all need to be stored on the call stack.
