# Serwowanie obrazów za pomocą nowej trasy

Skoro potrafimy już przesyłać pliki graficzne na serwer, potrzebujemy teraz sposobu na odsyłanie ich z powrotem do klienta. W tym celu utworzymy nową trasę, która będzie zwracać plik graficzny.

---

## Tworzenie trasy serwującej zdjęcia

Dodaj tę nową trasę do swojej aplikacji (poniżej trasy usuwania danych):

```python
@app.route('/api/books/<int:book_id>/image', methods=['GET'])
def get_book_image(book_id):
    book = Book.query.get(book_id)

    # Check if book exists and has an image
    if not book or not book.image_filename:
        return error_response('Image not found', 404)

    # Serve the image file from the upload folder
    return send_from_directory(
        app.config['UPLOAD_FOLDER'],
        book.image_filename
    )

```

---

## Zrozumienie działania trasy

### Wzorzec trasy (Route pattern)

```python
@app.route('/api/books/<int:book_id>/image', methods=['GET'])

```

* `/api/books/<int:book_id>/image` → adres URL wyglądający np. tak: `/api/books/1/image`
* `<int:book_id>` → przechwytuje ID książki jako liczbę całkowitą (integer)
* `methods=['GET']` → odpowiada wyłącznie na żądania typu GET

---

### Obsługa błędów

```python
if not book or not book.image_filename:
    return error_response('Image not found', 404)

```

Zwraca kod błędu 404, jeśli:

* Książka o podanym ID nie istnieje w bazie danych
* Książka istnieje, ale nie ma przypisanego pliku graficznego

---

### Serwowanie pliku

```python
return send_from_directory(
    app.config['UPLOAD_FOLDER'],
    book.image_filename
)

```

* `send_from_directory()` → wbudowana funkcja Flaska, która pozwala na bezpieczne serwowanie plików z wybranego katalogu
* Pierwszy argument → ścieżka do folderu z plikami (upload directory)
* Drugi argument → nazwa pliku odczytana z bazy danych

Ta funkcja **automatycznie obsługuje dowolny format obrazu**, w tym m.in.:

* `.jpg`
* `.jpeg`
* `.png`
* `.webp`
* `.gif`
* `.bmp`

Flask NIE wymaga ani nie narzuca konkretnego rozszerzenia — po prostu przesyła plik w takiej formie, w jakiej istnieje on na dysku.

---

## Jak to wszystko ze sobą współpracuje

1. Klient wysyła żądanie pod adres `/api/books/1/image`
2. Flask wyciąga z adresu wartość `book_id = 1`
3. Aplikacja wyszukuje w bazie danych książkę o tym identyfikatorze
4. Nazwa pliku (`image_filename`) zostaje odczytana z bazy danych
5. Flask bezpiecznie serwuje plik z folderu uploads
6. Przeglądarka automatycznie renderuje obraz na podstawie jego typu pliku

---

## Wykorzystanie adresu URL obrazu

Twoja funkcja pomocnicza `book_to_dict()` generuje pole:

```python
'image_url': f"/api/books/{book.id}/image" if book.image_filename else None

```

Przykładowa odpowiedź z API:

```json
{
  "id": 1,
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "published_year": 1949,
  "image_url": "/api/books/1/image"
}

```

Użycie na froncie (kod HTML):

```html
<img src="/api/books/1/image" alt="Book cover">

```

---

## Ćwiczenie

Załóżmy, że w bazie danych posiadamy książki o indeksach od 1 do 100. Co się stanie, jeśli ktoś wyśle żądanie pod adres:

```
/api/books/999/image

```

Interfejs API zwróci błąd 404, ponieważ:

* Książka o takim identyfikatorze nie istnieje LUB
* Dla tej książki nie przypisano żadnego zdjęcia

Dzieje się tak za sprawą warunku:

```python
if not book or not book.image_filename:
    return error_response('Image not found', 404)

```

---

## Najlepsze praktyki

* Zawsze sprawdzaj, czy książka istnieje, zanim podejmiesz próbę zaserwowania pliku
* W bazie danych przechowuj wyłącznie same nazwy plików
* NIE ograniczaj formatów zdjęć na tym etapie (jpg, png, webp itp. są tak samo poprawne)
* Walidacja plików powinna odbywać się podczas ich przesyłania, a nie podczas serwowania
* Dla bezpieczeństwa trzymaj folder uploads poza katalogiem static/

---

## Podsumowanie

Wiesz już, jak prawidłowo serwować przesłane obrazy.

Kluczowe wnioski:

* Tworzymy dedykowaną trasę dla obrazu przypadającego na konkretną książkę
* Odczytujemy nazwę pliku z bazy danych
* Używamy funkcji `send_from_directory()` do bezpiecznego udostępniania plików
* Mechanizm automatycznie wspiera WSZYSTKIE popularne formaty graficzne
* Front-end może wstawić zwrócony URL bezpośrednio do znaczników `<img>`

W następnej lekcji dowiemy się, jak aktualizować pliki graficzne za pomocą żądań PUT.

---

## Rozwiązywanie problemów (Troubleshooting)

### Błąd "Image not found" pomimo tego, że plik istnieje na dysku

* Sprawdź wartość pola `image_filename` w bazie danych
* Upewnij się, że plik fizycznie znajduje się wewnątrz folderu uploads
* Zweryfikuj poprawność przekazywanego ID książki

---

### Obraz nie wyświetla się w przeglądarce

* Sprawdź poprawność literówek w adresie URL
* Upewnij się, że rozszerzenie pliku odpowiada jego faktycznemu typowi
* Potwierdź, czy plik graficzny nie jest uszkodzony

---

### Błąd importu: send_from_directory

Upewnij się, że w sekcji importów na górze pliku znajduje się:

```python
from flask import Flask, request, jsonify, send_from_directory

```
