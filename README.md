# 📚 My DIY Library

A beginner-friendly full-stack learning project that teaches how to build a Python REST API step-by-step and connect it to a modern frontend.

It focuses on learning by building: from basic Flask concepts to a fully working backend with database integration and image uploads.

🌍 Languages:

- 🇺🇸 English (current)
- 🇵🇱 [Polski](README.pl.md)
- 🇮🇹 [Italiano](README.it.md)

---

## 🚀 Features

- Full CRUD API for managing books
- RESTful architecture (GET, POST, PUT, DELETE)
- SQLite database integration
- Image upload support
- Book search functionality
- Pre-built React frontend included
- Beginner-friendly step-by-step learning structure

---

## 🧠 What you'll learn

- Backend fundamentals with Flask
- REST API design principles
- Working with databases (SQLAlchemy + SQLite)
- Handling HTTP methods and status codes
- Route & query parameters
- File uploads and image handling
- Testing APIs using tools like Postman

---

## 🛠️ Tech Stack

### Backend
- Python
- Flask
- SQLAlchemy
- SQLite

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide Icons

---

## ⚙️ Installation

### Beginner setup (recommended)

1. Make sure you have Node.js installed:
```bash
node -v
```

If not download it from https://nodejs.org, recommended version is 24 LTS.

2. Download ZIP from GitHub
3. Extract the project
4. Open terminal in project folder
5. Install dependencies:

```bash
npm install
```

6. Run frontend:

```bash
npm run dev
```

7. Open:

```text
http://localhost:5173
```

8. Click on `Learning`

---

### Advanced setup

```bash
git clone https://github.com/25green28/my-diy-library.git
cd my-diy-library
npm install
npm run dev
```

---

## 🔌 API Endpoints

| Method | Endpoint                          | Description              |
| ------ | --------------------------------- | ------------------------ |
| GET    | /api/books                        | Get all books           |
| GET    | /api/books/<id>                   | Get single book         |
| GET    | /api/books/search?q=...           | Search books            |
| POST   | /api/books                        | Create book             |
| PUT    | /api/books/<id>                   | Update book             |
| DELETE | /api/books/<id>                   | Delete book             |
| GET    | /api/books/<id>/image             | Get book image          |

---

## 📦 Example Book Object

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

---

## 🖼️ Image Uploads

Book covers are stored in the `/uploads` folder.

Only filenames are stored in the database for performance and scalability.

Images are served via:

```
GET /api/books/<id>/image
```

---

## 🔍 Search Feature

You can search books using:

```
/api/books/search?q=keyword
```

Search works on:

- title
- author

---

## 📈 Future Improvements

* Authentication system (JWT)
* Pagination
* Advanced filtering
* Cloud storage for images
* Deployment (Render / Railway / Vercel)

---

## 📄 License

This project is for educational purposes.