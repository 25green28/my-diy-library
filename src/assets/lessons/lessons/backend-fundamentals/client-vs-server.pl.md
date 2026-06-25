# Klient vs Serwer

Aby zrozumieć, jak działają aplikacje internetowe, musisz zrozumieć relację między klientami a serwerami. Jest to podstawowe dla budowy naszej aplikacji My DIY Library.

---

## Czym jest klient?

Klient to każde urządzenie lub aplikacja, która żąda informacji lub usług. Można myśleć o kliencie jak o kliencie w sklepie — przychodzi i prosi o coś. Przykłady klientów obejmują:

- Przeglądarki internetowe takie jak Chrome, Firefox lub Safari
- Aplikacje mobilne na telefonie
- Aplikacje desktopowe
- Nawet inne serwery mogą działać jako klienci

## Czym jest serwer?

Serwer to komputer lub program, który dostarcza zasoby, dane lub usługi klientom. Można myśleć o serwerze jak o sklepie, który ma to, czego potrzebuje klient. Przykłady obejmują:

- Serwery internetowe, które obsługują strony WWW
- Serwery aplikacyjne, takie jak nasza aplikacja Flask
- Serwery baz danych, które przechowują dane

---

## Jak działają razem

Interakcja między klientem a serwerem przebiega według prostego schematu zwanego cyklem żądanie-odpowiedź:

1. **Klient wysyła żądanie**: Klient prosi o coś (np. „pokaż mi wszystkie książki”)
2. **Serwer przetwarza żądanie**: Serwer ustala, czego chce klient i wykonuje pracę
3. **Serwer wysyła odpowiedź**: Serwer odsyła żądane informacje
4. **Klient wyświetla odpowiedź**: Klient pokazuje informacje użytkownikowi

## Przykład z życia

Gdy odwiedzasz Amazon.com:
1. Twoja przeglądarka (klient) wysyła żądanie do serwerów Amazona
2. Serwery Amazona przetwarzają żądanie i znajdują produkty, których szukasz
3. Serwery wysyłają dane produktów z powrotem do przeglądarki
4. Przeglądarka wyświetla produkty na ekranie

## W naszym projekcie

Dla naszej aplikacji My DIY Library:
- Nasza aplikacja Flask to **serwer** — będzie obsługiwać żądania i zarządzać danymi książek
- Przeglądarka internetowa lub narzędzie do testowania API to **klient** — będzie wysyłać żądania do naszego serwera
- Zbudujemy „endpointy” — konkretne adresy URL, które klienci mogą wywoływać, aby wykonywać działania takie jak dodawanie lub przeglądanie książek

---

## Podsumowanie

W tej lekcji nauczyłeś się:

- Czym jest klient w aplikacjach internetowych
- Czym jest serwer i co robi
- Jak klient i serwer komunikują się za pomocą cyklu żądanie-odpowiedź
- Jak rzeczywiste aplikacje, takie jak Amazon, wykorzystują ten system
- Jak to odnosi się do naszego projektu My DIY Library

Teraz rozumiesz, jak dane przepływają między użytkownikami a serwerami. W następnej lekcji przyjrzymy się szczegółowo, jak ta komunikacja działa za pomocą żądań HTTP.