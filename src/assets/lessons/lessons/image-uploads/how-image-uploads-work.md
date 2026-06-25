# How image uploads work

Now that you've implemented image uploads, it's useful to understand how all the pieces work together.

---

## The big picture

Image uploads involve several components:

1. **Database model** → stores the image filename
2. **Upload handling** → receives and saves the file
3. **File storage** → stores the image on disk
4. **Image route** → serves the image to clients
5. **Update logic** → replaces old images
6. **Delete logic** → removes unused images

Together, these components allow users to upload, view, update, and delete book covers.

---

## Uploading an image

When a user creates a book with an image:

```text
Client
  │
  ├─ POST /api/books
  │   (multipart/form-data)
  ▼
Flask application
  │
  ├─ Save image to uploads folder
  ├─ Store filename in database
  ▼
Database + Filesystem
```

Key points:

* Requests use `multipart/form-data`
* Text fields are accessed through `request.form`
* Uploaded files are accessed through `request.files`
* `secure_filename()` sanitizes filenames before saving
* The image is stored in the uploads folder

---

## Where is the image stored?

The image is stored in two places:

```text
Filesystem:
uploads/book-cover.jpg

Database:
Book.image_filename = "book-cover.jpg"
```

The actual image file lives on disk, while the database stores only its filename.

### Why store only the filename?

Keeping images out of the database has several advantages:

* Smaller database size
* Faster database queries
* Easier backups
* Better performance
* Easier migration to cloud storage later

This is the most common approach in web applications.

---

## Serving an image

When a client requests an image:

```text
Client
  │
  ├─ GET /api/books/1/image
  ▼
Flask application
  │
  ├─ Find book in database
  ├─ Read image filename
  ├─ Load image from uploads folder
  ▼
Image response
```

The image route connects the database record with the file stored on disk.

---

## Updating an image

When a user uploads a new image for an existing book:

```text
Client
  │
  ├─ PUT /api/books/1
  ▼
Flask application
  │
  ├─ Delete old image (if it exists)
  ├─ Save new image
  ├─ Update filename in database
  ▼
Database + Filesystem
```

Removing the old image prevents unused files from accumulating over time.

---

## Deleting a book

When a book is deleted:

```text
Client
  │
  ├─ DELETE /api/books/1
  ▼
Flask application
  │
  ├─ Delete image file
  ├─ Delete database record
  ▼
Cleanup complete
```

Without this cleanup step, image files would remain on disk even though their books no longer exist.

---

## Architecture overview

```text
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       ▼
┌────────────────────┐
│   Flask Backend    │
│                    │
│  Routes & Logic    │
└────────┬───────────┘
         │
         ├───────────────┐
         ▼               ▼
┌──────────────┐   ┌──────────────┐
│   Database   │   │   Uploads    │
│              │   │   Folder     │
│              │   │              │
│image_filename│   │ book.jpg     │
└──────────────┘   └──────────────┘
```

The database stores metadata, while the filesystem stores the actual image.

---

## Why use this architecture?

### Separation of responsibilities

Each component has a single job:

* Database → stores book information
* Filesystem → stores image files
* Flask routes → handle requests and responses

This keeps the application easier to maintain.

### Scalability

This approach works well as applications grow:

* Database remains fast
* Images can be moved to cloud storage
* Images can be served through a CDN
* Multiple servers can share the same storage

### Security

The upload system includes several protections:

```python
filename = secure_filename(image.filename)
```

This prevents dangerous filenames from being saved.

You can also add:

* File type validation
* File size limits
* Authentication and authorization

---

## Think before continuing

Suppose we stored the entire image inside the database instead of storing only the filename.

What advantages and disadvantages would that have?

<details>
<summary>Solution</summary>

### Store image data in the database

Advantages:

* Single storage system
* Simpler backups
* Database transactions guarantee consistency

Disadvantages:

* Much larger database
* Slower queries
* Larger backups
* Higher memory usage

### Store filenames in the database

Advantages:

* Smaller database
* Faster performance
* Easier scaling
* Industry-standard approach

Disadvantages:

* Two storage systems to manage
* Requires file cleanup when records are removed

For most applications, storing filenames is the better choice.

</details>

---

## Best practices

* Store filenames instead of image data
* Always use `secure_filename()`
* Validate file types
* Limit upload sizes
* Remove old files when updating images
* Remove files when deleting records
* Keep the database and filesystem synchronized

---

## Performance considerations

As applications grow, image handling can be improved by:

* Compressing images before saving
* Using modern formats such as WebP
* Serving files through nginx or Apache
* Using cloud storage (S3, Cloudflare R2, etc.)
* Using a CDN for faster delivery

---

## Conclusion

You now understand the complete image upload workflow:

1. Upload image using `multipart/form-data`
2. Save the image to the uploads folder
3. Store the filename in the database
4. Serve the image through a dedicated route
5. Replace old files during updates
6. Remove files when deleting books

This architecture is widely used in real-world web applications because it is simple, efficient, and scalable.

---

## Troubleshooting

### Image does not appear

Check:

* The image route exists
* The filename is stored in the database
* The file exists in the uploads folder

---

### Old images remain on disk

Make sure old files are removed when:

* Updating images
* Deleting books

---

### Upload folder keeps growing

This usually means old files are not being cleaned up properly.

Review your update and delete routes to ensure unused files are removed.
