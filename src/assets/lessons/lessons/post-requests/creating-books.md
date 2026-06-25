# Creating books (POST)

POST requests are used to create new resources. In our case, we will use them to add new books to the library.

---

## The POST endpoint

Add this route to your `app.py` (after the model definition, before the `if __name__ == '__main__':` block):

```python
@app.route('/api/books', methods=['POST'])
def create_book():
    data = request.get_json()

    # Create a new book from the request data
    new_book = Book(
        title=data['title'],
        author=data['author'],
        genre=data.get('genre'),
        published_year=data.get('published_year')
    )

    # Add the new book to the database
    db.session.add(new_book)
    db.session.commit()

    # Return the created book with a 201 status code
    return jsonify({
        'id': new_book.id,
        'title': new_book.title,
        'author': new_book.author,
        'genre': new_book.genre,
        'published_year': new_book.published_year
    }), 201
```

---

## How it works

1. `request.get_json()` reads JSON data sent by the client
2. A new `Book` object is created using that data
3. `db.session.add(new_book)` stages the object for saving
4. `db.session.commit()` permanently saves it to the database
5. The API returns the created book with status code `201 (Created)`

---

## Understanding the database session

Think of the database session like a **staging area**:

- `add()` → puts the book in the staging area
- `commit()` → saves everything permanently
- If something fails before `commit()`, nothing is saved

---

## Think-first exercise

Before looking at the solution, try to think:

What would happen if a client sends this JSON?

```json
{
  "author": "George Orwell",
  "genre": "Dystopian"
}
```

1. Will the request succeed or fail?
2. Why?
3. Which field is missing?

<details>
<summary>Solution</summary>

1. The request will fail
2. Because `title` is required (`data['title']`)
3. The missing field is `title`

</details>

---

## Using `.get()` vs direct access

- `data['title']` → required field (raises error if missing)
- `data.get('genre')` → optional field (returns `None` if missing)

We use both depending on whether a field is required or optional.

---

## Try it with Postman

Create a new request in Postman.

**Method**

```text
POST
```

**URL**

```text
http://127.0.0.1:5000/api/books
```

Open the **Body** tab and select:

```text
raw → JSON
```

Then send:

```json
{
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "published_year": 1949
}
```

Click **Send**.

If the request is successful, Postman will return the newly created book and a `201 Created` status code.


---

## Conclusion

You now understand how to create new resources using POST requests. You should now know that:

- POST requests are used to create new data
- `request.get_json()` reads incoming JSON from the client
- SQLAlchemy sessions require `add()` and `commit()`
- Required fields must be handled carefully to avoid errors
- Optional fields can use `.get()`

In the next lesson, we will learn how to retrieve books from the database using GET requests.

---

## Troubleshooting

### `400 Bad Request`

This usually means the server could not read your request.

**Common causes:**
- Missing `Content-Type: application/json` header
- Invalid JSON format in the request body
- Empty request body

**Fix:**
- Make sure you send valid JSON
- Always include the correct header when testing (Postman or curl)

---

### `KeyError: 'title'`

This happens when your code tries to access a required field that does not exist.

**Example cause:**
```python
data['title']