---
icon: pen-to-square
date: 2024-12-13
category:
  - backend
tag:
  - C++
---

# C++ 

## `typedef` & `using`
In C++, `typedef` is a keyword used to create an alias for an existing data type. This can help improve ode readability, make complex types easier to manage, or adapt to platform-specific changes without modifying multiple parts of the code. Starting with C++11, the `using` keyword can be used as an alternative to `typedef`. It is often preferred for its clarity, especially when defining complex types.

```cpp
typedef existing_type new_type_name;
```

### Examples:
1. Basic Usage:
`typedef:`
```cpp
    typedef unsigned int uint;
    uint a = 10; // 'uint' is now an alias for 'unsigned int'
```

`using:` 
```cpp
    using uint = unsigned int; // Equivalent to typedef unsigned int uint;
```
2. Struct Alias:

`typedef:`
```cpp
struct Point {
    int x, y;
}

typedef struct Point PointAlias;
PointAlias p1 = {10, 20};
```   

`using:` 
```cpp
struct Point {
    int x, y;
};
using PointAlias = Point;

int main(){
    PointAlias p1 = {10, 20};
    return 0;
}
```

3. Pointer Aliases:
`typedef:`
```cpp
typedef int* IntPointer;
IntPointer p1, p2;
```

`using:`
```cpp
using IntPointer = int*;
IntPointer p1, p2;
```

4. Function Pointer Alias:
`typedef`
```cpp
typedef void (*FunctionPtr)(int);
void exampleFunction(int x) {
    // Implementation
}

FunctionPtr fptr = exampleFunction;
```

`using`
```cpp
using FunctionPtr = void(*)(int);
void exampleFunction(int x) {
    std :: cout << "Value: " << x << std:endl;
}

int main(){
    FunctionPtr fptr = exampleFunction;
    return 0;
}
```