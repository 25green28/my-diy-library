# Usuwanie książki (DELETE)

Żądania DELETE służą do usuwania zasobów z bazy danych. Zaimplementujmy punkt końcowy (endpoint), który pozwoli klientom usuwać książki z naszej biblioteki.

---

## Punkt końcowy DELETE

Dodaj tę trasę (route) do swojego pliku `app.py` (po pozostałych trasach):

```python
@app.route('/api/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = Book.query.get(book_id)

    # If the book doesn't exist, return a 404 error
    if not book:
        return error_response('Book not found', 404)

    # Delete the book from the database
    db.session.delete(book)
    db.session.commit()

    return jsonify({'message': 'Book deleted successfully'}), 200

```

## Jak to działa

1. Znajdujemy książkę po jej identyfikatorze ID
2. Jeśli książka nie istnieje, zwracamy błąd 404
3. `db.session.delete(book)` oznacza książkę do usunięcia
4. `db.session.commit()` trwale usuwa ją z bazy danych
5. Zwracamy komunikat o powodzeniu z kodem statusu 200

## Obsługa błędów bazy danych

Podobnie jak w poprzednich lekcjach, operacje na bazie danych mogą się nie powieść.

Zastąp kod:

```python
db.session.delete(book)
db.session.commit()

return jsonify({'message': 'Book deleted successfully'}), 200

```

poniższym:

```python
try:
    # Delete the book from the database
    db.session.delete(book)
    db.session.commit()

    return jsonify({
        'message': 'Book deleted successfully'
    }), 200

except Exception:
    # In case of an error, rollback the transaction
    db.session.rollback()

    return error_response(
        'Internal server error',
        500
    )

```

Zapobiega to zawieszeniu się API, jeśli coś pójdzie nie tak.

## Zwracanie statusu 204 No Content

Niektóre interfejsy API zwracają kod `204 No Content` zamiast komunikatu tekstowego o powodzeniu.

Zastąp kod:

```python
return jsonify({
    'message': 'Book deleted successfully'
}), 200

```

poniższym:

```python
return '', 204

```

Kod statusu `204` oznacza:

* Usunięcie zakończyło się pomyślnie
* Treść odpowiedzi (response body) jest pusta

Oba podejścia są prawidłowe.

## Najlepsza opcja

Twoja biblioteka obecnie przechowuje następujące dane:

* book_id
* title
* author
* genre
* published_year

Zanim spojrzysz na rozwiązanie, pomyśl:

Jeśli użytkownik usuwa książkę, która wartość powinna zostać użyta do jej zidentyfikowania?

Najlepszym wyborem jest:

```python
book_id

```

ponieważ każda książka ma unikalny identyfikator ID.

Tytuły i autorzy mogą się powtarzać, ale identyfikatory ID są zawsze unikalne.

Dlatego nasza trasa używa zapisu:

```python
@app.route('/api/books/<int:book_id>', methods=['DELETE'])

```

---

## Przetestuj to w programie Postman

Utwórz nowe żądanie w programie Postman.

**Metoda**

```text
DELETE

```

**URL**

```text
[http://127.0.0.1:5000/api/books/1](http://127.0.0.1:5000/api/books/1)

```

Zastąp cyfrę `1` identyfikatorem ID istniejącej książki.

Kliknij **Send**.

Jeśli żądanie zakończy się pomyślnie, książka zostanie usunięta z bazy danych, a API zwróci odpowiedź informującą o powodzeniu operacji.

---

## Najlepsze praktyki

* Zawsze sprawdzaj, czy zasób istnieje przed podjęciem próby usunięcia go
* Do identyfikacji rekordów używaj identyfikatora ID książki
* Zwracaj jasne komunikaty o powodzeniu i błędach
* Otaczaj operacje na bazie danych blokiem `try/except`
* Wywołuj funkcję `rollback()`, gdy wystąpi błąd bazy danych

---

## Podsumowanie

W tej lekcji dowiedziałeś się:

* Jak działają żądania DELETE
* Jak utworzyć punkt końcowy DELETE w frameworku Flask
* Jak usuwać rekordy za pomocą SQLAlchemy
* Jak zwracać błąd 404, gdy książka nie istnieje
* Jak bezpiecznie obsługiwać błędy bazy danych
* Jaka jest różnica między kodami statusu 200 a 204

W następnej lekcji będziemy kontynuować ulepszanie naszego API, czyniąc je bardziej solidnym i łatwiejszym w utrzymaniu.

---

## Rozwiązywanie problemów (Troubleshooting)

### Otrzymuję komunikat:

```text
Book not found

```

Żądany identyfikator ID książki nie istnieje.

Wykonaj żądanie:

```text
GET /api/books

```

aby zobaczyć, jakie książki są obecnie zapisane w bazie danych.

---

### Otrzymuję komunikat:

```text
AttributeError: 'NoneType' object has no attribute ...

```

Zwykle oznacza to, że książka nie została znaleziona, ale Twój kod mimo to próbował z niej skorzystać.

Upewnij się, że posiadasz warunek:

```python
if not book:
    return error_response(
        'Book not found',
        404
    )

```

umieszczony przed operacją usuwania książki.

---

### Otrzymuję komunikat:

```text
Internal server error

```

Sprawdź dane wyjściowe w terminalu.

API zwraca ogólny komunikat o błędzie, ale terminal zazwyczaj pokazuje rzeczywisty wyjątek (exception).

---

### Książka jest nadal widoczna po usunięciu

Upewnij się, że wywołałeś:

```python
db.session.commit()

```

po instrukcji:

```python
db.session.delete(book)

```

Bez wywołania `commit()`, usunięcie nie zostanie zapisane.

---

### Żądanie DELETE nie działa

Upewnij się, że parametr:

```python
methods=['DELETE']

```

jest obecny w dekoratorze trasy:

```python
@app.route(
    '/api/books/<int:book_id>',
    methods=['DELETE']
)

```

Jeśli Flask nie zezwala na żądania DELETE, sprawdź, czy plik z trasą został zapisany, a serwer zrestartowany.