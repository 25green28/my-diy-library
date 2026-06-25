# Więcej o trasach (Routes)

Trasy są sercem każdej aplikacji Flask. Definiują one, jaki kod powinien się uruchomić, gdy ktoś odwiedzi określony adres URL. Bez tras Flask nie wiedziałby, jak odpowiadać na żądania. Możesz myśleć o trasach jak o mapie łączącej adresy URL z funkcjami Pythona.

> **Wskazówka**: Nie musisz kopiować kodu z tej lekcji do swojego pliku `app.py`, chyba że chcesz wykonać ćwiczenie.

## Czym jest trasa?

Trasa łączy ze sobą:

```text
Adres URL → Funkcja Pythona

```

Na przykład:

```python
@app.route('/')
def home():
    return 'Hello, World!'

```

Kiedy ktoś odwiedzi adres:

```text
[http://127.0.0.1:5000/](http://127.0.0.1:5000/)

```

Flask wykonuje funkcję `home()` i zwraca jej wynik.

---

## Jak działają trasy

Rozbijmy trasę na części pierwsze:

```python
@app.route('/')
def home():
    return 'Hello, World!'

```

* **`@app.route('/')`**
* Mówi Flaskowi:
> „Uruchom poniższą funkcję za każdym razem, gdy ktoś odwiedzi adres `/`”.




* **`def home():`**
* Definiuje funkcję, która ma zostać uruchomiona.


* **`return`**
* Zwraca odpowiedź, która jest wysyłana z powrotem do przeglądarki.



## Reguły tworzenia tras

Pamiętaj o następujących zasadach:

* Każda trasa zaczyna się od ukośnika `/`
* W adresach tras wielkość liter ma znaczenie (case-sensitive)
* Każda trasa wymaga przypisanej funkcji
* Nazwy funkcji nie muszą być takie same jak adresy URL

Przykład:

```python
@app.route('/books')
def library():
    return 'Books page'

```

Adres URL to `/books`, ale funkcja nazywa się `library()`.

---

## Wiele tras dla jednej zawartości

Czasami kilka różnych adresów URL powinno wyświetlać tę samą zawartość.

Przykład:

```python
@app.route('/')
@app.route('/home')
def home():
    return 'Welcome!'

```

Oba adresy URL będą działać:

```text
/

```

oraz

```text
/home

```

---

## Spróbuj sam

Utwórz trasę o nazwie `/about`. Powinna ona zwracać tekst "About page".

Zanim spojrzysz na rozwiązanie, spróbuj napisać ją samodzielnie.

```python
@app.route('/about')
def about():
    return 'About page'

```

---

## Obsługa metod HTTP

Domyślnie trasy odpowiadają tylko na żądania typu GET.

Możesz jednak zezwolić na inne metody:

```python
@app.route('/submit', methods=['POST'])
def submit():
    return 'Form submitted'

```

Ta trasa akceptuje wyłącznie żądania POST.

---

## Obsługa wielu metod

Jedna trasa może obsługiwać więcej niż jedną metodę HTTP.

Przykład:

```python
from flask import request

@app.route('/data', methods=['GET', 'POST'])
def data():

    if request.method == 'POST':
        return 'Data received'

    return 'Send data via POST'

```

---

## Parametry w adresie URL (URL parameters)

Trasy mogą przechwytywać wartości bezpośrednio z adresu URL.

Przykład:

```python
@app.route('/book/<int:book_id>')
def get_book(book_id):
    return f'Book ID: {book_id}'

```

Odwiedzenie adresu:

```text
/book/42

```

zwróci tekst:

```text
Book ID: 42

```

Flask automatycznie konwertuje tę wartość na liczbę całkowitą (integer).

---

## Spróbuj sam

Co zostanie wyświetlone po odwiedzeniu adresu:

```text
/book/100

```

przy użyciu poniższej trasy?

```python
@app.route('/book/<int:book_id>')
def get_book(book_id):
    return f'Book ID: {book_id}'

```

```text
Book ID: 100

```

---

## Parametry zapytania (Query parameters)

Czasami dane są przekazywane po znaku `?` w adresie URL.

Przykład:

```text
/search?q=python

```

Wartość po `q=` nazywana jest parametrem zapytania (query parameter).

Przykład trasy obsługującej takie zapytanie:

```python
from flask import request

@app.route('/search')
def search():

    query = request.args.get('q', '')

    return f'Searching for: {query}'

```

Odwiedzenie adresu:

```text
/search?q=python

```

zwróci tekst:

```text
Searching for: python

```

---

## Dlaczego trasy są ważne

Każdy punkt końcowy (endpoint) API, który zbudujesz w przyszłości, będzie korzystał z tras.

Na przykład:

```text
GET    /api/books
POST   /api/books
PUT    /api/books/1
DELETE /api/books/1

```

Są to po prostu trasy, które reagują na różne typy żądań.

Zrozumienie działania tras teraz znacznie ułatwi Ci budowanie własnego API w przyszłości.

---

## Podsumowanie

W tej lekcji dowiedziałeś się:

* Czym są trasy
* Jak adresy URL łączą się z funkcjami Pythona
* Jak tworzyć wiele tras dla jednej funkcji
* Jak używać metod GET i POST
* Jak działają parametry w adresie URL
* Jak działają parametry zapytania (query parameters)

Trasy są fundamentem każdej aplikacji Flask i każdego punktu końcowego API, który stworzysz w trakcie tego kursu.

W następnej lekcji zaczniemy tworzyć trasy, które zwracają dane strukturalne zamiast zwykłego tekstu.

---

## Rozwiązywanie problemów (Troubleshooting)

### Otrzymuję błąd 404

Upewnij się, że zapis:

```python
@app.route('/about')

```

dokładnie pasuje do adresu URL, który odwiedzasz:

```text
[http://127.0.0.1:5000/about](http://127.0.0.1:5000/about)

```

Trasy muszą zgadzać się co do każdego znaku.

---

### Otrzymuję błąd:

```text
NameError: name 'request' is not defined

```

Upewnij się, że obiekt `request` został zaimportowany:

```python
from flask import request

```

---

### Moje zmiany się nie pojawiają

Jeśli serwer nie przeładowuje się automatycznie:

1. Zatrzymaj serwer:

```text
Ctrl + C

```

2. Uruchom go ponownie:

```bash
python app.py

```

Upewnij się również, że opcja debugowania jest włączona:

```python
app.run(debug=True)

```

---

### Parametr adresu URL nie działa

Upewnij się, że parametr istnieje w obu miejscach i nazywa się tak samo:

```python
@app.route('/book/<int:book_id>')
def get_book(book_id):

```

Nazwa zmiennej musi być dokładnie taka sama.