# Czym jest baza danych?

Baza danych to zorganizowany zbiór danych, który można łatwo przechowywać, uzyskiwać do niego dostęp i nim zarządzać. Pomyśl o niej jak o arkuszu kalkulacyjnym o potężnej mocy, który potrafi efektywnie obsłużyć tysiące (a nawet miliony) rekordów.

---

## Dlaczego potrzebujemy bazy danych?

Bez bazy danych Twoje dane znikałyby za każdym razem, gdy wyłączysz program.

Na przykład:

```python
books = []

```

Jeśli zamkniesz aplikację, wszystko, co zostało zapisane w `books`, zostanie utracone.

Baza danych rozwiązuje ten problem, przechowując dane na stałe na komputerze, dzięki czemu można je załadować ponownie przy każdym uruchomieniu aplikacji.

Bazy danych zapewniają również:

* **Trwałe przechowywanie (Persistent storage)**: Dane pozostają dostępne nawet po zatrzymaniu programu
* **Wydajne zapytania (Efficient querying)**: Szybkie znajdowanie określonych rekordów
* **Integralność danych (Data integrity)**: Reguły, które pomagają utrzymać dokładność i spójność danych
* **Skalowalność (Scalability)**: Obsługa rosnących ilości danych
* **Jednoczesny dostęp (Concurrent access)**: Wielu użytkowników może korzystać z danych w tym samym czasie

---

## Typy baz danych

Dostępnych jest wiele systemów baz danych, ale ogólnie dzielą się one na dwie kategorie.

### Relacyjne bazy danych (SQL)

Relacyjne bazy danych przechowują dane w tabelach składających się z wierszy i kolumn, podobnie do arkuszy kalkulacyjnych.

Przykłady obejmują:

* SQLite
* MySQL
* PostgreSQL

Te bazy danych używają języka **SQL** (**S**tructured **Q**uery **L**anguage) do przechowywania, pobierania i modyfikowania danych.

Są one idealne, gdy Twoje dane mają jasną strukturę i relacje.

### Nierelacyjne bazy danych (NoSQL)

Bazy danych NoSQL przechowują dane na różne sposoby, na przykład w postaci dokumentów lub par klucz-wartość.

Przykłady obejmują:

* MongoDB
* Redis

Są one często używane w bardzo elastycznych lub wyspecjalizowanych aplikacjach.

W tym projekcie skupimy się na relacyjnych bazach danych, ponieważ są łatwiejsze do nauki i idealnie pasują do naszej biblioteki książek.

---

## Kluczowe pojęcia dotyczące baz danych

### Tabela (Table)

Tabela to zbiór powiązanych ze sobą danych.

Na przykład wszystkie książki w naszej bibliotece mogą być przechowywane w tabeli `books`.

### Wiersz (Row)

Wiersz reprezentuje pojedynczy rekord.

Jeden wiersz to jedna książka.

### Kolumna (Column)

Kolumna reprezentuje określoną informację.

Przykłady:

* title (tytuł)
* author (autor)
* publication year (rok wydania)

### Klucz główny (Primary key)

Klucz główny to unikalny identyfikator dla każdego wiersza.

Pozwala nam jednoznacznie zidentyfikować konkretny rekord.

### Klucz obcy (Foreign key)

Klucz obcy łączy dane między tabelami.

Nie będziemy od razu używać kluczy obcych, ale stają się one ważne, gdy aplikacje się rozrastają.

---

## Przykład: Tabela książek

Oto jak mogą wyglądać nasze książki w tabeli bazy danych:

| id | title | author | year |
| --- | --- | --- | --- |
| 1 | 1984 | George Orwell | 1949 |
| 2 | Brave New World | Aldous Huxley | 1932 |

## Pomyśl, zanim przejdziesz dalej

Spójrz na poniższą tabelę:

| id | title | author |
| --- | --- | --- |
| 1 | 1984 | George Orwell |
| 2 | Dune | Frank Herbert |

### Pytanie

Co jest kluczem głównym (primary key) w tej tabeli?

Kluczem głównym jest:

```text
id

```

ponieważ jego wartość jest unikalna dla każdej książki i może być użyta do zidentyfikowania konkretnego rekordu.

---

## Dlaczego SQLite w tym projekcie?

Używamy SQLite, ponieważ:

* Jest wbudowany w Pythona — nie wymaga oddzielnej instalacji
* Jest idealny do nauki i małych projektów
* Przechowuje dane w jednym pliku
* Używa standardowego SQL, co oznacza, że zdobyte umiejętności można później przenieść na większe bazy danych
* Działa idealnie z Flask i SQLAlchemy

---

## Podsumowanie

* Baza danych to system służący do przechowywania i organizowania danych
* W przeciwieństwie do zmiennych, dane w bazie pozostają dostępne po zatrzymaniu programu
* Bazy danych przechowują informacje w tabelach składających się z wierszy i kolumn
* Każdy rekord zazwyczaj posiada unikalny identyfikator zwany kluczem głównym
* SQLite to prosta relacyjna baza danych, która jest idealna do nauki i małych projektów
* W tym projekcie użyjemy bazy danych do trwałego przechowywania naszych książek

Rozumiesz już, czym jest baza danych i dlaczego jest niezbędną częścią większości aplikacji. W następnej lekcji dowiemy się, jak bazy danych organizują dane za pomocą SQL.

---

## FAQ (Najczęściej zadawane pytania)

### Dlaczego nie mogę po prostu użyć zmiennych Pythona?

Zmienne istnieją tylko wtedy, gdy program jest uruchomiony.

```python
books = []

```

Jeśli zatrzymasz aplikację, wszystko, co zostało zapisane w `books`, zostanie utracone.

Baza danych przechowuje dane trwale, dzięki czemu można je załadować ponownie później.

---

### Czy baza danych to to samo co plik Excela?

Niezupełnie.

Oba narzędzia przechowują dane w wierszach i kolumnach, ale bazy danych są zaprojektowane do:

* Obsługi znacznie większych ilości danych
* Umożliwiania jednoczesnego dostępu wielu użytkownikom
* Wydajnego przeszukiwania rekordów
* Wymuszania reguł i relacji danych

---

### Czy muszę instalować SQLite?

Nie.

SQLite jest dostarczany razem z Pythonem, więc masz już wszystko, co potrzebne do tego kursu.