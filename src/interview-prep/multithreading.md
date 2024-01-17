---
icon: pen-to-square
date: 2023-01-16
category:
  - interview
tag:
  - Java
  - Interview
  - Multi-threading
---

# Multi-threading

## Multitasking

### Process-based multitasking

Allows processes (i.e programs) to run concurrently on the computer.For example, you might have a web browser, a word processor, and a music player running at the same time. Each of these applications is a separate process, and they are all running concurrently, each in its own memory space. The operating system manages these processes, scheduling CPU time for each one and switching between them quickly enough that it appears to the user that they are all running simultaneously.

### Thread-based multitasking

Allows parts of the same program to run concurrently. For example, a web server might spawn a new thread for each incoming client request. This allows the server to handle multiple requests concurrently, even if it's in the middle of processing a request. Each thread runs in the same memory space (the server process), but operates independently, handling its own client request.

### Threads vs Process:

- Threads in the same program share the same address in memory
- Context Switching between threads is usually less expensive than between processes.

## Threads:

- A thread is an independent sequential path of execution within a program.
- Many threads can run concurrently within a program
- At runtime, threads in a program exist in a common memory space and can, therefore, share both data and code (i.e., they are lightweight compared to processes).
- In Java, there are two types of threads: user threads and daemon threads

### User Thread:

- User threads are created by application developers to perform specific tasks in the application.
- They are often long-lived and perform tasks that the application requires to run.
- The JVM waits for all user threads to complete their execution before it terminates.

### Daemon Threads:

- Daemon threads are not considered user threads.
- They are typically used for background tasks that can be interrupted, such as garbage collection or other housekeeping tasks.
- The JVM can terminate even if daemon threads are still running.
- Daemon threads in Java stop when:
  1. The daemon thread has completed execution of its run method.
  2. All user threads have completed execution. When the JVM detects that all user threads have finished, it will exit, stopping all daemon threads regardless of whether they have finished their execution or not.
  3. The JVM is explicitly exited by calling `System.exit()`.

## The Main Thread:

- The main thread is the initial thread in a program that is automatically created by the JVM for executing the `main()` method of the application.
- If no other user threads are spawned, the program terminates when the main() method finishes executing.
- All other threads, called child threads, are spawned from the main thread.
- The main() method can then finish, but the program will keep running until all user threads have completed.
- The runtime environment distinguishes between user threads and deamon threads.
- Calling the `setDaemon(boolean)` method in the Thread class marks the status of the thread as either daemon or user, but this must be done before the thread is started.

## Thread Creation:

- A thread in Java is represented by an object of the Thread class.
- Creating threads is achieved in one of the two ways:
  - Implementing the java.lang.Runnable interface
  - Extending the java.lang.Thread class

### Extending the Thread class

```java
public class MyThread extends Thread {
    @Override
    public void run() {
        // Code to be executed in the thread
    }
}

// To use it:
Thread thread = new MyThread();
thread.start();
```

### Implementing the Runnable Interface

```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        // Code to be executed in the thread
    }
}

// To use it:
Thread thread = new Thread(new MyRunnable());
thread.start();
```

- The `Thread` class in Java implements the `Runnable` interface. This is why you can create a `Thread` by either extending the `Thread` class and overriding its `run` method, or by providing a `Runnable` object (which requires implementing the `run` method) to the `Thread` constructor.

```java
Thread thread = new Thread(() -> {
    // Code to be executed in the thread
});
thread.start();
```

## Lock

Locks in multithreading are used to synchronize access to shared resources to avoid data corruption, race conditions, and ensure thread safety.

- **Shared Resource Access**: When multiple threads need to access and modify a shared resource concurrently, a lock helps in ensuring that only one thread can access the resource at any given time. This precents data corruption.

- **Precenting Race Conditions**: Race conditions occur when multiple threads try to modify shared data simultaneously, leading to unpredictable behavior. Locks help in preventing race conditions by allowing only one thread to execute the critical section at a time.

## What are the wait() and sleep() methods?

### **wait()**

as the name suggests, it is a non-static method that causes the current thread to wait and go to sleep until some other threads call notify() or notifyAll() method for the object's monitor (lock).

### **sleep()**

it is a static method that pauses or stops the execution of the current thread for some specified period.

## What's the difference between notify() and notifyAll()?

### notify():

It sends a notification and wakes up only a single thread instead of multiple threads that are waiting on the object's monitor.

### notifyAll():

It sends notifications and wakes up all threads and allows them to compete for the object's monitor instead of a single thread.

## What is Thread Pool?

A thread pool is a managed group of threads that are used to efficiently execute tasks concurrently. Instead of creating a new thread for each task, a thread pool maintains a pool of worker threads that can be reused for multiple tasks.

1. Thread Reusability:

- In a thread pool, threads are created in advance and kept in the pool.
- When a task needs to be executed, a thread from the pool is assigned to handle the task.
- Once the task is completed, the thread returns to the pool for potential reuse.
- The size of the thread pool is fixed.

2. Task Queue:

- Thread pools often use a task queeu to hold tasks that are waiting to be executed.
- When a thread becomes available, it picks up a task from the queue and executes it.

3. Task Submission:

- Thread pools often use a task queue to hold tasks that are waiting to be executed.
- When a thread becomes available, it picks up a task from the queeu and executes it.

4. Benefits:

- **Reduced Thread Creation Overhead**: Creating and destroying threads can be resource-intensive. Thread pools minimize this overhead by reusing threads.
- **Better Resource Management**: The number of concurrently executing threads can be controlled, precenting resource exhaustion.

## What is deadlock and when it can occur?

A deadlock is a situation in concurrent programming where two or more threads are unable to proceed because each is waiting for the other to release a lock. In other words, a set of threads becomes deadlocked when each thread is holding a resource (like a lock) that another thread needs.

## Explain volatile variables in Java?

A volatile variable is a keyword that is used to ensure and address the visibility of changes to variables in multithreaded programming. This keyword cannot be used with classes and methods, instead can be used with variables. It is simply used to achieve thread-safety. If we mark any variable as volatile, then all the threads can read its value directly from the main memory rather CPU cache, so that each thread can get an updated value of the variable.

## What is the synchronization process? why use it?

Synchronization is basically a process in Java that enables a simple strategy for avoiding thread interference and memory consistency errors.

### Synchronized method:

In this method, the thread acquires a lock on the object when they enter the synchronized method and releases the lock either normally or by throwing an exception when they leave the method. No other thread can use the whole method unless and until the current thread finishes its execution and release the lock. It can be used when one wants to lock on the entire functionality of a particular method.

### Synchronized Block:

In this method, the thread acquires a lock on the object between parenthese after the synchronized keyword, and releases the lock when they leave the block. No other thread can acquire a lock on the locked object unless and until the synchronized block exists. It can be used when one wants to keep other parts of the programs accessible to other threads.
