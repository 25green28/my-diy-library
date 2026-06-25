# Tworzenie książek (POST)

Żądania typu POST są używane do tworzenia nowych zasobów. W naszym przypadku posłużą do dodawania nowych książek do biblioteki.

---

## Punkt końcowy (endpoint) POST

Dodaj tę trasę do swojego pliku `app.py` (po definicji modelu, a przed blokiem `if __name__ == '__main__':`):

```python
@app.route('/api/books', methods=['POST'])
def create_book():
    data = request.get_json()

    # Create a new book from the request data
    new_book = Book(
        title=data['title'],
        author=data['author'],
        genre=data.get('genre'),
        published_year=data.get('published_year')
    )

    # Add the new book to the database
    db.session.add(new_book)
    db.session.commit()

    # Return the created book with a 201 status code
    return jsonify({
        'id': new_book.id,
        'title': new_book.title,
        'author': new_book.author,
        'genre': new_book.genre,
        'published_year': new_book.published_year
    }), 201

```

---

## Jak to działa

1. `request.get_json()` odczytuje dane JSON przesłane przez klienta.
2. Nowy obiekt klasy `Book` zostaje utworzony na podstawie tych danych.
3. `db.session.add(new_book)` przygotowuje (stępuje) obiekt do zapisu.
4. `db.session.commit()` trwale zapisuje go w bazie danych.
5. Interfejs API zwraca utworzoną książkę wraz z kodem statusu `201 (Created)`.

---

## Zrozumienie sesji bazy danych

Pomyśl o sesji bazy danych jak o **obszarze roboczym** (poczekalni):

* `add()` → umieszcza książkę w obszarze roboczym.
* `commit()` → zapisuje wszystko na stałe na dysku.
* Jeśli coś pójdzie nie tak przed wywołaniem `commit()`, nic nie zostanie zapisane.

---

## Ćwiczenie na myślenie

Zanim spojrzysz na rozwiązanie, spróbuj pomyśleć:

Co się stanie, jeśli klient wyśle poniższy kod JSON?

```json
{
  "author": "George Orwell",
  "genre": "Dystopian"
}

```

1. Czy żądanie zakończy się sukcesem, czy błędem?
2. Dlaczego?
3. Którego pola brakuje?

1. Żądanie zakończy się błędem.
2. Ponieważ pole `title` jest wymagane w kodzie (`data['title']`).
3. Brakującym polem jest `title`.

---

## Użycie `.get()` kontra bezpośredni dostęp

* `data['title']` → pole wymagane (wywołuje błąd, jeśli go brakuje).
* `data.get('genre')` → pole opcjonalne (zwraca wartość `None`, jeśli go brakuje).

Używamy obu podejść w zależności od tego, czy dane pole jest niezbędne, czy też opcjonalne dla działania aplikacji.

---

## Przetestuj to w programie Postman

Utwórz nowe żądanie w programie Postman.

**Metoda**

```text
POST

```

**URL**

```text
[http://127.0.0.1:5000/api/books](http://127.0.0.1:5000/api/books)

```

Otwórz zakładkę **Body** i wybierz opcje:

```text
raw → JSON

```

Następnie wklej treść:

```json
{
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "published_year": 1949
}

```

Kliknij **Send**. Jeśli żądanie zakończy się sukcesem, Postman zwróci nowo utworzoną książkę oraz kod statusu `201 Created`.

---

## Podsumowanie

Rozumiesz już, jak tworzyć nowe zasoby za pomocą żądań POST. Wiesz teraz, że:

* Żądania POST służą do wprowadzania nowych danych do systemu.
* `request.get_json()` odczytuje przychodzący JSON od klienta.
* Sesje SQLAlchemy wymagają wywołania metod `add()` oraz `commit()`.
* Pola wymagane muszą być obsługiwane ostrożnie, aby uniknąć błędów aplikacji.
* Pola opcjonalne mogą bezpiecznie korzystać z metody `.get()`.

W kolejnej lekcji dowiemy się, jak pobierać książki z bazy danych za pomocą żądań GET.

---

## Rozwiązywanie problemów (Troubleshooting)

### `400 Bad Request`

Zazwyczaj oznacza to, że serwer nie był w stanie poprawnie odczytać Twojego żądania.

**Najczęstsze przyczyny:**

* Brak nagłówka `Content-Type: application/json`.
* Niepoprawny format danych JSON w treści żądania.
* Pusta treść (body) żądania.

**Rozwiązanie:**

* Upewnij się, że wysyłasz poprawnie sformatowany JSON.
* Zawsze pamiętaj o dołączeniu odpowiedniego nagłówka podczas testów (w Postmanie lub curl).

---

### `KeyError: 'title'`

Dzieje się tak, gdy Twój kod próbuje uzyskać dostęp do wymaganego pola, które nie zostało dostarczone w żądaniu.

**Przykład przyczyny:**

```python
data['title']

```
