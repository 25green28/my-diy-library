# What is a database?

A database is an organized collection of data that can be easily stored, accessed, and managed. Think of it like a super-powered spreadsheet that can handle thousands (or even millions) of records efficiently.

---

## Why do we need a database?

Without a database, your data would disappear every time you stop your program.

For example:

```python
books = []
```

If you close your application, everything stored in `books` is lost.

A database solves this problem by storing data permanently on your computer, allowing it to be loaded again whenever the application starts.

Databases also provide:

- **Persistent storage**: Data remains available even after the program stops
- **Efficient querying**: Quickly find specific records
- **Data integrity**: Rules that help keep data accurate and consistent
- **Scalability**: Handle growing amounts of data
- **Concurrent access**: Multiple users can access data at the same time

---

## Types of databases

There are many database systems available, but they generally fall into two categories.

### Relational databases (SQL)

Relational databases store data in tables made of rows and columns, similar to spreadsheets.

Examples include:

- SQLite
- MySQL
- PostgreSQL

These databases use **SQL** (**S**tructured **Q**uery **L**anguage) to store, retrieve, and modify data.

They are ideal when your data has a clear structure and relationships.

### NoSQL databases

NoSQL databases store data in different ways, such as documents or key-value pairs.

Examples include:

- MongoDB
- Redis

They are often used for highly flexible or specialized applications.

For this project, we will focus on relational databases because they are easier to learn and fit our book library perfectly.

---

## Key database concepts

### Table

A table is a collection of related data.

For example, all books in our library could be stored in a `books` table.

### Row

A row represents a single record.

One row equals one book.

### Column

A column represents a specific piece of information.

Examples:

- title
- author
- publication year

### Primary key

A primary key is a unique identifier for each row.

It allows us to uniquely identify a specific record.

### Foreign key

A foreign key links data between tables.

We won't use foreign keys immediately, but they become important when applications grow larger.

---

## Example: Books table

Here's how our books might look in a database table:

| id | title | author | year |
|----|--------|--------|------|
| 1 | 1984 | George Orwell | 1949 |
| 2 | Brave New World | Aldous Huxley | 1932 |

## Think before continuing

Look at the following table:

| id | title | author |
|----|--------|--------|
| 1 | 1984 | George Orwell |
| 2 | Dune | Frank Herbert |

### Question

What is the primary key in this table?

<details>
<summary>Solution</summary>

The primary key is:

```text
id
```

because its value is unique for every book and can be used to identify a specific record.

</details>

---

## Why SQLite for this project?

We're using SQLite because:

- It's built into Python — no separate installation required
- It's perfect for learning and small projects
- It stores data in a single file
- It uses standard SQL, which means the skills you learn transfer to larger databases later
- It works perfectly with Flask and SQLAlchemy

---

## Conclusion

- A database is a system used to store and organize data
- Unlike variables, database data remains available after the program stops
- Databases store information in tables made of rows and columns
- Every record usually has a unique identifier called a primary key
- SQLite is a simple relational database that is perfect for learning and small projects
- In this project, we will use a database to store our books permanently

You now understand what a database is and why it is an essential part of most applications. In the next lesson, we will learn how databases organize data using SQL.

---

## FAQ

### Why can't I just use Python variables?

Variables only exist while your program is running.

```python
books = []
```

If you stop the application, everything stored in `books` is lost.

A database stores data permanently so it can be loaded again later.

---

### Is a database the same as an Excel file?

Not exactly.

Both store data in rows and columns, but databases are designed to:

- Handle much larger amounts of data
- Allow multiple users to access data
- Search records efficiently
- Enforce data rules and relationships

---

### Do I need to install SQLite?

No.

SQLite comes bundled with Python, so you already have everything needed for this course.