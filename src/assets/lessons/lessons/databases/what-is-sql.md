# What is SQL?

SQL (**S**tructured **Q**uery **L**anguage) is the standard language used to interact with relational databases. It's how developers tell a database what data they want to retrieve, create, update, or delete.

## What does SQL do?

SQL allows you to:

- Retrieve data from a database
- Add new data
- Update existing data
- Delete data
- Create and modify database structures

The good news is that in this course, you won't need to become an SQL expert. Later, we'll use SQLAlchemy, which generates most SQL queries automatically.

---

## SELECT - Retrieve data

This is how you get data from a database:

```sql
SELECT * FROM books;

SELECT title, author FROM books;

SELECT * FROM books WHERE year = 1949;
```

---

## INSERT - Add data

This adds a new record:

```sql
INSERT INTO books (title, author, year)
VALUES ('1984', 'George Orwell', 1949);
```

---

## UPDATE - Modify data

This changes existing data:

```sql
UPDATE books
SET year = 1950
WHERE id = 1;
```

---

## DELETE - Remove data

This deletes records:

```sql
DELETE FROM books
WHERE id = 1;
```

---

## Common SQL clauses

### WHERE - Filter results

```sql
SELECT * FROM books
WHERE author = 'Orwell';
```

This returns only books written by Orwell.

### ORDER BY - Sort results

```sql
SELECT * FROM books
ORDER BY year DESC;
```

This sorts books from newest to oldest.

### LIMIT - Limit results

```sql
SELECT * FROM books
LIMIT 10;
```

This returns only the first 10 results.

---

## SQL in Python with SQLAlchemy

In this project, we won't write raw SQL most of the time.

Instead, we'll use **SQLAlchemy**, a Python library that:

- Translates Python code into SQL
- Handles database connections
- Makes code easier to read
- Helps protect against common security issues

---

## Example comparison

These two examples do the same thing.

### Raw SQL

```sql
SELECT * FROM books
WHERE id = 1;
```

### SQLAlchemy

```python
Book.query.get(1)
```

The SQLAlchemy version is shorter and looks more like normal Python code.

---

## Exercise

Look at the following SQL query:

```sql
DELETE FROM books
WHERE id = 5;
```

Before opening the solution, try to answer:

1. Which SQL command is being used?
2. What book will be affected?
3. What will happen after the query runs?

<details>
<summary>Solution</summary>

1. The command is `DELETE`.
2. The book whose `id` equals `5`.
3. That book will be removed from the database.

</details>

---

## Conclusion

You now have a basic understanding of SQL and how databases use it to manage data. You should now understand that:

- SQL is the language used to communicate with relational databases
- The most common SQL commands are `SELECT`, `INSERT`, `UPDATE`, and `DELETE`
- SQL can filter, sort, and limit results
- SQLAlchemy can generate SQL automatically from Python code
- You do not need to memorize SQL syntax for this course

In the next lesson, we'll configure our Flask application to connect to a database and prepare it for storing books.

---

## FAQ

### Do I need to learn SQL before continuing?

No. Understanding the basic ideas is enough for this project. SQLAlchemy will generate most SQL queries automatically.

### The SQL examples look complicated

That's completely normal. The goal of this lesson is to recognize what SQL does, not to memorize every command.

### Will we write SQL later?

Only occasionally. Most database operations in this course will be written using Python and SQLAlchemy.