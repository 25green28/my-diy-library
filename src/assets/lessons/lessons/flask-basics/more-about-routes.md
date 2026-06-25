# More about routes

Routes are the heart of every Flask application.  They define what code should run when someone visits a specific URL.  then routes, Flask would not know how to respond to requests. You can think about routes as a map between URLs and Python functions.

> **Tip**: You don’t have to copy the code from this lesson into your `app.py`, unless you want to do the exercise.

## What is a route?

A route connects:

```text
URL → Python function
```

For example:

```python
@app.route('/')
def home():
    return 'Hello, World!'
```

When someone visits:

```text
http://127.0.0.1:5000/
```

Flask executes the `home()` function and returns its result.

---

## How routes work

Let's break the route down:

```python
@app.route('/')
def home():
    return 'Hello, World!'
```

- **`@app.route('/')`**
    - Tells Flask:
      > "Run the function below whenever someone visits `/`."

- **`def home():`**
    - Defines the function that should run.

- **`return`**
    - Returns the response sent back to the browser.

## Route rules

Keep these rules in mind:

* Every route starts with `/`
* Routes are case-sensitive
* Each route needs a function
* Function names do not need to match URLs

Example:

```python
@app.route('/books')
def library():
    return 'Books page'
```

The URL is `/books`, but the function is called `library()`.

---

## Multiple routes

Sometimes multiple URLs should display the same content.

Example:

```python
@app.route('/')
@app.route('/home')
def home():
    return 'Welcome!'
```

Both URLs work:

```text
/
```

and

```text
/home
```

---

## Try it yourself

Create a route called `/about`. It should return "About page".

Before looking at the solution, try writing it yourself.

<details>
<summary>Solution</summary>

```python
@app.route('/about')
def about():
    return 'About page'
```

</details>

---

## Handling HTTP methods

By default, routes only respond to GET requests.

You can allow other methods:

```python
@app.route('/submit', methods=['POST'])
def submit():
    return 'Form submitted'
```

This route only accepts POST requests.

---

## Multiple methods

A route can support more than one method.

Example:

```python
from flask import request

@app.route('/data', methods=['GET', 'POST'])
def data():

    if request.method == 'POST':
        return 'Data received'

    return 'Send data via POST'
```

---

## URL parameters

Routes can capture values directly from the URL.

Example:

```python
@app.route('/book/<int:book_id>')
def get_book(book_id):
    return f'Book ID: {book_id}'
```

Visiting:

```text
/book/42
```

returns:

```text
Book ID: 42
```

Flask automatically converts the value to an integer.

---

## Try it yourself

What will be displayed when visiting:

```text
/book/100
```

using this route?

```python
@app.route('/book/<int:book_id>')
def get_book(book_id):
    return f'Book ID: {book_id}'
```

<details>
<summary>Solution</summary>

```text
Book ID: 100
```

</details>

---

## Query parameters

Sometimes data comes after a `?` in the URL.

Example:

```text
/search?q=python
```

The value after `q=` is called a query parameter.

Example route:

```python
from flask import request

@app.route('/search')
def search():

    query = request.args.get('q', '')

    return f'Searching for: {query}'
```

Visiting:

```text
/search?q=python
```

returns:

```text
Searching for: python
```

---

## Why routes matter

Every API endpoint you build later will use routes.

For example:

```text
GET    /api/books
POST   /api/books
PUT    /api/books/1
DELETE /api/books/1
```

These are simply routes that respond to different requests.

Learning routes now will make building your API much easier.

---

## Conclusion

In this lesson you learned:

* What routes are
* How URLs connect to Python functions
* How to create multiple routes
* How to use GET and POST methods
* How URL parameters work
* How query parameters work

Routes are the foundation of every Flask application and every API endpoint you'll build throughout this course.

In the next lesson, we'll start creating routes that return structured data instead of simple text.

---

## Troubleshooting

### I get a 404 error

Make sure:

```python
@app.route('/about')
```

matches the URL you are visiting:

```text
http://127.0.0.1:5000/about
```

Routes must match exactly.

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

### My changes don't appear

If the server does not reload automatically:

1. Stop the server:

```text
Ctrl + C
```

2. Start it again:

```bash
python app.py
```

Also make sure:

```python
app.run(debug=True)
```

is enabled.

---

### The URL parameter isn't working

Make sure the parameter exists in both places:

```python
@app.route('/book/<int:book_id>')
def get_book(book_id):
```

The variable name must match exactly.
