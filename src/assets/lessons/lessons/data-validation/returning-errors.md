# Returning errors

Even with validation in place, things can still go wrong. A client may request a book that doesn't exist, send invalid data, or trigger an unexpected server error.

Good APIs return clear error messages that help clients understand what happened.

---

## Why return errors?

Imagine a client tries to fetch a book that doesn't exist.

Without proper error handling, they might receive a confusing response or no useful information at all.

Instead, we should return:

```json
{
  "error": "Book not found"
}
```

along with an appropriate HTTP status code.

This makes the API easier to use and debug.

---

## Creating a helper function

Until now, you have probably written error responses like this:

```python
return jsonify({
    'error': 'Book not found'
}), 404
```

This works, but you'll end up repeating the same code in many routes.

Let's create a helper function that generates error responses for us.

### Step 1: Add the helper function

Open `app.py`.

Place the following function below `book_to_dict` function and above your first route.

```python
# Helper function to return an error response
def error_response(message, status_code):
    return jsonify({
        'error': message,
        'status': status_code
    }), status_code
```

### Step 2: Use the helper function

Whenever you see code like:

```python
return jsonify({
    'error': 'Book not found'
}), 404
```

you can replace it with:

```python
return error_response(
    'Book not found',
    404
)
```

Both versions work exactly the same way.

---

## Common error status codes

These are the most common status codes you'll use:

| Status Code | Meaning               |
| ----------- | --------------------- |
| 400         | Bad Request           |
| 404         | Resource Not Found    |
| 500         | Internal Server Error |

### 400 Bad Request

The client sent invalid data.

Example:

```python
return error_response(
    'Title is required',
    400
)
```

---

### 404 Not Found

The requested resource does not exist.

Example:

```python
return error_response(
    'Book not found',
    404
)
```

---

### 500 Internal Server Error

Something unexpected happened on the server.

Example:

```python
return error_response(
    'Internal server error',
    500
)
```

---

## Handling unexpected errors

Sometimes something unexpected happens while interacting with the database.

Python allows us to catch these errors using `try` and `except`.

### Step 1: Find your database commit

You already have code similar to:

```python
db.session.add(new_book)
db.session.commit()

return jsonify(book_to_dict(new_book)), 201
```
in your `create_book` function and,

```python
db.session.commit()

return jsonify(book_to_dict(book)), 200
```
in your `update_book` function.


### Step 2: Wrap the commit in try/except

Replace it with:

```python
db.session.add(new_book)

try:
    # Commit the transaction
    db.session.commit()

except Exception:
    # Rollback the transaction and return an error
    db.session.rollback()

    return error_response(
        'Internal server error',
        500
    )

return jsonify(book_to_dict(new_book)), 201
```
for the `create_book` function, and with

```python
try: 
    # Commit the transaction
    db.session.commit()

except Exception:
    # Rollback the transaction and return an error
    db.session.rollback()

    return error_response(
        'Internal server error',
        500
    )

return jsonify(book_to_dict(book)), 200
```

for the `update_book` function.

### What does this do?

* `try` executes the code
* If an error occurs, Python jumps to `except`
* `rollback()` cancels unfinished database changes
* The API returns an error instead of crashing

Think of `rollback()` as an "Undo" button for database operations.

---

## Try it yourself

Suppose a user requests a book that does not exist.

Complete the missing status code:

```python
if not book:
    return error_response(
        'Book not found',
        ?
    )
```

Which status code should be returned?

<details>
<summary>Solution</summary>

```python
if not book:
    return error_response(
        'Book not found',
        404
    )
```

</details>

---

## Returning validation errors

> **Note:** This section is only for information purposes. I recommend skipping the implementation of this section.

Sometimes multiple problems exist in the request.

For example:

```json
{
  "title": ""
}
```

This request:

* Has an empty title
* Does not contain an author

We can return multiple errors:

```python
return jsonify({
    'error': 'Validation failed',
    'errors': [
        'Title cannot be empty',
        'Author is required'
    ]
}), 400
```

Response:

```json
{
  "error": "Validation failed",
  "errors": [
    "Title cannot be empty",
    "Author is required"
  ]
}
```

This gives clients more useful information.

---

## Conclusion

In this lesson you learned:

* Why APIs should return clear error messages
* How to create a reusable error helper function
* The difference between status codes 400, 404, and 500
* How to return consistent error responses
* How `try` and `except` work
* Why `rollback()` is important when database operations fail

In the next lesson, we'll continue improving our API by making it more reliable and user-friendly.

---

## Troubleshooting

### I get:

```text
NameError: name 'error_response' is not defined
```

Make sure you created the helper function:

```python
# Helper function to return an error response
def error_response(message, status_code):
    return jsonify({
        'error': message,
        'status': status_code
    }), status_code
```

before using it.

---

### I get:

```text
Working outside of application context
```

This usually happens when database operations are executed outside a Flask application context.

Make sure database operations happen inside your Flask routes or inside:

```python
with app.app_context():
```

---

### I get:

```text
Internal server error
```

An unexpected error occurred.

Check your terminal output for the real error message.

The terminal usually contains more detailed information than the API response.

---

### My API crashes instead of returning an error

Make sure the risky code is inside a `try` block:

```python
try:
    db.session.commit()

except Exception:
    db.session.rollback()

    return error_response(
        'Internal server error',
        500
    )
```

Without `try/except`, Python will stop execution when an error occurs.
