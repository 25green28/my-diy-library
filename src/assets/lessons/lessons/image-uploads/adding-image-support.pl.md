# Dodawanie obsługi zdjęć do modelu Book

Aby umożliwić przesyłanie zdjęć okładek dla książek, musimy dodać nowe pole do naszego modelu Book. Będzie ono przechowywać nazwę pliku przesłanego obrazu.

---

## Aktualizacja modelu Book

Otwórz swój istniejący model `Book`.

Obecnie powinien on wyglądać mniej więcej tak:

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

Dodaj poniższą linię bezpośrednio po kolumnie `published_year`:

```python
image_filename = db.Column(db.String(200))

```

Twój zaktualizowany model powinien teraz wyglądać następująco:

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

## Zrozumienie wprowadzonych zmian

* `image_filename` → przechowuje nazwę pliku przesłanego obrazu (np. `"book-cover.jpg"`)
* `db.String(200)` → pozwala na używanie długich nazw plików
* Brak parametru `nullable=False` → zdjęcia okładek są opcjonalne dla książek

---

## Dlaczego przechowujemy nazwę pliku, a nie samo zdjęcie?

Nie przechowujemy rzeczywistych danych obrazu bezpośrednio w bazie danych, ponieważ:

* Zdjęcia mogą mieć duży rozmiar, co drastycznie zwiększyłoby rozmiar pliku bazy danych
* Przechowywanie plików bezpośrednio w systemie plików (na dysku) jest o wiele bardziej wydajne
* Baza danych musi jedynie pamiętać, które zdjęcie należy do konkretnej książki
* To podejście jest powszechnie stosowane w rzeczywistych aplikacjach komercyjnych

---

## Aktualizacja funkcji pomocniczej

Otwórz istniejącą funkcję pomocniczą `book_to_dict()`.

Dodaj poniższą linię wewnątrz zwracanego słownika (po polu `published_year`):

```python
'image_url': f"/api/books/{book.id}/image" if book.image_filename else None

```

Twoja zaktualizowana funkcja pomocnicza powinna wyglądać tak:

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

Dzięki temu generowany jest adres URL w formacie:

```text
/api/books/1/image

```

który może później zostać użyty do pobrania i wyświetlenia zdjęcia.

---

## Konfiguracja folderu na przesyłane pliki

Zanim utworzysz folder na przesyłane pliki, dodaj instrukcję importu:

```python
import os

```

na samej górze pliku, wraz z pozostałymi importami.

---

Teraz otwórz sekcję konfiguracyjną w swoim pliku `app.py`.

Znajdź linijkę:

```python
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

```

Bezpośrednio pod nią dodaj poniższy kod:

```python
# Configuration for file uploads
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

```

Twoja sekcja konfiguracyjna powinna teraz wyglądać następująco:

```python
# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///library.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configuration for file uploads
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

```

Ten kod utworzy katalog o nazwie `uploads`, w którym będą przechowywane pliki graficzne.

Użycie argumentu `exist_ok=True` zapobiega zgłaszaniu błędów, jeśli ten folder już istnieje.

---

## Ćwiczenie na myślenie

Zanim spojrzysz na rozwiązanie, spróbuj odpowiedzieć na pytanie:

Gdybyś chciał dodać pole do przechowywania pliku PDF dla książek, jak byś je nazwał i jakiego typu danych byś użył?

Spróbuj najpierw zapisać to samodzielnie.

```python
pdf_filename = db.Column(db.String(200))

```

Lub jeśli wolisz przechowywać pełną ścieżkę do pliku:

```python
pdf_path = db.Column(db.String(300))

```

---

## Najlepsze praktyki

* Używaj opisowych nazw pól (np. `image_filename` zamiast skrótu `img`)
* Twórz pola plików jako opcjonalne, chyba że logika aplikacji wymaga inaczej
* W bazie danych przechowuj tylko nazwy plików, a nie ich pełne ścieżki dyskowe
* Trzymaj przesłane pliki w dedykowanym, oddzielnym folderze
* Korzystaj z funkcji pomocniczych, aby odpowiedzi API zachowywały spójną strukturę

---

## Podsumowanie

Wiesz już, jak dodać obsługę plików graficznych do swojego modelu bazy danych. Kluczowe punkty to:

* Dodanie pola tekstowego do przechowywania nazwy pliku obrazu
* Aktualizacja funkcji pomocniczych w celu dołączenia adresów URL obrazów
* Skonfigurowanie dedykowanego folderu do przechowywania plików na dysku
* Zapisywanie referencji do plików, a nie samych plików bezpośrednio w bazie
* Przygotowanie struktury aplikacji pod obsługę przesyłania plików

W następnej lekcji dowiesz się, jak obsługiwać rzeczywiste przesyłanie zdjęć w żądaniach POST.

---

## Rozwiązywanie problemów (Troubleshooting)

### Otrzymuję błąd informujący, że kolumna nie istnieje

Może być konieczne usunięcie pliku bazy danych `library.db` i ponowne uruchomienie aplikacji, aby baza danych została utworzona na nowo wraz z nową kolumną.

---

### Otrzymuję błąd:

```text
NameError: name 'os' is not defined

```

Upewnij się, że dodałeś instrukcję:

```python
import os

```

na samej górze swojego pliku.

---

### Folder na przesyłane pliki nie został utworzony

Upewnij się, że dodałeś kod:

```python
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

```

Zapewnia to, że folder istnieje na dysku zanim aplikacja spróbuje zapisać w nim jakiekolwiek pliki.

---

### Nie widzę pola `image_url` w odpowiedzi z API

Upewnij się, że zaktualizowałeś kod funkcji `book_to_dict()` i dodałeś:

```python
'image_url': f"/api/books/{book.id}/image" if book.image_filename else None

```

wewnątrz zwracanego słownika.