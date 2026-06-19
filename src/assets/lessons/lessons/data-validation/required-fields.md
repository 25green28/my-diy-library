# Required fields

Data validation ensures that the data received by your API is correct and complete before processing it. This prevents bad data from entering your database and provides helpful feedback to users.

## Why validate data?

Without validation, users could send incomplete or invalid data, leading to:

- Bad data in your database
- Confusing errors later in the process
- Poor user experience
- Unexpected application behavior

Validation allows us to catch problems before saving data.

---

## Validating required fields

Let's add validation to our POST endpoint (by modifying the existing one) to ensure required fields are provided:

```python
@app.route('/api/books', methods=['POST'])
def create_book():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No data provided'}), 400

    if 'title' not in data:
        return jsonify({'error': 'Title is required'}), 400

    if 'author' not in data:
        return jsonify({'error': 'Author is required'}), 400

    new_book = Book(
        title=data['title'],
        author=data['author'],
        genre=data.get('genre'),
        published_year=data.get('published_year')
    )

    db.session.add(new_book)
    db.session.commit()

    return jsonify(book_to_dict(new_book)), 201
```

---

## Checking for empty values

A field may exist but still contain an empty value:

```json
{
  "title": "",
  "author": "George Orwell"
}
```

We can prevent this using `.strip()` (please replace the current validation of title and author with the following one):

```python
if not data['title'].strip():
    return jsonify({'error': 'Title cannot be empty'}), 400

if not data['author'].strip():
    return jsonify({'error': 'Author cannot be empty'}), 400
```

The `.strip()` method removes spaces from the beginning and end of a string.

For example:

```python
"   ".strip()
```

becomes:

```python
""
```

which is considered empty.

---

## Type validation

Sometimes users send values in the wrong format.

For example:

```json
{
  "published_year": "abc"
}
```

We can check whether the value is a number (please replate the current validation of published_year with the following one):

```python
if 'published_year' in data:
    try:
        data['published_year'] = int(data['published_year'])
    except (ValueError, TypeError):
        return jsonify(
            {'error': 'Published year must be a number'}
        ), 400
```

---

## API validation vs database validation

There are two places where validation can happen.

### API validation

This is the validation we write in our route:

```python
if 'title' not in data:
    return jsonify({'error': 'Title is required'}), 400
```

It provides helpful feedback to the user.

### Database validation

We can also define rules in our model:

```python
title = db.Column(
    db.String(100),
    nullable=False
)
```

This prevents SQLAlchemy from saving invalid data.

Using both types of validation makes the application more reliable.

---

## Try it yourself

Suppose we want the **genre** field to be required as well.

Can you add validation that returns:

```json
{
  "error": "Genre is required"
}
```

when the field is missing?

Think about:

- Which `if` statement should be added?
- Where should it be placed?

<details>
<summary>Solution</summary>

```python
if 'genre' not in data:
    return jsonify({'error': 'Genre is required'}), 400
```

Place it together with the other required field checks.

</details>

---

## Conclusion

In this lesson you learned:

- Why validation is important
- How to check if required fields exist
- How to prevent empty values
- How to validate data types
- The difference between API validation and database validation
- How validation improves application reliability

In the next lesson, we'll continue improving our API by adding more advanced validation and error handling.

---

## Troubleshooting

### I get:

```text
No data provided
```

Make sure you are sending JSON in the request body.

Example:

```json
{
  "title": "1984",
  "author": "George Orwell"
}
```

---

### I get:

```text
Title is required
```

The JSON does not contain a `title` field.

Check for spelling mistakes:

```json
{
  "title": "1984"
}
```

not:

```json
{
  "book_title": "1984"
}
```

---

### I get:

```text
Author is required
```

The `author` field is missing from the request.

---

### I get:

```text
Title cannot be empty
```

The title exists but contains only spaces or an empty string.

Example:

```json
{
  "title": "",
  "author": "George Orwell"
}
```

---

### I get:

```text
Published year must be a number
```

Make sure the value can be converted to an integer.

Valid:

```json
{
  "published_year": 1949
}
```

or

```json
{
  "published_year": "1949"
}
```

Invalid:

```json
{
  "published_year": "nineteen forty-nine"
}
```

---

### I changed my code but nothing happens

Make sure:

- The Flask server is running
- You saved the file
- The server restarted after the change

If necessary, stop the server and run:

```bash
python app.py
```