---
icon: pen-to-square
date: 2024-03-13
category:
  - backend
tag:
  - C#
  - .net
  - Asynchronous programming
---

# Asynchronous programming in C#

## What is asynchronous programming in C#

Asychronous programming in C# allows us to execute tasks concurrently without blocking the main thread of execution. It's particularly useful for I/O-bound operations such as reading from or writing to a file, making network requests, or querying a database, where the program would otherwise spend most of its time waiting for the operation to complete.

In synchronous programming, when we call a method that performs a time-consuming operation, the program waits for that operation to finish before continuing to execute further code. This can lead to inefficiencies, especially in applications that need to handle multiple concurrent tasks.

1. **Asychronous Methods**: We declare a method with the `async` keyword. This indicates that the method contains asynchronous operations and can be awaited.

2. **Awaitable Operations**: Inside an async method, we can use the `await` keyword before an operation that returns a `Task` or `Task<TResult>`. The await keyword pauses the execution of the method until the awaited task completes. During this time, the thread is released and can be used for other tasks.

3. **Non-blocking Execution**: While the awaited operation is in progress, the calling thread is free to perform other tasks. When the awaited operation completes, the method resumes execution from where it was paused.

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        await FetchDataAsync();
        Console.WriteLine("Async operation completed.");
    }

    static async Task FetchDataAsync()
    {
        using (HttpClient client = new HttpClient())
        {
            string result = await client.GetStringAsync("https://api.example.com/data");
            Console.WriteLine("Received data: " + result);
        }
    }
}

```

In this example, the `GetStringAsync` method of the `HttpClient` class returns a `Task<string>`, indicating that it can be awaited asynchronously. When the `FetchDayaAsync` method calls `GetStringAsync`, it awaits the completion of the HTTP request without blocking the main thread. Once the data is received, the method contines executing, and the result is printed to the console.

## Overview of the asynchronous model

The core of async programming is the `Task` and `Task<T>` objects, which model asynchronous operations. The model is fairly simple in most cases:

- For I/O-bound code, we await an operation that returns a `Task` or `Task<T>` inside of an `async` method.

- For CPU-bound code, we await an operation that is started on a background thread with the `Task.Run` method.

### I/O-bound example: Download data from a web service

We may need to downlaod some data from a web service when a button is pressed but don't want to block the UI thread. It can be accomplished like this:

```csharp
s_downloadButton.Clicked += async (o, e) =>
{
    // This line will yield control to the UI as the request
    // from the web service is happening.
    //
    // The UI thread is now free to perform other work.
    var stringData = await s_httpClient.GetStringAsync(URL);
    DoSomethingWithData(stringData);
};
```

### CPU-bound example: Perform a calculation for a game

Say we're writing a mobile game when pressing a button can inflict damage on many enemies on the screen. Performing the damage calculation can be expensive, and doing it on the UI thread would make the game appear to pause as the calculation is performed.

The best way to handle this is to start a background thread, which does the work using `Task.Run`, and await its result using `await`. This allows the UI to feel smooth as the work is being done.

### Recognize CPU-bound and I/O-bound work

Here are two questions we should ask before we write any asynchronous code:

1. Will our code be "waiting" for something, such as data from a database?
   If the answer is "yes", then our work is **I/O-bound**.
2. Will our code be performing an expensive computation?
   If the answer is "yes", then our work is **CPU-bound**.

If the work we have is **I/O-bound**, use `async` and `await` without `Task.Run`. we should not use the Task Parallel Library.

If the work we have is **CPU-bound** and we care about responsiveness, use `async` and `await`, but spawn off the work on another thread with `Task.Run`.

## Async return types (C#)

### Task return type:

If we use a Task return type for an async method, a calling method can use an `await` operator to suspend the caller's completion until the called async method has finished.

In the following example, the `waitAndApologizeAsync` method doesn't contain a `return` statement, so the method returns a `Task` object. Returning a `Task` enables `WaitAndApologizeAsync` to be awaited.
The Task type doesn't include a `Result` property because it has no return value.

```csharp
public static async Task DisplayCurrentInfoAsync()
{
    await WaitAndApologizeAsync();

    Console.WriteLine($"Today is {DateTime.Now:D}");
    Console.WriteLine($"The current time is {DateTime.Now.TimeOfDay:t}");
    Console.WriteLine("The current temperature is 76 degrees.");
}

static async Task WaitAndApologizeAsync()
{
    await Task.Delay(2000);

    Console.WriteLine("Sorry for the delay...\n");
}
// Example output:
//    Sorry for the delay...
//
// Today is Monday, August 17, 2020
// The current time is 12:59:24.2183304
// The current temperature is 76 degrees.
```

`WaitAndApologizeAsync` is awaited by using an await statement instead of an await expression, similar to the calling statement for a synchronous void-returning method. The application of an await operator in this case doesn't produce a value. When the right operand of an `await` is a `Task<TResult>`, the `await` expression produces a result of `T`. When the right operand of an `await` is a Task, the `await` and its operand are a statement.

### `Task<TResult>` return type

The `Task<TResult>` return type is used for an async method that contains a return statement in which the operand is `TResult`.

```csharp
public static async Task ShowTodaysInfoAsync()
{
    string message =
        $"Today is {DateTime.Today:D}\n" +
        "Today's hours of leisure: " +
        $"{await GetLeisureHoursAsync()}";

    Console.WriteLine(message);
}

static async Task<int> GetLeisureHoursAsync()
{
    DayOfWeek today = await Task.FromResult(DateTime.Now.DayOfWeek);

    int leisureHours =
        today is DayOfWeek.Saturday || today is DayOfWeek.Sunday
        ? 16 : 5;

    return leisureHours;
}
// Example output:
//    Today is Wednesday, May 24, 2017
//    Today's hours of leisure: 5
```

In the example above, the `GetLeisureHoursAsync` method contains a `return` statement that returns an integer. The method declaration must specify a return type of `Task<int>`.

### Void return type

We can use the `void` return type in asynchronous event handlers, which require a `void` return type. For methods other than event handlers that don't return a value, we should return a Task instead, because an async method that returns `void` can't be awaited. Any call of such a method must continue to completion without waiting for the called async method to finish. The caller must be independent of any values or exceptions that the async method generates.

## What is the difference between multi-threading and asynchronous programming?

In multithreaded programming, concurrency is achieved by executing multiple threads simultaneously, each performing a separate task. These threads can run concurrently on multiple CPU cores. In contrast, async/await is a cooperative concurrency model where tasks yield control back to the calling thread when they are waiting for asynchronous operations to complete. This allows the same thread to be used for multiple tasks, reducing the overhead of creating and managing multiple threads.

## Explain the scenarios where would we use `Task.WhenAny()` and `Task.WhenAll()`?

### `Task.WhenAny()`:

`Task.WhenAny()` returns a task that completes when any of the input tasks have completed, whether successfully, with an error, or due to cancellation. It allows us to perform an action as soon as any one of the tasks completes. This can be useful in scenarios such as:

1. **Parallel Web Requests**: When making multiple HTTP requests to different endpoints concurrently, we might want to process the response of the first successful request or handle the case where one of the requests fails or takes too long.

2. **Load Balancing**: In a distributed system, we might have multiple services performing the same task. Using `Task.WhenAny()`, we can send a request to the first service that becomes available and ignore the others.

### `Task.WhenAll()`:

`Task.WhenAll()` returns a task that completes when all of the input tasks have completed, either successfully or with an error. It allows us to perform an action once all of the tasks have finished.

1. **Aggregating Results:** When we need to combine the results of multiple asynchronous operations before proceeding, such as fetching data from multiple resources and merging the results.
2. **Parallel Processing**: When we have a set of independent tasks that can be executed concurrently and we want ot wait for all of them to complete before continuing.
