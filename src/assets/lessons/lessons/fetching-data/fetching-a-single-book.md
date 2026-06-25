# Fetching a single book

Now let's create an endpoint to retrieve a specific book by its ID. This is a very common pattern in APIs — getting a single resource from the database.

---

## The GET endpoint

Add this route to your `app.py` (bellow the post rotue):

```python
@app.route('/api/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = Book.query.get(book_id)

    # Return the book data if found
    if book:
        return jsonify({
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'genre': book.genre,
            'published_year': book.published_year
        }), 200

    # Return error if book not found
    return jsonify({'error': 'Book not found'}), 404
```

## How it works

1. `<int:book_id>` captures the book ID from the URL (for example `/api/books/1`)
2. `Book.query.get(book_id)` searches for a book with that ID
3. If the book exists, we return its data with status code `200 OK`
4. If the book doesn't exist, we return an error message with status code `404 Not Found`

## Understanding `Book.query.get()`

`Book.query.get(book_id)` is a SQLAlchemy method used to find a record by its primary key (usually the `id` column).

For example:

```python
book = Book.query.get(1)
```

This tells SQLAlchemy:

> "Find the book whose ID is 1."

If no matching book exists, SQLAlchemy returns `None`.

---

## Testing the endpoint

After creating a few books, try opening (in Postman or a browser):

```text
http://127.0.0.1:5000/api/books/1
```

If the book exists, you should receive a JSON response similar to:

```json
{
  "id": 1,
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "published_year": 1949
}
```

If the book does not exist:

```json
{
  "error": "Book not found"
}
```

and the server will return status code `404`.

---

## Creating a helper function

As your project grows, you may notice that you repeat the same JSON structure in multiple routes.

A helper function can make your code cleaner (please put it between the model and the post route):

```python
# Helper function to convert book into JSON
def book_to_dict(book):
    return {
        'id': book.id,
        'title': book.title,
        'author': book.author,
        'genre': book.genre,
        'published_year': book.published_year
    }
```

Now the route becomes:

```python
@app.route('/api/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = Book.query.get(book_id)

    # Return the book data if found
    if book:
        return jsonify(book_to_dict(book)), 200

    # Return error if book not found
    return jsonify({'error': 'Book not found'}), 404
```

## Exercise

Before looking at the answers, try answering these questions yourself:

1. Which URL would you visit to retrieve the book with ID `5`?
2. Which status code should be returned if the book does not exist?
3. Why do we check `if book:` before returning data?

<details>
<summary>Show answers</summary>

1. `/api/books/5`
2. `404 Not Found`
3. Because the query may return `None` if no book with that ID exists.

</details>

---

# Conclusion

- GET requests are used to retrieve data from the server
- Route parameters allow us to identify a specific resource
- We can fetch a book using its unique ID
- Always check if a resource exists before returning it
- Return `404 Not Found` when the requested resource does not exist
- Returning JSON keeps the API consistent and easy to use

---

## Troubleshooting

### Always getting "Book not found"

This usually means:

- The requested ID does not exist in the database
- No books have been created yet

**Fix:**

Create a book first using your POST endpoint and then try fetching it.

---

### `404 Not Found`

Make sure your URL matches the route exactly.

Correct:

```text
/api/books/1
```

Incorrect:

```text
/api/book/1
```

Notice the missing `s`.

---

### `NameError: name 'jsonify' is not defined`

This happens when Flask's `jsonify` function was not imported.

**Fix:**

```python
from flask import jsonify
```

---

### Route never executes

Make sure the route is placed above:

```python
if __name__ == '__main__':
    app.run(debug=True)
```

Flask must know about all routes before the application starts.

---

### Changes are not visible

Sometimes the server needs to reload after code changes.

**Fix:**

- Save the file
- Restart the Flask server if necessary