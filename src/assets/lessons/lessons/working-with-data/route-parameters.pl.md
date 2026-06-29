# Parametry trasy (Route parameters)

Parametry trasy (route parameters) pozwalają Flaskowi przechwytywać wartości bezpośrednio z adresu URL i przekazywać je jako argumenty do Twoich funkcji w Pythonie.

Są one kluczowe podczas budowania interfejsów API, ponieważ umożliwiają pracę z konkretnymi zasobami, takimi jak pojedyncze książki, użytkownicy czy zamówienia.

> **Wskazówka:** Nie musisz kopiować wszystkich przykładów z tej lekcji do swojego pliku `app.py`. Służą one celom edukacyjnym, aby pomóc Ci zrozumieć, jak działają parametry tras.

## Dlaczego potrzebujemy parametrów trasy?

Wyobraź sobie, że budujesz API dla biblioteki.

Użytkownik aplikacji może chcieć wyświetlić szczegóły:
* Książki o ID 1
* Książki o ID 15
* Książki o ID 42

Tworzenie osobnej trasy dla każdej istniejącej książki byłoby niemożliwe:

```text
/book/1
/book/2
/book/3
...

```

Zamiast tego Flask pozwala na tworzenie dynamicznych części adresu URL.

Na przykład:

```python
@app.route('/book/<book_id>')
def get_book(book_id):
    return f'Book ID: {book_id}'

```

Teraz ta jedna pojedyncza trasa obsłuży dowolne wywołanie:

```text
/book/1
/book/15
/book/42

```

Flask automatycznie wyciągnie wartość z adresu URL i przekaże ją do funkcji.

---

## Twój pierwszy parametr trasy

Parametr trasy zapisujemy wewnątrz nawiasów ostrokątnych:

```python
@app.route('/user/<username>')
def user_profile(username):
    return f'User: {username}'

```

Jeśli ktoś odwiedzi adres:

```text
/user/john

```

Flask przechwyci wartość:

```text
john

```

i przypisze ją do zmiennej:

```python
username

```

Odpowiedź serwera będzie brzmieć:

```text
User: john

```

---

## Jak Flask przekazuje wartości

Zwróć uwagę, że nazwa parametru musi pojawić się w kodzie dwukrotnie:

```python
@app.route('/user/<username>')
def user_profile(username):

```

Nazwa użyta wewnątrz definicji trasy:

```python
<username>

```

musi być dokładnie taka sama jak nazwa argumentu funkcji:

```python
def user_profile(username):

```

W przeciwnym razie Flask nie będzie wiedział, gdzie umieścić przechwyconą z adresu URL wartość.

---

## Wypróbuj sam

Utwórz trasę, która przechwytuje nazwę użytkownika (username) i wyświetla ją na ekranie.

Spróbuj napisać ją samodzielnie przed otwarciem rozwiązania.

```python
@app.route('/user/<username>')
def user_profile(username):
    return f'User: {username}'

```

---

## Konwertery typów (Type converters)

Domyślnie wszystkie parametry trasy są traktowane przez Flaska jako zwykły tekst (string).

Flask potrafi jednak automatycznie konwertować je na konkretne typy danych Pythona.

Przykład:

```python
@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'Post ID: {post_id}'

```

Dzięki temu Flask zaakceptuje wyłącznie liczby całkowite:

Adres `/post/42` zadziała poprawnie, natomiast adres `/post/hello` zwróci błąd.

### Dostępne konwertery

| Konwerter | Opis |
| --- | --- |
| `<int:id>` | Liczba całkowita (Integer) |
| `<float:value>` | Liczba zmiennoprzecinkowa (Decimal) |
| `<string:name>` | Tekst (domyślny format) |
| `<path:subpath>` | Tekst z uwzględnieniem ukośników (slashes) |

---

## Wypróbuj sam

Co powinno znaleźć się w miejscu wykropkowanym (`_____`), aby trasa przyjmowała tylko liczby?

```python
@app.route('/post/<_____:post_id>')
def show_post(post_id):
    return f'Post ID: {post_id}'

```

```python
@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'Post ID: {post_id}'

```

---

## Wiele parametrów w jednej trasie

Trasy mogą przechwytywać więcej niż jedną wartość naraz.

Przykład:

```python
@app.route('/user/<username>/post/<int:post_id>')
def show_user_post(username, post_id):
    return f"{username}'s post #{post_id}"

```

Odwiedzenie adresu `/user/john/post/42` przypisze wartości:

```text
username = john
post_id = 42

```

i zwróci tekst: „john's post #42”.

---

## Parametry opcjonalne

Czasami chcemy, aby ta sama trasa działała poprawnie zarówno z parametrem, jak i bez niego.

Przykład:

```python
@app.route('/page')
@app.route('/page/<int:page_num>')
def show_page(page_num=1):
    return f'Page {page_num}'

```

Wejście na adres `/page` zwróci tekst „Page 1”, ponieważ użyta zostanie domyślna wartość argumentu (`page_num=1`).

Wejście na adres `/page/5` zwróci tekst „Page 5”, ponieważ Flask nadpisze argument wartością przekazaną w URL.

---

## Dlaczego walidacja danych wciąż jest ważna

Konwertery typów sprawdzają wyłącznie sam typ przekazywanej zmiennej.

Zapis:

```python
@app.route('/book/<int:book_id>')

```

gwarantuje jedynie, że `book_id` będzie liczbą całkowitą. Flask nie wie jednak, czy ta liczba ma sens biznesowy w Twojej aplikacji. Użytkownik wciąż może wywołać adresy takie jak `/book/0` lub `/book/-10`.

Musisz samodzielnie zadbać o logiczną walidację wartości wewnątrz funkcji, gdy jest to konieczne:

```python
@app.route('/book/<int:book_id>')
def get_book(book_id):

    if book_id < 1:
        return 'Invalid book ID', 400

    return f'Book {book_id}'

```

---

## Wypróbuj sam

Uzupełnij poniższy warunek, aby identyfikatory mniejsze niż 1 były odrzucane z kodem błędu 400.

```python
@app.route('/book/<int:book_id>')
def get_book(book_id):

    if _______:
        return 'Invalid book ID', 400

    return f'Book {book_id}'

```

```python
if book_id < 1:

```

---

## Znaczenie parametrów trasy

Parametry trasy są fundamentem każdego profesjonalnego interfejsu API.

Przykłady:

```text
GET    /api/books/1
GET    /api/books/15
DELETE /api/books/42

```

Definiując uniwersalną trasę `@app.route('/api/books/<int:book_id>')`, pozwalasz Flaskowi automatycznie obsługiwać i identyfikować żądane zasoby. Bez parametrów tras tworzenie dynamicznych aplikacji internetowych byłoby niesamowicie trudne.

---

## Podsumowanie

W tej lekcji dowiedziałeś się:

* Czym są parametry trasy
* W jaki sposób Flask przechwytuje dane bezpośrednio z adresów URL
* Jak poprawnie przekazywać te wartości do funkcji Pythona
* Do czego służą i jak działają konwertery typów (`int`, `float`, itd.)
* Jak obsługiwać wiele parametrów w jednej trasie
* Jak tworzyć elastyczne trasy z parametrami opcjonalnymi
* Dlaczego dodatkowa walidacja wartości logicznych jest ważna

Parametry tras to jeden z najważniejszych elementów budulcowych architektur REST API, ponieważ umożliwiają Twojej aplikacji dynamiczną pracę na określonych, unikalnych zasobach.

W kolejnej lekcji dowiesz się, jak przekazywać dodatkowe, opcjonalne informacje w adresach URL za pomocą tzw. parametrów zapytania (query parameters).

---

## Rozwiązywanie problemów (Troubleshooting)

### Otrzymuję błąd 404 Not Found

Upewnij się, że struktura wpisywanego adresu URL dokładnie odpowiada definicji trasy w kodzie.

Jeśli trasa `@app.route('/book/<int:book_id>')` oczekuje liczby całkowitej (integer), wywołanie adresu `/book/10` zadziała, ale wywołanie `/book/hello` zakończy się błędem 404, ponieważ tekst nie pasuje do reguły konwertera `int`.

---

### Parametr nie jest dostępny wewnątrz mojej funkcji

Upewnij się, że nazwa parametru jest identyczna w obu miejscach:

```python
@app.route('/user/<username>')
def user_profile(username):

```

Wielkość liter oraz zapis muszą się idealnie pokrywać.

---

### Trasa działa, ale wyświetlana wartość jest niepoprawna

Użyj funkcji `print()`, aby sprawdzić, co dokładnie widzi serwer:

```python
print(book_id)

```

Następnie zweryfikuj w konsoli, czy dane przesyłane w adresie URL pokrywają się z Twoimi oczekiwaniami.

---

### Moje zmiany w kodzie nie są widoczne

Jeśli Flask nie odświeża automatycznie kodu po zapisaniu pliku:

1. Wyłącz serwer ręcznie w terminalu:

```text
Ctrl + C

```

2. Uruchom go ponownie:

```bash
python app.py

```

Upewnij się również, że parametr debugowania jest ustawiony na `True`:

```python
app.run(debug=True)

```