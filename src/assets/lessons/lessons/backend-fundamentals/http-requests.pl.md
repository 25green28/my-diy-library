# Żądania HTTP

HTTP (**H**yper**t**ext **T**ransfer **P**rotocol) to „język”, którego używają klienci i serwery do komunikacji w sieci. Za każdym razem, gdy odwiedzasz stronę internetową, Twoja przeglądarka wysyła żądania HTTP do serwerów.

---

## Czym są metody HTTP?

Metody HTTP to różne typy żądań, które możesz wysyłać. Można je traktować jako różne akcje, które wykonujesz. Najczęstsze metody to:

### GET - Pobieranie danych

Żądania GET proszą serwer o zwrócenie danych. Nie zmieniają niczego na serwerze — tylko odczytują informacje. Na przykład:
- Pobranie listy wszystkich książek
- Pobranie szczegółów konkretnej książki

### POST - Tworzenie nowego zasobu

Żądania POST wysyłają dane do serwera, aby utworzyć nowy zasób. Zmieniają dane na serwerze. Na przykład:
- Dodanie nowej książki do biblioteki
- Utworzenie nowego konta użytkownika

### PUT - Aktualizacja

Żądania PUT aktualizują istniejący zasób nowymi danymi. Na przykład:
- Aktualizacja tytułu lub autora książki
- Zmiana roku publikacji książki

### DELETE - Usuwanie

Żądania DELETE usuwają zasób z serwera. Na przykład:
- Usunięcie książki z biblioteki
- Usunięcie konta użytkownika

---

## Kody statusu HTTP

Gdy serwer odpowiada na żądanie, wysyła kod statusu, aby poinformować klienta, co się stało. Najczęstsze kody to:

- **200 OK**: Żądanie zostało poprawnie wykonane
- **201 Created**: Nowy zasób został pomyślnie utworzony
- **400 Bad Request**: Klient wysłał nieprawidłowe dane
- **404 Not Found**: Żądany zasób nie istnieje
- **500 Internal Server Error**: Coś poszło nie tak na serwerze

----

## Anatomia żądania HTTP

Każde żądanie HTTP składa się z kilku części:
- **Metoda**: Typ żądania (GET, POST, PUT, DELETE)
- **URL**: Adres zasobu
- **Nagłówki**: Dodatkowe informacje o żądaniu
- **Treść (body)**: Dane wysyłane w żądaniach POST i PUT

## W naszym My DIY Library

Wykorzystamy wszystkie te metody HTTP, aby stworzyć kompletną API:
- GET do pobierania książek
- POST do dodawania nowych książek
- PUT do aktualizacji informacji o książkach
- DELETE do usuwania książek z biblioteki

---

## Podsumowanie

W tej lekcji nauczyłeś się:

- Czym jest HTTP i dlaczego jest używany
- Najważniejszych metod HTTP (GET, POST, PUT, DELETE)
- Co oznaczają kody statusu HTTP
- Jak zbudowane jest żądanie HTTP
- Jak HTTP jest używane w naszym projekcie My DIY Library

Teraz rozumiesz, jak klienci i serwery komunikują się w sieci za pomocą HTTP. W następnej lekcji zobaczymy, jak możemy zwracać dane do klientów używając formatu JSON.