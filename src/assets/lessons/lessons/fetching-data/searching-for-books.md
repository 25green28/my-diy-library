# Searching for books

Let's implement search functionality to find books by title or author. Search is a common feature in APIs that makes it easy for users to find specific items.

---

## The search endpoint

Add this route to your `app.py` (bellow the route from the previous lesson):

```python
@app.route('/api/books/search', methods=['GET'])
def search_books():
    query = request.args.get('q', '')

    # Check if the query is empty
    if not query:
        return jsonify({'error': 'Search query is required'}), 400

    # Perform the search
    books = Book.query.filter(
        (Book.title.ilike(f'%{query}%')) |
        (Book.author.ilike(f'%{query}%'))
    ).all()

    return jsonify([book_to_dict(book) for book in books]), 200
```

## How it works

1. We get the search query from the `q` query parameter.
2. If no query is provided, we return an error.
3. `ilike()` performs a case-insensitive search.
4. `%` acts as a wildcard and matches any characters.
5. `|` means OR.
6. All matching books are returned as JSON.

---

## Understanding the search

The search looks for the query anywhere inside the title or author.

For example:

| Search query | Matches |
|-------------|----------|
| `198` | `1984` |
| `orwell` | `George Orwell` |
| `ring` | `The Lord of the Rings` |

Because we use `ilike()`, uppercase and lowercase letters don't matter.

These searches all return the same result:

```text
orwell
Orwell
ORWELL
```

## Understanding `%`

The `%` symbol means "any characters".

Examples:

```python
Book.title.ilike('%ring%')
```

Matches:

```text
The Lord of the Rings
Ringworld
```

because the word "ring" appears somewhere inside the title.

Without `%`, the title would have to match exactly.

---

## Testing the endpoint

Start your Flask server and visit (in Postman or a browser):

```text
http://127.0.0.1:5000/api/books/search?q=1984
```

or

```text
http://127.0.0.1:5000/api/books/search?q=Orwell
```

If matching books exist, they will be returned as JSON.

---

## Try it yourself

Currently users can search by:

- Title
- Author

Can you modify the search so users can also search by **genre**?

Think about:

- Which field should be added?
- Where should the new condition go?
- Should it use `ilike()` as well?

<details>
<summary>Solution</summary>

```python
books = Book.query.filter(
    (Book.title.ilike(f'%{query}%')) |
    (Book.author.ilike(f'%{query}%')) |
    (Book.genre.ilike(f'%{query}%'))
).all()
```

</details>

---

## Conclusion

In this lesson you learned:

- How to create a search endpoint
- How query parameters can be used for searching
- How `ilike()` performs case-insensitive searches
- How `%` works as a wildcard
- How to return matching database records as JSON

In the next lesson, you'll learn how to update existing books in the database.

---

## Troubleshooting

### I get:

```text
Search query is required
```

Make sure you include the `q` query parameter:

```text
/api/books/search?q=1984
```

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

### My search returns an empty list

```json
[]
```

This usually means:

- No books match the search term.
- The database is empty.
- The search term is spelled differently than the stored data.

Try searching for a broader term.

---

### Changes are not visible

Make sure:

- The Flask server is running.
- You saved your file.
- The server restarted after your changes.

If necessary, stop the server and run:

```bash
python app.py
```