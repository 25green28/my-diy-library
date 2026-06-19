# Creating the Book model

A model is a Python class that represents a database table. Instead of writing SQL to create tables and manage data, we define Python classes and let SQLAlchemy handle the database work for us.

---

## Define the Book model

Add this to your `app.py` file:

```python
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(50))
    published_year = db.Column(db.Integer)

    def __repr__(self):
        return f'<Book {self.title}>'
```

And make sure your database is created when you run the app:

```python
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
```

---

## Understanding the model

### What is happening here?

- `class Book(db.Model)` → creates a database model called Book
- Each `db.Column(...)` → represents a column in the database table
- The class automatically becomes a table called `book` (or `books`, depending on SQLAlchemy configuration)

---

## Column types

SQLAlchemy uses different types depending on the data:

- `db.Integer` → whole numbers (IDs)
- `db.String(length)` → short text (titles, names)
- `db.Text` → long text (descriptions)
- `db.Boolean` → true/false values
- `db.Float` → decimal numbers
- `db.DateTime` → date and time values
- `db.JSON` → structured JSON data

---

## Column options

These options control how data behaves:

- `primary_key=True` → uniquely identifies each row
- `nullable=False` → field is required
- `unique=True` → values must be unique
- `default=value` → default value if none is provided
- `index=True` → speeds up searching

---

## Think-first exercise

Before looking at the solution, try to answer:

If you had to add a new field called `rating` (a number from 1 to 5), how would you define it in the model?

Try writing it yourself first.

<details>
<summary>Solution</summary>

```python
rating = db.Column(db.Integer)
```

Optional improvements:

```python
rating = db.Column(db.Integer, nullable=True)
```

</details>

---

## The `__repr__` method

This method defines how the object is displayed when printed.

```python
def __repr__(self):
    return f'<Book {self.title}>'
```

Instead of showing a confusing object reference, you get something readable like:

```
<Book 1984>
```

This is useful for debugging.

---

## Best practices

- Use clear and descriptive column names
- Mark required fields with `nullable=False`
- Add `__repr__` for debugging
- Keep models organized

---

## Conclusion

You now understand how to define database models using SQLAlchemy. You should now know that:

- Models are Python classes that represent database tables
- Each column defines a field in the database
- SQLAlchemy handles SQL automatically from your Python code
- Constraints like `nullable`, `unique`, and `primary_key` control data rules
- The model is the foundation of your backend data structure

In the next lesson, we will start using the model to create real books and interact with the database.

---

## Troubleshooting

### My table is not created

Make sure you run your app at least once so `db.create_all()` executes.

---

### I changed my model but nothing updated

SQLite does not automatically update tables.

You may need to delete `library.db` and restart the app during development.

---

### I get errors about `app.app_context()`

Make sure `db.create_all()` is inside:

```python
with app.app_context():
```
