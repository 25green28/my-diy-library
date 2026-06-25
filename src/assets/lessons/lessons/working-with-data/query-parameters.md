# Query parameters

Query parameters are optional key-value pairs that appear in the URL after the `?` character. They're commonly used for filtering, searching, and pagination in APIs.

## What are query parameters?

Query parameters are the part of the URL after the `?`. For example, in `/search?q=python`, the query parameter is `q=python`. Multiple parameters are separated by `&`: `/books?author=Orwell&year=1949`.

---

## Basic usage

Here's how to access query parameters in Flask:

```python
@app.route('/search')
def search():
    query = request.args.get('q', '')
    return f'Searching for: {query}'
```

`request.args.get('q', '')` gets the value of the `q` parameter, or returns an empty string if it's not provided.

## Multiple query parameters

You can access multiple parameters:

```python
@app.route('/books')
def get_books():
    author = request.args.get('author')
    year = request.args.get('year')
    return f'Author: {author}, Year: {year}'
```

Visiting `/books?author=Orwell&year=1949` would return "Author: Orwell, Year: 1949"

---

### Exercise

Before looking at the solution, try to predict what this route returns:

```python
@app.route('/books')
def get_books():
    author = request.args.get('author')
    year = request.args.get('year')
    return f'Author: {author}, Year: {year}'
```

URL:
```text
/books?author=Tolkien&year=1954
```

What is the output?

<details>
<summary>Solution</summary>

```
Author: Tolkien, Year: 1954
```

</details>

---

## Default values and type conversion

You can provide default values and convert types:

```python
@app.route('/items')
def get_items():
    limit = request.args.get('limit', 10, type=int)
    offset = request.args.get('offset', 0, type=int)
    return f'Limit: {limit}, Offset: {offset}'
```

The `type=int` parameter automatically converts the string to an integer.

---

## Multiple values for the same parameter

Sometimes a parameter can have multiple values:

```python
@app.route('/tags')
def get_tags():
    tags = request.args.getlist('tag')
    return f'Tags: {tags}'
```

Visiting `/tags?tag=python&tag=flask` would return "Tags: ['python', 'flask']"

---

## Checking if a parameter exists

You can check if a parameter was provided:

```python
@app.route('/filter')
def filter():
    if 'category' in request.args:
        category = request.args['category']
        return f'Filtering by: {category}'
    return 'No category filter'
```

---

## Conclusion

- Query parameters allow clients to send optional data in the URL after `?`
- They are used for filtering, searching, and customizing responses
- You access them in Flask using `request.args`
- They can have default values or be optional
- You can retrieve single values or multiple values using `getlist()`

---

## Troubleshooting

### Parameter always returns `None`

Check:

- The parameter name matches exactly
- The URL actually contains the parameter

Example:

```text
/books?author=Orwell
```

must match:

```python
request.args.get('author')
```

---

### Wrong type conversion

If you use:

```python
request.args.get('limit', type=int)
```

make sure the value is a number:

Correct:
```text
/items?limit=10
```

Incorrect:
```text
/items?limit=ten
```