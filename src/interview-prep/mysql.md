---
cover: /assets/images/mysql.png
icon: pen-to-square
date: 2023-12-12
category:
  - interview
tag:
  - mysql
star: true
sticky: true
---

# MySQL interview questions:

## 1. What is the MySQL server's default port?

3306 is MySQL server's default port.

## 2. What are the differences between CHAR and VARCHAR data types in MySQL?

### CHAR:

1. This data type is used to store character strings of a fixed length. The length can be specified in the parentheses (e.g.,CHAR(30))
2. If we store a string that is shorter than the specified length, MySQL will pad it with spaces; if the string is longer than the specified length, MySQL will truncate it.
3. CHAR is faster for data retrieval because all values are the same length.

### VARCHAR: 
1. This data type is used to store variable-length character strings. The length can be specified in the parentheses (e.g., VARCHAR(30)), which represents the maximum length.
2. Unlike CHAR, VARCHAR only uses as much space as necessary to store the actual content. This can save space if we are storing strings that are significantly shorter than the maximum length.
