# Aktualizacja obrazów w żądaniach PUT

Podobnie jak w przypadku przesyłania plików graficznych podczas tworzenia książek, powinniśmy również dać użytkownikom możliwość aktualizacji lub wymiany zdjęć podczas edycji istniejących wpisów.

---

## Aktualizacja trasy update_book

Zmodyfikuj swoją trasę PUT, aby obsługiwała aktualizację obrazów (funkcja `update_book`):

```python
@app.route('/api/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    book = Book.query.get(book_id)

   # Handle missing book
    if not book:
        return error_response('Book not found', 404)

    title = request.form.get('title')
    author = request.form.get('author')
    genre = request.form.get('genre')
    published_year = request.form.get('published_year')
    image = request.files.get('image')

    # Update fields if provided
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

```

---

## Wyjaśnienie kluczowych zmian

### Pobieranie zaktualizowanego obrazu

```python
image = request.files.get('image')

```

Pobieramy przesłany plik bezpośrednio z żądania (dokładnie tak samo, jak miało to miejsce w trasie POST).

Jeśli w żądaniu nie przesłano żadnego pliku, zmienna `image` przyjmie wartość `None`.

---

### Aktualizacja obrazu tylko wtedy, gdy został przekazany

```python
if image:
    filename = secure_filename(image.filename)
    image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    book.image_filename = filename

```

* Kod ten wykonuje się tylko wtedy, gdy przesłano nowy plik graficzny
* Zapisuje nowy plik w folderze uploads
* Aktualizuje bazę danych, przypisując nową nazwę pliku
* Dotychczasowy obraz pozostaje nienaruszony, jeśli nie przesłano nowego pliku

---

## Ważne: Czyszczenie starego pliku

W podstawowej konfiguracji stare pliki obrazów NIE są automatycznie usuwane z dysku.

Oznacza to, że zwykła wymiana zdjęcia pozostawi nieużywane, osierocone pliki na serwerze.

### Zalecane ulepszenie (szczególnie w rzeczywistych projektach):

Zaktualizuj obecny blok `if image`, aby zawierał logikę czyszczenia starego pliku:

```python
if image:
    # Usuń stary obraz, jeśli istnieje
    if book.image_filename:
        old_path = os.path.join(app.config['UPLOAD_FOLDER'], book.image_filename)
        if os.path.exists(old_path):
            os.remove(old_path)

    # Zapisz nowy obraz
    filename = secure_filename(image.filename)
    image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    book.image_filename = filename

```

Zapobiega to zapełnianiu dysku przez niepotrzebne pliki.

---

## Istotne zachowanie aplikacji

### Co się stanie, jeśli zostanie przesłany tylko sam obraz?

Jeśli użytkownik prześle:

* wyłącznie plik graficzny
* brak pól tekstowych typu title / author / genre

Nic się nie popsuje.

Wynika to z faktu, że każde pole tekstowe jest aktualizowane tylko wtedy, gdy rzeczywiście zostanie przekazane w żądaniu:

```python
if title:
    book.title = title

```

Zatem:

* brakujące pola → zostaną zignorowane
* istniejące pola w bazie → pozostaną bez zmian

---

## Testowanie za pomocą programu Postman

1. Metoda: `PUT`
2. Adres URL: `http://localhost:5000/api/books/1`
3. Zakładka Body → wybierz `form-data`
4. Dodaj pola:
* title (opcjonalnie)
* author (opcjonalnie)
* genre (opcjonalnie)
* published_year (opcjonalnie)
* image (typ: File)



Następnie kliknij **Send**

---

## Najlepsze praktyki

* Zawsze projektuj aktualizację pliku graficznego jako operację opcjonalną
* Używaj funkcji `secure_filename()` w celu zachowania bezpieczeństwa
* Zawsze usuwaj stare obrazy podczas nadpisywania, aby unikać marnowania przestrzeni dyskowej
* Nigdy nie nadpisuj pól w bazie danych, chyba że zostały jawnie przekazane w żądaniu
* Dbaj o to, aby obsługa plików w trasach POST i PUT była spójna

---

## Podsumowanie

Wiesz już, jak obsługiwać aktualizację plików graficznych w żądaniach typu PUT.

Kluczowe wnioski:

* Używaj obiektu `request.files` do przechwytywania przesyłanych obrazów
* Aktualizuj plik graficzny tylko wtedy, gdy został faktycznie dołączony do żądania
* Zachowaj obecne dane w bazie, jeśli wybrane pola nie zostały przesłane
* Opcjonalnie usuwaj stare pliki z dysku, aby oszczędzać miejsce
* Utrzymuj logikę przesyłania plików w spójności z trasą POST

W następnej lekcji dowiemy się, jak prawidłowo usuwać pliki graficzne podczas kasowania książek z systemu.

---

## Rozwiązywanie problemów (Troubleshooting)

### Obraz się nie aktualizuje

* Upewnij się, że korzystasz z metody `PUT`, a nie `POST`
* Sprawdź, czy formularz form-data zawiera pole pliku o dokładnie takiej nazwie: `image`
* Zweryfikuj poprawność identyfikatora (ID) książki

---

### Stare pliki graficzne pozostają na dysku

To naturalne zachowanie, chyba że wdrożyłeś opisaną powyżej logikę czyszczenia.

Zastosuj opcjonalny fragment kodu usuwający pliki, jeśli zachodzi taka potrzeba.

---

### Błąd w aplikacji, gdy nie przesłano żadnego obrazu

Upewnij się, że cała logika przetwarzania obrazu jest zamknięta wewnątrz warunku:

```python
if image:

```

Dzięki temu żądania niezawierające plików nie doprowadzą do awarii interfejsu API.
