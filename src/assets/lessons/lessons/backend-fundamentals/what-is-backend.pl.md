# Czym jest backend?

Kiedy korzystasz ze strony internetowej lub aplikacji, widzisz „frontend” – przyciski, tekst i obrazy, z którymi wchodzisz w interakcję. Istnieje jednak inna część, której nie widzisz: „backend”. Backend to system działający za kulisami, który sprawia, że wszystko działa.

## Co robi backend?

Pomyśl o restauracji: frontend to sala jadalna, w której zamawiasz jedzenie, ale backend to kuchnia, w której jedzenie jest faktycznie przygotowywane. W aplikacjach internetowych backend:

- Przechowuje i pobiera dane (takie jak książki w naszej bibliotece)
- Przetwarza żądania użytkowników (takie jak dodanie nowej książki)
- Obsługuje logikę biznesową (taką jak sprawdzanie, czy książka już istnieje)
- Komunikuje się z bazami danych
- Wysyła odpowiedzi z powrotem do użytkownika

## Frontend vs Backend

**Frontend** to to, co użytkownicy widzą i z czym wchodzą w interakcję – interfejs wizualny. **Backend** to niewidoczny system, który przetwarza dane i podejmuje decyzje.

W naszym projekcie **My DIY Library**:

- Frontendem może być strona internetowa wyświetlająca książki (która jest już dla Ciebie przygotowana)
- Backend to system, który przechowuje, aktualizuje i usuwa te książki

## Jak się komunikują

Frontend i backend rozmawiają ze sobą za pomocą żądań HTTP. Kiedy klikasz przycisk, aby dodać książkę, frontend wysyła żądanie do backendu. Backend przetwarza to żądanie, zapisuje książkę w bazie danych i odsyła odpowiedź z komunikatem „sukces!”.

## Dlaczego budujemy backend?

W tym projekcie budujemy backendowe API (Application Programming Interface – Interfejs Programowania Aplikacji). API to zestaw reguł, które pozwalają różnym programom rozmawiać ze sobą.

Nasze API pozwoli dowolnej aplikacji (stronie internetowej, aplikacji mobilnej lub innej usłudze) zarządzać książkami w naszym systemie **My DIY Library**.

---

## Podsumowanie

W tej lekcji dowiedziałeś się:

- Czym jest backend
- Czym różni się od frontendu
- Jak komunikują się frontend i backend
- Dlaczego istnieją interfejsy API
- Jak nasz projekt wpisuje się w tę strukturę