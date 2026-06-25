# Obsługa przesyłania plików w żądaniach POST

Teraz, gdy nasz model obsługuje już pliki graficzne, musimy zaimplementować obsługę przesyłania zdjęć podczas tworzenia nowych książek za pomocą żądań POST.

---

## Zrozumienie formatu multipart/form-data

W poprzednich lekcjach korzystaliśmy z żądań w formacie JSON:

```python
data = request.get_json()

```

To rozwiązanie działa świetnie w przypadku danych tekstowych, ale nie pozwala na przesyłanie plików.

Aby umożliwić przesyłanie obrazów, musimy użyć formatu:

```text
multipart/form-data

```

Format ten pozwala na jednoczesne przesyłanie:

* Pól tekstowych (title, author, genre itp.)
* Plików (zdjęć)

w ramach jednego żądania.

---

## Aktualizacja trasy create_book

Otwórz swoją istniejącą trasę `create_book()`.

Obecnie wygląda ona mniej więcej tak:

```python
@app.route('/api/books', methods=['POST'])
def create_book():
    data = request.get_json()

    # walidacja...

    new_book = Book(
        title=data['title'],
        author=data['author'],
        genre=data.get('genre'),
        published_year=data.get('published_year')
    )

```

Musimy zastąpić podejście oparte na formacie JSON obsługą formularzy (form) oraz plików (files).

---

### Krok 1: Zastąpienie `request.get_json()`

Znajdź linijkę:

```python
data = request.get_json()

```

Usuń ją całkowicie i zastąp poniższym kodem:

```python
# Pobranie danych z formularza
title = request.form.get('title')
author = request.form.get('author')
genre = request.form.get('genre')
published_year = request.form.get('published_year')

image = request.files.get('image')

```

Od teraz:

* `request.form` obsługuje pola tekstowe formularza
* `request.files` obsługuje przesłane pliki

---

### Krok 2: Aktualizacja walidacji

Zastąp starą walidację:

```python
if not data:
    return error_response(
        'No data provided',
        400
    )

if not data['title'].strip():
    return error_response(
        'Title cannot be empty',
        400
    )

if not data['author'].strip():
    return error_response(
        'Author cannot be empty',
        400
    )

```

następującym kodem:

```python
# Walidacja wymaganych pól
if not title or not author:
    return error_response(
        'Title and author are required',
        400
    )

```

---

### Krok 3: Zapisywanie przesłanego obrazu

Przed walidacją roku publikacji książki (`if 'published_year' in data:`), dodaj:

```python
filename = None

# Zapisanie przesłanego obrazu (jeśli istnieje)
if image:
    filename = secure_filename(image.filename)

    image.save(
        os.path.join(
            app.config['UPLOAD_FOLDER'],
            filename
        )
    )

```

Ten kod:

1. Pobiera przesłany plik
2. Tworzy bezpieczną nazwę pliku
3. Zapisuje obraz wewnątrz folderu uploads

---

### Krok 4: Aktualizacja procesu tworzenia obiektu Book

Znajdź sekcję:

```python
new_book = Book(
    title=data['title'],
    author=data['author'],
    genre=data.get('genre'),
    published_year=data.get('published_year')
)

```

Zastąp ją poniższym kodem:

```python
new_book = Book(
    title=title,
    author=author,
    genre=genre,
    published_year=published_year,
    image_filename=filename
)

```

Zwróć uwagę na nowe pole:

```python
image_filename=filename

```

Odpowiada ono za zapisanie nazwy przesłanego pliku graficznego w bazie danych.

---

### Krok 5: Konwersja roku na liczbę

Przed instancjonowaniem obiektu książki zastąp obecną walidację pola `published_year` poniższą strukturą:

```python
# Walidacja roku publikacji
if published_year:
    try:
        published_year = int(published_year)

    except ValueError:
        return error_response(
            'Published year must be a number',
            400
        )

```

Dzięki temu zyskujemy pewność, że rok zostanie zapisany jako liczba całkowita (integer).

---

## Gotowa trasa w całości

Po wprowadzeniu wszystkich modyfikacji Twoja trasa powinna wyglądać następująco:

```python
@app.route('/api/books', methods=['POST'])
def create_book():

    # Pobranie danych z formularza
    title = request.form.get('title')
    author = request.form.get('author')
    genre = request.form.get('genre')
    published_year = request.form.get('published_year')

    image = request.files.get('image')

    # Walidacja wymaganych pól
    if not title or not author:
        return error_response(
            'Title and author are required',
            400
        )

    filename = None

    # Zapisanie przesłanego obrazu (jeśli istnieje)
    if image:
        filename = secure_filename(image.filename)

        image.save(
            os.path.join(
                app.config['UPLOAD_FOLDER'],
                filename
            )
        )

    # Walidacja roku publikacji
    if published_year:
        try:
            published_year = int(published_year)

        except ValueError:
            return error_response(
                'Published year must be a number',
                400
            )

    # Utworzenie nowej książki na podstawie danych z żądania
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

```

---

## Wyjaśnienie kluczowych zmian

### Użycie `request.form`

```python
title = request.form.get('title')

```

Odczytuje pola tekstowe z żądania typu multipart.

---

### Użycie `request.files`

```python
image = request.files.get('image')

```

Przechwytuje i odczytuje przesłany plik.

---

### Zabezpieczanie nazwy pliku

```python
filename = secure_filename(
    image.filename
)

```

Usuwa niebezpieczne znaki z nazw plików.

Dzięki temu ciąg znaków taki jak:

```text
../../../secret.txt

```

zostaje przekształcony w bezpieczną nazwę pliku.

---

### Zapisywanie pliku na dysku

```python
image.save(
    os.path.join(
        app.config['UPLOAD_FOLDER'],
        filename
    )
)

```

Zapisuje plik graficzny wewnątrz skonfigurowanego folderu uploads.

---

## Testowanie za pomocą programu Postman

Aby przetestować przesyłanie plików graficznych:

1. Utwórz nowe żądanie typu POST
2. Użyj adresu URL:

```text
[http://127.0.0.1:5000/api/books](http://127.0.0.1:5000/api/books)

```

3. Otwórz zakładkę **Body**
4. Wybierz opcję **form-data**
5. Dodaj następujące pary klucz-wartość:

| Klucz (Key) | Typ (Type) | Wartość (Value) |
| --- | --- | --- |
| title | Text | Harry Potter |
| author | Text | J.K. Rowling |
| genre | Text | Fantasy |
| published_year | Text | 1997 |
| image | File | Wybierz obraz |

6. Kliknij **Send**

Plik graficzny powinien zostać pomyślnie zapisany w folderze uploads.

---

## Ćwiczenie na myślenie

Zanim spojrzysz na rozwiązanie, spróbuj odpowiedzieć na pytanie:

Co mogłoby się stać, gdyby użytkownik przesłał plik o nazwie:

```text
../../etc/passwd

```

Dlaczego funkcja `secure_filename()` jest nam tak niezbędna?

Spróbuj odpowiedzieć na to pytanie przed otwarciem rozwiązania.

Bez użycia funkcji `secure_filename()`, złośliwy użytkownik mógłby podjąć próbę zapisu plików poza wyznaczonym folderem uploads.

Taki schemat działania nazywany jest atakiem typu Path Traversal (wyszukiwanie ścieżki skrośnej).

Funkcja `secure_filename()` usuwa niebezpieczne sekwencje znaków i przekształca nazwę pliku w całkowicie bezpieczną wersję przed jej zapisaniem na dysku serwera.

---

## Najlepsze praktyki

* Zawsze używaj funkcji `secure_filename()`
* Waliduj formaty i typy przesyłanych plików
* Ograniczaj maksymalny rozmiar przesyłanych plików
* Pozostawiaj przesyłanie zdjęć jako opcjonalne, chyba że logika aplikacji wymaga inaczej
* W bazie danych przechowuj wyłącznie same nazwy plików
* Przechowuj pliki użytkowników w dedykowanym, wydzielonym folderze

---

## Podsumowanie

W tej lekcji dowiedziałeś się:

* Dlaczego format JSON nie może być używany do przesyłania plików
* Czym charakteryzuje się format `multipart/form-data`
* Jak zastąpić metodę `request.get_json()` obiektem `request.form`
* Jak uzyskiwać dostęp do przesłanych plików za pomocą `request.files`
* Jak zapisywać pliki graficzne w folderze uploads
* Dlaczego funkcja `secure_filename()` jest kluczowa dla bezpieczeństwa
* Jak zapisywać nazwy plików graficznych w bazie danych

W następnej lekcji utworzymy nową trasę, która pozwoli użytkownikom na przeglądanie i pobieranie przesłanych obrazów.

---

## Rozwiązywanie problemów (Troubleshooting)

### Otrzymuję błąd:

```text
NameError: name 'secure_filename' is not defined

```

Upewnij się, że dodałeś odpowiedni import:

```python
from werkzeug.utils import secure_filename

```

do sekcji importów na górze pliku.

---

### Otrzymuję błąd:

```text
NameError: name 'os' is not defined

```

Upewnij się, że zaimportowałeś moduł os:

```python
import os

```

na samej górze swojego pliku.

---

### Otrzymuję błąd "400 Bad Request"

Upewnij się, że w programie Postman zaznaczona jest opcja:

```text
form-data

```

a nie:

```text
raw

```

lub

```text
JSON

```

---

### Plik graficzny nie zapisuje się na dysku

Sprawdź czy:

* Folder uploads fizycznie istnieje na dysku
* Aplikacja posiada uprawnienia systemowe do zapisu plików
* Typ pola `image` w programie Postman został zmieniony na **File**
* Przesyłany plik nie jest pusty

---

### Książka została utworzona, ale brakuje powiązanego zdjęcia

Upewnij się, że parametr:

```python
image_filename=filename

```

został przekazany podczas tworzenia instancji obiektu `Book`.

Bez tej linijki nazwa pliku nigdy nie trafi do bazy danych.
