# Handling image uploads in POST requests

Now that we have image support in our model, we need to handle image uploads when creating books via POST requests.

---

## Understanding multipart/form-data

In previous lessons, we used JSON requests:

```python
data = request.get_json()
```

This works well for text data, but it cannot upload files.

When uploading images, we must use:

```text
multipart/form-data
```

This format allows sending:

* Text fields (title, author, genre, etc.)
* Files (images)

in the same request.

---

## Update the create_book route

Open your existing `create_book()` route.

It currently looks similar to:

```python
@app.route('/api/books', methods=['POST'])
def create_book():
    data = request.get_json()

    # validation...

    new_book = Book(
        title=data['title'],
        author=data['author'],
        genre=data.get('genre'),
        published_year=data.get('published_year')
    )
```

We need to replace the JSON-based approach with form and file handling.

---

### Step 1: Replace `request.get_json()`

Find:

```python
data = request.get_json()
```

Remove it completely.

Replace it with:

```python
title = request.form.get('title')
author = request.form.get('author')
genre = request.form.get('genre')
published_year = request.form.get('published_year')

image = request.files.get('image')
```

Now:

* `request.form` handles text fields
* `request.files` handles uploaded files

---

### Step 2: Update validation

Replace your old validation:

```python
if not data:
    return error_response('No data provided', 400)

if 'title' not in data or 'author' not in data:
    return error_response('Title and author are required', 400)
```

with:

```python
if not title or not author:
    return error_response(
        'Title and author are required',
        400
    )
```

---

### Step 3: Save the uploaded image

Before creating the book, add:

```python
filename = None

if image:
    filename = secure_filename(image.filename)

    image.save(
        os.path.join(
            app.config['UPLOAD_FOLDER'],
            filename
        )
    )
```

This code:

1. Gets the uploaded file
2. Creates a safe filename
3. Saves the image inside the uploads folder

---

### Step 4: Update the Book creation

Find:

```python
new_book = Book(
    title=data['title'],
    author=data['author'],
    genre=data.get('genre'),
    published_year=data.get('published_year')
)
```

Replace it with:

```python
new_book = Book(
    title=title,
    author=author,
    genre=genre,
    published_year=published_year,
    image_filename=filename
)
```

Notice the new field:

```python
image_filename=filename
```

This stores the uploaded image name inside the database.

---

### Step 5: Convert the year to a number

Before creating the book, add:

```python
if published_year:
    try:
        published_year = int(published_year)

    except ValueError:
        return error_response(
            'Published year must be a number',
            400
        )
```

This ensures the year is stored as an integer.

---

## Your finished route

After all modifications, your route should look like:

```python
@app.route('/api/books', methods=['POST'])
def create_book():

    title = request.form.get('title')
    author = request.form.get('author')
    genre = request.form.get('genre')
    published_year = request.form.get('published_year')

    image = request.files.get('image')

    if not title or not author:
        return error_response(
            'Title and author are required',
            400
        )

    filename = None

    if image:
        filename = secure_filename(image.filename)

        image.save(
            os.path.join(
                app.config['UPLOAD_FOLDER'],
                filename
            )
        )

    if published_year:
        try:
            published_year = int(published_year)

        except ValueError:
            return error_response(
                'Published year must be a number',
                400
            )

    new_book = Book(
        title=title,
        author=author,
        genre=genre,
        published_year=published_year,
        image_filename=filename
    )

    db.session.add(new_book)
    db.session.commit()

    return jsonify(
        book_to_dict(new_book)
    ), 201
```

---

## Key changes explained

### Using `request.form`

```python
title = request.form.get('title')
```

Reads text fields from a multipart request.

---

### Using `request.files`

```python
image = request.files.get('image')
```

Reads the uploaded file.

---

### Securing the filename

```python
filename = secure_filename(
    image.filename
)
```

This removes dangerous characters from filenames.

Example:

```text
../../../secret.txt
```

becomes a safe filename.

---

### Saving the file

```python
image.save(
    os.path.join(
        app.config['UPLOAD_FOLDER'],
        filename
    )
)
```

Stores the image inside your uploads folder.

---

## Testing with Postman

To test image uploads:

1. Create a new POST request
2. Use:

```text
http://127.0.0.1:5000/api/books
```

3. Open the **Body** tab
4. Select **form-data**
5. Add:

| Key            | Type | Value        |
| -------------- | ---- | ------------ |
| title          | Text | Harry Potter |
| author         | Text | J.K. Rowling |
| genre          | Text | Fantasy      |
| published_year | Text | 1997         |
| image          | File | Select image |

6. Click **Send**

The image should be saved inside the uploads folder.

---

## Think-first exercise

Before looking at the solution, try to answer:

What would happen if a user uploads a file named:

```text
../../etc/passwd
```

Why do we need `secure_filename()`?

Try answering before opening the solution.

<details>
<summary>Solution</summary>

Without `secure_filename()`, a malicious user could try to save files outside the uploads folder.

This is called a path traversal attack.

`secure_filename()` removes dangerous characters and converts the filename into a safe version before saving it.

</details>

---

## Best practices

* Always use `secure_filename()`
* Validate uploaded file types
* Limit upload size
* Make image uploads optional unless required
* Store only filenames in the database
* Keep uploaded files inside a dedicated folder

---

## Conclusion

In this lesson you learned:

* Why JSON cannot be used for file uploads
* What `multipart/form-data` is
* How to replace `request.get_json()` with `request.form`
* How to access uploaded files using `request.files`
* How to save images inside the uploads folder
* Why `secure_filename()` is important
* How to store image filenames in the database

In the next lesson, we'll create a new route that allows users to view uploaded images.

---

## Troubleshooting

### I get:

```text
NameError: name 'secure_filename' is not defined
```

Make sure you added:

```python
from werkzeug.utils import secure_filename
```

to your imports.

---

### I get:

```text
NameError: name 'os' is not defined
```

Make sure you imported:

```python
import os
```

at the top of your file.

---

### I get "400 Bad Request"

Make sure Postman is using:

```text
form-data
```

and not:

```text
raw
```

or

```text
JSON
```

---

### The image isn't being saved

Check that:

* The uploads folder exists
* The app has permission to write files
* The image field is set to **File** in Postman
* The uploaded file is not empty

---

### The book is created but the image is missing

Check that:

```python
image_filename=filename
```

was added when creating the `Book` object.

Without this line, the filename will never be stored in the database.
