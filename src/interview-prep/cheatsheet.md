---
icon: pen-to-square
date: 2023-12-10
category:
  - interview
tag:
  - Cheatsheet
  - Java
---

# 1. StringBuilder:

### append in StringBuilder:

The `append()` method appends the provided data to the end of `StringBuilder`. We can chain multiple `append()` calls together to build a string step by step.

```java
StringBuilder sb = new StringBuilder();
sb.append("Hello, ");
sb.append('W');
sb.append(42);
```

### insert in StringBuilder:

`insert()` is used to insert data at a specific position within the `StringBuilder`. It's also overloaded and accepts various data types

```java
public class MyClass {
    public static void main(String args[]) {
      StringBuilder builder = new StringBuilder("xyz");
      builder.insert(1, 100);
      System.out.println("Builder is " + builder.toString()); //Builder is x100yz
    }
}
```

### **setCharAt:**

use the `setCharAt()` method in the `StringBuilder` class to modify a character at specified index within the `StringBuilder`.

```java
StringBuilder sb = new StringBuilder("Hello, World!");

// Set the character at index 7 to 'X'
sb.setCharAt(7, 'X');

// sb now contains "Hello, Xorld!"
```

### **delete():**

this method removes a range of characters from the `StringBuilder`.

```java
StringBuilder sb = new StringBuilder("Hello, World!");
sb.delete(7, 13); // Removes "World!"
```

### **deleteCharAt():**

This method removes the character at a specified index.

```java
StringBuilder sb = new StringBuilder("Hello, World!");
sb.deleteCharAt(5); // Removes ','
```

### **replace():**

this method replaces a range of characters with a specified string.

```java
StringBuilder sb = new StringBuilder("Hello, World!");
sb.replace(0, 5, "Hi"); // Replaces "Hello" with "Hi"
```

### **substring():**

this method extracts a substring from the `StringBuilder` based on start and end indices.

```java
StringBuilder sb = new StringBuilder("Hello, World!");
String substring = sb.substring(7, 12); // Retrieves "World"
```

### **reverse():**

this method reverses the characters in the `StringBuilder` in place.

```java
StringBuilder sb = new StringBuilder("Hello");
sb.reverse(); //Now sb contains "olleH"
```

### **length():**

this method returns the current length (number of characters) of the `StringBuilder`.

```java
StringBuilder sb = new StringBuilder("Hello, World!");
int length = sb.length(); // Returns 13
```

# **2. Converting Number to String:**

### Using **String.valueOf()**:

You can convert a number (e.g., int, double, float, etc.) to a string using the String.valueOf() method or by simply concatenating it with an empty string ("").

```java
int number = 42;
String str = String.valueOf(number); // or str = "" + number;
```

# **3. Converting String to Number**:

### Using **Integer.valueOf()**:

To convert a string to an integer, we can use the `Integer.parseInt()` method. This method parses the string and returns an integer.

### Using **Double.valueOf(**):

For converting strings to floating-point numbers, we can use the `Double.parseDouble` method.

# **4. Arrays.sort()**:

`Arrays.sort()` is a method in Java that is used to sort elements in an array in ascending order. It's part of the `java.util` package and is commonly used for sorting arrays of various types, including arrays of primitive data types and arrays of objects.

### Sorting Arrays of Primitive Data Types:

```java
int[] numbers = {5, 2, 9, 1, 5, 6};
Arrays.sort(numbers); // Sorts the 'numbers' array in ascending order
```

### Custom Comparator for Objects:

```java
String[] words = {"apple", "banana", "cherry", "date"};
Arrays.sort(words, (a, b) -> Integer.compare(a.length(), b.length()));
// Sorts 'words' by string length
```

# **5. Collections.sort**:

`Collections.sort()` is a method in Java used to sort elements in a collection in ascending order. Unlike `Arrays.sort()`, which is used to sort arrays, `Collections.sort()` is used with collections that implement the `List` interface.

### Sorting Lists of Objects:

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

List<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
names.add("Charlie");
names.add("Eve");

Collections.sort(names); // Sorts the 'names' list in lexicographical (alphabetical) order
```

### Custom Comparator for Lists of Objects:

```java
List<String> words = new ArrayList<>();
words.add("apple");
words.add("banana");
words.add("cherry");
words.add("date");

Collections.sort(words, (a, b) -> Integer.compare(a.length(), b.length()));
// Sorts 'words' by string length
```

# **6.Common Methods in HashMap in Java:**

### **containsKey(key):**

checks if the map contains a specific key. Returns `true` if the key exists.

```java
boolean exists = map.containsKey("apple"); // Checks if the key "apple" exists
```

### **containsValue(value):**

checks if the map contains a specific value. Return `true` if the value exists.

```java
boolean exists = map.containsValue(5); // Checks if the value 5 exists in the map
```

### **remove(key):**

removes a key-value pair from the map based on the specified key.

```java
map.remove("apple"); // Removes the key-value pair with the key "apple"
```

### **size():**

returns the number of key-value pairs in the map

```java
int size = map.size(); // Returns the number of entries in the map
```

### **isEmpty():**

checks if the map is empty. Returns `true` if the map has no key-value pairs.

```java
boolean isEmpty = map.isEmpty(); // Checks if the map is empty
```

### iterate through hashmap:

In Java, we can iterate through a HashMap using a for-each loop on the entrySet of the map. Here's an example:

```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        // Create a new HashMap
        HashMap<String, Integer> map = new HashMap<>();

        // Add key-value pairs to the HashMap
        map.put("Apple", 10);
        map.put("Banana", 20);
        map.put("Cherry", 30);

        // Iterate over the HashMap
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println("Key: " + entry.getKey() + ", Value: " + entry.getValue());
        }
    }
}
```

### iterate through keys:

In Java, we can iterate through keys in hashmap as well using keySet()

```java
Map<Integer, Integer> counts = new HashMap<>();
for (int key : counts.keySet()){

}
```

### get the **value** or the **default value** in HashMap:

The getOrDefault(Object key, V defaultValue) method of HashMap in Java is used to get the value to which the specified key is mapped, or the defaultValue if this map contains no mapping for the key

```java
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("Apple", 10);
        map.put("Banana", 20);

        int defaultValue = 0;
        int appleCount = map.getOrDefault("Apple", defaultValue);
        int orangeCount = map.getOrDefault("Orange", defaultValue);

        System.out.println("Apple Count: " + appleCount);  // Output: Apple Count: 10
        System.out.println("Orange Count: " + orangeCount);  // Output: Orange Count: 0
    }
}
```

# 7. **HashSet in Java:**

A HashSet in Java is a collection of items where every item is unique, and it is one of the implementations of the Set interface. HashSet does not maintain any order of its elements. It uses the hashCode method of the objects it contains to efficiently store its elements and ensure uniqueness.

### methods in Hashset:

- add(E e): add the specified element to this set if it is not present.
- remove(Object o): removes the specified element from this set if it is present
- contains(Object o): returns true if this set contains the specified element.
- size(): returns the number of elements in this set.
- isEmpty(): returns true if this set contains no elements.
- clear(): removes all of the elements from this set.

### initialization:

1. we can initialize a HashSet without the parameter:

```java
HashSet<String> set = new HashSet<>();
```

2. we can also initialize a HashSet with a list or collection to the HashSet. This can be useful for removing duplicates from a list or an array, since a HashSet does not allow duplicate elements.

```java
String[] array = {"Apple", "Banana", "Apple", "Cherry"};
HashSet<String> set = new HashSet<>(Arrays.asList(array));

System.out.println(set);  // Output: [Apple, Cherry, Banana]
```

# 8. Stacks in Java:

A stack is an ordered collection of elements where elements are only added and removed from the same end.

### methods in stack:

- push(E item): pushes an item onto top of this stack.
- pop(): removes the object at the top of this stack and returns that object as the value of this function.
- peek(): looks at the object at the top of this stack without removing it from the stack.
- empty(): test if this stack is empty.
- search(Object o): returns the 1-based position where an object is on this stack.

### stack initialization:

```java
Stack<String> stack = new Stack<>();
```

# 9. Queue in Java:

### methods in queue:

- add(E e): inserts specific element into this queue if it is possible to do so immediately without violating the restrictions.
- offer(E e): inserts the specified element into this queue if it is possible to do.
- remove(): retrieves and removes the head of this queue.
- poll(): retrieves and remove the head of this queue, or return null if this queue is empty.
- peek(): retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.

### initialization in queue:

```java
import java.util.LinkedList;
import java.util.Queue;

public class Main {
    public static void main(String[] args) {
        Queue<String> queue = new LinkedList<>();
        queue.add("Apple");
        queue.add("Banana");
        queue.add("Cherry");

        System.out.println(queue.peek());  // Output: Apple
        System.out.println(queue.poll());  // Output: Apple
        System.out.println(queue.peek());  // Output: Banana
    }
}
```

# 10. Math in java

### **Math.ceil():**

`Math.ceil()` is a floating-point number up to the nearest integer using the `Math.ceil()` method

```java
public class CeilingExample {
    public static void main(String[] args) {
        double number1 = 4.2;
        double number2 = 7.8;
        double number3 = -3.14;

        double result1 = Math.ceil(number1);
        double result2 = Math.ceil(number2);
        double result3 = Math.ceil(number3);

        System.out.println("Math.ceil(4.2) = " + result1); // Output: 5.0
        System.out.println("Math.ceil(7.8) = " + result2); // Output: 8.0
        System.out.println("Math.ceil(-3.14) = " + result3); // Output: -3.0
    }
}
```

###
