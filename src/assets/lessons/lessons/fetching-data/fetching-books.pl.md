# Pobieranie wielu książek (GET)

Teraz utwórzmy punkt końcowy (endpoint) do pobierania wszystkich książek z bazy danych. Jest to przydatne, gdy klienci chcą wyświetlić listę książek lub zobaczyć wszystko, co jest przechowywane w bibliotece.

---

## Punkt końcowy GET dla wszystkich zasobów

Dodaj tę trasę (route) do swojego pliku `app.py` (poniżej trasy z poprzedniej lekcji):

```python
@app.route('/api/books', methods=['GET'])
def get_books():
    books = Book.query.all()

    books_list = []

    # Convert each book to a dictionary and add to the list
    for book in books:
        books_list.append({
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'genre': book.genre,
            'published_year': book.published_year
        })

    return jsonify(books_list), 200

```

## Jak to działa

1. `Book.query.all()` pobiera wszystkie książki z bazy danych.
2. Tworzymy pustą listę o nazwie `books_list`.
3. Przechodzimy w pętli przez każdą książkę zwróconą przez bazę danych.
4. Każda książka jest konwertowana na słownik (dictionary).
5. Słowniki są dodawane do listy.
6. Lista jest zwracana jako format JSON z kodem statusu `200 OK`.

## Zrozumienie metody `.all()`

Poprzednio użyliśmy zapisu:

```python
Book.query.get(book_id)

```

aby pobrać pojedynczą książkę.

Tym razem używamy:

```python
Book.query.all()

```

co pobiera **wszystkie książki** z bazy danych.

Jeśli w bazie zapisanych jest 5 książek, SQLAlchemy zwróci listę zawierającą 5 obiektów typu Book.

---

## Użycie funkcji pomocniczej

Jeśli utworzyłeś funkcję pomocniczą (helper) z poprzedniej lekcji, Twój kod stanie się znacznie czystszy:

```python
@app.route('/api/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    # Convert each book to a dictionary and return as JSON
    return jsonify([book_to_dict(book) for book in books]), 200

```

Obie wersje działają dokładnie tak samo.

Dla osób początkujących wersja z tradycyjną pętlą `for` jest zazwyczaj łatwiejsza do zrozumienia.

---

## Testowanie punktu końcowego

Uruchom swój serwer Flask i odwiedź adres:

```text
[http://127.0.0.1:5000/api/books](http://127.0.0.1:5000/api/books)

```

Jeśli w bazie danych istnieją książki, powinieneś zobaczyć wynik podobny do poniższego:

```json
[
  {
    "id": 1,
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "published_year": 1949
  }
]

```

## Co jeśli nie ma żadnych książek?

Jeśli baza danych jest pusta, Flask zwróci:

```json
[]

```

Jest to całkowicie normalne.

Pusta lista oznacza po prostu, że nie utworzono jeszcze żadnych książek.

---

## Podsumowanie

W tej lekcji dowiedziałeś się:

* Jak pobierać wszystkie rekordy z bazy danych
* Jak działa metoda `Book.query.all()`
* Jak konwertować obiekty bazy danych na format JSON
* Jak zwracać listę książek z poziomu API
* Dlaczego funkcje pomocnicze pozwalają ograniczyć powtarzanie kodu

W następnej lekcji dowiesz się, jak wyszukiwać i filtrować książki za pomocą parametrów zapytania (query parameters).

---

## Rozwiązywanie problemów (Troubleshooting)

### Otrzymuję pustą listę (`[]`)

Zwykle oznacza to, że w bazie danych nie ma jeszcze żadnych książek.

Utwórz kilka książek za pomocą punktu końcowego POST i spróbuj ponownie.

---

### Widzę błąd typu:

```text
Object of type Book is not JSON serializable

```

Nie można zwracać obiektów SQLAlchemy bezpośrednio.

Musisz najpierw przekonwertować je na słowniki:

```python
{
    "id": book.id,
    "title": book.title
}

```

lub użyć przygotowanej funkcji pomocniczej `book_to_dict()`.

---

### Otrzymuję błąd:

```text
NameError: name 'jsonify' is not defined

```

Upewnij się, że funkcja `jsonify` została zaimportowana:

```python
from flask import jsonify

```

---

### Moje zmiany nie są widoczne

Upewnij się, że:

* Serwer Flask jest uruchomiony
* Zapisałeś plik
* Serwer zrestartował się po wprowadzeniu zmian

W razie potrzeby zatrzymaj serwer i uruchom go ponownie:

```bash
python app.py

```