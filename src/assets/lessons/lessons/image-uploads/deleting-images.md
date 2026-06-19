# Deleting images when deleting books

When we delete a book, we should also clean up its associated image file to avoid leaving orphaned files on the server.

---

## Update the delete_book route

Modify your DELETE route to include image cleanup:

```python
@app.route('/api/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = Book.query.get(book_id)

    if not book:
        return error_response('Book not found', 404)

    # Delete image file if it exists
    if book.image_filename:
        path = os.path.join(app.config['UPLOAD_FOLDER'], book.image_filename)

        if os.path.exists(path):
            os.remove(path)

    db.session.delete(book)
    db.session.commit()

    return jsonify({'message': 'Book deleted'}), 200
```

---

## Understanding the cleanup code

### Check if image exists

```python
if book.image_filename:
```

We only attempt deletion if the book actually has an image stored in the database.

---

### Build full file path

```python
path = os.path.join(app.config['UPLOAD_FOLDER'], book.image_filename)
```

This converts the filename into a real filesystem path.

Example:
```
uploads/book1.jpg
```

---

### Safe file deletion

```python
if os.path.exists(path):
    os.remove(path)
```

- `os.path.exists()` → checks if file exists
- `os.remove()` → deletes the file

👉 This prevents crashes if the file was manually deleted or missing.

---

## Important behavior

### If image exists:
- file is deleted from disk
- book is deleted from database

### If image does NOT exist:
- only database deletion happens
- no error occurs

---

## Why this is important

Without this cleanup:

- deleted books leave behind image files
- `/uploads` folder grows over time
- disk space is wasted
- orphaned files accumulate

---

## Think-first exercise

What happens if `image_filename` is set in the database but the file is missing on disk?

<details>
<summary>Solution</summary>

Nothing breaks.

Because:

```python
if os.path.exists(path):
    os.remove(path)
```

If the file does not exist:
- `os.path.exists(path)` returns `False`
- `os.remove()` is never executed
- book is still deleted normally

</details>

---

## Optional: safer production version

If you want safer logging (recommended in real apps):

```python
if book.image_filename:
    path = os.path.join(app.config['UPLOAD_FOLDER'], book.image_filename)

    try:
        if os.path.exists(path):
            os.remove(path)
    except Exception as e:
        print(f"Failed to delete image: {e}")
```

This ensures the API never crashes because of file system issues.

---

## Best practices

- Always delete related files when deleting database records
- Always check file existence before deletion
- Never allow file system errors to block database operations
- Consider logging file deletion failures
- Keep uploads folder clean to avoid storage waste

---

## Conclusion

You now have full lifecycle image handling:

- Upload images
- Update images safely
- Replace old images
- Delete images when books are removed

Key takeaway:

Database deletion and file system cleanup must always stay in sync.

---

## Troubleshooting

### Image file is not deleted

Check:
- `image_filename` is not None
- correct upload folder path
- code is inside DELETE route

---

### Permission error when deleting

Possible causes:
- file is locked
- missing write permissions
- OS restrictions

Fix folder permissions for your project directory.

---

### Book deletes but file remains

This means:
- cleanup code is missing or not executed
- or path is incorrect

Add a print debug:

```python
print(path)
```