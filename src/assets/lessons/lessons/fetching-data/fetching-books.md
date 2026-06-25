# Fetching multiple books (GET)

Now let's create an endpoint to retrieve all books from the database. This is useful when clients want to display a list of books or see everything stored in the library.

---

## The GET all endpoint

Add this route to your `app.py` (bellow the route from the previous lesson):

```python
@app.route('/api/books', methods=['GET'])
def get_books():
    books = Book.query.all()

    books_list = []

    # Convert each book to a dictionary and add to the list
    for book in books:
        books_list.append({
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'genre': book.genre,
            'published_year': book.published_year
        })

    return jsonify(books_list), 200
```

## How it works

1. `Book.query.all()` retrieves all books from the database.
2. We create an empty list called `books_list`.
3. We loop through every book returned by the database.
4. Each book is converted into a dictionary.
5. The dictionaries are added to the list.
6. The list is returned as JSON with status code `200 OK`.

## Understanding `.all()`

Previously, we used:

```python
Book.query.get(book_id)
```

to retrieve a single book.

This time we use:

```python
Book.query.all()
```

which retrieves **all books** from the database.

If there are 5 books stored, SQLAlchemy returns a list containing 5 Book objects.

---

## Using the helper function

If you created the helper function from the previous lesson, your code becomes much cleaner:

```python
@app.route('/api/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    # Convert each book to a dictionary and return as JSON
    return jsonify([book_to_dict(book) for book in books]), 200
```

Both approaches work exactly the same.

For beginners, the loop version is usually easier to understand.

---

## Testing the endpoint

Start your Flask server and visit:

```text
http://127.0.0.1:5000/api/books
```

If books exist in the database, you should see something similar to:

```json
[
  {
    "id": 1,
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "published_year": 1949
  }
]
```

## What if there are no books?

If the database is empty, Flask returns:

```json
[]
```

This is completely normal.

An empty list simply means no books have been created yet.

---

## Conclusion

In this lesson you learned:

- How to retrieve all records from a database
- How `Book.query.all()` works
- How to convert database objects into JSON
- How to return a list of books from an API
- Why helper functions can reduce duplicated code

In the next lesson, you'll learn how to search and filter books using query parameters.

---

## Troubleshooting

### I get an empty list (`[]`)

This usually means there are no books in the database yet.

Create a few books using your POST endpoint and try again.

---

### I see an error like:

```text
Object of type Book is not JSON serializable
```

You cannot return SQLAlchemy objects directly.

Convert them into dictionaries first:

```python
{
    "id": book.id,
    "title": book.title
}
```

or use your `book_to_dict()` helper.

---

### I get:

```text
NameError: name 'jsonify' is not defined
```

Make sure you imported `jsonify`:

```python
from flask import jsonify
```

---

### My changes are not visible

Make sure:

- The Flask server is running
- You saved the file
- The server restarted after your changes

If necessary, stop the server and start it again:

```bash
python app.py
```