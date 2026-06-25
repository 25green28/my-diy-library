# Uruchamianie serwera deweloperskiego

Teraz utwórzmy prostą aplikację Flask i uruchommy ją, aby sprawdzić, czy wszystko zostało poprawnie skonfigurowane. To będzie Twój pierwszy działający serwer internetowy!

---

## Struktura Twojego projektu

W tym momencie folder Twojego projektu powinien wyglądać mniej więcej tak:

```text
your-folder/
├── venv/              # Twoje środowisko wirtualne
└── requirements.txt   # Lista zainstalowanych pakietów

```

---

## Utwórz swoją pierwszą aplikację Flask

### Krok 1: Utwórz nowy plik

Wewnątrz folderu projektu utwórz nowy plik o nazwie:

```text
app.py

```

Twój projekt powinien teraz wyglądać następująco:

```text
your-folder/
├── venv/
├── requirements.txt
└── app.py

```

### Krok 2: Dodaj kod Flaska

Otwórz plik `app.py`.

Zobaczysz pusty plik. Następnym krokiem jest dodanie do niego poniższego kodu:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)

```

---

## Co robi ten kod?

* **`from flask import Flask`**
* Importuje framework Flask, dzięki czemu możemy utworzyć aplikację internetową.


* **`app = Flask(__name__)`**
* Tworzy Twoją aplikację Flask.
* Pomyśl o tym jak o tworzeniu samego projektu backendowego.


* **`@app.route('/')`**
* Tworzy trasę (route).
* Trasa `/` to strona główna.
* Kiedy ktoś odwiedzi adres `http://127.0.0.1:5000/`, Flask uruchomi funkcję znajdującą się poniżej.


* **`def hello():`**
* Zwraca odpowiedź do przeglądarki.
* Przeglądarka wyświetli tekst: `Hello, World!`


* **`app.run(debug=True)`**
* Uruchamia lokalny serwer deweloperski Flask.



---

## Uruchom swój serwer

### Krok 1: Otwórz terminal

Upewnij się, że:

* Znajdujesz się wewnątrz folderu swojego projektu
* Twoje środowisko wirtualne jest aktywowane

### Krok 2: Uruchom Flaska

Wykonaj polecenie:

```bash
python app.py

```

Jeśli wszystko działa poprawnie, powinieneś zobaczyć w terminalu komunikat podobny do tego:

```text
* Running on [http://127.0.0.1:5000](http://127.0.0.1:5000)

```

Pozostaw ten terminal otwarty podczas testowania aplikacji.

---

## Przetestuj aplikację w przeglądarce

Otwórz adres:

```text
[http://127.0.0.1:5000](http://127.0.0.1:5000)

```

Powinieneś zobaczyć napis:

```text
Hello, World!

```

Jeśli widzisz ten komunikat, Twój serwer Flask działa prawidłowo.

---

## Wypróbuj to sam

### Zmień komunikat

Otwórz plik `app.py`.

Znajdź linijkę:

```python
return 'Hello, World!'

```

Zastąp ją kodem:

```python
return 'My first Flask app'

```

Zapisz plik.

Odśwież stronę w przeglądarce.

Powinieneś teraz zobaczyć napis:

```text
My first Flask app

```

---

### Dodaj drugą trasę

Otwórz plik `app.py`.

Dodaj poniższy kod bezpośrednio pod funkcją `hello()`:

```python
@app.route('/test')
def test():
    return 'This is a second route'

```

Twój plik powinien teraz wyglądać następująco:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'My first Flask app'

@app.route('/test')
def test():
    return 'This is a second route'

if __name__ == '__main__':
    app.run(debug=True)

```

Zapisz plik, a następnie odwiedź w przeglądarce adres:

```text
[http://127.0.0.1:5000/test](http://127.0.0.1:5000/test)

```

Powinieneś zobaczyć napis:

```text
This is a second route

```

---

## Zatrzymywanie serwera

Aby zatrzymać działanie Flaska:

1. Kliknij na okno terminala
2. Naciśnij skrót klawiszowy:

```text
Ctrl + C

```

Serwer zakończy swoje działanie.

---

## Czym jest tryb debugowania (debug mode)?

Parametr `debug=True` włącza przydatne funkcje ułatwiające programowanie:

* Automatycznie przeładowuje serwer po wprowadzeniu zmian w kodzie
* Pokazuje szczegółowe komunikaty o błędach w przypadku awarii
* Znacznie ułatwia proces debugowania

> **Ważne:** Nigdy nie używaj parametru `debug=True` w gotowej aplikacji produkcyjnej.

---

## Podsumowanie

* Utworzyłeś swoją pierwszą aplikację Flask
* Dowiedziałeś się, jak działają trasy (routes)
* Uruchomiłeś lokalny serwer internetowy
* Przetestowałeś działanie aplikacji w przeglądarce
* Dodałeś drugą trasę do projektu

---

## Rozwiązywanie problemów (Troubleshooting)

### Serwer nie chce się uruchomić

* Upewnij się, że środowisko wirtualne jest aktywowane
* Upewnij się, że Flask został poprawnie zainstalowany

---

### Strona się nie ładuje

* Sprawdź poprawność adresu URL:
```text
[http://127.0.0.1:5000](http://127.0.0.1:5000)

```


* Upewnij się, że serwer Flask cały czas działa w tle

---

### Port jest już w użyciu (Port already in use)

Inna aplikacja działająca na komputerze może już korzystać z portu 5000.

Zamknij tamtą aplikację lub zrestartuj terminal i spróbuj ponownie.