# Parametry zapytania (Query parameters)

Parametry zapytania (query parameters) to opcjonalne pary klucz-wartość, które pojawiają się w adresie URL po znaku `?`. Są powszechnie używane do filtrowania, przeszukiwania oraz stronicowania (paginacji) danych w interfejsach API.

## Czym są parametry zapytania?

Parametry zapytania to część adresu URL występująca po znaku zapytania `?`. Na przykład w adresie `/search?q=python` parametrem zapytania jest sekwencja `q=python`. Jeśli parametrów jest więcej, rozdziela się je znakiem ampersandu `&`: `/books?author=Orwell&year=1949`.

---

## Podstawowe użycie

Oto jak uzyskać dostęp do parametrów zapytania w aplikacji Flask:

```python
@app.route('/search')
def search():
    query = request.args.get('q', '')
    return f'Searching for: {query}'

```

Wyrażenie `request.args.get('q', '')` pobiera wartość parametru `q`. Jeśli parametr ten nie został przekazany w adresie URL, metoda bezpiecznie zwróci pusty ciąg znaków `''`.

## Wiele parametrów zapytania

Możesz równocześnie odbierać wiele różnych parametrów:

```python
@app.route('/books')
def get_books():
    author = request.args.get('author')
    year = request.args.get('year')
    return f'Author: {author}, Year: {year}'

```

Wywołanie adresu `/books?author=Orwell&year=1949` zwróci tekst: „Author: Orwell, Year: 1949”.

---

### Ćwiczenie

Zanim spojrzysz na rozwiązanie, spróbuj przewidzieć, co zwróci ta trasa:

```python
@app.route('/books')
def get_books():
    author = request.args.get('author')
    year = request.args.get('year')
    return f'Author: {author}, Year: {year}'

```

Adres URL:

```text
/books?author=Tolkien&year=1954

```

Jaki będzie rezultat?

```
Author: Tolkien, Year: 1954

```

---

## Wartości domyślne i konwersja typów

Możesz definiować własne wartości domyślne oraz automatycznie konwertować typy danych:

```python
@app.route('/items')
def get_items():
    limit = request.args.get('limit', 10, type=int)
    offset = request.args.get('offset', 0, type=int)
    return f'Limit: {limit}, Offset: {offset}'

```

Przekazanie argumentu `type=int` sprawia, że Flask automatycznie próbuje przekształcić odebrany tekst (string) na liczbę całkowitą (integer).

---

## Wiele wartości dla jednego parametru

Czasami pojedynczy klucz parametru może zawierać listę wielu wartości:

```python
@app.route('/tags')
def get_tags():
    tags = request.args.getlist('tag')
    return f'Tags: {tags}'

```

Wywołanie adresu `/tags?tag=python&tag=flask` zwróci listę wartości: „Tags: ['python', 'flask']”.

---

## Sprawdzanie, czy parametr istnieje

Możesz łatwo zweryfikować, czy dany parametr został w ogóle przesłany w żądaniu:

```python
@app.route('/filter')
def filter():
    if 'category' in request.args:
        category = request.args['category']
        return f'Filtering by: {category}'
    return 'No category filter'

```

---

## Podsumowanie

* Parametry zapytania pozwalają klientom przesyłać opcjonalne dane w adresie URL po znaku `?`
* Służą głównie do filtrowania, wyszukiwania i personalizowania odpowiedzi serwera
* W ekosystemie Flask uzyskujesz do nich dostęp za pomocą obiektu `request.args`
* Mogą posiadać przypisane wartości domyślne lub być całkowicie opcjonalne
* Pojedyncze wartości pobierasz metodą `get()`, a listy wartości za pomocą `getlist()`

---

## Rozwiązywanie problemów (Troubleshooting)

### Parametr zawsze zwraca wartość `None`

Sprawdź czy:

* Nazwa parametru w kodzie i w adresie URL jest dokładnie taka sama (wielkość liter ma znaczenie)
* Adres URL rzeczywiście zawiera poprawną strukturę parametrów

Przykład:

```text
/books?author=Orwell

```

musi precyzyjnie odpowiadać zapisowi w kodzie:

```python
request.args.get('author')

```

---

### Błąd konwersji typu danych (Wrong type conversion)

Jeśli korzystasz z jawnego rzutowania typów:

```python
request.args.get('limit', type=int)

```

upewnij się, że wartość przekazywana w adresie URL faktycznie jest liczbą:

Poprawnie:

```text
/items?limit=10

```

Niepoprawnie:

```text
/items?limit=ten

```
