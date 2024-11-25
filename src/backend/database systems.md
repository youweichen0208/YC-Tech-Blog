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