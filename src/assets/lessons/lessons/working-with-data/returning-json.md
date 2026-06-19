# Returning JSON

When building an API, you typically return data in JSON format. Flask provides a handy function called `jsonify` that makes this easy.

## What is jsonify?

`jsonify` is a Flask helper function that converts Python data (like dictionaries and lists) into JSON format. It also automatically sets the correct HTTP headers so the client knows they're receiving JSON.

> **Important**: Before using `jsonify`, make sure you have imported it from Flask. `from flask import jsonify`

---

## Basic example

Let’s create an endpoint that returns a book.

Try to complete the missing parts yourself before looking at the solution.

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/book')
def get_book():
    # Create a book dictionary
    book = {
        "id": 1,
        "title": "1984",
        "author": "George Orwell",
        # TODO: add publication year
    }

    # TODO: return the book as JSON
    return
```

<details>
<summary>Show solution</summary>

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/book')
def get_book():
    book = {
        "id": 1,
        "title": "1984",
        "author": "George Orwell",
        "year": 2026
    }

    return jsonify(book)
```
</details>

---

## Returning a list of items

You can also return multiple items:

Try to complete the missing parts yourself before looking at the solution. 

```python
@app.route('/api/books')
def get_books():
    books = [
        {"id": 1, "title": "1984"},
        {"id": 2, "title": "Brave New World"}
        # TODO: add another book
    ]
    
    # TODO: return the books as JSON
    return 
```

<details>
<summary>Show solution</summary>

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

## Setting status codes

You can return a status code with your response:

```python
return jsonify(book), 200
```

- `200` = success
- `201` = created
- `404` = not found

---

## Error responses

You can also return errors in JSON format:

```python
@app.route('/api/book/<int:book_id>')
def get_book(book_id):
    if book_id > 100:
        return jsonify({"error": "Book not found"}), 404

    return jsonify({"id": book_id, "title": "Book Title"}), 200
```

---

## Best practices

- Always return JSON using `jsonify`
- Keep response data minimal (only what is needed)
- Use correct HTTP status codes
- Keep error messages clear and simple
- Keep response structure consistent



## Conclusion

In this lesson, you learned:

- What `jsonify` is and why it is used
- How to design API responses before coding
- How to return JSON objects and lists
- How to use HTTP status codes with responses
- How to return error messages in JSON format

---

## Troubleshooting

### jsonify is not defined

If you see:

```bash
NameError: name 'jsonify' is not defined
```

Make sure you imported it:

```python
from flask import jsonify
```

### Route returns plain text instead of JSON

If your response is not JSON:

- Make sure you are using `jsonify()`
- Do not return raw Python dictionaries directly
- Check that you are hitting the correct route

### Server not updating changes

- Stop server: `Ctrl + C`
- Restart: `python app.py`
- Make sure `debug=True` is enabled