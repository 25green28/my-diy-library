# Database configuration

Now let's connect our Flask application to a database.

We'll use **Flask-SQLAlchemy**, a library that allows us to work with databases using Python code instead of writing raw SQL all the time.

## Make sure Flask-SQLAlchemy is installed

If you haven't already installed it, run (always in a virtual environment):

```bash
pip install flask-sqlalchemy
```

---

## Configure the database

Open your `app.py` file and update it like this:

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///library.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

if __name__ == '__main__':
    app.run(debug=True)
```

---

## Understanding the configuration

Let's look at the most important lines.

### Database location

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///library.db'
```

This tells SQLAlchemy where the database is located.

In our case:

```text
sqlite:///library.db
```

means:

> Create or use a SQLite database file named `library.db` inside the project folder.

---

### Disable modification tracking

```python
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
```

This disables an extra feature that uses additional memory.

For most projects, setting it to `False` is recommended.

---

### Create the database object

```python
db = SQLAlchemy(app)
```

This creates a database object that we'll use throughout the project.

Later we'll use `db` to:

- Create database models
- Insert books
- Retrieve books
- Update books
- Delete books

---

## What is `library.db`?

After we create our database tables, a new file called:

```text
library.db
```

will appear in the project folder.

This file stores all the data for our application.

Think of it as a container that holds all your books.

> Don't worry if you don't see the file yet. We still need to create our first model before the database can be generated.

---

## Exercise

Look at the following configuration:

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///myLibrary.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
```

Before opening the solution, try to answer:

1. Which line tells Flask where the database is stored?
2. Which line creates the SQLAlchemy object?
3. What will the database file be called?

<details>
<summary>Solution</summary>

1. ```python
   app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///myLibrary.db'
   ```

2. ```python
   db = SQLAlchemy(app)
   ```

3. The database file will be called:

   ```text
   myLibrary.db
   ```

</details>

---

## Conclusion

You have successfully configured Flask to work with a database. You now understand that:

- Flask-SQLAlchemy connects Flask with a database
- SQLite stores data inside a file on your computer
- `library.db` will contain all the data for our application
- `SQLALCHEMY_DATABASE_URI` defines where the database is located
- `db = SQLAlchemy(app)` creates the database object we'll use throughout the project

In the next lesson, we'll create our first database model and finally define what a book looks like inside our application.

---

## Troubleshooting

### ModuleNotFoundError: No module named 'flask_sqlalchemy'

Make sure Flask-SQLAlchemy is installed:

```bash
pip install flask-sqlalchemy
```

Also verify that your virtual environment is activated.

---

### I don't see `library.db`

This is normal.

The file will only appear after we create our database tables in a later lesson.