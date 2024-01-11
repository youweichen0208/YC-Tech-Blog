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

```java
public int fn(int[] arr) {
    int left = 0, ans = 0, curr = 0;

    for (int right = 0; right < arr.length; right++) {
        // do logic here to add arr[right] to curr

        while (WINDOW_CONDITION_BROKEN) {
            // remove arr[left] from curr
            left++;
        }

        // update ans
    }

    return ans;
}
```

1. `Initialization:` We start by initializing two pointers, `left` and `right`, to the start of the array. We also initialize a variable `curr` to store the current state of the window, and `ans` to store the final answer.
2. `Expand the Window:` we start expanding the window by moving `right` pointer towards the end of the array. As we add new elements into the window, we update the `curr` state accordingly.
3. `Window Condition Check:` After each expansion, we check if the window condition is broken. This condition is problem-specific and can be anything like the sum of the window exceeding a certain value, the window containing a certain number of distinct elements, etc.
4. `Shrink the Window:` If the window condition is broken, we start shrinking the window from the left by moving the `left` pointer towards the right. As we remove elements from the window, we update the `curr` state accordingly. We keep shrinking the window until the window condition is satisfied again.
5. `Update the Answer:` After each expansion, we update our final answer `ans` based on the current window state `curr`. This could be the maximum or minimum window size, the maximum or minimum window sum, etc.
6. `Repeat:` We repeat steps 2-5 until the `right` pointer has gone through every element in the array.

### 3. Time Complexity:

The time complexity of the sliding window algorithm is generally O(n)

### 4. Related techniques we can use in sliding window:

1. left & right pointer
2. Use integer array to represent 26 English alphaset based on the ASCII value and keep track of frequency count of characters (usually used to handle the frequency problems related to 26 characters and deal with longest/maximum problems).

For example,

```java
int[] count = new int[26];
//'B' - 'A' = 1, 'C' - 'A' = 2, and so forth...
count['B' - 'A']++;
```
