# Wyszukiwanie książek

Zaimplementujmy funkcję wyszukiwania, aby móc znajdować książki po tytule lub autorze. Wyszukiwanie to powszechna funkcja w interfejsach API, która ułatwia użytkownikom odnalezienie konkretnych elementów.

---

## Punkt końcowy wyszukiwania

Dodaj tę trasę (route) do swojego pliku `app.py` (poniżej trasy z poprzedniej lekcji):

```python
@app.route('/api/books/search', methods=['GET'])
def search_books():
    query = request.args.get('q', '')

    # Check if the query is empty
    if not query:
        return jsonify({'error': 'Search query is required'}), 400

    # Perform the search
    books = Book.query.filter(
        (Book.title.ilike(f'%{query}%')) |
        (Book.author.ilike(f'%{query}%'))
    ).all()

    return jsonify([book_to_dict(book) for book in books]), 200

```

## Jak to działa

1. Pobieramy frazę wyszukiwania z parametru zapytania o nazwie `q`.
2. Jeśli nie podano żadnej frazy, zwracamy błąd.
3. Metoda `ilike()` wykonuje wyszukiwanie bez uwzględniania wielkości liter.
4. Znak `%` działa jako symbol wieloznaczny (wildcard) i dopasowuje dowolne znaki.
5. Znak `|` oznacza logiczne LUB (OR).
6. Wszystkie pasujące książki są zwracane w formacie JSON.

---

## Zrozumienie mechanizmu wyszukiwania

Wyszukiwanie szuka podanej frazy w dowolnym miejscu wewnątrz tytułu lub autora.

Na przykład:

| Fraza wyszukiwania | Pasujące wyniki |
| --- | --- |
| `198` | `1984` |
| `orwell` | `George Orwell` |
| `ring` | `The Lord of the Rings` |

Ponieważ używamy metody `ilike()`, wielkość liter nie ma znaczenia.

Poniższe zapytania zwrócą dokładnie ten sam wynik:

```text
orwell
Orwell
ORWELL

```

## Zrozumienie znaku `%`

Symbol `%` oznacza „dowolne znaki”.

Przykłady:

```python
Book.title.ilike('%ring%')

```

Dopasuje:

```text
The Lord of the Rings
Ringworld

```

ponieważ słowo „ring” pojawia się gdzieś wewnątrz tytułu.

Bez użycia znaków `%`, tytuł musiałby być dokładnie taki sam jak wpisana fraza.

---

## Testowanie punktu końcowego

Uruchom swój serwer Flask i odwiedź (w programie Postman lub w przeglądarce) poniższy adres:

```text
[http://127.0.0.1:5000/api/books/search?q=1984](http://127.0.0.1:5000/api/books/search?q=1984)

```

lub

```text
[http://127.0.0.1:5000/api/books/search?q=Orwell](http://127.0.0.1:5000/api/books/search?q=Orwell)

```

Jeśli pasujące książki istnieją w bazie danych, zostaną one zwrócone w formacie JSON.

---

## Spróbuj sam

Obecnie użytkownicy mogą wyszukiwać według:

* Tytułu (Title)
* Autora (Author)

Czy potrafisz zmodyfikować wyszukiwanie tak, aby użytkownicy mogli wyszukiwać również według **gatunku** (genre)?

Pomyśl o tym:

* Które pole powinno zostać dodane?
* Gdzie powinien trafić nowy warunek?
* Czy ono również powinno używać metody `ilike()`?

```python
books = Book.query.filter(
    (Book.title.ilike(f'%{query}%')) |
    (Book.author.ilike(f'%{query}%')) |
    (Book.genre.ilike(f'%{query}%'))
).all()

```

---

## Podsumowanie

W tej lekcji dowiedziałeś się:

* Jak utworzyć punkt końcowy wyszukiwania
* Jak parametry zapytania (query parameters) mogą być używane do wyszukiwania danych
* Jak metoda `ilike()` wykonuje wyszukiwanie niezależne od wielkości liter
* Jak znak `%` działa jako symbol wieloznaczny
* Jak zwracać pasujące rekordy bazy danych w formacie JSON

W następnej lekcji dowiesz się, jak aktualizować istniejące książki w bazie danych.

---

## Rozwiązywanie problemów (Troubleshooting)

### Otrzymuję komunikat:

```text
Search query is required

```

Upewnij się, że dołączyłeś parametr zapytania `q` do adresu URL:

```text
/api/books/search?q=1984

```

---

### Otrzymuję błąd:

```text
NameError: name 'request' is not defined

```

Upewnij się, że zaimportowałeś obiekt `request`:

```python
from flask import request

```

---

### Moje wyszukiwanie zwraca pustą listę

```json
[]

```

Zwykle oznacza to, że:

* Żadne książki nie pasują do wpisanej frazy wyszukiwania.
* Baza danych jest pusta.
* Fraza wyszukiwania jest zapisana inaczej niż dane przechowywane w bazie.

Spróbuj wyszukać ogólniejszą frazę.

---

### Zmiany nie są widoczne

Upewnij się, że:

* Serwer Flask jest uruchomiony.
* Zapisałeś swój plik.
* Serwer zrestartował się po wprowadzeniu zmian.

W razie potrzeby zatrzymaj serwer i uruchom go ponownie:

```bash
python app.py

```