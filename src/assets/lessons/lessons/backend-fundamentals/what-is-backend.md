# What is a backend?

When you use a website or app, you're seeing the "frontend" - the buttons, text, and images you interact with. But there's another part you don't see: the "backend." The backend is the behind-the-scenes system that makes everything work.

## What does a backend do?

Think of a restaurant: the frontend is the dining room where you order food, but the backend is the kitchen where the food is actually prepared. In web applications, the backend:

- Stores and retrieves data (like books in our library)
- Processes user requests (like adding a new book)
- Handles business logic (like checking if a book already exists)
- Communicates with databases
- Sends responses back to the user

## Frontend vs Backend

The **frontend** is what users see and interact with - the visual interface. The **backend** is the invisible system that processes data and makes decisions.

In our **My DIY Library** project:

- A frontend could be a website showing books (that is already made for you)
- The backend is the system that stores, updates, and deletes those books

## How they communicate

The frontend and backend talk to each other through HTTP requests. When you click a button to add a book, the frontend sends a request to the backend. The backend processes that request, saves the book to the database, and sends a response back saying "success!"

## Why are we building a backend?

In this project, we're building a backend API (Application Programming Interface). An API is a set of rules that allows different programs to talk to each other.

Our API will let any application (a website, mobile app, or another service) manage books in our **My DIY Library** system.

---

## Conclusion

In this lesson, you learned:

- What a backend is
- How it differs from the frontend
- How frontend and backend communicate
- Why APIs exist
- How our project fits into this structure