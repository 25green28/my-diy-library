# Updating a book (PUT)

PUT requests are used to update existing resources. Let's implement an endpoint that allows clients to modify book information already stored in the database.

## The PUT endpoint

Add this route to your `app.py`:

```python
@app.route('/api/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    book = Book.query.get(book_id)

    if not book:
        return jsonify({'error': 'Book not found'}), 404

    data = request.get_json()

    if 'title' in data:
        book.title = data['title']

    if 'author' in data:
        book.author = data['author']

    if 'genre' in data:
        book.genre = data['genre']

    if 'published_year' in data:
        book.published_year = data['published_year']

    db.session.commit()

    return jsonify(book_to_dict(book)), 200
```

## How it works

1. We search for a book using its ID.
2. If the book doesn't exist, we return a `404 Not Found` error.
3. We read the JSON data sent by the client.
4. We update only the fields that were provided.
5. We save the changes using `db.session.commit()`.
6. We return the updated book as JSON.

## Why do we need `commit()`?

Changing the object's properties does not immediately update the database.

For example:

```python
book.title = "New Title"
```

only changes the object in memory.

The change becomes permanent only after:

```python
db.session.commit()
```

Think of `commit()` as clicking the **Save** button.

Without it, the changes would be lost.

## Understanding partial updates

This route updates only the fields included in the request.

For example:

```json
{
  "title": "Nineteen Eighty-Four"
}
```

updates only the title.

The author, genre, and publication year remain unchanged.

## Testing the endpoint

Create a PUT request in Postman:

**URL**

```text
http://127.0.0.1:5000/api/books/1
```

**Body → Raw → JSON**

```json
{
  "title": "Nineteen Eighty-Four",
  "published_year": 1949
}
```

If the book exists, the API will return the updated data.

---

## PUT vs PATCH

Technically, our implementation behaves more like a PATCH request.

### PUT

A traditional PUT request replaces the entire resource.

Example:

```json
{
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "published_year": 1949
}
```

### PATCH

A PATCH request updates only the provided fields.

Example:

```json
{
  "title": "Nineteen Eighty-Four"
}
```

Because our route updates only the fields that exist in the request, it behaves more like PATCH.

For simplicity, we continue using PUT in this project.

---

## Conclusion

In this lesson you learned:

- How to update existing records in the database
- How to retrieve a book before modifying it
- Why `db.session.commit()` is required
- How partial updates work
- The difference between PUT and PATCH
- How to return updated data as JSON

In the next lesson, you'll learn how to validate incoming data and prevent invalid information from being stored in the database.

---

## Troubleshooting

### I get:

```text
Book not found
```

The requested ID does not exist in the database.

Try:

```text
GET /api/books
```

to see which IDs are available.

---

### My changes are not saved

Make sure you called:

```python
db.session.commit()
```

Without it, SQLAlchemy will not save the changes.

---

### I get:

```text
NameError: name 'request' is not defined
```

Make sure you imported `request`:

```python
from flask import request
```

---

### I get:

```text
TypeError: argument of type 'NoneType' is not iterable
```

This usually means no JSON was sent with the request.

Make sure you selected:

```text
Body → Raw → JSON
```

in Postman.

---

### My changes are not visible

Make sure:

- The Flask server is running
- You saved your file
- The server restarted after your changes

If necessary, stop the server and run:

```bash
python app.py
```