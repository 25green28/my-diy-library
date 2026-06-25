# Serving images via a new route

Now that we can upload images, we need a way to serve them back to the client. We'll create a new route that returns the image file.

---

## Create the image serving route

Add this new route to your app (bellow the delete route):

```python
@app.route('/api/books/<int:book_id>/image', methods=['GET'])
def get_book_image(book_id):
    book = Book.query.get(book_id)

    # Check if book exists and has an image
    if not book or not book.image_filename:
        return error_response('Image not found', 404)

    # Serve the image file from the upload folder
    return send_from_directory(
        app.config['UPLOAD_FOLDER'],
        book.image_filename
    )
```

---

## Understanding the route

### Route pattern

```python
@app.route('/api/books/<int:book_id>/image', methods=['GET'])
```

- `/api/books/<int:book_id>/image` → URL like `/api/books/1/image`
- `<int:book_id>` → captures the book ID as an integer
- `methods=['GET']` → only responds to GET requests

---

### Error handling

```python
if not book or not book.image_filename:
    return error_response('Image not found', 404)
```

Returns 404 if:
- The book doesn't exist
- The book exists but has no image

---

### Serving the file

```python
return send_from_directory(
    app.config['UPLOAD_FOLDER'],
    book.image_filename
)
```

- `send_from_directory()` → Flask function that safely serves files from a folder
- First argument → upload directory
- Second argument → filename stored in the database

This works with **any image format automatically**, such as:
- `.jpg`
- `.jpeg`
- `.png`
- `.webp`
- `.gif`
- `.bmp`

Flask does NOT require or assume a specific format — it simply serves the file as it exists.

---

## How it works together

1. Client requests `/api/books/1/image`
2. Flask extracts `book_id = 1`
3. Database lookup retrieves the book
4. `image_filename` is read from the database
5. Flask serves the file from the upload folder
6. Browser automatically renders the image based on its type

---

## Using the image URL

Your `book_to_dict()` function generates:

```python
'image_url': f"/api/books/{book.id}/image" if book.image_filename else None
```

Example response:

```json
{
  "id": 1,
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "published_year": 1949,
  "image_url": "/api/books/1/image"
}
```

Frontend usage:

```html
<img src="/api/books/1/image" alt="Book cover">
```

---

## Exercise

Suppose that we have books with indexes from 1 to 100 in a database, what happens if someone requests:

```
/api/books/999/image
```

<details>
<summary>Solution</summary>

The API returns 404 because:

- Book does not exist OR
- No image is stored for that book

```python
if not book or not book.image_filename:
    return error_response('Image not found', 404)
```

</details>

---

## Best practices

- Always validate the book exists before serving files
- Store only filenames in the database
- Do NOT restrict image format here (jpg/png/webp/etc. are all valid)
- Ensure upload validation happens during upload, not serving
- Keep uploads folder outside static/ for safety

---

## Conclusion

You now know how to serve uploaded images correctly.

Key takeaways:

- Create a dedicated image route per book
- Retrieve filename from database
- Use `send_from_directory()` for safe file serving
- Works with ALL common image formats automatically
- Frontend can use the returned URL directly in `<img>` tags

Next, we'll learn how to update images using PUT requests.

---

## Troubleshooting

### Image not found even though file exists
- Check database field `image_filename`
- Ensure file exists in uploads folder
- Verify correct book ID

---

### Image does not display in browser
- Check URL correctness
- Ensure file extension matches real file type
- Confirm file is not corrupted

---

### Import error: send_from_directory
Make sure you have:

```python
from flask import Flask, request, jsonify, send_from_directory
```