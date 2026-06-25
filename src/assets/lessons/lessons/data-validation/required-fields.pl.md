# Wymagane pola

Walidacja danych zapewnia, że dane otrzymane przez Twoje API są poprawne i kompletne przed ich przetworzeniem. Zapobiega to wprowadzaniu nieprawidłowych danych do bazy danych i zapewnia pomocne informacje zwrotne dla użytkowników.

## Dlaczego walidujemy dane?

Bez walidacji użytkownicy mogliby wysyłać niekompletne lub nieprawidłowe dane, co prowadziłoby do:

- Nieprawidłowych danych w bazie danych
- Mylących błędów na dalszych etapach procesu
- Złego doświadczenia użytkownika (poor user experience)
- Nieoczekiwanego zachowania aplikacji

Walidacja pozwala nam wychwycić problemy przed zapisaniem danych.

---

## Walidacja wymaganych pól

Dodajmy walidację do naszego punktu końcowego POST (poprzez modyfikację istniejącego), aby upewnić się, że wymagane pola zostały dostarczone:

```python
@app.route('/api/books', methods=['POST'])
def create_book():
    data = request.get_json()

    # Validate that data is provided
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    if 'title' not in data:
        return jsonify({'error': 'Title is required'}), 400

    if 'author' not in data:
        return jsonify({'error': 'Author is required'}), 400

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
    return jsonify(book_to_dict(new_book)), 201

```

---

## Sprawdzanie pustych wartości

Pole może istnieć, ale nadal zawierać pustą wartość:

```json
{
  "title": "",
  "author": "George Orwell"
}

```

Możemy temu zapobiec, używając metody `.strip()` (proszę zastąpić obecną walidację tytułu i autora następującą walidacją):

```python
if not data['title'].strip():
    return jsonify({'error': 'Title cannot be empty'}), 400

if not data['author'].strip():
    return jsonify({'error': 'Author cannot be empty'}), 400

```

Metoda `.strip()` usuwa spacje z początku i końca ciągu znaków.

Na przykład:

```python
"   ".strip()

```

staje się:

```python
""

```

co jest uznawane za pustą wartość.

---

## Walidacja typów danych

Czasami użytkownicy wysyłają wartości w złym formacie.

Na przykład:

```json
{
  "published_year": "abc"
}

```

Możemy sprawdzić, czy wartość jest liczbą (proszę dodać tę walidację pola published_year poniżej walidacji tytułu i autora):

```python
if 'published_year' in data:
    try:
        data['published_year'] = int(data['published_year'])
    except (ValueError, TypeError):
        return jsonify(
            {'error': 'Published year must be a number'}
        ), 400

```

---

## Walidacja na poziomie API vs walidacja w bazie danych

Walidacja może odbywać się w dwóch miejscach.

### Walidacja na poziomie API

Jest to walidacja, którą piszemy w naszej trasie (route):

```python
if 'title' not in data:
    return jsonify({'error': 'Title is required'}), 400

```

Zapewnia ona pomocne informacje zwrotne dla użytkownika.

### Walidacja w bazie danych

Możemy również zdefiniować reguły w naszym modelu:

```python
title = db.Column(
    db.String(100),
    nullable=False
)

```

Zapobiega to zapisywaniu nieprawidłowych danych przez SQLAlchemy.

Stosowanie obu rodzajów walidacji sprawia, że aplikacja jest bardziej niezawodna.

---

## Wypróbuj sam

Załóżmy, że chcemy, aby pole **genre** również było wymagane.

Czy potrafisz dodać walidację, która zwraca:

```json
{
  "error": "Genre is required"
}

```

w przypadku braku tego pola?

Pomyśl o tym:

* Jaka instrukcja `if` powinna zostać dodana?
* Gdzie powinna zostać umieszczona?

```python
if 'genre' not in data:
    return jsonify({'error': 'Genre is required'}), 400

```

Umieść ją razem z innymi sprawdzeniami wymaganych pól.

---

## Podsumowanie

W tej lekcji dowiedziałeś się:

* Dlaczego walidacja jest ważna
* Jak sprawdzać, czy wymagane pola istnieją
* Jak zapobiegać pustym wartościom
* Jak walidować typy danych
* Jaka jest różnica między walidacją na poziomie API a walidacją w bazie danych
* Jak walidacja poprawia niezawodność aplikacji

W następnej lekcji będziemy kontynuować ulepszanie naszego API, dodając bardziej zaawansowaną walidację i obsługę błędów.

---

## Rozwiązywanie problemów (Troubleshooting)

### Otrzymuję komunikat:

```text
No data provided

```

Upewnij się, że wysyłasz dane JSON w treści żądania (request body).

Przykład:

```json
{
  "title": "1984",
  "author": "George Orwell"
}

```

---

### Otrzymuję komunikat:

```text
Title is required

```

Dane JSON nie zawierają pola `title`.

Sprawdź pod kątem błędów w pisowni:

```json
{
  "title": "1984"
}

```

a nie:

```json
{
  "book_title": "1984"
}

```

---

### Otrzymuję komunikat:

```text
Author is required

```

W żądaniu brakuje pola `author`.

---

### Otrzymuję komunikat:

```text
Title cannot be empty

```

Tytuł istnieje, ale zawiera tylko spacje lub pusty ciąg znaków.

Przykład:

```json
{
  "title": "",
  "author": "George Orwell"
}

```

---

### Otrzymuję komunikat:

```text
Published year must be a number

```

Upewnij się, że wartość może zostać przekonwertowana na liczbę całkowitą (integer).

Prawidłowe:

```json
{
  "published_year": 1949
}

```

lub

```json
{
  "published_year": "1949"
}

```

Nieprawidłowe:

```json
{
  "published_year": "nineteen forty-nine"
}

```

---

### Zmieniłem swój kod, ale nic się nie dzieje

Upewnij się, że:

* Serwer Flask działa
* Zapisałeś plik
* Serwer zrestartował się po wprowadzeniu zmian

Jeśli to konieczne, zatrzymaj serwer i uruchom:

```bash
python app.py

```