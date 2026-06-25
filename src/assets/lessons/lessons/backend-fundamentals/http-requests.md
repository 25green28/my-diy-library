# HTTP requests

HTTP (**H**yper**t**ext **T**ransfer **P**rotocol) is the "language" that clients and servers use to communicate on the web. Every time you visit a website, your browser is making HTTP requests to servers.

---

## What are HTTP methods?

HTTP methods are like different types of requests you can make. Think of them as different actions you can perform. The most common methods are:

### GET - Retrieve data

GET requests ask the server to send data back. They don't change anything on the server - they just read information. For example:
- Get a list of all books
- Get details about a specific book

### POST - Create something new

POST requests send data to the server to create a new resource. They do change data on the server. For example:
- Add a new book to the library
- Create a new user account

### PUT - Update something

PUT requests update an existing resource with new data. For example:
- Update a book's title or author
- Change a book's publication year

### DELETE - Remove something

DELETE requests remove a resource from the server. For example:
- Delete a book from the library
- Remove a user account

---

## HTTP status codes

When a server responds to a request, it sends a status code to tell the client what happened. Common codes include:

- **200 OK**: The request worked perfectly
- **201 Created**: A new resource was successfully created
- **400 Bad Request**: The client sent something invalid
- **404 Not Found**: The requested resource doesn't exist
- **500 Internal Server Error**: Something went wrong on the server

----

## Anatomy of an HTTP request

Every HTTP request has several parts:
- **Method**: The type of request (GET, POST, PUT, DELETE)
- **URL**: The address of the resource
- **Headers**: Extra information about the request
- **Body**: The data being sent (for POST and PUT requests)

## In our My DIY Library

We'll use all these HTTP methods to create a complete API:
- GET to retrieve books
- POST to add new books
- PUT to update book information
- DELETE to remove books from the library

---

## Conclusion

In this lesson, you learned:

- What HTTP is and why it is used
- The most important HTTP methods (GET, POST, PUT, DELETE)
- What HTTP status codes mean
- The structure of an HTTP request
- How HTTP is used in our My DIY Library project

You now understand how clients and servers communicate on the web using HTTP. In the next lesson, we will see how we can return the data to clients using JSON.