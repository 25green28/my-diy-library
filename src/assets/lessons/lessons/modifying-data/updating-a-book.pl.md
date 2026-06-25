# Aktualizacja książki (PUT)

Żądania typu PUT są używane do modyfikowania istniejących zasobów.

W naszym interfejsie API biblioteki oznacza to aktualizację informacji o książce, która znajduje się już w bazie danych.

> **Wskazówka:** W tym projekcie nasz punkt końcowy (endpoint) PUT aktualizuje tylko te pola, które zostały przekazane w żądaniu. Technicznie rzecz biorąc, zachowuje się on bardziej jak żądanie PATCH, ale dla uproszczenia będziemy nadal używać metody PUT.

---

## Dlaczego potrzebujemy trasy aktualizacji?

Wyobraź sobie, że użytkownik chce poprawić literówkę w tytule książki.

Aktualna książka:

```json
{
  "id": 1,
  "title": "19844",
  "author": "George Orwell"
}

```

Zaktualizowana książka:

```json
{
  "id": 1,
  "title": "1984",
  "author": "George Orwell"
}

```

Zamiast tworzyć nową książkę, aktualizujemy tę już istniejącą.

---

## Trasa aktualizacji (Update route)

Dodaj poniższą trasę pod trasą z poprzedniej lekcji:

```python
@app.route('/api/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    book = Book.query.get(book_id)

    # Handle missing book
    if not book:
        return jsonify({'error': 'Book not found'}), 404

    data = request.get_json()

    # Update fields if provided
    if 'title' in data:
        book.title = data['title']

    if 'author' in data:
        book.author = data['author']

    if 'genre' in data:
        book.genre = data['genre']

    if 'published_year' in data:
        book.published_year = data['published_year']

    # Save changes
    db.session.commit()

    return jsonify(book_to_dict(book)), 200

```

---

## Zrozumienie działania trasy

### Znajdowanie książki

```python
book = Book.query.get(book_id)

```

Identyfikator (ID) książki pochodzi z adresu URL:

```text
/api/books/1

```

Jeśli książka istnieje, SQLAlchemy zwraca pasujący rekord.

---

### Obsługa brakujących książek

```python
if not book:
    return jsonify({'error': 'Book not found'}), 404

```

Jeśli żaden rekord nie pasuje do podanego ID, zwracamy odpowiedź `404 Not Found`.

---

### Odczytywanie danych JSON

```python
data = request.get_json()

```

Ta linijka konwertuje treść żądania JSON na słownik Pythona.

Przykład:

```json
{
  "title": "Nineteen Eighty-Four"
}

```

staje się:

```python
{
    "title": "Nineteen Eighty-Four"
}

```

---

### Aktualizacja pól

```python
if 'title' in data:
    book.title = data['title']

```

Aktualizowane są tylko te pola, które zostały jawnie dołączone do żądania.

Na przykład:

```json
{
  "title": "Nineteen Eighty-Four"
}

```

zmienia wyłącznie tytuł. Wszystkie pozostałe pola pozostają bez zmian.

---

## Dlaczego potrzebujemy commit()?

Zmiana wartości właściwości obiektu nie powoduje natychmiastowej aktualizacji bazy danych.

Na przykład:

```python
book.title = "New Title"

```

modyfikuje jedynie obiekt znajdujący się w pamięci operacyjnej aplikacji.

Aby trwale zapisać tę zmianę na dysku serwera:

```python
db.session.commit()

```

Pomyśl o `commit()` jak o kliknięciu przycisku „Zapisz”. Bez wywołania tej metody wprowadzone zmiany zostałyby utracone.

---

## Wypróbuj sam

Załóżmy, że baza danych zawiera rekord:

```json
{
  "id": 1,
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "published_year": 1949
}

```

Jak będzie wyglądać ta książka po wysłaniu następującego żądania?

```json
{
  "title": "Nineteen Eighty-Four"
}

```

```json
{
  "id": 1,
  "title": "Nineteen Eighty-Four",
  "author": "George Orwell",
  "genre": "Dystopian",
  "published_year": 1949
}

```

Zmianie ulega wyłącznie tytuł.

---

## PUT kontra PATCH

W architekturze REST wyróżniamy dwie popularne metody aktualizacji:

### PUT

Tradycyjnie zastępuje cały zasób nową reprezentacją.

Przykład pełnego żądania:

```json
{
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "published_year": 1949
}

```

### PATCH

Aktualizuje tylko wybrane, wskazane pola.

Przykład:

```json
{
  "title": "Nineteen Eighty-Four"
}

```

Ponieważ nasza trasa modyfikuje tylko dostarczone pola, zachowuje się bardziej jak PATCH. Dla zachowania prostoty projektu będziemy jednak trzymać się nazewnictwa PUT.

---

## Przetestuj to w programie Postman

Utwórz nowe żądanie w programie Postman.

**Metoda**

```text
PUT

```

**URL**

```text
[http://127.0.0.1:5000/api/books/1](http://127.0.0.1:5000/api/books/1)

```

Zastąp cyfrę `1` identyfikatorem książki, która faktycznie istnieje w Twojej bazie danych.

Otwórz zakładkę **Body** i wybierz opcje:

```text
raw → JSON

```

Następnie wklej treść:

```json
{
    "genre": "Science Fiction"
}

```

Kliknij **Send**. Jeśli żądanie zakończy się sukcesem, Postman zwróci zaktualizowaną książkę w formacie JSON.

---

## Najlepsze praktyki

* Zawsze upewnij się, że zasób istnieje, zanim podejmiesz próbę jego aktualizacji.
* Waliduj dane wejściowe przed ich trwałym zapisaniem.
* Pamiętaj o wywołaniu `commit()` po wprowadzeniu modyfikacji.
* Zwracaj zaktualizowany zasób, gdy operacja się powiedzie.
* Używaj odpowiednich kodów statusu HTTP (`200`, `404` itp.).

---

## Podsumowanie

W tej lekcji dowiedziałeś się:

* Jak działają żądania typu PUT.
* Jak pobrać rekord książki przed dokonaniem modyfikacji.
* Jak odczytywać dane z żądań JSON.
* Na czym polega częściowa aktualizacja danych.
* Dlaczego metoda `db.session.commit()` jest niezbędna.
* Jaka jest różnica pomiędzy metodami PUT i PATCH.

W kolejnej lekcji zajmiemy się walidacją danych przychodzących przed ich zapisaniem w bazie danych.

---

## Rozwiązywanie problemów (Troubleshooting)

### Otrzymuję komunikat:

```text
Book not found

```

Podane ID nie istnieje w bazie danych. Upewnij się, że książka o takim identyfikatorze została wcześniej utworzona.

---

### Moje zmiany nie są zapisywane

Upewnij się, że na końcu logiki wywołujesz:

```python
db.session.commit()

```

Bez tego kroku SQLAlchemy wycofa zmiany po zakończeniu cyklu żądania.

---

### Otrzymuję błąd:

```text
NameError: name 'request' is not defined

```

Upewnij się, że zaimportowałeś obiekt request z biblioteki Flask:

```python
from flask import request

```

---

### Otrzymuję błąd:

```text
TypeError: argument of type 'NoneType' is not iterable

```

To zazwyczaj oznacza, że do żądania nie dołączono żadnych danych JSON. Upewnij się, że treść (body) żądania zawiera poprawnie sformatowany kod JSON.

---

### Wprowadzone zmiany nie są widoczne

Sprawdź czy:

* Serwer Flask na pewno działa.
* Plik z kodem został zapisany na dysku.
* Serwer automatycznie zrestartował się po zapisaniu zmian.

W razie potrzeby uruchom go ponownie ręcznie:

```bash
python app.py

```
