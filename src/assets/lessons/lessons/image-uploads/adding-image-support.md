# Adding image support to the Book model

To support image uploads for books, we need to add a new field to our Book model that will store the filename of the uploaded image.

---

## Update the Book model

Open your existing `Book` model.

Currently it should look similar to:

```python
# Book model
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(50))
    published_year = db.Column(db.Integer)

    # Return a readable output
    def __repr__(self):
        return f'<Book {self.title}>'
```

Add the following line after the `published_year` column:

```python
image_filename = db.Column(db.String(200))
```

Your updated model should now look like:

```python
# Book model
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(50))
    published_year = db.Column(db.Integer)
    image_filename = db.Column(db.String(200))

    # Return a readable output
    def __repr__(self):
        return f'<Book {self.title}>'
```

---

## Understanding the change

* `image_filename` → stores the filename of the uploaded image (e.g., `"book-cover.jpg"`)
* `db.String(200)` → allows for long filenames
* No `nullable=False` → images are optional for books

---

## Why store the filename instead of the image?

We don't store the actual image data in the database because:

* Images can be large and would make the database file much bigger
* It's more efficient to store files on the filesystem
* The database only needs to remember which image belongs to which book
* This approach is commonly used in real-world applications

---

## Update the helper function

Open your existing `book_to_dict()` function.

Add the following line inside the returned dictionary (after `published_year`):

```python
'image_url': f"/api/books/{book.id}/image" if book.image_filename else None
```

Your updated helper function should look like:

```python
# Helper function to convert book into JSON
def book_to_dict(book):
    return {
        'id': book.id,
        'title': book.title,
        'author': book.author,
        'genre': book.genre,
        'published_year': book.published_year,
        'image_url': f"/api/books/{book.id}/image" if book.image_filename else None
    }
```

This generates a URL like:

```text
/api/books/1/image
```

that can later be used to fetch the image.

---

## Configure the upload folder

Before creating the upload folder, add:

```python
import os
```

at the top of your file with the other imports.

---

Now open the configuration section of your `app.py`.

Find:

```python
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
```

Directly below it add:

```python
# Configuration for file uploads
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
```

Your configuration section should now look like:

```python
# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///library.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configuration for file uploads
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
```

This creates an `uploads` directory where image files will be stored.

The `exist_ok=True` argument prevents errors if the folder already exists.

---

## Think-first exercise

Before looking at the solution, try to answer:

If you wanted to add a field to store a PDF file for books, how would you name it and what type would you use?

Try writing it yourself first.

<details>
<summary>Solution</summary>

```python
pdf_filename = db.Column(db.String(200))
```

Or if you want to store the file path:

```python
pdf_path = db.Column(db.String(300))
```

</details>

---

## Best practices

* Use descriptive field names (e.g., `image_filename` instead of `img`)
* Make image fields optional unless required by your use case
* Store filenames, not full paths, in the database
* Keep uploaded files in a dedicated folder
* Use helper functions to keep API responses consistent

---

## Conclusion

You now know how to add image support to your database model. The key points are:

* Add a string field to store the image filename
* Update helper functions to include image URLs
* Configure an upload folder for file storage
* Store references to files, not the files themselves
* Prepare your application for handling image uploads

In the next lesson, we'll learn how to handle the actual image uploads in POST requests.

---

## Troubleshooting

### I get an error about the column not existing

You may need to delete your `library.db` file and restart the app to recreate the database with the new column.

---

### I get:

```text
NameError: name 'os' is not defined
```

Make sure you added:

```python
import os
```

at the top of your file.

---

### The upload folder isn't created

Make sure you added:

```python
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
```

This ensures the folder exists before you try to save files.

---

### I don't see `image_url` in the API response

Make sure you updated your `book_to_dict()` function and added:

```python
'image_url': f"/api/books/{book.id}/image" if book.image_filename else None
```

inside the returned dictionary.
