# Konfiguracja bazy danych

Teraz połączymy naszą aplikację Flask z bazą danych.

Użyjemy rozszerzenia **Flask-SQLAlchemy** – biblioteki, która pozwala nam pracować z bazami danych za pomocą kodu w Pythonie, zamiast ciągłego pisania czystego kodu SQL.

## Upewnij się, że Flask-SQLAlchemy jest zainstalowane

Jeśli jeszcze tego nie zrobiłeś, uruchom następujące polecenie (zawsze w środowisku wirtualnym):

```bash
pip install flask-sqlalchemy

```

---

## Konfiguracja bazy danych

Otwórz plik `app.py` i zastąp jego zawartość poniższym kodem:

```python
from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///library.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

if __name__ == '__main__':
    app.run(debug=True)

```

> **Info**: Dla uproszczenia od razu dodałem wszystkie niezbędne importy, więc nie musisz się martwić o ich dodawanie w dalszej części.

---

## Zrozumienie konfiguracji

Przyjrzyjmy się najważniejszym liniom kodu.

### Lokalizacja bazy danych

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///library.db'

```

Ta linijka wskazuje SQLAlchemy, gdzie znajduje się baza danych.

W naszym przypadku:

```text
sqlite:///library.db

```

oznacza:

> Utwórz lub użyj pliku bazy danych SQLite o nazwie `library.db` wewnątrz folderu projektu.

---

### Wyłączenie śledzenia modyfikacji

```python
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

```

Ta opcja wyłącza dodatkową funkcję, która zużywa dodatkową pamięć RAM.

W większości projektów zaleca się ustawienie tej wartości na `False`.

---

### Tworzenie obiektu bazy danych

```python
db = SQLAlchemy(app)

```

Ta linijka tworzy obiekt bazy danych, którego będziemy używać w całym projekcie.

W dalszych krokach użyjemy obiektu `db` do:

* Tworzenia modeli bazy danych
* Dodawania książek
* Pobierania książek
* Aktualizowania książek
* Usuwania książek

---

## Czym jest `library.db`?

Gdy utworzymy już nasze tabele bazy danych, w folderze projektu pojawi się nowy plik o nazwie:

```text
library.db

```

Ten plik przechowuje wszystkie dane naszej aplikacji.

Pomyśl o nim jak o pojemniku, który zawiera wszystkie Twoje książki.

> Nie martw się, jeśli jeszcze nie widzisz tego pliku. Musimy najpierw utworzyć nasz pierwszy model, zanim baza danych będzie mogła zostać wygenerowana.

---

## Ćwiczenie

Spójrz na poniższą konfigurację:

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///myLibrary.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

```

Przed otwarciem rozwiązania spróbuj odpowiedzieć na pytania:

1. Która linijka mówi aplikacji Flask, gdzie zapisana jest baza danych?
2. Która linijka tworzy obiekt SQLAlchemy?
3. Jak będzie się nazywał plik bazy danych?

1. ```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///myLibrary.db'

```


2. ```python
db = SQLAlchemy(app)

```


3. Plik bazy danych będzie się nazywał:
```text
myLibrary.db

```



---

## Podsumowanie

Udało Ci się pomyślnie skonfigurować Flask do pracy z bazą danych. Rozumiesz już, że:

* Flask-SQLAlchemy łączy aplikację Flask z bazą danych
* SQLite przechowuje dane w pliku na Twoim komputerze
* Plik `library.db` będzie zawierał wszystkie dane naszej aplikacji
* `SQLALCHEMY_DATABASE_URI` definiuje lokalizację bazy danych
* `db = SQLAlchemy(app)` tworzy obiekt bazy danych, którego będziemy używać w całym projekcie

W następnej lekcji stworzymy nasz pierwszy model bazy danych i ostatecznie zdefiniujemy, jak wygląda książka w naszej aplikacji.

---

## Rozwiązywanie problemów (Troubleshooting)

### ModuleNotFoundError: No module named 'flask_sqlalchemy'

Upewnij się, że Flask-SQLAlchemy jest zainstalowane:

```bash
pip install flask-sqlalchemy

```

Zweryfikuj również, czy Twoje środowisko wirtualne jest aktywowane.

---

### Nie widzę pliku `library.db`

To normalne.

Plik pojawi się dopiero po utworzeniu tabel bazy danych w jednej z kolejnych lekcji.