# How image uploads work

Now that you've implemented image uploads, let's understand the complete architecture and how all the pieces fit together.

---

## The big picture

Image uploads involve multiple components working together:

1. **Database model** → stores the image filename
2. **Upload handling** → receives and saves the file
3. **File storage** → keeps the image on disk
4. **Serving route** → returns the image when requested
5. **Update handling** → replaces images when needed
6. **Cleanup** → removes files when books are deleted

---

## The complete flow

### 1. User uploads an image

```text
User → POST /api/books (multipart/form-data)
     → Flask receives form data + file
     → Image is saved to uploads folder
     → Filename is stored in database
```

**Key points:**
- Request uses `multipart/form-data`
- `request.form` → text fields (title, author, etc.)
- `request.files` → uploaded image
- `secure_filename()` → sanitizes filename
- File is saved to the upload folder

---

### 2. Image is stored

The image exists in two places:

```text
Filesystem: uploads/book-cover.jpg
Database:   Book.image_filename = "book-cover.jpg"
```

**Why this split?**

- **Filesystem** → stores actual image data efficiently
- **Database** → stores reference (filename only)

**Benefits:**
- Database stays small and fast
- Images can scale independently
- Easy to migrate to CDNs later
- Standard production architecture

---

### 3. Image is served

```text
User → GET /api/books/1/image
     → Flask looks up book
     → Reads filename from database
     → Loads file from uploads folder
     → Returns image to client
```

Example route:

```python
@app.route('/api/books/<int:book_id>/image')
def get_book_image(book_id):
    book = Book.query.get_or_404(book_id)

    if not book.image_filename:
        return error_response('Image not found', 404)

    return send_from_directory(
        app.config['UPLOAD_FOLDER'],
        book.image_filename
    )
```

---

### 4. Image is updated

```text
User → PUT /api/books/1 (multipart/form-data)
     → New image received
     → Old image deleted (if exists)
     → New image saved
     → Database updated
```

**Old file cleanup:**

```python
if book.image_filename:
    old_path = os.path.join(
        app.config['UPLOAD_FOLDER'],
        book.image_filename
    )

    if os.path.exists(old_path):
        os.remove(old_path)
```

---

### 5. Image is deleted

```text
User → DELETE /api/books/1
     → Book removed from database
     → Image file removed from disk
```

**Cleanup code:**

```python
if book.image_filename:
    image_path = os.path.join(
        app.config['UPLOAD_FOLDER'],
        book.image_filename
    )

    if os.path.exists(image_path):
        os.remove(image_path)
```

---

## Architecture diagram

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │ POST multipart/form-data
       ▼
┌────────────────────┐
│   Flask Backend    │
│                    │
│  Routes / Logic    │
└────────┬───────────┘
         │
         ├───────────────┐
         ▼               ▼
┌──────────────┐   ┌──────────────┐
│  Database    │   │  Uploads     │
│              │   │  Folder      │
│image_filename│   │ book.jpg     │
│ = "book.jpg" │   │              │
└──────────────┘   └──────────────┘
         │               │
         └───────┬───────┘
                 ▼
        GET /api/books/1/image
                 ▼
            Image response
```

---

## Why this architecture?

### Separation of concerns

- **Database** → metadata only
- **Filesystem** → binary data (images)
- **API layer** → request handling

---

### Scalability

- DB stays lightweight
- Images can move to CDNs easily
- Works across multiple servers
- Fast backups

---

### Security

- `secure_filename()` prevents path traversal
- Upload folder isolated from code
- File validation can be added
- Size limits can be enforced

---

## Think-first exercise

What if we stored the full image bytes inside the database instead of filenames?

<details>
<summary>Solution</summary>

**Database storage (BLOB approach)**

Pros:
- Single storage system
- Easier consistency
- Atomic transactions

Cons:
- Database grows very fast
- Slower queries
- Heavy backups
- Poor performance for large files

---

**Current approach (filesystem + filename)**

Pros:
- Fast database
- Efficient file serving
- Standard industry practice
- Easy to scale with CDNs

Cons:
- Two systems to manage
- Must handle file cleanup manually

👉 The filename approach is preferred in real-world systems.

</details>

---

## Best practices

- Store filenames, not file content
- Always sanitize filenames
- Use dedicated upload folder
- Clean up files on update/delete
- Validate file types and size
- Keep storage and DB in sync

---

## Security considerations

### Path traversal

Without protection:

```text
../../../etc/passwd
```

Fix:

```python
filename = secure_filename(image.filename)
```

---

### File type validation

```python
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
```

---

### File size limit

```python
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB
```

---

## Performance tips

- Use CDN in production
- Compress images before saving
- Serve static files via nginx/Apache
- Cache image responses
- Consider object storage (S3, R2)

---

## Conclusion

You now understand the full image upload lifecycle:

### Flow:
1. Upload image via multipart request
2. Save file to uploads folder
3. Store filename in database
4. Serve via API route
5. Update replaces old file
6. Delete removes file

---

## Key principles

- Database stores references, not files
- Filesystem stores image data
- Always sanitize inputs
- Clean up unused files
- Design for scalability

---

## Troubleshooting

### Images not showing
- Check file path
- Check filename match
- Check route logic

---

### Orphan files exist
- Missing delete logic
- Missing update cleanup

---

### Upload folder growing too large
- Old files not being removed
- Missing cleanup step

---

## Further learning

- AWS S3 / Cloud storage
- Image optimization (WebP, AVIF)
- CDN integration
- Background uploads
- Image resizing pipelines