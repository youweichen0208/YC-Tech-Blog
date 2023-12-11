---
icon: pen-to-square
author: Youwei Chen
date: 2023-12-10
category:
  - data structure
tag:
  - Java
  - Algorithm
  - Sliding Window
---

# Sliding Window
### 1. When should we use sliding window?

1. the problem will either explicitly or implicitly define criteria that make a subarray "valid":
   1. constraint metric: asking for attributes of a subarray. It could be the sum, the number of unique elements, the frequency of a specific element, or any other attribute.
   2. a numeric restriction on the constraint metric. This is what the constraint metric should be for a subarray to be considered valid.
2. the problem will ask you to find valid subarrays in some way.
   1. the most common task you will see is finding the best valid subarray. The problem will define what makes a subarray better than another. For example, a problem might ask you to find the longest valid subarray.
   2. another common task is finding the number of valid subarrays.

### 2. pseudocode for a general template:

```pseudocode
function fn(arr):
    left = 0
    for (int right = 0; right < arr.length; right++):
        Do some logic to "add" element at arr[right] to window

        while WINDOW_IS_INVALID:
            Do some logic to "remove" element at arr[left] from window
            left++
        Do some logic to update the answer
```
