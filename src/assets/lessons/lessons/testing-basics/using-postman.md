# Introduction to Postman

Postman is a tool for testing APIs.

Instead of using a browser or terminal commands, Postman provides a graphical interface where you can send HTTP requests and inspect responses.

Throughout this course, you'll use Postman to test the endpoints you build.

---

## Installing Postman

1. Visit:

```text
https://www.postman.com/downloads/
```

2. Download the version for your operating system.
3. Install and launch Postman.

Creating an account is optional.

---

## What can Postman do?

Postman allows you to:

* Send HTTP requests
* View responses
* Inspect status codes
* Send JSON data
* Test APIs without writing frontend code

For example:

```text
GET    /books
POST   /books
PUT    /books/1
DELETE /books/1
```

All of these requests can be tested directly from Postman.

---

## Your first request

Before testing your own Flask application that you'll write in the future lessons, let's use a public API.

Create a new request:

1. Click **New → HTTP Request**
2. Select **GET**
3. Enter:

```text
https://jsonplaceholder.typicode.com/posts/1
```

4. Click **Send**

You should receive a response similar to:

```json
{
  "userId": 1,
  "id": 1,
  "title": "...",
  "body": "..."
}
```

Congratulations — you've made your first API request.

---

## Understanding the interface

Every request contains:

### HTTP Method

Examples:

```text
GET
POST
PUT
DELETE
```

The method describes what action you want to perform.

### URL

The address of the API endpoint:

```text
https://jsonplaceholder.typicode.com/posts/1
```

### Response

After clicking **Send**, Postman shows:

* Response body
* Status code
* Headers

---

## Understanding status codes

Common status codes include:

```text
200 OK
```

Request succeeded.

```text
201 Created
```

Resource created successfully.

```text
404 Not Found
```

Requested resource does not exist.

```text
500 Internal Server Error
```

Something went wrong on the server.

---

## Collections

As your project grows, you'll create many requests.

Postman allows you to organize them into collections.

Example:

```text
My DIY Library API
```

Inside the collection you can save:

```text
Get All Books
Get Book
Create Book
Update Book
Delete Book
```

---

## Variables

Instead of repeatedly typing:

```text
http://127.0.0.1:5000
```

you can create a variable:

| Variable | Value                 |
| -------- | --------------------- |
| base_url | http://127.0.0.1:5000 |

Then use:

```text
{{base_url}}/api/books
```

This makes requests easier to maintain.

---

## Try it yourself

Send a GET request to:

```text
https://jsonplaceholder.typicode.com/users/1
```

Before clicking Send, try to predict:

* Which method should be used?
* Will the response be JSON or plain text?

<details>
<summary>Solution</summary>

Method:

```text
GET
```

Response:

```text
JSON
```

</details>

---

## Conclusion

In this lesson you learned:

* What Postman is
* Why developers use it
* How to create requests
* How to inspect responses
* What status codes mean
* How collections and variables work

You'll use Postman throughout the rest of the course to test the API endpoints you build.

---

## Troubleshooting

### Could not send request

Check your internet connection and verify the URL.

---

### SSL or certificate errors

Make sure the URL starts with:

```text
https://
```

when required by the API.

---

### Response is different from the lesson

Public APIs can change over time.

Focus on understanding the request and response structure rather than matching every field exactly.
