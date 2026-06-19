# Using Postman

Postman is a popular tool for testing APIs. Instead of using terminal commands, Postman provides a graphical interface that makes it easy to send requests and inspect responses.

In this lesson, you'll use Postman to test the API endpoints you've created throughout the project.

## Installing Postman

1. Visit https://www.postman.com/downloads/
2. Download the version for your operating system
3. Install and launch Postman

You do not need to create an account to test APIs locally, although creating one allows you to save collections online.

---

## Creating your first request

1. Open Postman.
2. Click **New** → **HTTP Request**.
3. Enter the URL:

```text
http://127.0.0.1:5000/api/books
```

4. Choose an HTTP method from the dropdown:

- GET
- POST
- PUT
- DELETE

5. Click **Send**.

---

## Testing the GET endpoint

Let's test the endpoint that returns all books.

### Request

Method:

```text
GET
```

URL:

```text
http://127.0.0.1:5000/api/books
```

Click **Send**.

### Expected response

If books exist in your database, you'll see something similar to:

```json
[
    {
        "id": 1,
        "title": "1984",
        "author": "George Orwell",
        "genre": "Dystopian",
        "published_year": 1949
    }
]
```

If no books exist yet, you'll receive:

```json
[]
```

---

## Testing the POST endpoint

Now let's create a new book.

### Request

Method:

```text
POST
```

URL:

```text
http://127.0.0.1:5000/api/books
```

### Body

1. Click the **Body** tab.
2. Select **raw**.
3. Select **JSON** from the dropdown.

Paste:

```json
{
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "published_year": 1949
}
```

Click **Send**.

### Expected response

```json
{
    "id": 1,
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "published_year": 1949
}
```

Status code:

```text
201 Created
```

---

## Testing the GET single book endpoint

Let's retrieve a specific book.

### Request

Method:

```text
GET
```

URL:

```text
http://127.0.0.1:5000/api/books/1
```

Click **Send**.

### Expected response

```json
{
    "id": 1,
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "published_year": 1949
}
```

---

## Testing the PUT endpoint

Let's update an existing book.

### Request

Method:

```text
PUT
```

URL:

```text
http://127.0.0.1:5000/api/books/1
```

### Body

```json
{
    "genre": "Science Fiction"
}
```

Click **Send**.

### Expected response

```json
{
    "id": 1,
    "title": "1984",
    "author": "George Orwell",
    "genre": "Science Fiction",
    "published_year": 1949
}
```

---

## Testing the DELETE endpoint

Let's delete a book.

### Request

Method:

```text
DELETE
```

URL:

```text
http://127.0.0.1:5000/api/books/1
```

Click **Send**.

### Expected response

```json
{
    "message": "Book deleted successfully"
}
```

---

## Saving requests

You can save requests so you don't have to recreate them.

1. Click **Save**.
2. Enter a name such as:

```text
Get All Books
```

3. Create a collection called:

```text
My DIY Library API
```

4. Save the request.

Repeat this process for each endpoint.

---

## Using variables

As your API grows, typing the same URL repeatedly becomes annoying.

Create a variable:

| Variable | Value |
|-----------|---------|
| base_url | http://127.0.0.1:5000 |

Then use:

```text
{{base_url}}/api/books
```

instead of:

```text
http://127.0.0.1:5000/api/books
```

If the server URL changes later, you'll only update it in one place.

---

## Try it yourself

Create a request that retrieves a single book.

Fill in the missing URL:

```text
http://127.0.0.1:5000/?
```

The request should retrieve the book with ID 5.

<details>
<summary>Solution</summary>

```text
http://127.0.0.1:5000/api/books/5
```

</details>

---

## Conclusion

In this lesson you learned:

- What Postman is and why developers use it
- How to create and send HTTP requests
- How to test GET, POST, PUT and DELETE endpoints
- How to send JSON data in request bodies
- How to inspect API responses and status codes
- How to save requests in collections
- How to use variables to simplify testing

In the next lesson, we'll finish our API and prepare it for real-world usage.

---

## Troubleshooting

### I get:

```text
Could not send request
```

Make sure your Flask application is running.

You should see something similar to:

```text
Running on http://127.0.0.1:5000
```

in your terminal.

---

### I get:

```text
404 Not Found
```

Check that:

- The route exists in your Flask application
- The URL is typed correctly
- The server has been restarted after code changes

---

### I get:

```text
405 Method Not Allowed
```

You're using the wrong HTTP method.

For example:

```text
GET /api/books
```

works, but

```text
POST /api/books/1
```

may not.

Check the route definition in your code.

---

### I get:

```text
400 Bad Request
```

Your JSON data is invalid or missing required fields.

Make sure the JSON is properly formatted:

```json
{
    "title": "1984",
    "author": "George Orwell"
}
```

---

### My request never finishes

Make sure:

- Flask is running
- The URL is correct
- No firewall is blocking localhost connections

Also verify that you're using:

```text
http://127.0.0.1:5000
```

and not a different port.