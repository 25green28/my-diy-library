# Wprowadzenie do programu Postman

Postman to popularne narzędzie służące do testowania interfejsów API.

Zamiast korzystać z przeglądarki internetowej lub skomplikowanych komend w terminalu, Postman oferuje przejrzysty interfejs graficzny, z poziomu którego możesz wysyłać żądania HTTP i wygodnie badać otrzymywane odpowiedzi.

W trakcie tego kursu będziesz regularnie używać Postmana do testowania tworzonych przez siebie punktów końcowych (endpoints).

---

## Instalacja programu Postman

1. Odwiedź stronę:

```text
[https://www.postman.com/downloads/](https://www.postman.com/downloads/)

```

2. Pobierz wersję instalacyjną przeznaczoną dla Twojego systemu operacyjnego.
3. Zainstaluj i uruchom aplikację Postman.

Tworzenie konta użytkownika jest całkowicie opcjonalne.

---

## Co potrafi Postman?

Postman umożliwia:

* Wysyłanie żądań HTTP
* Przeglądanie odpowiedzi z serwera
* Sprawdzanie kodów statusu HTTP (status codes)
* Przesyłanie danych w formacie JSON
* Testowanie działania API bez konieczności pisania kodu aplikacji klienckiej (front-endu)

Dla przykładu:

```text
GET    /books
POST   /books
PUT    /books/1
DELETE /books/1

```

Wszystkie te żądania możesz przetestować bezpośrednio w programie Postman.

---

## Twoje pierwsze żądanie

Zanim zaczniemy testować Twoją własną aplikację Flask, którą napiszesz w kolejnych lekcjach, użyjmy publicznie dostępnego, testowego API.

Utwórz nowe żądanie:

1. Kliknij **New → HTTP Request**
2. Wybierz metodę **GET**
3. Wpisz następujący adres URL:

```text
[https://jsonplaceholder.typicode.com/posts/1](https://jsonplaceholder.typicode.com/posts/1)

```

4. Kliknij przycisk **Send**

W odpowiedzi powinieneś otrzymać strukturę JSON podobną do tej:

```json
{
  "userId": 1,
  "id": 1,
  "title": "...",
  "body": "..."
}

```

Gratulacje! Właśnie wykonałeś swoje pierwsze poprawne żądanie do API.

---

## Zrozumienie interfejsu

Każde żądanie w programie składa się z kilku kluczowych elementów:

### Metoda HTTP (HTTP Method)

Przykłady:

```text
GET
POST
PUT
DELETE

```

Metoda określa rodzaj akcji, jaką chcesz wykonać na zasobie.

### Adres URL

Dokładny adres docelowy punktu końcowego API:

```text
[https://jsonplaceholder.typicode.com/posts/1](https://jsonplaceholder.typicode.com/posts/1)

```

### Odpowiedź (Response)

Po kliknięciu przycisku **Send**, Postman wyświetli sekcję odpowiedzi zawierającą:

* Treść odpowiedzi (Response body)
* Kod statusu (Status code)
* Nagłówki (Headers)

---

## Zrozumienie kodów statusu

Oto najpopularniejsze kody statusu HTTP, z którymi się spotkasz:

```text
200 OK

```

Żądanie zakończyło się sukcesem.

```text
201 Created

```

Zasób został pomyślnie utworzony na serwerze.

```text
404 Not Found

```

Szukany zasób nie istnieje pod wskazanym adresem.

```text
500 Internal Server Error

```

Wystąpił nieoczekiwany błąd po stronie serwera.

---

## Kolekcje (Collections)

W miarę jak Twój projekt będzie rósł, zaczniesz tworzyć coraz więcej żądań. Postman pozwala na organizowanie ich w wygodne foldery zwane kolekcjami.

Przykład:

```text
My DIY Library API

```

Wewnątrz takiej kolekcji możesz zapisać posegregowane żądania:

```text
Get All Books (Pobierz wszystkie książki)
Get Book (Pobierz konkretną książkę)
Create Book (Dodaj nową książkę)
Update Book (Zaktualizuj książkę)
Delete Book (Usuń książkę)

```

---

## Zmienne (Variables)

Zamiast wielokrotnego wpisywania tego samego adresu lokalnego:

```text
[http://127.0.0.1:5000](http://127.0.0.1:5000)

```

możesz utworzyć zmienną:

| Nazwa zmiennej | Wartość |
| --- | --- |
| base_url | http://127.0.0.1:5000 |

Następnie w polu adresu URL możesz użyć zapisu:

```text
{{base_url}}/api/books

```

Dzięki temu Twoje żądania będą znacznie łatwiejsze w utrzymaniu i modyfikacji.

---

## Wypróbuj sam

Wyślij żądanie GET pod następujący adres URL:

```text
[https://jsonplaceholder.typicode.com/users/1](https://jsonplaceholder.typicode.com/users/1)

```

Przed kliknięciem przycisku Send spróbuj przewidzieć:

* Jakiej metody należy użyć?
* Czy odpowiedź będzie zwykłym tekstem, czy formatem JSON?

Metoda:

```text
GET

```

Odpowiedź:

```text
JSON

```

---

## Podsumowanie

W tej lekcji dowiedziałeś się:

* Czym jest Postman
* Dlaczego programiści go używają
* Jak tworzyć i wysyłać żądania
* Jak analizować otrzymane odpowiedzi
* Co oznaczają podstawowe kody statusu HTTP
* Jak działają kolekcje oraz zmienne

Będziesz korzystać z Postmana przez resztę kursu, aby upewnić się, że budowane przez Ciebie punkty końcowe API działają bez zarzutu.

---

## Rozwiązywanie problemów (Troubleshooting)

### Nie można wysłać żądania (Could not send request)

Sprawdź swoje połączenie z internetem i upewnij się, czy w adresie URL nie ma literówki.

---

### Błędy certyfikatu lub SSL

Upewnij się, że adres URL zaczyna się od przedrostka:

```text
https://

```

jeśli jest on wymagany przez dane API.

---

### Odpowiedź różni się od tej w lekcji

Publiczne i darmowe bazy API mogą ulegać zmianom w czasie. Skup się na zrozumieniu samej struktury żądania oraz odpowiedzi, zamiast oczekiwać idealnego dopasowania każdego pola tekstowego.
