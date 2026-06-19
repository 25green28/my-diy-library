# Updating images in PUT requests

Just as we can upload images when creating books, we should also allow users to update or replace images when editing books.

---

## Update the update_book route

Modify your PUT route to handle image updates:

```python
@app.route('/api/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    book = Book.query.get(book_id)

    if not book:
        return error_response('Book not found', 404)

    title = request.form.get('title')
    author = request.form.get('author')
    genre = request.form.get('genre')
    published_year = request.form.get('published_year')
    image = request.files.get('image')

    if title:
        book.title = title

    if author:
        book.author = author

    if genre:
        book.genre = genre

    if published_year:
        try:
            book.published_year = int(published_year)
        except:
            return error_response('Published year must be a number', 400)

    if image:
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        book.image_filename = filename

    db.session.commit()

    return jsonify(book_to_dict(book)), 200
```

---

## Key changes explained

### Getting the updated image

```python
image = request.files.get('image')
```

We retrieve the uploaded file from the request (same as POST route).  
If no file is sent, `image` will be `None`.

---

### Updating the image only if provided

```python
if image:
    filename = secure_filename(image.filename)
    image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    book.image_filename = filename
```

- Runs only if a new image is sent
- Saves the new file into the uploads folder
- Updates the database with the new filename
- Existing image remains unchanged if no new image is provided

---

## Important: Old file cleanup (optional improvement)

Right now, old images are NOT deleted automatically.

That means replacing images will leave old files on disk.

### Optional improvement (recommended in real projects):

```python
if image:
    # Delete old image if it exists
    if book.image_filename:
        old_path = os.path.join(app.config['UPLOAD_FOLDER'], book.image_filename)
        if os.path.exists(old_path):
            os.remove(old_path)

    # Save new image
    filename = secure_filename(image.filename)
    image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    book.image_filename = filename
```

This prevents unused files from accumulating.

---

## Important behavior (VERY IMPORTANT)

### What if only an image is sent?

If a user sends:

- only an image
- no title / author / genre

Nothing breaks

Because each field is updated only if it exists:

```python
if title:
    book.title = title
```

So:

- missing fields → ignored
- existing fields → unchanged

---

## Testing with Postman

1. Method: `PUT`
2. URL: `http://localhost:5000/api/books/1`
3. Body → `form-data`
4. Add fields:
    - title (optional)
    - author (optional)
    - genre (optional)
    - published_year (optional)
    - image (type: File)

Then click **Send**

---

## Think-first exercise

What happens if a user sends only an image in a PUT request?

<details>
<summary>Solution</summary>

Only the image will be updated.

All other fields remain unchanged because updates are conditional:

```python
if title:
    book.title = title
```

So missing fields are ignored, not overwritten.

</details>

---

## Best practices

- Always make image updates optional
- Use `secure_filename()` for safety
- Consider deleting old images to avoid storage buildup
- Never overwrite fields unless explicitly provided
- Keep POST and PUT image handling consistent

---

## Conclusion

You now know how to handle image updates in PUT requests.

Key takeaways:

- Use `request.files` for image uploads
- Update image only if provided
- Preserve existing data when fields are missing
- Optionally delete old images to save space
- Keep upload logic consistent with POST route

Next, we'll learn how to properly handle image deletion when removing books.

---

## Troubleshooting

### Image is not updating
- Ensure you are using `PUT`, not `POST`
- Check form-data includes file field named `image`
- Verify book ID is correct

---

### Old images remain on disk
This is expected unless you add cleanup logic.

Use the optional deletion snippet if needed.

---

### Error when no image is sent
Make sure image handling is wrapped in:

```python
if image:
```

This ensures empty requests don't crash the API.