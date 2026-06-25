# Pobieranie pojedynczej książki

Teraz utwórzmy punkt końcowy (endpoint) do pobierania konkretnej książki na podstawie jej identyfikatora ID. Jest to bardzo powszechny schemat w interfejsach API – pobieranie pojedynczego zasobu z bazy danych.

---

## Punkt końcowy GET

Dodaj tę trasę (route) do swojego pliku `app.py` (poniżej trasy POST):

```python
@app.route('/api/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = Book.query.get(book_id)

    # Return the book data if found
    if book:
        return jsonify({
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'genre': book.genre,
            'published_year': book.published_year
        }), 200

    # Return error if book not found
    return jsonify({'error': 'Book not found'}), 404

```

## Jak to działa

1. Zapis `<int:book_id>` przechwytuje ID książki z adresu URL (na przykład `/api/books/1`)
2. `Book.query.get(book_id)` wyszukuje książkę o tym konkretnym ID
3. Jeśli książka istnieje, zwracamy jej dane wraz z kodem statusu `200 OK`
4. Jeśli książka nie istnieje, zwracamy komunikat o błędzie wraz z kodem statusu `404 Not Found`

## Zrozumienie metody `Book.query.get()`

`Book.query.get(book_id)` to metoda narzędzia SQLAlchemy służąca do znajdowania rekordu na podstawie jego klucza głównego (zazwyczaj kolumny `id`).

Na przykład:

```python
book = Book.query.get(1)

```

To polecenie mówi SQLAlchemy:

> „Znajdź książkę, której ID wynosi 1.”

Jeśli książka o podanym ID nie istnieje, SQLAlchemy zwraca wartość `None`.

---

## Testowanie punktu końcowego

Po utworzeniu kilku książek spróbuj otworzyć (w programie Postman lub w przeglądarce) poniższy adres:

```text
[http://127.0.0.1:5000/api/books/1](http://127.0.0.1:5000/api/books/1)

```

Jeśli książka istnieje, powinieneś otrzymać odpowiedź JSON podobną do:

```json
{
  "id": 1,
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "published_year": 1949
}

```

Jeśli książka nie istnieje:

```json
{
  "error": "Book not found"
}

```

a serwer zwróci kod statusu `404`.

---

## Tworzenie funkcji pomocniczej

W miarę rozwoju projektu możesz zauważyć, że powtarzasz tę samą strukturę JSON w wielu trasach.

Funkcja pomocnicza (helper) sprawi, że Twój kod będzie czystszy (proszę umieścić ją pomiędzy modelem a trasą POST):

```python
# Helper function to convert book into JSON
def book_to_dict(book):
    return {
        'id': book.id,
        'title': book.title,
        'author': book.author,
        'genre': book.genre,
        'published_year': book.published_year
    }

```

Teraz trasa wygląda następująco:

```python
@app.route('/api/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = Book.query.get(book_id)

    # Return the book data if found
    if book:
        return jsonify(book_to_dict(book)), 200

    # Return error if book not found
    return jsonify({'error': 'Book not found'}), 404

```

## Ćwiczenie

Zanim spojrzysz na odpowiedzi, spróbuj samodzielnie odpowiedzieć na te pytania:

1. Jaki adres URL powinieneś odwiedzić, aby pobrać książkę o ID `5`?
2. Jaki kod statusu powinien zostać zwrócony, jeśli książka nie istnieje?
3. Dlaczego sprawdzamy warunek `if book:` przed zwróceniem danych?

1. `/api/books/5`
2. `404 Not Found`
3. Ponieważ zapytanie może zwrócić `None`, jeśli nie istnieje książka o takim ID.

---

# Podsumowanie

* Żądania GET służą do pobierania danych z serwera
* Parametry trasy pozwalają nam zidentyfikować konkretny zasób
* Możemy pobrać książkę, używając jej unikalnego identyfikatora ID
* Zawsze sprawdzaj, czy zasób istnieje, zanim go zwrócisz
* Zwracaj `404 Not Found`, gdy żądany zasób nie istnieje
* Zwracanie danych w formacie JSON zapewnia spójność i łatwość użycia API

---

## Rozwiązywanie problemów (Troubleshooting)

### Ciągle otrzymuję komunikat „Book not found”

Zwykle oznacza to, że:

* Żądane ID nie istnieje w bazie danych
* Nie utworzono jeszcze żadnych książek

**Rozwiązanie:**

Najpierw utwórz książkę za pomocą punktu końcowego POST, a następnie spróbuj ją pobrać.

---

### Błąd `404 Not Found`

Upewnij się, że Twój adres URL dokładnie pasuje do zdefiniowanej trasy.

Prawidłowo:

```text
/api/books/1

```

Nieprawidłowo:

```text
/api/book/1

```

Zwróć uwagę na brakującą literę `s`.

---

### Błąd `NameError: name 'jsonify' is not defined`

Dzieje się tak, gdy funkcja `jsonify` z biblioteki Flask nie została zaimportowana.

**Rozwiązanie:**

```python
from flask import jsonify

```

---

### Trasa nigdy się nie wykonuje

Upewnij się, że trasa jest umieszczona powyżej bloku:

```python
if __name__ == '__main__':
    app.run(debug=True)

```

Flask musi wiedzieć o wszystkich trasach przed uruchomieniem aplikacji.

---

### Zmiany nie są widoczne

Czasami serwer wymaga ponownego załadowania po wprowadzeniu zmian w kodzie.

**Rozwiązanie:**

* Zapisz plik
* W razie potrzeby zrestartuj serwer Flask
