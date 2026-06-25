# Zwracanie danych w formacie JSON

Budując interfejsy API, zazwyczaj nie zwracamy odpowiedzi w formacie czystego tekstu (plain text).

Zamiast tego API zwracają dane w formacie o nazwie **JSON**.

JSON to standardowy format używany przez aplikacje internetowe do wymiany danych pomiędzy warstwą wizualną (front-endem) a serwerową (back-endem).

> **Wskazówka:** Nie musisz kopiować wszystkich przykładów z tej lekcji do swojego pliku `app.py`. Służą one wyłącznie celom edukacyjnym, aby pomóc Ci zrozumieć, jak działają odpowiedzi JSON.

## Czym jest JSON?

JSON to akronim od angielskiej nazwy:

```text
JavaScript Object Notation (Notacja Obiektowa Języka JavaScript)

```

Pomimo swojej nazwy, JSON jest obecnie używany przez prawie każdy język programowania, a nie tylko przez JavaScript.

Obiekt JSON wygląda następująco:

```json
{
    "id": 1,
    "title": "1984",
    "author": "George Orwell"
}

```

JSON przechowuje informacje za pomocą struktury:

* Kluczy (`"title"`)
* Wartości (`"1984"`)

Możesz o nim myśleć jak o ustrukturyzowanym sposobie organizowania danych.

---

## Dlaczego interfejsy API używają formatu JSON

Wyobraź sobie, że front-end prosi Twój back-end o informacje na temat danej książki.

Zwrócenie tekstu w takiej formie:

```text
1984 by George Orwell

```

może i jest czytelne dla ludzi, ale dla programów komputerowych stanowi duży problem przy próbie automatycznego przetworzenia danych.

Zamiast tego API zwracają dane ustrukturyzowane:

```json
{
    "id": 1,
    "title": "1984",
    "author": "George Orwell"
}

```

Teraz aplikacja front-endowa może w prosty sposób odwołać się do konkretnych właściwości:

```text
title → 1984
author → George Orwell

```

Właśnie dlatego JSON stał się powszechnym standardem w komunikacji API.

---

## Czym jest jsonify()?

Flask udostępnia wbudowaną funkcję pomocniczą o nazwie:

```python
jsonify()

```

Konwertuje ona pythonowe struktury danych (np. słowniki) na format JSON oraz automatycznie ustawia odpowiednie nagłówki HTTP w odpowiedzi serwera.

Zanim jej użyjesz, musisz ją zaimportować:

```python
from flask import jsonify

```

Bez użycia `jsonify()`, Flask nie wiedziałby, że intencją programisty jest zwrócenie danych w formacie JSON.

---

## Zwracanie obiektu JSON

Słownik Pythona (dictionary) można bardzo łatwo przekształcić w format JSON przy użyciu funkcji `jsonify()`.

Przykład:

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/book')
def get_book():

    book = {
        "id": 1,
        "title": "1984",
        "author": "George Orwell"
    }

    return jsonify(book)

```

Gdy użytkownik odwiedzi adres:

```text
/api/book

```

Flask zwróci poprawny obiekt JSON:

```json
{
    "id": 1,
    "title": "1984",
    "author": "George Orwell"
}

```

---

## Wypróbuj sam

Dodaj rok wydania (publication year) do powyższej książki i zwróć zmodyfikowany obiekt jako JSON.

Spróbuj napisać kod przed otwarciem rozwiązania.

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/book')
def get_book():

    book = {
        "id": 1,
        "title": "1984",
        "author": "George Orwell",
        "year": 1949
    }

    return jsonify(book)

```

---

## Zwracanie wielu elementów (list)

Interfejsy API bardzo często zwracają całe listy danych.

Przykład:

```python
@app.route('/api/books')
def get_books():

    books = [
        {"id": 1, "title": "1984"},
        {"id": 2, "title": "Brave New World"}
    ]

    return jsonify(books)

```

Taka trasa zwróci następującą tablicę JSON:

```json
[
    {
        "id": 1,
        "title": "1984"
    },
    {
        "id": 2,
        "title": "Brave New World"
    }
]

```

---

## Wypróbuj sam

Dodaj trzecią, dowolną książkę do powyższej listy.

Spróbuj zrobić to sam przed otwarciem rozwiązania.

```python
@app.route('/api/books')
def get_books():

    books = [
        {"id": 1, "title": "1984"},
        {"id": 2, "title": "Brave New World"},
        {"id": 3, "title": "Fahrenheit 451"}
    ]

    return jsonify(books)

```

---

## Kody statusu HTTP

Każda odpowiedź z serwera może (i powinna) zawierać kod statusu HTTP.

Przykład:

```python
return jsonify(book), 200

```

Druga wartość przekazywana w instrukcji `return` informuje klienta, czy żądanie zakończyło się sukcesem, czy błędem.

Popularne kody statusu:

| Kod | Znaczenie |
| --- | --- |
| 200 | Sukces (OK) |
| 201 | Utworzono zasób (Created) |
| 400 | Niepoprawne żądanie (Bad request) |
| 404 | Nie znaleziono (Not found) |
| 500 | Wewnętrzny błąd serwera (Internal server error) |

---

## Zwracanie odpowiedzi z błędami

Informacje o błędach również powinny być zwracane w formacie JSON, aby aplikacja kliencka mogła je łatwo odczytać.

Przykład:

```python
@app.route('/api/book/<int:book_id>')
def get_book(book_id):

    if book_id > 100:
        return jsonify({
            "error": "Book not found"
        }), 404

    return jsonify({
        "id": book_id,
        "title": "Book Title"
    }), 200

```

Jeśli użytkownik poprosi o książkę, która nie istnieje, API zwróci strukturę JSON:

```json
{
    "error": "Book not found"
}

```

wraz z kodem statusu HTTP `404 Not Found`.

---

## Dlaczego spójność formatu JSON ma znaczenie

Wyobraź sobie sytuację, w której jedna trasa w Twoim projekcie zwraca:

```json
{
    "title": "1984"
}

```

a inna trasa zwraca:

```json
{
    "book_title": "1984"
}

```

Programista tworzący front-end musi teraz pisać skomplikowane warunki, aby obsłużyć oba te formaty.

Spójne API jest znacznie łatwiejsze w użyciu, integracji i późniejszym utrzymaniu. Staraj się zachować jednolitą strukturę odpowiedzi w całym swoim projekcie.

---

## Najlepsze praktyki

* Zawsze zwracaj dane JSON za pomocą funkcji `jsonify()`
* Dbaj o to, aby struktura odpowiedzi była prosta i spójna
* Używaj jasnych i zrozumiałych nazw właściwości (kluczy)
* Zwracaj odpowiednie kody statusu HTTP
* Formaty błędów przekazuj również jako obiekty JSON
* Wysyłaj tylko te dane, których klient faktycznie potrzebuje

---

## Podsumowanie

W tej lekcji dowiedziałeś się:

* Czym jest format JSON
* Dlaczego nowoczesne API korzystają z JSON-a
* Do czego służy funkcja `jsonify()` we Flasku
* Jak zwracać pojedyncze obiekty JSON oraz ich listy
* Jak poprawnie dołączać kody statusu HTTP do odpowiedzi
* Jak zwracać czytelne komunikaty o błędach

JSON to podstawowy sposób komunikacji front-endu z serwerem, dlatego pełne zrozumienie tej lekcji jest niezbędne przed przystąpieniem do budowania własnych funkcjonalności API.

W kolejnej lekcji zaczniesz tworzyć trasy API, które będą zwracać realne dane pobrane z Twojej aplikacji.

---

## Rozwiązywanie problemów (Troubleshooting)

### Błąd: jsonify is not defined

Jeśli w konsoli widzisz błąd:

```text
NameError: name 'jsonify' is not defined

```

upewnij się, że dodałeś poprawny import na samej górze pliku:

```python
from flask import jsonify

```

---

### Odpowiedź nie jest formatem JSON

Upewnij się, że w instrukcji zwracania wartości używasz funkcji pomocniczej:

```python
return jsonify(data)

```

zamiast bezpośredniego:

```python
return data

```

---

### Moje zmiany nie pojawiają się w przeglądarce

Jeśli Flask nie odświeża automatycznie kodu po zapisaniu pliku:

1. Zatrzymaj serwer ręcznie w terminalu:

```text
Ctrl + C

```

2. Uruchom go ponownie:

```bash
python app.py

```

Upewnij się również, że masz włączony tryb debugowania w kodzie:

```python
app.run(debug=True)

```

---

### Przeglądarka wyświetla surowy tekst JSON

To zupełnie normalne zjawisko. Przeglądarki internetowe domyślnie wyświetlają strukturę JSON jako zwykły tekst. W prawdziwej aplikacji to kod front-endowy odbiera ten niewidoczny dla użytkownika strumień danych i renderuje go w ładny, przyjazny graficznie sposób.
