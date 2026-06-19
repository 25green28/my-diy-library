# JSON

JSON (**J**ava**S**cript **O**bject **N**otation) is the format we'll use to send data between clients and our backend. It's a simple, readable way to structure data.

## What is JSON?

JSON is a text format for storing and transporting data. Despite the name, it's not specific to JavaScript (programming language used mainly for websites) - it works with all programming languages. JSON is popular because it's easy for humans to read and easy for computers to process.

## Why use JSON?

- **Readable**: It looks similar to the data structures you see in code
- **Universal**: Every programming language can work with JSON
- **Lightweight**: It doesn't have unnecessary overhead
- **Flexible**: It can represent complex data structures

## JSON structure

JSON uses key-value pairs, similar to a dictionary in Python. Keys are always in quotes, followed by a colon, then the value:

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "year": 1925
}
```

## JSON data types

JSON supports several types of data:
- **Strings**: Text in quotes, like `"Hello World"`
- **Numbers**: Like `42` or `3.14`
- **Booleans**: `true` or `false`
- **Arrays**: Lists in square brackets, like `[1, 2, 3]`
- **Objects**: Nested key-value pairs in curly braces
- **null**: Represents no value

## Example: A book in JSON

Here's how we'll represent a book in our Book Management Backend:

```json
{
  "id": 1,
  "title": "1984",
  "author": "George Orwell",
  "publication_year": 2022,
  "category": "dystopian"
}
```

## JSON in our API

When clients communicate with our backend:
- **POST requests**: Clients send JSON data to create new books
- **GET requests**: Our server sends JSON data back with book information
- **PUT requests**: Clients send JSON to update existing books

## Python and JSON

Python makes it easy to work with JSON. Python dictionaries can be converted to JSON strings, and JSON strings can be converted back to dictionaries. Flask handles this automatically with the `jsonify` function we'll use later.

## Conclusion

In this lesson, you learned:

- What JSON is and why it is used
- How JSON structures data using key-value pairs
- The most common JSON data types
- How JSON is used in our Book Management Backend API
- How Python works with JSON data


Congratulations! You now understand the basic terminology of backend development. In the next lesson, we will start building our Flask application.