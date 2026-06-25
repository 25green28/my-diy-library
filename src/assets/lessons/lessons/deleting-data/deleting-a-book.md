# Deleting a book (DELETE)

DELETE requests are used to remove resources from the database. Let's implement an endpoint that allows clients to delete books from our library.

---

## The DELETE endpoint

Add this route to your `app.py` (after your other routes):

```python
@app.route('/api/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = Book.query.get(book_id)

    # If the book doesn't exist, return a 404 error
    if not book:
        return error_response('Book not found', 404)

    # Delete the book from the database
    db.session.delete(book)
    db.session.commit()

    return jsonify({'message': 'Book deleted successfully'}), 200
```

## How it works

1. We find the book by its ID
2. If the book doesn't exist, we return a 404 error
3. `db.session.delete(book)` marks the book for deletion
4. `db.session.commit()` permanently removes it from the database
5. We return a success message with status 200

## Handling database errors

Just like in previous lessons, database operations can fail.

Replace:

```python
db.session.delete(book)
db.session.commit()

return jsonify({'message': 'Book deleted successfully'}), 200
```

with:

```python
try:
    # Delete the book from the database
    db.session.delete(book)
    db.session.commit()

    return jsonify({
        'message': 'Book deleted successfully'
    }), 200

except Exception:
    # In case of an error, rollback the transaction
    db.session.rollback()

    return error_response(
        'Internal server error',
        500
    )
```

This prevents your API from crashing if something goes wrong.

## Return 204 No Content

Some APIs return `204 No Content` instead of a success message.

Replace:

```python
return jsonify({
    'message': 'Book deleted successfully'
}), 200
```

with:

```python
return '', 204
```

The `204` status code means:

- The deletion was successful
- No response body is returned

Both approaches are valid.

## The best option

Your library currently stores:

- book_id
- title
- author
- genre
- published_year

Before looking at the solution, think:

If a user deletes a book, which value should be used to identify the book?

<details>
<summary>Solution</summary>

The best choice is:

```python
book_id
```

because every book has a unique ID.

Titles and authors may be duplicated, but IDs are unique.

This is why our route uses:

```python
@app.route('/api/books/<int:book_id>', methods=['DELETE'])
```

</details>

---

## Try it with Postman

Create a new request in Postman.

**Method**

```text
DELETE
```

**URL**

```text
http://127.0.0.1:5000/api/books/1
```

Replace `1` with the ID of an existing book.

Click **Send**.

If the request is successful, the book will be removed from the database and the API will return a success response.

---


## Best practices

- Always check if the resource exists before deleting it
- Use the book ID to identify records
- Return clear success and error messages
- Wrap database operations in `try/except`
- Call `rollback()` when a database error occurs
---

## Conclusion

In this lesson you learned:

- How DELETE requests work
- How to create a DELETE endpoint in Flask
- How to remove records using SQLAlchemy
- How to return a 404 error when a book does not exist
- How to handle database errors safely
- The difference between status codes 200 and 204

In the next lesson, we'll continue improving our API by making it more robust and easier to maintain.

---

## Troubleshooting

### I get:

```text
Book not found
```

The requested book ID does not exist.

Try:

```text
GET /api/books
```

to see which books are currently stored.

---

### I get:

```text
AttributeError: 'NoneType' object has no attribute ...
```

This usually means the book was not found but your code still tried to use it.

Make sure you have:

```python
if not book:
    return error_response(
        'Book not found',
        404
    )
```

before deleting the book.

---

### I get:

```text
Internal server error
```

Check your terminal output.

The API returns a generic error message, but the terminal usually shows the real exception.

---

### The book is still visible after deleting it

Make sure you called:

```python
db.session.commit()
```

after:

```python
db.session.delete(book)
```

Without `commit()`, the deletion is not saved.

---

### DELETE request does not work

Make sure:

```python
methods=['DELETE']
```

is present in the route:

```python
@app.route(
    '/api/books/<int:book_id>',
    methods=['DELETE']
)
```

If Flask does not allow DELETE requests, check that the route was saved and the server was restarted.