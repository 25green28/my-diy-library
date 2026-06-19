# More about routes

Routes are the heart of a Flask application. They define how different URLs map to different Python functions in your code.

---

## What is a route?

A route is like a mapping between a URL and a function. When someone visits a specific URL on your website, Flask looks at your routes to figure out which function should run. Think of it like a receptionist directing visitors to the right room.

---

## Basic route example

Here's the simplest possible route from previous lesson:

```python
@app.route('/')
def home():
    return 'Hello, World!'
```

When someone visits the root URL (`http://127.0.0.1:5000/`), Flask calls the `home()` function and sends back whatever that function returns.

---

## Route rules to remember

- Routes must always start with `/`
- Routes are case-sensitive (`/Books` and `/books` are different)
- Each route needs its own function
- The function name doesn't have to match the URL

---

## Multiple routes for one function

You can map multiple URLs to the same function:

```python
@app.route('/')
@app.route('/home')
def home():
    return 'Home page'
```

Now both `/` and `/home` will show "Home page".

---

## Handling different HTTP methods

By default, routes respond to GET requests. To handle other methods like POST, specify them:

```python
from flask import request

@app.route('/submit', methods=['POST'])
def submit():
    return 'Form submitted!'

@app.route('/data', methods=['GET', 'POST'])
def data():
    if request.method == 'POST':
        return 'Data received'
    return 'Send data via POST'
```

---

## URL parameters

You can capture parts of the URL as variables:

```python
@app.route('/book/<int:book_id>')
def get_book(book_id):
    return f'Book ID: {book_id}'
```

Visiting `/book/42` will show "Book ID: 42". The `<int:book_id>` part captures the number and passes it to the function.

---

## Query parameters

You can also get data from the query string (the part after `?` in a URL):

```python
from flask import request

@app.route('/search')
def search():
    query = request.args.get('q', '')
    return f'Searching for: {query}'
```

Visiting `/search?q=python` will show "Searching for: python".

---

## Conclusion

In this lesson, you learned:

- What routes are in Flask
- How URLs map to Python functions
- How to use multiple routes for one function
- How to handle different HTTP methods (GET, POST)
- How to use URL parameters
- How to use query parameters

You now understand how Flask decides what code runs for each URL. In the next lessons, we will start using routes to build real API endpoints for our My DIY Library.

---

## Troubleshooting

### Route not found (404 error)

If you see a 404 error:
- Check that the URL is correct
- Make sure your route starts with `/`
- Ensure your Flask server is running



### request is not defined

If you get an error like:

```bash
NameError: name 'request' is not defined
```

Make sure you imported it:

```python
from flask import request
```



### Server not updating changes

- Stop the server (`Ctrl + C`)
- Restart it with `python app.py`
- Make sure `debug=True` is enabled