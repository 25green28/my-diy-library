# Czym jest SQL?

SQL (**S**tructured **Q**uery **L**anguage) to standardowy język używany do interakcji z relacyjnymi bazami danych. To właśnie za jego pomocą programiści mówią bazie danych, jakie dane chcą pobrać, utworzyć, zaktualizować lub usunąć.

---

## Co robi SQL?

SQL pozwala na:

- Pobieranie danych z bazy danych
- Dodawanie nowych danych
- Aktualizowanie istniejących danych
- Usuwanie danych
- Tworzenie i modyfikowanie struktur baz danych

Dobra wiadomość jest taka, że w tym kursie nie musisz stawać się ekspertem od SQL. W dalszej części będziemy używać SQLAlchemy, które automatycznie generuje większość zapytań SQL.

---

## SELECT - Pobieranie danych

W ten sposób pobiera się dane z bazy danych:

```sql
SELECT * FROM books;

SELECT title, author FROM books;

SELECT * FROM books WHERE year = 1949;

```

## INSERT - Dodawanie danych

To polecenie dodaje nowy rekord:

```sql
INSERT INTO books (title, author, year)
VALUES ('1984', 'George Orwell', 1949);

```

## UPDATE - Modyfikowanie danych

To polecenie zmienia istniejące dane:

```sql
UPDATE books
SET year = 1950
WHERE id = 1;

```

## DELETE - Usuwanie danych

To polecenie usuwa rekordy:

```sql
DELETE FROM books
WHERE id = 1;

```

---

## Typowe klauzule SQL

### WHERE - Filtrowanie wyników

```sql
SELECT * FROM books
WHERE author = 'Orwell';

```

Zwraca to tylko książki napisane przez Orwella.

### ORDER BY - Sortowanie wyników

```sql
SELECT * FROM books
ORDER BY year DESC;

```

Sortuje to książki od najnowszych do najstarszych.

### LIMIT - Ograniczanie liczby wyników

```sql
SELECT * FROM books
LIMIT 10;

```

Zwraca to tylko pierwsze 10 wyników.

---

## SQL w Pythonie z użyciem SQLAlchemy

W tym projekcie przez większość czasu nie będziemy pisać czystego kodu SQL.

Zamiast tego użyjemy **SQLAlchemy**, biblioteki Pythona, która:

* Tłumaczy kod Pythona na język SQL
* Zarządza połączeniami z bazą danych
* Sprawia, że kod jest łatwiejszy do odczytania
* Pomaga chronić aplikację przed typowymi zagrożeniami bezpieczeństwa

---

## Porównanie przykładów

Te dwa przykłady robią dokładnie to samo.

### Czysty SQL

```sql
SELECT * FROM books
WHERE id = 1;

```

### SQLAlchemy

```python
Book.query.get(1)

```

Wersja z SQLAlchemy jest krótsza i bardziej przypomina standardowy kod w Pythonie.

---

## Ćwiczenie

Spójrz na poniższe zapytanie SQL:

```sql
DELETE FROM books
WHERE id = 5;

```

Przed otwarciem rozwiązania spróbuj odpowiedzieć na pytania:

1. Jakie polecenie SQL zostało użyte?
2. Na którą książkę wpłynie to zapytanie?
3. Co się stanie po uruchomieniu tego zapytania?

1. Użytym poleceniem jest `DELETE`.
2. Zapytanie wpłynie na książkę, której `id` wynosi `5`.
3. Ta książka zostanie usunięta z bazy danych.

---

## Podsumowanie

Posiadasz już podstawową wiedzę na temat SQL oraz tego, jak bazy danych używają go do zarządzania danymi. Powinieneś teraz rozumieć, że:

* SQL to język używany do komunikacji z relacyjnymi bazami danych
* Najczęstszymi poleceniami SQL są `SELECT`, `INSERT`, `UPDATE` i `DELETE`
* SQL pozwala filtrować, sortować i ograniczać wyniki
* SQLAlchemy potrafi automatycznie generować SQL na podstawie kodu w Pythonie
* Nie musisz uczyć się na pamięć składni SQL na potrzeby tego kursu

W następnej lekcji skonfigurujemy naszą aplikację Flask, aby połączyła się z bazą danych i przygotujemy ją do przechowywania książek.

---

## FAQ (Najczęściej zadawane pytania)

### Czy muszę nauczyć się SQL przed przejściem dalej?

Nie. Do tego projektu wystarczy zrozumienie podstawowych pojęć. SQLAlchemy automatycznie wygeneruje większość zapytań SQL.

### Przykłady SQL wyglądają na skomplikowane

To całkowicie normalne. Celem tej lekcji jest rozpoznanie, co robi SQL, a nie zapamiętanie każdego polecenia.

### Czy będziemy pisać SQL w dalszej części?

Tylko sporadycznie. Większość operacji na bazie danych w tym kursie będzie zapisana przy użyciu Pythona i SQLAlchemy.