from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///library.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


# =========================
# Book Model (UPDATED SCHEMA)
# =========================
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(50))
    published_year = db.Column(db.Integer)


# =========================
# Helper functions
# =========================
def book_to_dict(book):
    return {
        'id': book.id,
        'title': book.title,
        'author': book.author,
        'genre': book.genre,
        'published_year': book.published_year
    }


def error_response(message, status_code):
    return jsonify({
        'error': message,
        'status': status_code
    }), status_code


# =========================
# Routes
# =========================
@app.route('/')
def home():
    return jsonify({
        'message': 'Welcome to the Book Management API',
        'endpoints': {
            'GET /api/books': 'Get all books',
            'GET /api/books/<id>': 'Get single book',
            'POST /api/books': 'Create book',
            'PUT /api/books/<id>': 'Update book',
            'DELETE /api/books/<id>': 'Delete book',
            'GET /api/books/search?q=': 'Search books'
        }
    })


# =========================
# GET all books
# =========================
@app.route('/api/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([book_to_dict(book) for book in books]), 200


# =========================
# GET single book
# =========================
@app.route('/api/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = Book.query.get(book_id)

    if not book:
        return error_response('Book not found', 404)

    return jsonify(book_to_dict(book)), 200


# =========================
# CREATE book
# =========================
@app.route('/api/books', methods=['POST'])
def create_book():
    data = request.get_json()

    if not data:
        return error_response('No data provided', 400)

    if 'title' not in data or 'author' not in data:
        return error_response('Title and author are required', 400)

    if not data['title'].strip():
        return error_response('Title cannot be empty', 400)

    if not data['author'].strip():
        return error_response('Author cannot be empty', 400)

    if 'published_year' in data:
        try:
            data['published_year'] = int(data['published_year'])
        except (ValueError, TypeError):
            return error_response('Published year must be a number', 400)

    try:
        new_book = Book(
            title=data['title'],
            author=data['author'],
            genre=data.get('genre'),
            published_year=data.get('published_year')
        )

        db.session.add(new_book)
        db.session.commit()

        return jsonify(book_to_dict(new_book)), 201

    except Exception as e:
        db.session.rollback()
        return error_response('Internal server error', 500)


# =========================
# UPDATE book
# =========================
@app.route('/api/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    book = Book.query.get(book_id)

    if not book:
        return error_response('Book not found', 404)

    data = request.get_json()

    if not data:
        return error_response('No data provided', 400)

    if 'title' in data:
        book.title = data['title']

    if 'author' in data:
        book.author = data['author']

    if 'genre' in data:
        book.genre = data['genre']

    if 'published_year' in data:
        try:
            book.published_year = int(data['published_year'])
        except (ValueError, TypeError):
            return error_response('Published year must be a number', 400)

    try:
        db.session.commit()
        return jsonify(book_to_dict(book)), 200

    except Exception:
        db.session.rollback()
        return error_response('Internal server error', 500)


# =========================
# DELETE book
# =========================
@app.route('/api/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = Book.query.get(book_id)

    if not book:
        return error_response('Book not found', 404)

    try:
        db.session.delete(book)
        db.session.commit()
        return jsonify({'message': 'Book deleted successfully'}), 200

    except Exception:
        db.session.rollback()
        return error_response('Internal server error', 500)


# =========================
# SEARCH books
# =========================
@app.route('/api/books/search', methods=['GET'])
def search_books():
    query = request.args.get('q', '')

    if not query:
        return error_response('Search query is required', 400)

    books = Book.query.filter(
        (Book.title.ilike(f'%{query}%')) |
        (Book.author.ilike(f'%{query}%')) |
        (Book.genre.ilike(f'%{query}%'))
    ).all()

    return jsonify([book_to_dict(book) for book in books]), 200


# =========================
# Error handlers
# =========================
@app.errorhandler(404)
def not_found(error):
    return error_response('Resource not found', 404)


@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return error_response('Internal server error', 500)


# =========================
# Run app
# =========================
if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)