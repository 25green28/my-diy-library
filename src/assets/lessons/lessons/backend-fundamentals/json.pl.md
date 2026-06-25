# JSON

JSON (**J**ava**S**cript **O**bject **N**otation) to format, którego będziemy używać do przesyłania danych między klientami a naszym backendem. Jest to prosty, czytelny sposób strukturyzowania danych.

---

## Czym jest JSON?

JSON to format tekstowy służący do przechowywania i przesyłania danych. Pomimo swojej nazwy, nie jest on powiązany wyłącznie z JavaScriptem (językiem programowania używanym głównie do tworzenia stron internetowych) – działa ze wszystkimi językami programowania. JSON jest popularny, ponieważ jest łatwy do odczytania dla ludzi i prosty do przetworzenia dla komputerów.

## Dlaczego warto używać JSON?

- **Czytelny**: Wygląda podobnie do struktur danych, które widzisz w kodzie
- **Uniwersalny**: Każdy język programowania może współpracować z formatem JSON
- **Lekki**: Nie zawiera niepotrzebnych narzutów strukturalnych
- **Elastyczny**: Może reprezentować złożone struktury danych

## Struktura JSON

JSON używa par klucz-wartość, podobnie jak słownik w Pythonie. Klucze są zawsze ujęte w cudzysłów, po którym następuje dwukropek, a następnie wartość:

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "year": 1925
}

```

## Typy danych JSON

JSON obsługuje kilka typów danych:

* **Stringi (Ciągi znaków)**: Tekst w cudzysłowie, np. `"Hello World"`
* **Liczby**: Np. `42` lub `3.14`
* **Wartości logiczne (Booleans)**: `true` lub `false`
* **Tablice (Arrays)**: Listy w nawiasach kwadratowych, np. `[1, 2, 3]`
* **Obiekty (Objects)**: Zagnieżdżone pary klucz-wartość w nawiasach klamrowych
* **null**: Reprezentuje brak wartości

---

## Przykład: Książka w formacie JSON

Oto jak przedstawimy książkę w naszym Book Management Backend:

```json
{
  "id": 1,
  "title": "1984",
  "author": "George Orwell",
  "publication_year": 2022,
  "genre": "dystopian"
}

```

## JSON w naszym API

Gdy klienci komunikują się z naszym backendem:

* **Żądania POST**: Klienci wysyłają dane JSON w celu utworzenia nowych książek
* **Żądania GET**: Nasz serwer odsyła dane JSON z informacjami o książkach
* **Żądania PUT**: Klienci wysyłają dane JSON w celu aktualizacji istniejących książek

## Python i JSON

Python ułatwia pracę z formatem JSON. Słowniki Pythona można konwertować na ciągi znaków JSON, a ciągi znaków JSON można konwertować z powrotem na słowniki. Flask obsługuje to automatycznie za pomocą funkcji `jsonify`, której użyjemy później.

---

## Podsumowanie

W tej lekcji dowiedziałeś się:

* Czym jest JSON i dlaczego jest używany
* Jak JSON strukturyzuje dane za pomocą par klucz-wartość
* Jakie są najczęstsze typy danych JSON
* Jak JSON jest używany w naszym My DIY Library API
* Jak Python współpracuje z danymi JSON

Gratulacje! Znasz już podstawową terminologię dotyczącą rozwoju backendu. W następnej lekcji zaczniemy budować naszą aplikację Flask.