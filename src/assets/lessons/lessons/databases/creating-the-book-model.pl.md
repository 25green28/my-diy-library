# Tworzenie modelu Book

Model to klasa Pythona, która reprezentuje tabelę w bazie danych. Zamiast pisać zapytania SQL do tworzenia tabel i zarządzania danymi, definiujemy klasy Pythona i pozwalamy SQLAlchemy zająć się obsługą bazy danych za nas.

---

## Definiowanie modelu Book

Dodaj poniższy kod do swojego pliku `app.py` (po inicjalizacji SQLAlchemy):

```python
# Book model
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(50))
    published_year = db.Column(db.Integer)

    # Return a readable output
    def __repr__(self):
        return f'<Book {self.title}>'

```

Upewnij się również, że baza danych jest tworzona podczas uruchamiania aplikacji (jeśli nie, zastąp obecny blok `if __name__ == '__main__':` poniższym):

```python
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

```

---

## Zrozumienie modelu

### Co się tutaj dzieje?

* `class Book(db.Model)` → tworzy model bazy danych o nazwie Book
* Każda linijka `db.Column(...)` → reprezentuje kolumnę w tabeli bazy danych
* Klasa automatycznie staje się tabelą o nazwie `book` (lub `books`, w zależności od konfiguracji SQLAlchemy)

---

## Typy kolumn

SQLAlchemy używa różnych typów danych w zależności od ich rodzaju:

* `db.Integer` → liczby całkowite (identyfikatory ID)
* `db.String(length)` → krótki tekst (tytuły, nazwiska)
* `db.Text` → długi tekst (opisy)
* `db.Boolean` → wartości prawda/fałsz (true/false)
* `db.Float` → liczby zmiennoprzecinkowe (dziesiętne)
* `db.DateTime` → wartości daty i czasu
* `db.JSON` → strukturyzowane dane JSON

---

## Opcje kolumn

Te opcje kontrolują zachowanie danych:

* `primary_key=True` → jednoznacznie identyfikuje każdy wiersz (klucz główny)
* `nullable=False` → pole jest wymagane
* `unique=True` → wartości muszą być unikalne
* `default=value` → domyślna wartość, jeśli żadna nie zostanie podana
* `index=True` → przyspiesza wyszukiwanie

---

## Ćwiczenie na pomyślenie

Zanim spojrzysz na rozwiązanie, spróbuj odpowiedzieć na pytanie:

Gdybyś musiał dodać nowe pole o nazwie `rating` (ocena w skali od 1 do 5), jak zdefiniowałbyś je w modelu?

Spróbuj najpierw napisać to samodzielnie.

```python
rating = db.Column(db.Integer)

```

Opcjonalne ulepszenia:

```python
rating = db.Column(db.Integer, nullable=True)

```

---

## Metoda `__repr__`

Ta metoda definiuje, jak obiekt jest wyświetlany, gdy zostanie wypisany (np. przez funkcję print).

```python
def __repr__(self):
    return f'<Book {self.title}>'

```

Zamiast oglądać nieczytelną referencję do obiektu, otrzymujesz czytelny komunikat, taki jak:

```
<Book 1984>

```

Jest to bardzo przydatne podczas debugowania.

---

## Najlepsze praktyki

* Używaj jasnych i opisowych nazw kolumn
* Oznaczaj wymagane pola jako `nullable=False`
* Dodawaj metodę `__repr__` ułatwiającą debugowanie
* Dbaj o porządek w strukturze modeli

---

## Podsumowanie

Wiesz już, jak definiować modele baz danych za pomocą SQLAlchemy. Powinieneś teraz wiedzieć, że:

* Modele to klasy Pythona reprezentujące tabele w bazie danych
* Każda kolumna definiuje jedno pole w bazie danych
* SQLAlchemy automatycznie generuje kod SQL na podstawie Twojego kodu w Pythonie
* Ograniczenia takie jak `nullable`, `unique` i `primary_key` kontrolują reguły poprawności danych
* Model stanowi fundament struktury danych Twojego backendu

W następnej lekcji zaczniemy używać modelu do tworzenia prawdziwych książek i interakcji z bazą danych.

---

## Rozwiązywanie problemów (Troubleshooting)

### Moja tabela nie została utworzona

Upewnij się, że uruchomiłeś aplikację przynajmniej raz, aby instrukcja `db.create_all()` mogła się wykonać.

---

### Zmieniłem model, ale nic się nie zaktualizowało

SQLite nie aktualizuje tabel automatycznie.

Na etapie programowania konieczne może być usunięcie pliku `library.db` i zrestartowanie aplikacji.

---

### Otrzymuję błędy związane z `app.app_context()`

Upewnij się, że wywołanie `db.create_all()` znajduje się wewnątrz bloku:

```python
with app.app_context():

```