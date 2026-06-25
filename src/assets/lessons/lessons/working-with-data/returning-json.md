# Returning JSON

When building APIs, we usually don't return plain text.

Instead, APIs return data in a format called **JSON**.

JSON is the standard format used by web applications to exchange data between a frontend and a backend.

> **Tip:** You don't have to copy all examples from this lesson into your `app.py`. The examples are here to help you understand how JSON responses work.

## What is JSON?

JSON stands for:

```text
JavaScript Object Notation
```

Despite the name, JSON is used by almost every programming language, not just JavaScript.

A JSON object looks like this:

```json
{
    "id": 1,
    "title": "1984",
    "author": "George Orwell"
}
```

JSON stores information using:

* Keys (`"title"`)
* Values (`"1984"`)

You can think of it as a structured way to organize data.

---

## Why APIs use JSON

Imagine a frontend asks your backend for information about a book.

Returning this:

```text
1984 by George Orwell
```

might be readable for humans, but it is difficult for programs to process.

Instead, APIs return structured data:

```json
{
    "id": 1,
    "title": "1984",
    "author": "George Orwell"
}
```

Now the frontend can easily access:

```text
title → 1984
author → George Orwell
```

This is why JSON is the standard response format for APIs.

---

## What is jsonify()?

Flask provides a helper function called:

```python
jsonify()
```

It converts Python data structures into JSON and automatically sets the correct HTTP headers.

Before using it, import it:

```python
from flask import jsonify
```

Without `jsonify()`, Flask would not know that you want to return JSON data.

---

## Returning a JSON object

A Python dictionary can be converted into JSON using `jsonify()`.

Example:

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/book')
def get_book():

    book = {
        "id": 1,
        "title": "1984",
        "author": "George Orwell"
    }

    return jsonify(book)
```

When visiting:

```text
/api/book
```

Flask returns:

```json
{
    "id": 1,
    "title": "1984",
    "author": "George Orwell"
}
```

---

## Try it yourself

Add a publication year to the book and return it as JSON.

Try it before opening the solution.

<details>
<summary>Solution</summary>

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/book')
def get_book():

    book = {
        "id": 1,
        "title": "1984",
        "author": "George Orwell",
        "year": 1949
    }

    return jsonify(book)
```

</details>

---

## Returning multiple items

APIs often return lists of data.

Example:

```python
@app.route('/api/books')
def get_books():

    books = [
        {"id": 1, "title": "1984"},
        {"id": 2, "title": "Brave New World"}
    ]

    return jsonify(books)
```

This returns:

```json
[
    {
        "id": 1,
        "title": "1984"
    },
    {
        "id": 2,
        "title": "Brave New World"
    }
]
```

---

## Try it yourself

Add a third book to the list.

Try it before opening the solution.

<details>
<summary>Solution</summary>

```python
@app.route('/api/books')
def get_books():

    books = [
        {"id": 1, "title": "1984"},
        {"id": 2, "title": "Brave New World"},
        {"id": 3, "title": "Fahrenheit 451"}
    ]

    return jsonify(books)
```

</details>

---

## HTTP status codes

A response can include a status code.

Example:

```python
return jsonify(book), 200
```

The second value tells the client whether the request succeeded.

Common status codes:

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Resource created      |
| 400  | Bad request           |
| 404  | Not found             |
| 500  | Internal server error |

---

## Returning error responses

Errors should also be returned as JSON.

Example:

```python
@app.route('/api/book/<int:book_id>')
def get_book(book_id):

    if book_id > 100:
        return jsonify({
            "error": "Book not found"
        }), 404

    return jsonify({
        "id": book_id,
        "title": "Book Title"
    }), 200
```

If a user requests a book that doesn't exist, the API returns:

```json
{
    "error": "Book not found"
}
```

along with a:

```text
404 Not Found
```

status code.

---

## Why consistent JSON matters

Imagine one route returns:

```json
{
    "title": "1984"
}
```

and another returns:

```json
{
    "book_title": "1984"
}
```

The frontend now has to handle both formats.

A consistent API is easier to use and easier to maintain.

Try to keep response structures similar throughout your project.

---

## Best practices

* Always return JSON using `jsonify()`
* Keep responses simple and consistent
* Use meaningful property names
* Return appropriate HTTP status codes
* Return errors in JSON format
* Only send data the client actually needs

---

## Conclusion

In this lesson you learned:

* What JSON is
* Why APIs use JSON
* What `jsonify()` does
* How to return JSON objects
* How to return JSON lists
* How to use HTTP status codes
* How to return JSON error messages

JSON is the primary way that frontend applications communicate with backend APIs, so understanding it is essential before building your own API endpoints.

In the next lesson, you'll start creating API routes that return real data from your application.

---

## Troubleshooting

### jsonify is not defined

If you see:

```text
NameError: name 'jsonify' is not defined
```

make sure you imported it:

```python
from flask import jsonify
```

---

### The response is not JSON

Make sure you are using:

```python
return jsonify(data)
```

instead of:

```python
return data
```

---

### My changes don't appear

If Flask doesn't reload automatically:

1. Stop the server:

```text
Ctrl + C
```

2. Start it again:

```bash
python app.py
```

Also make sure:

```python
app.run(debug=True)
```

is enabled.

---

### The browser shows raw JSON

This is normal.

Browsers display JSON as text.

In a real application, the frontend reads the JSON and displays it in a user-friendly way.
