from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///library.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

db = SQLAlchemy(app)

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(50))
    published_year = db.Column(db.Integer)
    image_filename = db.Column(db.String(200))

    def __repr__(self):
        return f'<Book {self.title}>'

def book_to_dict(book):
    return {
        'id': book.id,
        'title': book.title,
        'author': book.author,
        'genre': book.genre,
        'published_year': book.published_year,
        'image_url': f"/api/books/{book.id}/image" if book.image_filename else None
    }

def error_response(message, status_code):
    return jsonify({
        'error': message,
        'status': status_code
    }), status_code

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

    try:
        db.session.commit()

    except Exception:
        db.session.rollback()

        return error_response(
            'Internal server error',
            500
        )

    return jsonify(book_to_dict(new_book)), 201

@app.route('/api/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = Book.query.get(book_id)

    if book:
        return jsonify(book_to_dict(book)), 200

    return error_response(
        'Book not found',
        404
    )

@app.route('/api/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return jsonify([book_to_dict(book) for book in books]), 200

@app.route('/api/books/search', methods=['GET'])
def search_books():
    query = request.args.get('q', '')

    if not query:
        return error_response(
            'Search query is required',
            400
        )

    books = Book.query.filter(
        (Book.title.ilike(f'%{query}%')) |
        (Book.author.ilike(f'%{query}%'))
    ).all()

    return jsonify([book_to_dict(book) for book in books]), 200

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
        # Delete old image if it exists
        if book.image_filename:
            old_path = os.path.join(app.config['UPLOAD_FOLDER'], book.image_filename)
            if os.path.exists(old_path):
                os.remove(old_path)

        # Save new image
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        book.image_filename = filename

    try:
        db.session.commit()

    except Exception:
        db.session.rollback()

        return error_response(
            'Internal server error',
            500
        )

    return jsonify(book_to_dict(book)), 200

@app.route('/api/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = Book.query.get(book_id)

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

            try:
                if os.path.exists(path):
                    os.remove(path)
            except Exception as e:
                print(f"Failed to delete image: {e}")

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

@app.route('/api/books/<int:book_id>/image', methods=['GET'])
def get_book_image(book_id):
    book = Book.query.get(book_id)

    if not book or not book.image_filename:
        return error_response('Image not found', 404)

    return send_from_directory(
        app.config['UPLOAD_FOLDER'],
        book.image_filename
    )

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)