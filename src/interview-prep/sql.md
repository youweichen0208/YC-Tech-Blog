---
icon: pen-to-square
date: 2023-12-17
category:
  - interview
tag:
  - sql
---

# SQL Interview Questions:

## What is database?

A database is an organized collection of data, stored and retrieved digitally from a remote or local computer system.

## What is DBMS?

DBMS stands for Database Management System.It provides a systematic way to create, retrieve, update and manage data.

## What is RDBMS? How is it different from DBMS?

RDBMS stands for Relational Database Management System. It is a type of DBMS that stores data in a structured format, using rows and columns. In an RDBMS, data can be related to other data, hence the term "relational". Tables can be linked by defined relations making it possible to combine data from several tables upon request. The primary difference between an RDBMS and a DBMS is that an RDBMS uses a structure that allows for the identification of and access to data in relation to other pieces of data in the database, while a DBMS does not.

## What is SQL?

SQL stands for Structured Query Language. It is the standard language for relational database management systems. It is especially useful in handling organized data comprised of entities (variables) and relations between different entities of the data.

## What is the difference between SQL and MySQL?

### SQL:

a standard language for managing and manipulating relational databases. It can be used to perform tasks such as update data on a database, or retrieve data from a database.

### MySQL:

an open-source relational database management system, owned by Oracle. It uses SQL to query the database, but it also includes its own additional extensions and features that are not part of the standard SQL. MySQL is known for its speed, reliability, and ease of use.

## What are Constraints in SQL?

Constraints in SQL are rules that are applied to data columns on a table. They are used to limit the type of data that can go into a table. This ensures the accuracy and reliability of the data in the table. If there is any violation between the constraint and the data action, the action is aborted.

- **NOT NULL** - Restricts NULL value from being inserted into a column.
- **CHECK** - Verifies that all values in a field satisfy a condition.
- **DEFAULT** - Provides a default value for a column when none is specified.
- **UNIQUE** - Ensures that all values in a column are different.
- **INDEX** - Used to create and retrieve data from the database very quickly.
- **PRIMARY KEY** - Uniquely identifies each record in a database table. Each table can have one primary key.
- **FOREIGN KEY** - Uniquely identifies a row/record in any of the given database table. It is used to prevent actions that would destroy links between tables.

```sql
CREATE TABLE Employees (
    ID int NOT NULL,  -- NOT NULL
    Name varchar(255) NOT NULL,
    Age int CHECK (Age >= 18),  -- CHECK
    City varchar(255) DEFAULT 'Unknown',  -- DEFAULT
    Email varchar(255) UNIQUE,  -- UNIQUE
    PRIMARY KEY (ID),  -- PRIMARY KEY
    DeptID int,
    FOREIGN KEY (DeptID) REFERENCES Departments(DeptID)  -- FOREIGN KEY
);

CREATE INDEX idx_Employees_Name  -- INDEX
ON Employees (Name);
```

## What is a Primary Key?

The `PRIMARY KEY` constraint uniquely identifies each row in a table. It must contain UNIQUE values and has an implicit NOT NULL constraint. A table in SQL is strictly restricted to have one and only one primary key, which is comprised of single or multiple fields (columns).

```sql
CREATE TABLE Students (   /* Create table with a single field as primary key */
   ID INT NOT NULL
   Name VARCHAR(255)
   PRIMARY KEY (ID)
);

CREATE TABLE Students (   /* Create table with multiple fields as primary key */
   ID INT NOT NULL
   LastName VARCHAR(255)
   FirstName VARCHAR(255) NOT NULL,
   CONSTRAINT PK_Student
   PRIMARY KEY (ID, FirstName)
);

ALTER TABLE Students   /* Set a column as primary key */
ADD PRIMARY KEY (ID);
ALTER TABLE Students   /* Set multiple columns as primary key */
ADD CONSTRAINT PK_Student   /*Naming a Primary Key*/
PRIMARY KEY (ID, FirstName);
```

`PK_Student` is the name of a PRIMARY KEY constraint that is being applied to the ID and FirstName columns of the Students table. The PK\_ prefix is a common naming convention indicating that this is a primary key constraint.

## What is the difference between primary key and unique?

- **NULL Values:**
  A column with a `PRIMARY KEY` constraint cannot have NULL values. On the other hand, a column with a `UNIQUE` constraint can have NULL values, unless it is also constrained by NOT NULL.
- **Number of Keys**:
  A table can have only one `PRIMARY KEY`. However, a table can have multiple `UNIQUE` constraints.
- **Purpose**:
  The `PRIMARY KEY` is used to uniquely identify each record in a table. It is often used as a reference for `FOREIGN KEY` constraints in other tables. The `UNIQUE`constraint is used when you want to prevent duplicate values in a column, but it doesn't necessarily identify the record uniquely.

## What is a Foreign Key?

A **FOREIGN KEY** comprises of single or collection of fields in a table that essentially refers to the **PRIMARY KEY** in another table. Foreign key constraint ensures **referential integrity** in the relation between two tables.

### Example 1:

If Table A has a foreign key that points to Table B, then every value of the foreign key in Table A must either be null or be found in the primary key of Table B.

### Example 2:

For example, we might have a `Users` table with a primary key of `UserID`, and an `Orders` table with a `CustomerID` foreign key that references the `UserID` in the Users table. Even though `UserID` and `CustomerID` are different names, the `CustomerID` is still a foreign key that references the `UserID` primary key.

## What is Referential Integrity?

Referential integrity is a property of data which, when satisfied, requires every value of one attribute (column) of a relation (table) to exist as a value of another attribute in a different (or the same) relation.

Referential integrity rules enforce the following:

- A record that contains a foreign key value cannot be inserted into the table that contains the foreign key unless there is a corresponding value in the referenced primary key.
- A record cannot be deleted from a primary key table if matching records exist in a foreign key table.
- A primary key value cannot be updated if matching records exist in a foreign key table.

## What is Join?

The **SQL Join** clause is used to combine records (rows) from two or more tables in a SQL database based on a related column between the two.

### **INNER JOIN**:

![inner join](/assets/images/inner-join.jpg)

```sql
SELECT column_name(s)
FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name;
```

Returns records that have matching values in both tables.

### **LEFT JOIN**:

![left join](/assets/images/left-join.jpg)

```sql
SELECT column_name(s)
FROM table1
LEFT JOIN table2
ON table1.column_name = table2.column_name;
```

Returns all records from the left table, and the matched records from the right table. If there is no match, the result is NULL on the right side.

### **RIGHT JOIN**:

![right join](/assets/images/right-join.jpg)

```sql
SELECT column_name(s)
FROM table1
RIGHT JOIN table2
ON table1.column_name = table2.column_name;
```

Returns all records from the right table, and the matched records from the left table. If there is no match, the result is NULL on the left side.

### **FULL JOIN**:

![full join](/assets/images/full-join.jpg)

```sql
SELECT column_name(s)
FROM table1
FULL JOIN table2
ON table1.column_name = table2.column_name
WHERE condition;
```

Returns all records when there is a match in either the left or the right table.

## What is a Self-Join?

A self-join in SQL is a way to combine rows of the same table when there's a match based on some condition. It's used to combine and compare rows within the same table.

```sql
SELECT column_name(s)
FROM table1 T1, table1 T2
WHERE condition;
```

In this example, the `Employees` table is joined with itself using different aliases (`A` and `B`). The query returns a list of employees and their respective managers, where the `ManagerID` of one row in the table matches the `EmployeeID` of another row in the same table.

### When to use Self-join?

- **Hierarchical Relationships**:If we have a table that represents hierarchical data, such as employees and managers where both are stored in the same `Employees` table, a self join can be used to retrieve the relationship between employees and their managers.
- **Finding Duplicates**: If we want to find duplicate records in a table, a self join can be used to compare the table to itself and find rows where certain column values match.
- **Comparing Rows within a Table**: If we need to compare rows within a table based on some condition, a self join can be used. For example, we might want to find pairs of products that have the same supplier.

## What is a Cross-Join?

A cross join in SQL, also known as a Cartesian product, is a join operation that produces the combination of every row of the first table with every row of the second table if no WHERE or ON condition is used along with CROSS JOIN. In other words, if table1 has n rows and table2 has m rows, a cross join will result in n\*m rows.

```sql
SELECT Customers.CustomerName, Products.ProductName
FROM Customers
JOIN Products;
```

This will return a result set that includes every combination of customer names and product names.

## The SQL CASE Expression

The `CASE` expression goes through conditions and returns a value when the first condition is met (like an if-then-else statement).

```sql
CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    WHEN conditionN THEN resultN
    ELSE result
END;
```

## What is an Index? Explain its different types.

An index in SQL is a data structure that improves the speed of data retrieval operations on a database table. It works similarly to an index in a book: just as a book index helps you find information quickly without having to read every page, a database index provides a fast way to look up data without scanning every row in a table.

Indexes are used to quickly locate data without having to search every row in a database table every time a database table is accessed. They can be created using one or more columns of a database table, providing the basis for both rapid random lookups and efficient access of ordered records.

while indexes speed up data retrieval, they also slow down data modification operations, such as `INSERT`, `UPDATE`, and `DELETE`. This is because each time data is changed, the index also needs to be updated. Therefore, it's important to find a good balance and not over-index your database tables.

### **Clustered Index**:

Determines the physical order of data in a table. There can be only one clustered index per table.

### **Non-Clustered Index**:

Does not sort the physical data inside the table. Instead, it creates a separate object within a table which points back to the original table rows after creating the index. A table can have multiple non-clustered indexes.

### **Unique Index**:

Unique indexes are indexes that help maintain data integrity by ensuring that no two rows of data in a table have identical key values. Once a unique index has been defined for a table, uniqueness is enforced whenever keys are added or changed within the index.

### **Non-unique Index**:

Non-unique indexes, on the other hand, are not used to enforce constraints on the tables with which they are associated. Instead, non-unique indexes are used solely to improve query performance by maintaining a sorted order of data values that are used frequently.

## What is Data Integrity?

Data integrity in SQL refers to the accuracy, consistency, and reliability of data stored in a database. It ensures that the data is correct and reliable over its entire lifecycle.

### **Entity Integrity**:

This ensures that there are no duplicate rows in a table. It's usually enforced by using a primary key.

### **Domain Integrity**:

This enforces valid entries for a given column by restricting the type, the format, or the range of values.

### **Referential Integrity**:

This ensures that the relationship between two tables remains consistent. It's typically enforced by using foreign keys.

### **User-Defined Integrity**:

This enforces some specific business rules that do not fall into the other integrity categories. These are typically enforced by using triggers or stored procedures.

## What is a Query?

A query in SQL is a request for data or information from a database. Queries can also be used to insert, update, or delete data, and to create, modify, or delete tables and other database objects.

## What is a Subquery? What are its types?

A subquery in SQL is a query that is embedded within another query. It can be used to return data that will be used in the main query as a condition to further restrict the data to be retrieved. Subqueries can be used with SELECT, INSERT, UPDATE, and DELETE statements.

### **Correlated Subquery**:

A correlated subquery works like a nested loop: the subquery depends on the outer query and executes once for every row worked on by the outer query. It uses values from the outer query in its WHERE clause.

```sql
SELECT e1.EmployeeName
FROM Employees e1
WHERE Salary > (SELECT AVG(Salary)
                FROM Employees e2
                WHERE e1.DepartmentID = e2.DepartmentID);
```

### **Non-Correlated Subquery**:

A non-correlated subquery executes first and passes its result to the outer query. It does not depend on the outer query.

```sql
SELECT EmployeeName
FROM Employees
WHERE DepartmentID IN (SELECT DepartmentID
                       FROM Departments
                       WHERE DeptName = 'Sales');
```

## What are some common clauses used with SELECT query in SQL?

- **WHERE** clause in SQL is used to filter records that are necessary, based on specific conditions.
- **ORDER BY** clause in SQL is used to sort the records based on some field(s) in ascending (**ASC**) or descending order (**DESC**).

```sql
SELECT *
FROM myDB.students
WHERE graduation_year = 2019
ORDER BY studentID DESC;
```

- **GROUP BY** clause in SQL is used to group records/rows that have the same values in specified columns into aggregated data. It's often used with aggregate functions (`COUNT`, `MAX`, `MIN`, `SUM`, `AVG`).
- **HAVING** clause in SQL is used to filter records in combination with the GROUP BY clause. It is different from WHERE, since the WHERE clause cannot filter aggregated records.

```sql
SELECT COUNT(studentId), country
FROM myDB.students
WHERE country != "INDIA"
GROUP BY country
HAVING COUNT(studentID) > 5;
```

## What are UNION, MINUS, and INTERSECT commands?

### **UNION**:

The `UNION` operator combines the result sets of two or more `SELECT` statements. It removes duplicate rows from the result. Each `SELECT` statement within the `UNION` must have the same number of columns with similar data types.

```sql
SELECT name FROM Students   /* Fetch the union of queries */
UNION
SELECT name FROM Contacts;
SELECT name FROM Students   /* Fetch the union of queries with duplicates*/
UNION ALL
SELECT name FROM Contacts;
```

### **MINUS**:

The `MINUS` operator (known as `EXCEPT` in some databases) returns all rows in the first `SELECT` statement that are not returned by the second `SELECT` statement. The number and order of columns, as well as their types, must be the same in both `SELECT` statements.

```sql
SELECT name FROM Students   /* Fetch names from students */
MINUS     /* that aren't present in contacts */
SELECT name FROM Contacts;
```

### **INTERSECT**:

The `INTERSECT` operator returns all rows that are common to both `SELECT` statements. The number and order of columns, as well as their types, must be the same in both `SELECT` statements.

```sql
SELECT name FROM Students   /* Fetch names from students */
INTERSECT    /* that are present in contacts as well */
SELECT name FROM Contacts;
```

## datediff:

`DATEDIFF` is a function in SQL that is used to find the difference between two dates. It returns the difference in terms of the unit specified.

```mysql
datediff(date1, date2)
```

In this case, `DATEDIFF` returns the difference in days between `date1` and `date2`.

## What are Entities and Relationships?

### **Entities**:

An entity represents a real-world object that is being modeled in the database.

### **Relationships**:

A relationship represents how entities are related to one another.

## List the different types of relationships in SQL

- **One-to-One**: Each row in table A is linked to no more than one row in table B. This is often used when you have two entities and there can be a direct and exclusive relationship between them. For example, a person and a national ID number.
- **One-to-Many**: Each row in table A can be related to many rows in table B, but each row in table B is related to only one row in table A. For example, a mother can have many children, but each child has only one mother.
- **Many-to-Many**: Rows in table A can be related to any number of rows in table B, and vice versa. This is often resolved into two one-to-many relationships with the use of a junction table. For example, students and classes. A student can enroll in many classes, and a class can include many students.

## WHat is an Alias in SQL?

An alias in SQL is a temporary name given to a table or a column in a table for the purpose of a particular SQL query. It's used for convenience and to make the query more readable.

```sql
SELECT c.CustomerName, o.OrderID
FROM Customers AS c
JOIN Orders AS o ON c.CustomerID = o.CustomerID;
```

## What is a View?

A view in SQL is a virtual table based on the result-set of an SQL statement. A view contains rows and columns, just like a real table. The fields in a view are fields from one or more real tables in the database.

## What is Normalization?

Normalization in SQL is a process used to organize a database into tables and columns to minimize redundancy and dependency. The main aim of normalization is to add, delete, or modify data without causing data inconsistencies.

Normalization involves dividing a database into two or more tables and defining relationships between the tables. The main purpose of normalization is to reduce duplicate data, which not only reduces the amount of storage a database requires, but also improves data integrity.

There are several stages of normalization, each called a "normal form." Here are the three most common normal forms:

1. **First Normal Form**: Each table cell should contain a single value, and each record needs to be unique.
2. **Second Normal Form**: It includes all rules of 1NF and in addition to that, it mandates that all non-key attributes should be fully functionally dependent on the primary key.
3. **Third Normal Form**: It includes all rules of 1NF and 2NF and in addition to that, it mandates that all columns should be directly dependent on the primary key. In other words, it should not have transitive dependency.

## What are the TRUNCATE, DELETE, and DROP statements?

- **DELETE** statement is used to delete rows from a table.
  ```sql
  DELETE FROM Candidates
  WHERE CandidateId > 1000;
  ```
- **TRUNCATE** command is used to delete all the rows from the table
  ```sql
  TRUNCATE TABLE Candidates;
  ```
- **DROP** command is used to remove an object from the database.If we drop a table, all the rows in the table are deleted and the table structure is removed from the database.
  ```sql
  DROP TABLE Candidates;
  ```

## What are Aggregate and Scalar functions?

- **Aggregate Functions**: Aggregate functions operate on a set of values but return a single summarizing value. They are often used with the `GROUP BY` clause in a `SELECT` statement. Examples of aggregate functions include:

  - `COUNT()`: returns the number of rows
  - `SUM()`: returns the sum of the values
  - `AVG()`: returns the average of the values
  - `MIN()`: returns the smallest value
  - `MAX()`: returns the largest value

```sql
SELECT COUNT(CustomerID)
FROM Customers;
```

- **Scalar Functions**: Scalar functions operate on a single value and then return a single value. Scalar functions can be used wherever an expression is valid. Examples of scalar functions include:
  - `UCASE()`: converts a field to upper case
  - `LCASE()`: converts a field to lower case
  - `ROUND()`: rounds a numeric field to the number of decimals specified
  - `LEN()`: returns the length of a text field
  - `NOW()`: returns the current date & time

```sql
SELECT UCASE(FirstName)
FROM Customers;
```

## How to create empty tables with the same structure as another table?

```sql
SELECT * INTO Students_copy
FROM Students WHERE 1 = 2;
```

## What is pattern matching in SQL?

Pattern matching in SQL is a technique used to find rows that match a specific pattern. It's often used in the `WHERE` clause of a `SELECT`, `UPDATE`, or `DELETE` statement.

The most common way to do pattern matching in SQL is using the `LIKE` operator, which allow us to use two special characters:

- `%`: Represents zero, one, or multiple characters.
- `_`: Represents a single character

```sql
SELECT * FROM Customers
WHERE CustomerName LIKE 'a%';
```

This SQL statement selects all customers whose names start with "a"

## INSERT in SQL:

### **Inserting complete rows**:

We can specify values for all columns in the table.

```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```

### **Inserting specific columns**:

We can specify values for only certain columns, and the other columns will be filled with their default values.

```sql
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...);
```

## UPDATE in SQL

The `UPDATE` statement in SQL is used to modify existing records in a table. You can change the data in a single column or in multiple columns at once.

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

### example:

```sql
UPDATE Customers
SET Email = 'newemail@example.com'
WHERE CustomerID = 1;
```

## CREATE in SQL:

The `CREATE` statement is used to create a new database object. Here's how you can create a new table:

```sql
CREATE TABLE table_name (
    column1 datatype constraint,
    column2 datatype constraint,
    ...
);
```

### example:

```sql
CREATE TABLE Customers (
    CustomerID int NOT NULL,
    CustomerName varchar(255) NOT NULL,
    ContactName varchar(255)
);
```

## ALTER in SQL:

The `ALTER` statement is used to add, modify, or delete columns in an existing table, or to change the data type of a column in a table. Here's how you can add a column to an existing table:

```sql
ALTER TABLE table_name
ADD column_name datatype constraint;
```

### example:

```sql
ALTER TABLE Customers
ADD Email varchar(255);
```
