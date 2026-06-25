# Updating a book (PUT)

PUT requests are used to modify existing resources.

In our library API, this means updating information about a book that already exists in the database.

> **Tip:** In this project, our PUT endpoint updates only the fields provided in the request. Technically this behaves more like a PATCH request, but we'll continue using PUT for simplicity.

---

## Why do we need an update route?

Imagine a user wants to correct a typo in a book title.

Current book:

```json
{
  "id": 1,
  "title": "19844",
  "author": "George Orwell"
}
```

Updated book:

```json
{
  "id": 1,
  "title": "1984",
  "author": "George Orwell"
}
```

Instead of creating a new book, we update the existing one.

---

## The update route

Add the following route below the route from the previous lesson:

```python
@app.route('/api/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    book = Book.query.get(book_id)

    # Handle missing book
    if not book:
        return jsonify({'error': 'Book not found'}), 404

    data = request.get_json()

    # Update fields if provided
    if 'title' in data:
        book.title = data['title']

    if 'author' in data:
        book.author = data['author']

    if 'genre' in data:
        book.genre = data['genre']

    if 'published_year' in data:
        book.published_year = data['published_year']

    # Save changes
    db.session.commit()

    return jsonify(book_to_dict(book)), 200
```

---

## Understanding the route

### Finding the book

```python
book = Book.query.get(book_id)
```

The book ID comes from the URL:

```text
/api/books/1
```

If the book exists, SQLAlchemy returns the matching record.

---

### Handling missing books

```python
if not book:
    return jsonify({'error': 'Book not found'}), 404
```

If no book matches the provided ID, we return a `404 Not Found` response.

---

### Reading JSON data

```python
data = request.get_json()
```

This converts the JSON request body into a Python dictionary.

Example:

```json
{
  "title": "Nineteen Eighty-Four"
}
```

becomes:

```python
{
    "title": "Nineteen Eighty-Four"
}
```

---

### Updating fields

```python
if 'title' in data:
    book.title = data['title']
```

Only fields included in the request are updated.

For example:

```json
{
  "title": "Nineteen Eighty-Four"
}
```

updates only the title.

All other fields remain unchanged.

---

## Why do we need commit()?

Changing a value does not immediately update the database.

For example:

```python
book.title = "New Title"
```

only changes the object in memory.

To permanently save the change:

```python
db.session.commit()
```

Think of `commit()` as pressing a Save button.

Without it, the changes would be lost.

---

## Try it yourself

Assume the database contains:

```json
{
  "id": 1,
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "published_year": 1949
}
```

What will the book look like after sending:

```json
{
  "title": "Nineteen Eighty-Four"
}
```

<details>
<summary>Solution</summary>

```json
{
  "id": 1,
  "title": "Nineteen Eighty-Four",
  "author": "George Orwell",
  "genre": "Dystopian",
  "published_year": 1949
}
```

Only the title changes.

</details>

---

## PUT vs PATCH

There are two common update methods:

### PUT

Traditionally replaces the entire resource.

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

Updates only the provided fields.

Example:

```json
{
  "title": "Nineteen Eighty-Four"
}
```

Because our route updates only supplied fields, it behaves more like PATCH.

For simplicity, we'll continue using PUT.

---

## Try it with Postman

Create a new request in Postman.

**Method**

```text
PUT
```

**URL**

```text
http://127.0.0.1:5000/api/books/1
```

Replace `1` with the ID of an existing book.

Open the **Body** tab and select:

```text
raw → JSON
```

Then send:

```json
{
    "genre": "Science Fiction"
}
```

Click **Send**.

If the request is successful, Postman will return the updated book as JSON.

---

## Best practices

* Always check that the resource exists before updating it
* Validate incoming data before saving it
* Use `commit()` after making changes
* Return the updated resource when the update succeeds
* Use appropriate status codes (`200`, `404`, etc.)


---

## Conclusion

In this lesson you learned:

* How PUT requests work
* How to retrieve a book before updating it
* How to read JSON request data
* How partial updates work
* Why `db.session.commit()` is required
* The difference between PUT and PATCH

In the next lesson, we'll validate incoming data before storing it in the database.

---

## Troubleshooting

### I get:

```text
Book not found
```

The provided ID does not exist in the database.

Make sure the book exists before trying to update it.

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

This usually means no JSON data was sent with the request.

Make sure the request body contains valid JSON.

---

### My changes are not visible

Make sure:

* The Flask server is running
* The file was saved
* The server restarted after your changes

If necessary:

```bash
python app.py
```