# Deleting images when deleting books

When we delete a book, we should also clean up its associated image file to avoid leaving orphaned files on the server.

> **Important**: Only delete the image if no other books are using it. This prevents accidentally deleting an image that's shared by multiple books.

---

## Update the delete_book route

Modify your DELETE route to include image cleanup with reference counting (the `delete_book` function):

```python
@app.route('/api/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = Book.query.get(book_id)

    # If the book doesn't exist, return a 404 error
    if not book:
        return error_response('Book not found', 404)

    # Delete image file if it exists and no other books use it
    if book.image_filename:
        # Check if any other books use the same image
        other_books_with_image = Book.query.filter(
            Book.id != book_id,
            Book.image_filename == book.image_filename
        ).count()

        # Only delete if this is the only book using this image
        if other_books_with_image == 0:
            path = os.path.join(app.config['UPLOAD_FOLDER'], book.image_filename)

            if os.path.exists(path):
                os.remove(path)

    try:
        db.session.delete(book)
        db.session.commit()

        return jsonify({
            'message': 'Book deleted successfully'
        }), 200

    except Exception:
        db.session.rollback()

        return error_response(
            'Internal server error',
            500
        )
```

---

## Understanding the cleanup code

### Check if image exists

```python
if book.image_filename:
```

We only attempt deletion if the book actually has an image stored in the database.

---

### Check for shared image usage

```python
other_books_with_image = Book.query.filter(
    Book.id != book_id,
    Book.image_filename == book.image_filename
).count()
```

This counts how many other books (excluding the one being deleted) use the same image filename.

- `Book.id != book_id` → excludes the current book from the count
- `Book.image_filename == book.image_filename` → finds books with the same image

---

### Conditional deletion

```python
if other_books_with_image == 0:
    path = os.path.join(app.config['UPLOAD_FOLDER'], book.image_filename)

    if os.path.exists(path):
        os.remove(path)
```

The image is only deleted if:
- No other books reference it (`count == 0`)
- The file actually exists on disk

---

## Important behavior

### If image is unique to this book:
- file is deleted from disk
- book is deleted from database

### If image is shared by other books:
- file is NOT deleted (other books still need it)
- book is deleted from database
- image remains available for other books

### If image does NOT exist:
- only database deletion happens
- no error occurs

---

## Why this is important

Without reference counting:

- deleting one book could break other books that share the same image
- users would see broken images for remaining books
- data integrity is compromised

Without any cleanup:

- deleted books leave behind image files
- `/uploads` folder grows over time
- disk space is wasted
- orphaned files accumulate

---

## Exercise

What happens if two books share the same image and you delete one of them?

<details>
<summary>Solution</summary>

The image file is NOT deleted.

Because:

```python
other_books_with_image = Book.query.filter(
    Book.id != book_id,
    Book.image_filename == book.image_filename
).count()

if other_books_with_image == 0:
    # delete the image
```

When you delete the first book:
- `other_books_with_image` returns `1` (the second book still uses it)
- The condition `other_books_with_image == 0` is `False`
- The image file is NOT deleted
- The second book still has access to the image

When you delete the second book:
- `other_books_with_image` returns `0` (no other books use it)
- The condition `other_books_with_image == 0` is `True`
- The image file IS deleted

</details>

---

## Optional: safer production version

If you want safer logging (recommended in real apps):

```python
if book.image_filename:
    # Check if any other books use the same image
    other_books_with_image = Book.query.filter(
        Book.id != book_id,
        Book.image_filename == book.image_filename
    ).count()

    # Only delete if this is the only book using this image
    if other_books_with_image == 0:
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