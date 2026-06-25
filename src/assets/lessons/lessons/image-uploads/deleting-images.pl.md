# Usuwanie zdjęć podczas usuwania książek

Kiedy usuwamy książkę, powinniśmy również posprzątać powiązany z nią plik graficzny, aby uniknąć pozostawiania osieroconych plików na serwerze.

> **Ważne**: Usuń zdjęcie tylko wtedy, gdy żadne inne książki z niego nie korzystają. Zapobiega to przypadkowemu usunięciu obrazu, który jest współdzielony przez wiele książek.

---

## Aktualizacja trasy delete_book

Zmodyfikuj swoją trasę DELETE, aby uwzględnić czyszczenie obrazu ze zliczaniem referencji (funkcja `delete_book`):

```python
@app.route('/api/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = Book.query.get(book_id)

    # If the book doesn't exist, return a 404 error
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

            if os.path.exists(path):
                os.remove(path)

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

```

---

## Zrozumienie kodu czyszczącego

### Sprawdzenie, czy zdjęcie istnieje

```python
if book.image_filename:

```

Próbę usunięcia podejmujemy tylko wtedy, gdy książka rzeczywiście ma przypisaną nazwę pliku obrazu w bazie danych.

---

### Sprawdzenie współdzielenia obrazu

```python
other_books_with_image = Book.query.filter(
    Book.id != book_id,
    Book.image_filename == book.image_filename
).count()

```

Ta linijka zlicza, ile innych książek (wykluczając tę aktualnie usuwaną) używa tej samej nazwy pliku graficznego.

* `Book.id != book_id` → wyklucza bieżącą książkę ze zliczania
* `Book.image_filename == book.image_filename` → wyszukuje książki o identycznej nazwie pliku obrazu

---

### Warunkowe usuwanie

```python
if other_books_with_image == 0:
    path = os.path.join(app.config['UPLOAD_FOLDER'], book.image_filename)

    if os.path.exists(path):
        os.remove(path)

```

Plik obrazu zostanie usunięty z dysku tylko wtedy, gdy:

* Żadne inne książki się do niego nie odwołują (`count == 0`)
* Plik fizycznie istnieje na dysku

---

## Istotne zachowanie aplikacji

### Jeśli obraz jest unikalny dla tej książki:

* plik zostaje usunięty z dysku
* książka zostaje usunięta z bazy danych

### Jeśli obraz jest współdzielony przez inne książki:

* plik NIE zostaje usunięty (inne książki wciąż go potrzebują)
* książka zostaje usunięta z bazy danych
* obraz pozostaje dostępny dla pozostałych książek

### Jeśli obraz NIE istnieje fizycznie:

* następuje tylko usunięcie wpisu z bazy danych
* nie zostaje zgłoszony żaden błąd

---

## Dlaczego jest to ważne

Bez zliczania referencji:

* usunięcie jednej książki mogłoby uszkodzić wyświetlanie innych książek, które współdzielą to samo zdjęcie
* użytkownicy zobaczyliby uszkodzone miniatury obrazów przy pozostałych książkach
* integralność danych zostałaby naruszona

Bez jakiegokolwiek czyszczenia plików:

* usunięte książki pozostawiałyby po sobie pliki graficzne
* folder `/uploads` rósłby bez końca wraz z upływem czasu
* przestrzeń dyskowa byłaby marnowana
* osierocone pliki gromadziłyby się na serwerze

---

## Ćwiczenie

Co się stanie, jeśli dwie książki współdzielą ten sam obraz i usuniesz jedną z nich?

Plik obrazu NIE zostanie usunięty.

Ponieważ:

```python
other_books_with_image = Book.query.filter(
    Book.id != book_id,
    Book.image_filename == book.image_filename
).count()

if other_books_with_image == 0:
    # usunięcie obrazu

```

Kiedy usuwasz pierwszą książkę:

* `other_books_with_image` zwraca wartość `1` (druga książka wciąż go używa)
* Warunek `other_books_with_image == 0` zwraca `False`
* Plik obrazu NIE zostaje usunięty
* Druga książka nadal ma bezproblemowy dostęp do obrazu

Kiedy usuwasz drugą książkę:

* `other_books_with_image` zwraca wartość `0` (żadna inna książka go nie używa)
* Warunek `other_books_with_image == 0` zwraca `True`
* Plik obrazu ZOSTAJE usunięty

---

## Opcjonalnie: bezpieczniejsza wersja produkcyjna

Jeśli chcesz zastosować bezpieczniejsze logowanie błędów (zalecane w rzeczywistych aplikacjach):

```python
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

```

Dzięki temu interfejs API nigdy nie zawiesi się z powodu niespodziewanych problemów z systemem plików.

---

## Najlepsze praktyki

* Zawsze usuwaj powiązane pliki podczas usuwania rekordów z bazy danych
* Zawsze sprawdzaj istnienie pliku na dysku przed próbą jego skasowania
* Nigdy nie pozwól, aby błędy systemu plików blokowały operacje na bazie danych
* Rozważ logowanie niepowodzeń usunięcia plików
* Utrzymuj porządek w folderze z plikami, aby uniknąć marnowania przestrzeni dyskowej

---

## Podsumowanie

Posiadasz już pełną obsługę cyklu życia plików graficznych:

* Przesyłanie obrazów
* Bezpieczna aktualizacja obrazów
* Zastępowanie starych plików nowymi
* Usuwanie obrazów w momencie usuwania książek

Kluczowy wniosek:

Usuwanie danych z bazy oraz czyszczenie systemu plików muszą zawsze pozostać ze sobą zsynchronizowane.

---

## Rozwiązywanie problemów (Troubleshooting)

### Plik obrazu nie jest usuwany

Sprawdź:

* czy pole `image_filename` nie ma wartości None
* czy ścieżka do folderu uploadu jest prawidłowa
* czy kod czyszczący znajduje się wewnątrz trasy obsługującej metodę DELETE

---

### Błąd uprawnień (Permission error) podczas usuwania

Możliwe przyczyny:

* plik jest zablokowany przez inny proces
* brak uprawnień do zapisu/modyfikacji w systemie
* restrykcje systemu operacyjnego

Popraw uprawnienia do folderów w katalogu swojego projektu.

---

### Książka się usuwa, ale plik pozostaje na dysku

To oznacza, że:

* kod czyszczący został pominięty lub się nie wykonuje
* ścieżka do pliku (`path`) jest nieprawidłowa

Dodaj drukowanie testowe (debug print), aby sprawdzić ścieżkę:

```python
print(path)

```