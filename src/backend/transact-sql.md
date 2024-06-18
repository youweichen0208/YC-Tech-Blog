---
icon: pen-to-square
date: 2024-02-13
category:
  - backend
tag:
  - Microsoft
  - Transact-SQL
---

# Transact-SQL

## What is database?

- Database: A collection of organized data
- Relational Database: tables with predefined relationships
  - Columns: attribute
  - Rows: record

## SQL server VS. MySQL

- **SQL Server:** Developed by Microsoft, SQL Server is a comprehensive RDBMS that is part of the Microsoft SQL Server family. It supports Transact-SQL (T-SQL) as its query language and is commonly used in Windows environments. SQL Server has a range of features including a powerful database engine, business intelligence tools, reporting services, and integration services.
- **MySQL**: Developed by Oracle Corporation, MySQL is an open-source RDBMS. It uses the MySQL Query Language for interacting with the database.

## System Databases:

In SQL Server, system databases are a set of databases that are creatd and maintained by the SQL Server instance itself. These databases play crucial roles in the functioning of the SQL Server system.

### 1. Master Database (master):

- The master database is the central control database for the SQL Server instance.
- It stores information about the server configuration, login accounts, linked servers, and system-wide settings.
- any changes made to the configuration are stored in the master database

### 2. Model Database (model):

- The model database is used as a template when creating new user databases.
- Any changes made to the model database, such as adding tables or stored procedures, are automatically applied to new databases.

### 3. msdb Database (msdb):

- The msdb database is used for managing SQL server Agent jobs, alerts, operators, and maintainance plans.
- It stores information about backups, SQL Server Agent history, and other job-related data.

### 4. tempdb Database (tempdb):

- The tempdb database is a temporary workspace used for storing temporary tables, temporary stored procedures, and other temporary objects.
- It is recreated every time the SQL Server instance is restarted.

### 5. resource database (mssqlsystemresource):

- The Resource database is a read-only system database introduced in SQL Server 2005.
- It is a hidden database and is usually referred to as the resource database.
- It contains executable system objects and functions that are used by the SQL server instance.

## DDL vs DML

- DDL commands are used to define or modify the structure of the database objects (like databases, tables, views, indexes). DDL commands include `CREATE`, `ALTER`, `DROP`, `TRUNCATE`
- DML commands are used to manipulate the data within these objects. DML commands include `SELECT`, `INSERT`, `UPDATE`, `DELETE`.

## Result Set

- Result set is a set of data, could be empty or not, returned by a select statement, or a stored procedure, that is saved in RAM or displayed on the screen.
- A TSQL script can have 0 to multiple result sets.

## Subqueries:

A subquery is a SELECT query that is nested within another SELECT, INSERT, UPDATE, or DELETE statement. A subquery can also be nested inside another subquery.

## The difference between Subquery and Join:

- **Purpose**:

  - Subquery: it is used to retrieve data that will be used by the main query.
  - Join: it is used to combine rows from different tables based on a related column.

- **Syntax**:

  - Subquery: Embedded within a query, enclosed in parentheses and used in different parts of a statement.
  - Join: Explicitly specified in the **FROM** clause using the **JOIN** keyword and the related column.

- **Performance**:
  - Subquery: may be less efficient than joins, especially if the subquery returns a large result set.
  - Join: generally more efficient for combining large datasets, as it's a fundamental part of relational database design.

## Correlated Subqueries:

In a SQL database query, a correlated subquery (also known as a synchronized subquery) is a subquery (a query nested inside another query) that uses values from the outer query. Because the subquery may be evaluated once for each row processed by the outer query, it can be inefficient.

In other words, the subquery is executed for each row processed by the outer query, and it can reference the values from the current row of the outer query. This creates a correlation or a connection between the subquery and the outer query.

```sql
SELECT column1, column2
FROM table1 AS outer_table
WHERE column3 > (SELECT AVG(column4) FROM table1 WHERE column5 = outer_table.column5)
```

In this example, the subquery `SELECT AVG(column4) FROM table1 WHERE column5 = outer_table.column5` is correlated because it references the `column5` from the outer query (`outer_table.column5`). The subquery is executed for each row processed by the outer query.

Correlated subqueries are useful when we need to perform operations or comparisons based on values from the outer query. However, they can be less efficient than non-correlated subqueries or joins, as the subquery must be executed repeatedly for each row processed by the outer query.

In a correlated subquery, although the subquery depends on values from the outer query, the subquery still evaluated first for each row processed by the outer query.

## Unions:

### What is Unions?

Unions concatenates the result of two queries into a single result set.

### Union:

- The Union operator is used to combine the results of multiple SELECT statements while removing duplicate rows from the final result set.
- It ensures that each row in the result set is unique.
- The number and data types of columns in the SELECT statements must match for the UNION operator to work.
- It performs a distinct operation, meaning duplicate rows are eliminated.

```sql
SELECT column1, column2, ...
FROM table1

UNION

SELECT column1, column2, ...
FROM table2;
```

### Union All:

- The UNION ALL operator, like UNION, is used to combine the results of multiple SELECT statements, but it does not eliminate duplicate rows. It includes all rows from all SELECT statements in the result set, even if there are duplicates.
- UNION ALL is generally faster than UNION because it doesn't need to perform the additional step of removing duplicates.
- The number and data types of columns in the SELECT statements must still match for UNION ALL to work.

```sql
SELECT column1, column2, ...
FROM table1

UNION ALL

SELECT column1, column2, ...
FROM table2
```

## Views:

### What is Views?

Views is a virtual table whose contents are defined by query. Like a real table, a view consists of a set of named columns and rows of data. Views are updatable which also changes the table they are derived from. However, they are not updatable if the modification affects multiple base tables such as a view made from a join.

There are dangers of using views because they are updatable. In a scenario where Views are called in our program, there can be malicious attackers that use SQL injection and do harm to our database.

Views provide a way to simplify queires, encapsulates logic, and control access to data.

### Basic Syntax for creating a view

```sql
CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition
```

After creating a view, we can query it like a regular table:

```sql
SELECT * FROM view_name;

```

### Key points about SQL views:

1. Virtual Tables:

- Views do not store data themselves; they provide a virtual representation of the data based on the underlying SELECT query.

2. Encapsulation of Logic:

- Views can encapsulate complex logic and calculations, making it easier to write and maintain queries.

3. Security:

- Views can be used to restrict access to certain columns or rows, allowing users to see only the data they need.

4. Simplifying Queries:

- Views can simplify queries by abstracting away the complexity of underlying tables, especially in cases where joins or aggregations are involved.

5. Customize Data:

- Views can give relavant information with customization to the code based on login ID of user.

## Common Table Expression (CTE):

Common Table Expression specifies a temporary named result set that we can reference within a SELECT, INSERT, UPDATE, OR DELETE statement. CTEs are defined using the WITH clause and provide a way to create more readable and modular SQL queries by breaking down complex queries into smaller, named, and often self-referencing parts.

### Basic Syntax:

```sql
WITH cte_name (column1, column2, ...) AS (
    -- CTE query
    SELECT column1, column2, ...
    FROM your_table
    WHERE condition
)
-- Main query using the CTE
SELECT *
FROM cte_name;
```

1. WITH Clause:

- The CTE is defined using the WITH clause, followed by the name of the CTE and the column names (optional)

2. AS Clause:

- The AS keyword introduces the CTE query, which is a regular SELECT statement that defines the result set for the CTE.

3. Reference in Main Query:

- The CTE is then referenced in the main query, treating it like a temporary table.

## The difference between Common Table Expressions (CTEs) and Views:

- **Lifetime**: A CTE is a temporary result set that exists only within the scope of a single statement. Once the statement has been executed, the CTE is discarded. On the other hand, a View is a database object that is stored on the server and can be used across multiple statements and sessions, just like a regular table.

-- **Modification**: We can't directly modify data through a CTE. Any INSERT, UPDATE, or DELETE operations would need to be performed on the underlying tables. In contrast, with Views, we can perform modifications directly

-- **Recursion**: CTEs support recursive queries, which can be used to perform complex tasks like hierarchical or tree-based data traversal. Views do not support recursion.

## Window functions:

### What is Window Functions?

Window Functions operate on a set of rows and return a single column. These allow us to do calculations like Count without grouping anything. This is achieved using the Keyword "Over".

### Why we need Windows Function?

- **Aggregation without reducing data:** unlike aggregate functions, which return a single result per group, window functions return a single result for each row of the underlying query. This allows us to perform calculations that take into account more than just the current row, without reducing the number of rows returned by the query.

- **Complex calculations**: Window functions can perform complex calculations that are difficult or impossible to perform with regular aggregate functions. This includes things like running totals, moving averages, and ranking.

## Basic Syntax:

```sql
function (expression)
OVER ( PARTITION BY column
       ORDER BY column ASC/DESC
       ROWS [...])
```

- **PARTITION BY column**: this divides the result set into paritions to which the window function is applied. If not specified, the function treats all rows of the query result set a single group.
- **ORDER BY**: This orders the rows within each partition. If not specified, the function treats all rows of the partitionn as a single group.
  -- **ROWS|RANGE:** This specifies the set of rows included in the window frame. (e.g. `ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING` means the window frame for each row will include the current row, the row immediately before the current row, the row immediately after the current row.)

### ROW_NUMBER():

It returns the sequential number of a row within a partition of a result set, starting at 1 for the first row in each partition.

#### Example 1: returning the row number for salespeople

```sql
USE AdventureWorks2022;
GO
SELECT ROW_NUMBER() OVER(ORDER BY SalesYTD DESC) AS Row,
    FirstName, LastName, ROUND(SalesYTD,2,1) AS "Sales YTD"
FROM Sales.vSalesPerson
WHERE TerritoryName IS NOT NULL AND SalesYTD <> 0;
```

Here is the result set:

```
Row FirstName    LastName               SalesYTD
--- -----------  ---------------------- -----------------
1   Linda        Mitchell               4251368.54
2   Jae          Pak                    4116871.22
3   Michael      Blythe                 3763178.17
4   Jillian      Carson                 3189418.36
5   Ranjit       Varkey Chudukatil      3121616.32
6   José         Saraiva                2604540.71
7   Shu          Ito                    2458535.61
8   Tsvi         Reiter                 2315185.61
9   Rachel       Valdez                 1827066.71
10  Tete         Mensa-Annan            1576562.19
11  David        Campbell               1573012.93
12  Garrett      Vargas                 1453719.46
13  Lynn         Tsoflias               1421810.92
14  Pamela       Ansman-Wolfe           1352577.13
```

#### Example 2: using ROW_NUMBER() with PARTITION:

```sql
USE AdventureWorks2022;
GO
SELECT FirstName, LastName, TerritoryName, ROUND(SalesYTD,2,1) AS SalesYTD,
ROW_NUMBER() OVER(PARTITION BY TerritoryName ORDER BY SalesYTD DESC)
  AS Row
FROM Sales.vSalesPerson
WHERE TerritoryName IS NOT NULL AND SalesYTD <> 0
ORDER BY TerritoryName;
```

Here is the result set:

```
FirstName  LastName             TerritoryName        SalesYTD      Row
---------  -------------------- ------------------   ------------  ---
Lynn       Tsoflias             Australia            1421810.92    1
José       Saraiva              Canada               2604540.71    1
Garrett    Vargas               Canada               1453719.46    2
Jillian    Carson               Central              3189418.36    1
Ranjit     Varkey Chudukatil    France               3121616.32    1
Rachel     Valdez               Germany              1827066.71    1
Michael    Blythe               Northeast            3763178.17    1
Tete       Mensa-Annan          Northwest            1576562.19    1
David      Campbell             Northwest            1573012.93    2
Pamela     Ansman-Wolfe         Northwest            1352577.13    3
Tsvi       Reiter               Southeast            2315185.61    1
Linda      Mitchell             Southwest            4251368.54    1
Shu        Ito                  Southwest            2458535.61    2
Jae        Pak                  United Kingdom       4116871.22    1
```

### RANK:

RANK() returns the rank of each row within the partition of a result set. The rank of a row is one plus the number of ranks that come before the row in partition.

ROW_NUMBER and RANK are similar. ROW_NUMBER numbers all rows sequentially (for example, 1, 2, 3, 4, 5). RANK provides the same numeric value for ties (for example, 1, 2, 2, 4, 5).

#### Example: Ranking rows within a partition.

```sql
USE AdventureWorks2022;
GO
SELECT i.ProductID, p.Name, i.LocationID, i.Quantity
    ,RANK() OVER
    (PARTITION BY i.LocationID ORDER BY i.Quantity DESC) AS Rank
FROM Production.ProductInventory AS i
INNER JOIN Production.Product AS p
    ON i.ProductID = p.ProductID
WHERE i.LocationID BETWEEN 3 AND 4
ORDER BY i.LocationID;
GO
```

Here is the result set:

```
ProductID   Name                   LocationID   Quantity Rank
----------- ---------------------- ------------ -------- ----
494         Paint - Silver         3            49       1
495         Paint - Blue           3            49       1
493         Paint - Red            3            41       3
496         Paint - Yellow         3            30       4
492         Paint - Black          3            17       5
495         Paint - Blue           4            35       1
496         Paint - Yellow         4            25       2
493         Paint - Red            4            24       3
492         Paint - Black          4            14       4
494         Paint - Silver         4            12       5
 (10 row(s) affected)
```

### NTILE:

NTILE distributes the rows in an ordered partition into a specified number of groups. The groups are numbered, starting at one. For each row, NTILE returns the number of group to which the row belongs.

#### Example:

```sql
USE AdventureWorks2022;
GO
DECLARE @NTILE_Var INT = 4;

SELECT p.FirstName, p.LastName
    ,NTILE(@NTILE_Var) OVER(PARTITION BY PostalCode ORDER BY SalesYTD DESC) AS Quartile
    ,CONVERT(NVARCHAR(20),s.SalesYTD,1) AS SalesYTD
    ,a.PostalCode
FROM Sales.SalesPerson AS s
INNER JOIN Person.Person AS p
    ON s.BusinessEntityID = p.BusinessEntityID
INNER JOIN Person.Address AS a
    ON a.AddressID = p.BusinessEntityID
WHERE TerritoryID IS NOT NULL
    AND SalesYTD <> 0;
GO
```

```
FirstName    LastName             Quartile SalesYTD      PostalCode
------------ -------------------- -------- ------------  ----------
Linda        Mitchell             1        4,251,368.55  98027
Michael      Blythe               1        3,763,178.18  98027
Jillian      Carson               2        3,189,418.37  98027
Tsvi         Reiter               2        2,315,185.61  98027
Garrett      Vargas               3        1,453,719.47  98027
Pamela       Ansman-Wolfe         4        1,352,577.13  98027
Jae          Pak                  1        4,116,871.23  98055
Ranjit       Varkey Chudukatil    1        3,121,616.32  98055
José         Saraiva              2        2,604,540.72  98055
Shu          Ito                  2        2,458,535.62  98055
Rachel       Valdez               3        1,827,066.71  98055
Tete         Mensa-Annan          3        1,576,562.20  98055
David        Campbell             4        1,573,012.94  98055
Lynn         Tsoflias             4        1,421,810.92  98055

(14 row(s) affected)
```

### DENSE_RANK

This function returns the rank of each row within a result set partition, with no gaps in the ranking values. The rank of a specified row is one plus the number of distinct rank values that come before that specific row.

#### Example:

```sql
USE AdventureWorks2022;
GO
SELECT i.ProductID, p.Name, i.LocationID, i.Quantity
    ,DENSE_RANK() OVER
    (PARTITION BY i.LocationID ORDER BY i.Quantity DESC) AS Rank
FROM Production.ProductInventory AS i
INNER JOIN Production.Product AS p
    ON i.ProductID = p.ProductID
WHERE i.LocationID BETWEEN 3 AND 4
ORDER BY i.LocationID;
GO
```

Here is the result set:

```
ProductID   Name                               LocationID Quantity Rank
----------- ---------------------------------- ---------- -------- -----
494         Paint - Silver                     3          49       1
495         Paint - Blue                       3          49       1
493         Paint - Red                        3          41       2
496         Paint - Yellow                     3          30       3
492         Paint - Black                      3          17       4
495         Paint - Blue                       4          35       1
496         Paint - Yellow                     4          25       2
493         Paint - Red                        4          24       3
492         Paint - Black                      4          14       4
494         Paint - Silver                     4          12       5

(10 row(s) affected)
```

## Obtain session id in SQL server

We can check our current session ID by executing the following T-SQL command:

```sql
SELECT @@SPID AS SessionID
```

## Temporary Table:

Special type of table so that we can store data temporarily

### Local Temporary Variable:

- Local temporary tables are only visible to the current session and are automatically dropped when the session ends.
- The table name starts with a single hash tag (#)

```sql
CREATE TABLE #TempTable (
  ID INT,
  Name VARCHAR(50)
)
```

### What is the difference between Local Temporary Tables and CTE?

- **Scope and Lifetime**:

  - A Local Temporary Table is visible only in the current session, and it is dropped automatically when the session ends or the connection is closed.
  - A CTE is only visible within the query that defines it, and it's discarded after the query is executed.

- **Storage**:

  - A Local Temporary Table is stored in tempdb and can have indexes, keys, constraints, defaults, and even triggers.
  - A CTE is not stored in tempdb and does not have a physical presence in the database.

- **Modification**:
  - We can perform DML operations (INSERT, UPDATE, DELETE) on a Local Temporary Table
  - A CTE is read-only and cannot be used to directly modify data.

### Global Temporary Tables:

- Global temporary tables are visible to all sessions and are dropped when the last session using the table is closed.
- The table name starts with a double hash tags(##).

```sql
CREATE TABLE ##TempTable (
  ID INT,
  Name VARCHAR(50)
)
```

## Table Variable:

Table variables behave like local variables. They have a well-defined scope, which is the function, stored procedure, or batch in which they are declared. Within their scope, they can be used like a regular table. They are cleaned up automatically when the batch, function, or stored procedure ends.

```sql
DECLARE @TableName Table(
  column_name1 column_data_type1,
  column_name2 column_data_type2
)

-- insert data into the table variable
INSERT INTO @TableName values (value1, value2, ...), (value1, value2,...)
```

### Reasons to use Table Variable

- Temporary tables cause performance issues
- Temporary tables may cause unwanted disk overhead in tempdb.
- Microsoft recommends table variables as a replacement of temporary tables when the data set is not very large. However, table variables suffer when the result set becomes too large.
- Well scoped. The lifetime of the table variable only lasts for the duration of the batch, function, or stored procedure.

## Temp Tables vs. table variables

1. **Storage**: both Temp Tables and Table Variables are stored in tempDb
2. **Scope**: Temp Tables scoped local/global; Table Variables scoped for current batch
3. Temp Tables for large data; Table Variables for smaller data.
4. **Usage**: Temp Tables not in Stored Procedure, Functions; Table Variables can be used.
5. **Structure**: We can perform DDL operations like `CREATE INDEX` on temporary tables. This is not possible with table variables.

## Views vs. Temp Tables:

1. **Persistence**: A view is a virtual table based on the result-set of an SQL statement and is stored in the database with its defined SQL query. A temporary table is kind of temporary storage structure that exists only for the duration of a session or the procedure that created it.

2. **Stored Data**: A view does not store data physically; it is a set of queries that are applied to one or more tables lying behind it. It is a virtual table. A temporary table stores the data phsically created as a table for temporal operations on data.

3. **Performance**: Views can be slower than temporary tables becasue they calculate the data in real-time by executing the SQL in the view definition for each reference to the view. Temporary tables can be faster for complex queries because the result set is stored physically once when the data is inserted.

4. **Usage**: Views are useful when we want to save a specific query that gets used frequently, or to hide complexity of the underlying data structure, or to secure specific rows/columns. Temporary tables are useful for storing intermediate results for complex calculations, or when we need to work with a small subset of data from a larger set.

## Stored Procedures

A stored procedure is a precompiled collection of one or more SQL statements or batch statements that are stored as a single object in a database management system. Stored procedures can be written in SQL, and they provide a way to encapsulate and organize a set of SQL commands to perform a specific task or a sequence of tasks.

### Benefits of Using SP's

- **Increase database security**: Using stored procedures provides increased security for a database by limiting direct access. Stored procedures generally result in improved performance because the database can optimize the data access plan used by the procedure and cache it for subsequent reuse.
- **Faster execution**: Stored procedures generally result in improved performance because the database can optimize the data access plan used by the procedure and cache it for subsequent reuse.
- **Stored procedures help centralize our Transact-SQL code in the data tier**: If we centralized our Transact-SQL code in stored procedures, we'll have only once place to look for SQL code or SQL batches. If we document the code properly, we'll also be able to capture the areas that need fixing.
- **Stored procedures can help reduce network traffic for larger ad hoc queries**: Programming our application call to execute a stored procedure, rather than push across a 5000 line SQL call, can have a positive impact on our netwoek and application performance, particularly if the call is repeated thousands of times a minute.
- **Code Reusability**: Stored procedures can be reused across multiple parts of an application or by different applications. This promotes code reusability and helps maintain consistant logic.

### General syntax for creating a stored procedure in SQL:

```sql
CREATE PROCEDURE procedure_name
  -- parameter declarations (optional)
  @parameter1_name datatype1,
  @parameter2_name datatype2,

AS
BEGIN
  -- Body of the stored procedure
  -- SQL statements and logic go here

END;
```

- **Procedure_name**: replace this with the desired name for our stored procedure
- **Parameters(optional)**: we can declare input parameters that the stored procedure will accept. Parameters are specified with the `@` symbol followed by the parameter name and its data type.
- **AS**: this keyword introduces the body of the stored procedure.
- **BEGIN and END**: These keywords define the beginning and end of the stored procedure's body. All the SQL statements and logic of the stored procedure go between these keywords.
- **Body of the stored procedure**: This is where we write the SQL statements and logic that make up the functionality of the stored procedure.

### Call the stored procedures

To call a stored procedure in SQL, we use `EXEC` or `EXECUTE` statement followed by the name of the stored procedure and its parameters.

```sql
-- Syntax for calling a stored procedure without parameters
EXEC procedure_name;

-- Syntax for calling a stored procedure with parameters
EXEC procedure_name @parameter_name1 = value1, @parameter_name2 = value2, ...;
```

### examples:

```sql
CREATE PROCEDURE GetEmployeeByID
  @EmployeeID INT
AS
BEGIN
    SELECT * FROM Employees WHERE EmployeeID = @EmployeeID
END


-- Calling the stored procedure with a parameter
EXEC GetEmployeeByID @EmployeeID = 123;
```

## SQL Injection:

Hackers inject some malicious code to our SQL queries thus destroying our database.

### Example Scenario:

Suppose we have a login form on a website and we use the entered username and password to create a SQL query:

```sql
query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
```

An attacker found enter something like `admin'; --` as the username. this would make the query:

```sql
SELECT * FROM users WHERE username = 'admin'; --' AND password = ''
```

The `--` in SQL is a comment marker, so everything after it is ignored. This means the attacker has effectively bypassed the password check and. if `admin` is a valid username, they would be logged in as that user.

## Trigger:

- A trigger in SQL server is a special kind of stored procedure that automatically executes when an event occurs in the database server. Triggers are often used to maintain the integrity of the data in the database.
- Executing a trigger is called "firing the trigger"
- Triggers are automatically fired on a event (DML Statements like Insert, Delete, or Update)
- Triggers cannot be explicitly executed.

### Three types of triggers in SQL Server:

1. **DML Triggers**: these triggers are fired when a DML event takes place, which includes `INSERT`, `UPDATE`, or `DELETE` operations on a table or view.
2. **DDL Triggers**: These triggers are fired in response to DDL events, such as `CREATE`, `ALTER`, and `DROP` that affect database objects like tables, views, indexes, and procedures.
3. **Logon Triggers**: these triggers fire in response to a `LOGON` event. This event is raised when a user session is being established with SQL Serverl after the user has been authenticated but before the user session is actually established.

## User-Defined Functions (UDFs)

In SQL Server, a User-Defined Function (UDF) is a precompiled and reusable set of Transact-SQL statements that can be used to encapsulate business logic or perform speciic tasks. UDF enhance code modularity, reusability, and maintainability in SQL server.

### 1. Scalar Functions:

A Scalar Function returns a single value and can be used in SQL statements whenever an expression can be used.

```sql
-- Creating a Scalar UDF
CREATE FUNCTION dbo.AddTwoNumbers
(
    @num1 INT,
    @num2 INT
)
RETURNS INT
AS
BEGIN
    DECLARE @result INT;
    SET @result = @num1 + @num2;
    RETURN @result;
END;

```

Usage of the Scalar UDF in a query:

```sql
-- Using the Scalar UDF:
SELECT dbo.AddTwoNumbers(5, 7) AS SumResult;
```

### Table-Valued Functions:

A Table-Valued Function returns a table result set. There are two types of Table-Valued Functions: Inline Table-Valued Functions and Multi-Statement Table-Valued Functions.

```sql
-- Step 1: Create the Table-Valued UDF
CREATE FUNCTION dbo.GetEmployeesByDepartment
(
    @deptID INT
)
RETURNS TABLE
AS
RETURN
(
    SELECT EmployeeID, FirstName, LastName
    FROM Employees
    WHERE DepartmentID = @deptID
);
```

Call the Table-Valued UDF:

```sql
-- Step 2: Call the Table-Valued UDF
DECLARE @departmentID INT = 1;

-- Call the UDF in a SELECT statement
SELECT * FROM dbo.GetEmployeesByDepartment(@departmentID);
```

## What is the difference between stored procedure (sp) and user-defined function (udf)?

1. **Usage**: sp for DML, udf for calculations.
2. **How to call**: sp will be called by its name but functions must be used in sql statements.
3. **input/output**: sp may or may not have input/output, but for functions, may or may not have input but it MUST have output.
4. sp can call function but function cannot call sp.
   can stored procedure be executed as part of SELECT statement?

## Pagination in SQL server

Pagination in SQL Server is a technique used to retrieve a subset of query results, typically to display a specific page of data in a user interface. Commonly, the `OFFSET` and `FETCH` clauses are used for pagination in SQL Server. This often combined with the `ORDER BY` clause to ensure a consistent ordering of results.

```sql
-- Assuming you have a table called 'YourTable' and you want to paginate the results
DECLARE @PageSize INT = 10; -- Number of rows per page
DECLARE @PageNumber INT = 1; -- Page number to retrieve

-- Calculate the OFFSET value based on page number and page size
DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;

-- Retrieve the paginated results
SELECT *
FROM YourTable
ORDER BY YourOrderByColumn
OFFSET @Offset ROWS
FETCH NEXT @PageSize ROWS ONLY;
```

- `@PageSize`: the number of rows we want to display on each page.
- `@PageNumber`: the specific page we want to retrieve.

The `OFFSET` clause skips the specified number of rows, and the `FETCH NEXT` clause limits the result set to the specified number of rows. The `ORDER BY` clause ensures a consistent order for the paginated results.

## Normalization:

Normalization is the process of organizing and structuring a relational database to reduce data redundancy and improve data integrity. The normalization process involves breaking down large tables into smaller, related tables and defining relationships between them.

- First Normal Form: Each table cell should contain a single value, and each record needs to be unique.

## One-to-many relationships

A one-to-many relationship in a database refers to the relationship between two entities (say A and B) where one row from entity A can have multiple corresponding rows in entity B, but a row from entity B can have ONLY one corresponding row in entity A.

For example, consider a scenario where we have two tables: `Authors` and `Books`. An author can write multiple books, but each book has only one author. There is a one-to-many relationship.

```
Authors
+-----------+-----------+
| Author_ID | Name      |
+-----------+-----------+
| 1         | Author 1  |
| 2         | Author 2  |
+-----------+-----------+

Books
+--------+-----------+-----------+
| Book_ID| Title     | Author_ID |
+--------+-----------+-----------+
| 1      | Book 1    | 1         |
| 2      | Book 2    | 1         |
| 3      | Book 3    | 2         |
+--------+-----------+-----------+
```

In this example, the `Author_ID` in the `Books` table is a foreign key that establishes a one-to-many relationship with the `Authors` table. It means that each author can have multiple books, but each book is written by one author.

## Many-to-many relationship

A many-to-many relationship in a database fers to the relationship between two entities A and B in which A may containb a parent row for which there are many children in B and visa versa.

For example, consider a scenario where we have two tables: `Students` and `Courses`. A student can enroll in multiple courses, and a course can have multiple students. There is a many-to-many relationship

However. most relational database systems do not allow us to directly create a many-to-many relationship between two tables. We need to create an intermediary table, often called a junction table or bridge table, to establish this relationship.

```
Students
+------------+-------+
| Student_ID | Name  |
+------------+-------+
| 1          | Alice |
| 2          | Bob   |
+------------+-------+

Courses
+----------+---------+
| Course_ID| Title   |
+----------+---------+
| 1        | Math    |
| 2        | English |
+----------+---------+

Enrollments
+------------+----------+
| Student_ID | Course_ID|
+------------+----------+
| 1          | 1        |
| 1          | 2        |
| 2          | 1        |
+------------+----------+
```

In this example, the `Enrollments` table is a junction table that links `Students` and `Courses`. It has a many-to-many relationship with both. Each row in `Enrollments` represents a student's enrollment in a course.

## Constraints in SQL server

Constraints in SQL server are rules enforced on data columns on a table. They are used to limit the type of data that can go into a table, ensuring the accuracy and reliability of the data in the table.

- **PRIMARY KEY**: Uniquely identifies each record in a database table. Primary keys must contain unique values and cannot be null.

- **FOREIGN KEY**: a constraint that is used to establish a link between the data in two tables. It enforces referential integrity by ensuring that the values in a column of one table match the values in another table's primary key or unique constraint.

- **UNIQUE**: Ensures that all values in a column are different.

- **NOT NULL**: Ensures that a column cannot have a NULL value.

- **CHECK**: limit the value range that can be placed in a column. If we define a `CHECK` constraint on a single column it allows certain values for this column.

```sql
CREATE TABLE Employee (
    EmployeeID int IDENTITY(1,1) NOT NULL,
    FirstName varchar(50) not null,
    LastName varchar(59) NOT NULL,
    Email varchar(50) NULL,
    CONSTRAINT PK_Employee_EmployeeID PRIMARY KEY (EmployeeID)
)
```

The query above creates a new `Employee` table and defines a primary key on the `EmployeeID` column.

## Primary key vs. Unique Constraint:

1. Unique constraint can accept one and only one null value but primary key cannot accept any null value.
2. One table can have multiple unique keys but only one primary key.
3. Primary key will sort the data by default but unique key will not
4. Primary key will by default create a clustered index but unique key will create non clustered index.

## DELETE vs. TRUNCATE:

### DELETE:

- `DELETE` is a DML command used to remove rows from a table based on a specific condition.
- `DELETE` can be rolled back. This means that if the transaction containing the `DELETE` statement is rolled back, the deleted rows will be restored to the table.
- `DELETE` is a logged operation, which means that each row deletion is logged in the transaction log. This can result in a larger transaction log and slower performance compared to `Truncate`.

### TRUNCATE:

- `TRUNCATE` is a DDL command used to remove all rows from a table without specifying any conditions. It essentially removes all the data from the table.
- Unlike `DELETE`, `TRUNCATE` cannot be rolled back. Once we execute `TRUNCATE`, the data is permenantly removed from the table, and we cannot undo the operation using rollback.

## Identity Property:

In SQL server, the `IDENTITY` property is used to automatically generate unique numerical values for a column. It is often used to create an auto-incrementing column, where each new row gets a unique identifier that is automatically generated by the database system.

```sql
CREATE TABLE TableName (
  ColumnName INT IDENTITY(Seed, Increment) Primary key,
  -- Other Columns --
);
```

- `Seed`: the starting value for the identity column. Default is 1.
- `Increment`: the increment value for the identity column. Default is 1.

## Foreign key:

A foreign key is a column or a set of columns in a table that refers to the primary key or a unique key in another table. It establishes a link between the data in the two tables.

```sql
CREATE TABLE TableName
(
  ColumnName DataType,
  ForeignColumnName DataType FOREIGN KEY REFERENCES OtherTable(OtherColumn),
  ...
)
```

Example:

```sql
CREATE TABLE Orders
(
    OrderID INT PRIMARY KEY,
    ProductID INT FOREIGN KEY REFERENCES Products(ProductID),
    Quantity INT,
    -- Other columns...
);
```

### Example about composite primary key

```sql
--student
CREATE TABLE Student(
    Id int PRIMARY KEY,
    StudentName varchar(20)
)

--class
CREATE TABLE Class(
    Id int PRIMARY KEY,
    ClassName varchar(20)
)

--Enrollment table

CREATE TABLE Enrollment(
    StudentId int NOT NULL,
    ClassId int NOT NULL,
    CONSTRAINT PK_Enrollment PRIMARY KEY(StudentId, ClassId),
    CONSTRAINT FK_Enrollment_Student FOREIGN KEY(StudentId) REFERENCES Student(Id),
    CONSTRAINT FK_Enrollment_Class FOREIGN KEY(ClassId) REFERENCES Class(Id)
)

```

## Referential Integrity:

Referential Integrity is a property of a relational database that ensures relationships between tables remain consistent. It is maintained through the use of foreign keys. Referential Integrity guarantees that the value in the foreign key column(s) of a table correspond to the values in the primary key or unique key columns of another table.

### Actions on Update or Delete:

When defining a foreign key, we can specify actions to be taken on update or delete operations on the referenced table:

- `CASCADE`: If a referenced record is updated or deleted, the changes are automatically applied to the related records in the referencing table.
- `SET NULL`: If a referenced record is updated or deleted, the foreign key values in the referencing table are set to NULL.

## Transaction:

The primary purpose of transactions is to ensure the consistency and integrity of a database and ACID properties. Transactions provide a way to handle multiple SQL statements as a single, atomic operation, where either all the operations succeed, or the entire transaction is rolled back to its previous state in case of failure.

### ACID Properties:

- **Atomicity**: a transaction is treated as a single indivisible unit of work.
- **Consistency**: the database starts in a consistent state, and any transaction will bring the database to another consistent state. If a transaction would violate the database's consistency rules, the database refuses to carry out the transaction.
- **Isolation**: isolation ensures that the intermediate state of a transaction is not visible to other transactions until the transaction is committed.
- **Durability**: durability guarantees that once a transaction is committed, its changes are permanent and remain committed even in the case of a system failure.

1. BEGIN Transaction:

- Marks the beginning of a transaction. Any SQL statements executed after `BEGIN TRANSACTION` and before `COMMIT` or `ROLLBACK` are part of the transaction.

```sql
BEGIN TRANSACTION;
```

2. SQL Statements Within a Transaction:

- Any SQL statement can be part of a transaction, including `SELECT`, `INSERT`, `UPDATE`, and `DELETE` statements.

3. Committing a Transaction:

- **COMMIT**: finalize the transaction and makes all changes made during the transaction permanent. Once a transaction is committed, its changes are permanent and cannot be rolled back.

```sql
COMMIT;
```

4. Rolling Back a Transaction:

- **ROLLBACK**: undoes all chanegs made during the transaction and restores the database to its state before the transaction began. If an error occurs or if we decide not to apply the changes, we can roll back the transaction.

## Concurrency problems:

1. **Dirty Read**: A dirty read occurs when one transaction reads data that has been modified by another transaction but has not been committed. If the modifying transaction is rolled back, the data read by the first transaction becomes invalid.

- **Example**: User 1 updates a product price from $50 to $60. User 2 reads the updated price before User 1 commits the transaction. If User 1's transaction is rolled back, User 2 read an incorrect and "dirty" value.

2. **Non-Repeatable Read**: A non-repeatable read occurs when a transaction reads the same data multiple times, but the data changes between the reads due to other concurrent transactions.

- **Example**: User 1 reads a customer's account balance, then User 2 deposits money into the account, and User 1 reads the balance again. The balance seen by User 1 is different in the two reads.

3. **Phantom Read:** A phantom read occurs when a transaction reads a set of rows that satisfy a condition, but another concurrent transaction inserts or deletes rows that also satisfy the condition. This can lead to unexpected results.

- **Example**: User 1 reads all products with a price greater than $50. User 2 inserts a new product with a price of $60. If User 1 reads the products again, the result set includes the new product, even though it didn't exist in the initial read.

4. **Lost Update**: A lost update occurs when two or more transactions attempt to update the same data concurrently, and the final result reflects only the changes made by the last transaction, discarding the changes made by others.

- **Example**: User 1 and User 2 read a bank account balance of $1000 concurrently. User 1 withdraws $200 and User 2 withdraws $300. If their transactions are interleaved in a way that User 2's withdrawal completes last, the final balance might be $700, and User 1's withdrawal is lost.

## SQL Server Indexes: Clustered Indexes

An index in SQL server is a data structure associated with tables and views that helps in faster retrieval of rows.

### Clustered Indexes

- it will sort the record in the physical table
- one clustered index in one table
- generated by primary key

```sql
CREATE CLUSTERED INDEX CIX_EmpDetails_EmpId ON dbo.EmployeeDetails(EmployeeID)
```

### NON-Clustered Indexes

- it will NOT sort record
- store elsewhere and point to data row
- generated by unique constraint
- one table can have multiple clustered index

```sql
-- Example of creating a non-clustered index in SQL Server
CREATE NONCLUSTERED INDEX IX_Employee_LastName ON Employee(LastName);

```

### Disadvantages of using INDEX:

- extra space and consume disk space.
- slow down other DML statements including UPDATE/INSERT/DELETE

## Performance Tuning:

- look at the execution plan/sql profiler
- creating index wisely
- avoid unnecessary joins
- avoid using SELECT \*
- use join to replace the subquery

## SQL Profiler:

SQL Profiler is a tool for monitoring and tracing activities including SQL statements, stored procedures, and events that occur within a SQL Server database. We can capture and diagonise performance issues. It can also help us identify some complex scenarios like deadlocks.

## SQL execution plan:

The execution plan focuses on how a specific SQL query will be executed by the database engine. The plan outlines how the DBMS will access and process the data to fulfill the requirements of the query.

## Composite Key:

A composite key is a combination of two or more columns in a table that can be used to uniquely identify each row in the table when the columns are combined.

```sql
CREATE TABLE EmployeeProject (
    EmployeeID INT,
    ProjectID INT,
    Role VARCHAR(100),
    PRIMARY KEY (EmployeeID, ProjectID)
);
```

## Candidate Key:

A candidate key is a column, or a set of columns, in a table that can uniquely identify a row within a table. Each table must have at least one candidate key. It's called a `candidate key` because it's a candidate for becoming the primary key of the table.

For example, in a table with columns `EmployeeID`, `Email`, and `PhoneNumber`, any of these could be a candidate key if they are unique across all rows. The primary key would then be chosen from these candidate keys based on the specific requirements of the database design.

## Dynamic SQL in SQL Server

Dynamic SQL allows us to construct SQL statements as strings and execute them at runtime.

### Use cases for dynamic SQL

- Dynamic SQL is useful when:
  - Query structure depends on user input
  - the number or names of columns or tables are not known at compile time.
  - we need to dynamically construct complex queries.

### Basic Syntax for Dynamic SQL:

- Use the `EXEC` statement to execute dynamically constructed SQL strings

```sql
DECLARE @Student_id NVARCHAR(50)
SET @Student_id = '8'

DECLARE @SQL NVARCHAR(50)
SET @SQL = 'SELECT * FROM Student WHERE Id = ' + @Student_id

EXEC sp_executesql @SQL
```

## Table Scan vs Index Scan

### Table Scan:

A table scan involves scanning the entire table to retrieve the required rows.

### Index Scan:

An index scan involves scanning the index struture to locate the rows that meet the query conditions.

### Key Differences between Index Scan and Table Scan:

1. **Data Retrieval**:

- In a table scan, all rows are read directly from the table.
- In an index scan, only the rows that satisfy the query conditions are retrieved from the table.

2. **Suitability**:

- Table scans are used when no suitable index is available or when it's more efficient to read the entire table.
- Index scans are used when there is a suitable index for the query conditions.

3. **Efficiency**:

- Table scans can be efficient for small tables but become inefficient for large tables.
- Index scans are generally more efficient for selective queries that involve small portion of the table.

4. **Resource Usage**:

- Table scans may lead to higher resource usage, especially for large tables
- Index scans can reduce resource usage by accessing only the necessary rows.

## Deadlock:

A deadlock in SQL Server occurs when two or more processes are blocked, each waiting for the other to release a resource, leading to a situation where no progress can be made.

### Example:

- Transaction A acquires a lock on Resource 1 and needs access to Resource 2
- Transaction B acquires a lock on Resource 2 and needs access to Resource 1.

### How to prevent deadlocks:

- Reducing transaction time
- Adjusting the Isolation levels

## What is the difference between left join and inner join?

- Inner join includes rows with matching values in both tables. Left Join includes all rows from the left table and the matched rows from the right table. Unmatched rows in the right table will result in NULL values.
- Inner join produces a result set containing only matched rows. Left Join produces a result set containing all rows from the left table, with matched rows from the right table and NULL values for unmatched rows.
- Inner join is used when we want to retrieve all rows from the left table, regardless of whether there are matches in the right table.

### First start optimizing the SQL part of the application

- We started profiling our database queries using SQL profiler (in staging environment) to see the performance of the Queries.

  - We can still use SQL profiler even if we are using Entity Framework and LINQ to write our queries.
  - SQL Profiler doesn't care how the queries are generated. It simply monitors the SQL Server instance for any queries that are executed against it.

- We used query execution plan to analyze the query. The query execution plan provides the table scans and index scans that are happening and, the part of our query that takes the longest time to run.
  - A Query Execution Plan is a set of steps generated by the SQL Server query optimizer to retrieve data.
  - The execution plan can help us understand why a query is slow and how we might be able to optimize it.
- The SQL profiler provides the trace file and also the list of slow running queries.
- Since we were using Entity Framework we saw that for some of the methods EF is generating complex queries which affects the performance. So for those complex LINQ queries that are generating complex SQL queries we instead of relying on EF, we created our own stored procedure in which we wrote optmized SQL queries that improve performance drastically.
