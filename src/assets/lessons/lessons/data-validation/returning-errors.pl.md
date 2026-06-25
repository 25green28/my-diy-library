# Zwracanie błędów

Nawet przy wdrożonej walidacji coś nadal może pójść nie tak. Klient może zażądać książki, która nie istnieje, wysłać nieprawidłowe dane lub wywołać nieoczekiwany błąd serwera.

Dobre interfejsy API zwracają jasne komunikaty o błędach, które pomagają klientom zrozumieć, co się stało.

---

## Dlaczego warto zwracać błędy?

Wyobraź sobie, że klient próbuje pobrać książkę, która nie istnieje.

Bez odpowiedniej obsługi błędów może otrzymać mylącą odpowiedź lub nie otrzymać żadnych przydatnych informacji.

Zamiast tego powinniśmy zwrócić:

```json
{
  "error": "Book not found"
}

```

wraz z odpowiednim kodem statusu HTTP.

Dzięki temu API jest łatwiejsze w użyciu i debugowaniu.

---

## Tworzenie funkcji pomocniczej

Do tej pory prawdopodobnie pisałeś odpowiedzi z błędami w ten sposób:

```python
return jsonify({
    'error': 'Book not found'
}), 404

```

To działa, ale skończy się to powtarzaniem tego samego kodu w wielu trasach (routes).

Stwórzmy funkcję pomocniczą, która będzie generować dla nas odpowiedzi z błędami.

### Krok 1: Dodaj funkcję pomocniczą

Otwórz plik `app.py`.

Umieść poniższą funkcję pod funkcją `book_to_dict`, a nad swoją pierwszą trasą.

```python
# Helper function to return an error response
def error_response(message, status_code):
    return jsonify({
        'error': message,
        'status': status_code
    }), status_code

```

### Krok 2: Użyj funkcji pomocniczej

Ilekrość zobaczysz kod taki jak:

```python
return jsonify({
    'error': 'Book not found'
}), 404

```

możesz zastąpić go przez:

```python
return error_response(
    'Book not found',
    404
)

```

Obie wersje działają dokładnie tak samo.

---

## Typowe kody statusu błędów

Oto najczęstsze kody statusu, których będziesz używać:

| Kod statusu | Znaczenie |
| --- | --- |
| 400 | Bad Request |
| 404 | Resource Not Found |
| 500 | Internal Server Error |

### 400 Bad Request

Klient wysłał nieprawidłowe dane.

Przykład:

```python
return error_response(
    'Title is required',
    400
)

```

---

### 404 Not Found

Żądany zasób nie istnieje.

Przykład:

```python
return error_response(
    'Book not found',
    404
)

```

---

### 500 Internal Server Error

Na serwerze wydarzyło się coś nieoczekiwanego.

Przykład:

```python
return error_response(
    'Internal server error',
    500
)

```

---

## Obsługa nieoczekiwanych błędów

Czasami podczas interakcji z bazą danych dzieje się coś nieoczekiwanego.

Python pozwala nam przechwytywać te błędy za pomocą instrukcji `try` i `except`.

### Krok 1: Znajdź operację commit bazy danych

Masz już kod podobny do:

```python
db.session.add(new_book)
db.session.commit()

return jsonify(book_to_dict(new_book)), 201

```

w swojej funkcji `create_book` oraz,

```python
db.session.commit()

return jsonify(book_to_dict(book)), 200

```

w swojej funkcji `update_book`.

### Krok 2: Otocz operację commit blokiem try/except

Zastąp go przez:

```python
db.session.add(new_book)

try:
    # Commit the transaction
    db.session.commit()

except Exception:
    # Rollback the transaction and return an error
    db.session.rollback()

    return error_response(
        'Internal server error',
        500
    )

return jsonify(book_to_dict(new_book)), 201

```

dla funkcji `create_book`, oraz przez:

```python
try: 
    # Commit the transaction
    db.session.commit()

except Exception:
    # Rollback the transaction and return an error
    db.session.rollback()

    return error_response(
        'Internal server error',
        500
    )

return jsonify(book_to_dict(book)), 200

```

dla funkcji `update_book`.

### Co to robi?

* `try` wykonuje kod
* Jeśli wystąpi błąd, Python przechodzi do sekcji `except`
* `rollback()` cofa niezakończone zmiany w bazie danych
* API zwraca błąd zamiast się zawiesić

Pomyśl o `rollback()` jak o przycisku „Cofnij” (Undo) dla operacji na bazie danych.

---

## Wypróbuj sam

Załóżmy, że użytkownik żąda książki, która nie istnieje.

Uzupełnij brakujący kod statusu:

```python
if not book:
    return error_response(
        'Book not found',
        ?
    )

```

Który kod statusu powinien zostać zwrócony?

```python
if not book:
    return error_response(
        'Book not found',
        404
    )

```

---

## Zwracanie błędów walidacji

> **Uwaga:** Ta sekcja ma charakter wyłącznie informacyjny. Zalecam pominięcie wdrażania tej sekcji.

Czasami w żądaniu występuje wiele problemów jednocześnie.

Na przykład:

```json
{
  "title": ""
}

```

To żądanie:

* Ma pusty tytuł
* Nie zawiera autora

Możemy zwrócić wiele błędów naraz:

```python
return jsonify({
    'error': 'Validation failed',
    'errors': [
        'Title cannot be empty',
        'Author is required'
    ]
}), 400

```

Odpowiedź:

```json
{
  "error": "Validation failed",
  "errors": [
    "Title cannot be empty",
    "Author is required"
  ]
}

```

Daje to klientom bardziej przydatne informacje.

---

## Podsumowanie

W tej lekcji dowiedziałeś się:

* Dlaczego interfejsy API powinny zwracać jasne komunikaty o błędach
* Jak stworzyć funkcję pomocniczą wielokrotnego użytku do obsługi błędów
* Jaka jest różnica między kodami statusu 400, 404 i 500
* Jak zwracać spójne odpowiedzi z błędami
* Jak działają instrukcje `try` i `except`
* Dlaczego funkcja `rollback()` jest ważna, gdy operacje na bazie danych zakończą się niepowodzeniem

W następnej lekcji będziemy kontynuować ulepszanie naszego API, czyniąc je bardziej niezawodnym i przyjaznym dla użytkownika.

---

## Rozwiązywanie problemów (Troubleshooting)

### Otrzymuję komunikat:

```text
NameError: name 'error_response' is not defined

```

Upewnij się, że funkcja pomocnicza została utworzona:

```python
# Helper function to return an error response
def error_response(message, status_code):
    return jsonify({
        'error': message,
        'status': status_code
    }), status_code

```

zanim jej użyjesz.

---

### Otrzymuję komunikat:

```text
Working outside of application context

```

Zwykle dzieje się tak, gdy operacje na bazie danych są wykonywane poza kontekstem aplikacji Flask.

Upewnij się, że operacje na bazie danych odbywają się wewnątrz tras Flask (Flask routes) lub wewnątrz bloku:

```python
with app.app_context():

```

---

### Otrzymuję komunikat:

```text
Internal server error

```

Wystąpił nieoczekiwany błąd.

Sprawdź dane wyjściowe w terminalu, aby zobaczyć prawdziwy komunikat o błędzie.

Terminal zazwyczaj zawiera bardziej szczegółowe informacje niż odpowiedź z API.

---

### Moje API zawiesza się zamiast zwrócić błąd

Upewnij się, że kod niosący ryzyko błędu znajduje się wewnątrz bloku `try`:

```python
try:
    db.session.commit()

except Exception:
    db.session.rollback()

    return error_response(
        'Internal server error',
        500
    )

```

Bez bloku `try/except` Python przerwie wykonywanie programu w momencie wystąpienia błędu.