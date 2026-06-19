# Route parameters

Route parameters let you capture variable parts of the URL and pass them to your function as arguments. This is essential for building APIs where you need to work with specific resources.

## Before we start

Imagine you're building an API for a library.

How would the server know which book the user wants?

For example:

- Book 1
- Book 15
- Book 42

Creating a separate route for every book would be impossible:

```text
/book/1
/book/2
/book/3
...
```

Instead, we use **route parameters** to make part of the URL dynamic.

---

## Your first route parameter

Try to complete the route below.

What should replace the missing parts?

```python
@app.route('/user/<_____>')
def user_profile(_____):
    return f'User: {username}'
```

### Your task

- Capture the username from the URL
- Pass it into the function
- Test it with a URL such as:

```text
/user/john
```

<details>
<summary>Show solution</summary>

```python
@app.route('/user/<username>')
def user_profile(username):
    return f'User: {username}'
```

</details>

---

## Type converters

Flask can automatically convert URL parameters to specific Python types.

Try to complete the route below so that `post_id` becomes an integer.

```python
@app.route('/post/<_____:post_id>')
def show_post(post_id):
    return f'Post ID: {post_id}'
```

<details>
<summary>Show solution</summary>

```python
@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'Post ID: {post_id}'
```

</details>

### Available converters

- `<int:id>` → integer
- `<float:value>` → decimal number
- `<string:name>` → text (default)
- `<path:subpath>` → text including slashes

---

## Multiple parameters

Sometimes you need more than one piece of information.

Can you identify what values Flask will capture from this URL?

```text
/user/john/post/42
```

Now look at the route:

```python
@app.route('/user/<username>/post/<int:post_id>')
def show_user_post(username, post_id):
    return f"{username}'s post #{post_id}"
```

Flask will capture:

- `username` → `john`
- `post_id` → `42`

---

## Optional parameters

Sometimes you want a route to work with or without a parameter.

Try to understand what happens when someone visits:

```text
/page
```

and:

```text
/page/5
```

```python
@app.route('/page')
@app.route('/page/<int:page_num>')
def show_page(page_num=1):
    return f'Page {page_num}'
```

<details>
<summary>Explanation</summary>

If no page number is provided, Flask uses the default value:

```python
page_num = 1
```

So:

```text
/page
```

returns:

```text
Page 1
```

while:

```text
/page/5
```

returns:

```text
Page 5
```

</details>

---

## Validation

Even when Flask converts parameters for you, you should still validate them.

Try to complete the missing condition.

```python
@app.route('/book/<int:book_id>')
def get_book(book_id):
    if _______:
        return 'Invalid book ID', 400

    return f'Book {book_id}'
```

### Your task

Reject IDs smaller than 1.

<details>
<summary>Show solution</summary>

```python
@app.route('/book/<int:book_id>')
def get_book(book_id):
    if book_id < 1:
        return 'Invalid book ID', 400

    return f'Book {book_id}'
```

</details>

---

## Conclusion

In this lesson, you learned:

- What route parameters are
- How Flask captures values from URLs
- How to use type converters
- How to work with multiple parameters
- How to create optional parameters
- Why validating route parameters is important

You now understand how to create dynamic routes that work with specific resources. In the next lesson, we will learn how to read additional information from URLs using query parameters.

---

## Troubleshooting

### 404 Not Found

If Flask returns a 404 error:

- Check that the URL matches the route pattern
- Make sure parameter types are correct
- Verify that the server is running

For example:

```python
@app.route('/book/<int:book_id>')
```

will work with:

```text
/book/10
```

but not:

```text
/book/abc
```

---

### Function parameter missing

If you capture a parameter in the route, you must also add it to the function:

❌ Incorrect:

```python
@app.route('/user/<username>')
def user_profile():
    pass
```

✅ Correct:

```python
@app.route('/user/<username>')
def user_profile(username):
    pass
```

---

### Wrong parameter type

If Flask expects an integer:

```python
<int:book_id>
```

and the URL contains text:

```text
/book/hello
```

the route will not match.

Make sure the URL contains the correct type of value.