# Route parameters

Route parameters allow Flask to capture values directly from a URL and pass them to your Python functions.

They are essential when building APIs because they let you work with specific resources, such as individual books, users, or orders.

> **Tip:** You don't have to copy all examples from this lesson into your `app.py`. The examples are here to help you understand how route parameters work.

## Why do we need route parameters?

Imagine you're building a library API.

A user might want to view:

* Book 1
* Book 15
* Book 42

Creating a separate route for every book would quickly become impossible:

```text
/book/1
/book/2
/book/3
...
```

Instead, Flask allows part of the URL to be dynamic.

For example:

```python
@app.route('/book/<book_id>')
def get_book(book_id):
    return f'Book ID: {book_id}'
```

Now the same route can handle:

```text
/book/1
/book/15
/book/42
```

Flask extracts the value from the URL and passes it to the function.

---

## Your first route parameter

A route parameter is written inside angle brackets:

```python
@app.route('/user/<username>')
def user_profile(username):
    return f'User: {username}'
```

If someone visits:

```text
/user/john
```

Flask captures:

```text
john
```

and passes it into:

```python
username
```

The response becomes:

```text
User: john
```

---

## How Flask passes the value

Notice that the parameter name appears twice:

```python
@app.route('/user/<username>')
def user_profile(username):
```

The name inside the route:

```python
<username>
```

must match the function parameter:

```python
def user_profile(username):
```

Otherwise Flask won't know where to put the captured value.

---

## Try it yourself

Create a route that captures a username and displays it.

Try writing it before opening the solution.

<details>
<summary>Solution</summary>

```python
@app.route('/user/<username>')
def user_profile(username):
    return f'User: {username}'
```

</details>

---

## Type converters

By default, route parameters are treated as text.

However, Flask can automatically convert them into specific Python types.

Example:

```python
@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'Post ID: {post_id}'
```

Now Flask only accepts numbers:

```text
/post/42
```

works, while:

```text
/post/hello
```

does not.

### Available converters

| Converter        | Description            |
| ---------------- | ---------------------- |
| `<int:id>`       | Integer                |
| `<float:value>`  | Decimal number         |
| `<string:name>`  | Text (default)         |
| `<path:subpath>` | Text including slashes |

---

## Try it yourself

What should replace the blank?

```python
@app.route('/post/<_____:post_id>')
def show_post(post_id):
    return f'Post ID: {post_id}'
```

<details>
<summary>Solution</summary>

```python
@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'Post ID: {post_id}'
```

</details>

---

## Multiple parameters

Routes can capture more than one value.

Example:

```python
@app.route('/user/<username>/post/<int:post_id>')
def show_user_post(username, post_id):
    return f"{username}'s post #{post_id}"
```

Visiting:

```text
/user/john/post/42
```

captures:

```text
username = john
post_id = 42
```

and returns:

```text
john's post #42
```

---

## Optional parameters

Sometimes a route should work both with and without a parameter.

Example:

```python
@app.route('/page')
@app.route('/page/<int:page_num>')
def show_page(page_num=1):
    return f'Page {page_num}'
```

Visiting:

```text
/page
```

returns:

```text
Page 1
```

because the default value is used.

Visiting:

```text
/page/5
```

returns:

```text
Page 5
```

because Flask provides the parameter.

---

## Why validation still matters

Type converters only check the type.

For example:

```python
@app.route('/book/<int:book_id>')
```

ensures the value is an integer.

However, Flask does not know whether the value makes sense.

A user could still request:

```text
/book/0
```

or:

```text
/book/-10
```

You should validate values manually when necessary.

Example:

```python
@app.route('/book/<int:book_id>')
def get_book(book_id):

    if book_id < 1:
        return 'Invalid book ID', 400

    return f'Book {book_id}'
```

---

## Try it yourself

Complete the condition below so IDs smaller than 1 are rejected.

```python
@app.route('/book/<int:book_id>')
def get_book(book_id):

    if _______:
        return 'Invalid book ID', 400

    return f'Book {book_id}'
```

<details>
<summary>Solution</summary>

```python
if book_id < 1:
```

</details>

---

## Why route parameters matter

Route parameters are used throughout real APIs.

Examples:

```text
GET /api/books/1
GET /api/books/15
DELETE /api/books/42
```

The route might look like:

```python
@app.route('/api/books/<int:book_id>')
```

and Flask automatically provides the requested ID.

Without route parameters, building APIs would be much more difficult.

---

## Conclusion

In this lesson you learned:

* What route parameters are
* How Flask captures values from URLs
* How Flask passes values into functions
* How to use type converters
* How to work with multiple parameters
* How to create optional parameters
* Why validation is still important

Route parameters are one of the most important building blocks of REST APIs because they allow your application to work with specific resources dynamically.

In the next lesson, you'll learn how to read additional information from URLs using query parameters.

---

## Troubleshooting

### I get a 404 error

Make sure the URL matches the route.

Example:

```python
@app.route('/book/<int:book_id>')
```

works with:

```text
/book/10
```

but not:

```text
/book/hello
```

because Flask expects an integer.

---

### The parameter isn't available inside my function

Make sure the parameter name appears in both places:

```python
@app.route('/user/<username>')
def user_profile(username):
```

The names must match exactly.

---

### The route works, but the value is wrong

Print the captured value:

```python
print(book_id)
```

and verify that the URL contains the expected data.

---

### My changes don't appear

If Flask doesn't reload automatically:

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
