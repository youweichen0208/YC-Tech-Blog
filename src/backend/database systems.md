---
icon: pen-to-square
date: 2024-11-25
category:
  - backend
tag:
  - Database 
  - SQL
---

# Intro to database systems

## Relational Model & Algebra

#### 1. Databases
A database is an organized collection of inter-related data that models some aspect of the real-world. People often confuse "database" with "database management systems" (e.g. MySQL, Oracle, MongoDB, Snowflake). A database management system (DBMS) is the software that manages a database.


#### 2. Flat File Strawman
In database systems, a `Flat File Strawman` refers to an initial or simplified proposal for organizing data in flat files (such as text files or csv files) before considering more complex solutions like relational database or NoSQL systems.

**Issues with Flat Files**
- `Data Integrity` How do we ensure that the artist is the same for each album entry? What if somebody overwrites the album year with an invalid string? what if there are multiple artists on an album? What happensif we delete an artist that has albums?
- `Implementation` How do we find a particular record? What if we now want to create a new application that uses the same database? What if that application is running on a different machine? What if two threads try to write to the same file at the same time?
- `Durability` What if the machine crashes while our program is updating a record? What if we want to replicate the database on multiple machines for high availability?

#### 3. Database Management System
A **DBMS** is a software that allows applications to store and analyze information in a database. A general-purpose DBMS is designed to allow the definition, creation, querying, update, and administration of databases in accordance with some data model. A **schema** is a description of a particular collection of data based on a data model. This defines the structure of data for a data model. Withou a schema, we will have random bits with no meaning.

#### 4. Relational Model
A relation is an unordered set that contains the relationship of attributes that represent entities. Since the relationships are unordered, the DBMS can store them in any way it wants, allowing for optimization.

A tuple is a set of attribute values (also known as its domain) in the relation. In the past, values had to be atomic or scalar, but now values can also be lists or nested data structures. Every attribute can be a special value, NULL, which means for a given tuple the attribute is undefined.

A relation's primary key uniquely identifies a single tuple in a table. A foreign key specifies that an attribute from one relation maps to a tuple in another relation. Generally, the foreign key will point/be equal to a primary(unique **more precisely**) key in another table.

A constraint is a user-defined condition that must hold for any instance of the database. Unique key and referential (foreign key) constraints are the most common.

## Device Driver, GPU, CPU, SSD, HDD, 
#### 1. Device Driver
A **device driver** is a software program that acts as a mediator between the operating system and hardware devices. It allows the OS to communicate with and control hardware components by sending specific instructions.
- `Role`: without a device driver, the OS wouldn't know how to interact with a piece of hardware. Each type of hardware requires its own device driver, tailored to its capabilities and functions.
- `How it works`: the OS sends generic commands to the device driver, which then translates these commands into device-specific instructions. The driver handles all the low-level tasks, such as managing hardware resources, controlling input/output operations, and ensuring that the device operates as expected.
- `Examples of Device Drivers`:
  - `GPU Driver` (e.g., NVIDIA, AMD) for graphics cards
  - `Printer Driver` for printing tasks 
  - `Network Adaptor Driver` for network cards.
  
#### 2. GPU (Graphics Processing Unit)
The `GPU` is a specialized processor designed to accelerate rendering of images, videos, and animations. It handles parallel processing tasks and is responsible for high-performance computations related to graphics and visual processing.
- `Roles in Computers`:
  - `Graphics Rendering`: The GPU is primarily used to render graphics for user interfaces, video games, and multimedia content. It handles tasks like drawing shapes, textures, colors, and lighting effects on the screen.
  - `Parallel Processing`: Unlike the CPU, which is optimized for sequential tasks, the GPU is optimized for parallel tasks. It can perform thousands of calculations simultanously, making it well-suited for tasks like image processing, machine learning, and scientific simulations.
  
- `Use Cases`:
  - `Gaming`: GPUs render real-time 3D graphics in video games.
  - `Video Editing`: GPUs accelerate video processing and rendering.
  - `Machine Learning`: GPUs are widely ised for training AI models due to their ability to handle massive amounts of data in parallel.
- `Examples`: NVIDIA GeForce, AMD Radeon.

#### 3. CPU (Central Processing Unit)
The `CPU` is the primary processing unit in a computer, often referred to as the "brain" of the system. It handles the core computations and logic required for the operation of the computer.



#### 4. CPU and GPU Collaboration:
1. `CPU's Role`:
   - The `CPU` is like the general manager of the system. It handles `general tasks` and `coordinate operations`, ensuring everything runs smoothly.
   - It manages the overall flow of the `operating system` and `applications`, dealing with things like:
     - `Task scheduling`: Deciding which tasks run and when.
     - `User interactions`: Responding to inputs, like clicking buttons, running programs, etc.
     - `General logic and control flow`: It processes instructions one at a time (sequential tasks), like launching an app, loading files, or performing system calculations.
  
2. `GPU's Role`:
   - The `GPU` is a `specialized assistant` that takes over when tasks require `high levels of parrallism` (i.e, handling lots of data at once), especially when it coems to graphics rendering or tasks that can be broken into smaller parallel computations.
   - The `CPU` delegates `specific tasks` to the `GPU`, such as:
     - `Rendering graphics`: in video games, the CPU might handle the game logic, while the GPU takes care of rendering each frame, processing the images, and creating visual effects. 
     - `Parallel computing`: In tasks like machine learning, the CPU sends computation-heavy workloads to the GPU, which can perform many calculations simultanously (e.g., matrix multiplication or image processing).
3. `How it works together`:
   - The `CPU` acts as the central controller of the system, executing `sequential tasks` and ensuring the operating system, applications, and interactions are smooth.
   - When a task requires intensive `parallel processing` (like rendering graphics or running AI models), the `CPU` offloads these tasks to the `GPU`, which can handle many operations `simultaneously` with its many cores.

4. `The CPU-GPU` relationship:
  - `CPU`: Manages the overall operation of the system, ensuring that everything runs smoothly, and `delegates` specific tasks to the `GPU` when necessary.
  - `GPU`: Takes over when the task at hand can be broken down into many smaller, independent operations, such as `graphics rendering, video recording, or parallel computing` tasks. It accelerates those tasks and offloads the burdern from the CPU.


#### SSD (Solid-State Drivers固态硬盘)
An SSD is a data storage device that uses `flash memory` to store data persistently. Unlike HDDs, SSDs have no moving parts, which makes them faster, more durable, and less prone to mechanical failure.

#### HDD (Hard Disk Drives硬盘)
An `HDD` is a traditional storage device that uses `magnetic storage` to read and write data. HDDs containing moving parts, primarily spinning platters (disks) and the read/write heads that float above the platters to access the data.


#### When to use an SSD:
- `Operating System and Boot Drive`: SSDs significantly speed up boot times and system responsiveness
- `Gaming`: Faster loading times and improved game performance.
- `Resource-Intensive Applications`: Video editing, 3D rendering, and other tasks that require high data throughput benefit from the speed of an SSD.
- `Laptops and Portable Devices`: the lower power consumption and durability of SSDs make them ideal for mobile devices.
  
#### When to use an HDD:
- `Data Archiving and Backup`: When storing large amounts of data that don't require fast access, HDDs are a more cost-effective solution.
- `Massive Storage`: personal storage with large capacity.
  

## Database storage
#### 1. Storage 
The primary storage location of DBMS database is on non-volatile disk(s). Volatile means that if we pull off the power form machine, then the data is lost. Non-volatile means the data won't be lost if the power is off. Since our DBMS architecture assumes that the database is stored on disk, the components of the DBMS are responsible for figuring out how to move data between non-volatile disk and volatile memory since the system cannot operate on the data direcly on disk.

#### 2. Disk-Oriented DBMS Overview
The database is all on disk, and the data in database files is organized into pages, with the first page being the directory page. To operate on the data, the DBMS needs to bring the data into memory. It does this by having a buffer pool that manages the data movement back and forth between disk and memory. The DBMS has an execution engine that will execute queries. The execution engine will ask the buffer pool for a specific page, and the buffer pool will take care of bringing that page into memory and giving the execution engine a pointer to that page in memory. The buffer pool manager will ensure that the page is there while the execution engine operates on that part of memory.

#### 3. DMBS vs OS 
A high-level design goal of the DBMS is to support databases that exceed the amount of memory availabl. Since reading/writing to disk is expensive, disk use must be carefully managed. We do NOT want large stalls from fetchign something from disk to slow down everything else. We want the DBMS to be able to process other queries while it is waiting to get the data from disk.

This high-level design goal is liek virtual memory, where there is a large address space and a place for the OS to bring in pages from disk.

One way to achieve this virtual memory is by using mmap to map the contents of a file in a process' address space, which makes the OS responsible for moving pages back and forth between disk and memory.

#### 4. File Storage
In its most basic form, a DBMS stores a database as file on disk. Some may use a file hierarchy, others may use a single file (e.g., SQLite).

The OS does not know anything about the contents of these files. Only the DBMS knows how to decipher their contents, since it is encoded in a way specific to the DBMS.

The DBMS's storage manager is responsible for managing database's files. It represents the files as a collection of pages. It also keeps track of what data has been read and written to pages as well how much free space there is in these pages.

#### 5. Database Pages 
The DBMS organizes the database across one or more files in fixed-size blocks of data called pages. Pages can contain different kinds of data(tuples, indexes. etc). Most systems will not mix these types within pages. Some systems will require that pages are self-contained, meaning that all the information needed to read each page is on the page itself.

Each page is given a unique identifier (page ID). If the database is a single file, then the page id can just be the file offset. A page ID could be unique per DB,S instance, per database, or per table. Most DBMSs have an indirection layer that maps a page id to a file path and offset. The upper levels of the system will ask for a specific page number. Then, the storage manager will have to turn that page number into a file and an offset to find the page. Most DBMSs uses fixed-size pages to avoid the engineering overhead needed to support variable-sized pages. For example, with variable-size pages, deleting a page could create a hole in files that the DBMS cannot fill with new pages.

There are 3 concepts of pages in DBMS:
1. Hardware page (usually 4 KB)
2. OS page (4 KB)
3. Database page (1-16 KB)

The storage device guarantees that an atomic write of the size of the hardware page. If the hardware page is 4 KB and the system tries to write 4 KB to the disk, either all 4 KB will be written, or none of it will. This means that if our database page is larger than our hardware page, the DBMS will have to take extra measures to ensure that the data gets written out safely since the program can get partway through writing a database page to disk when the system crashes.