# Instalacja frameworku Flask

Flask to tzw. „mikro-framework” — jest lekki i prosty, a zarazem wystarczająco potężny, by budować w nim zaawansowane aplikacje. Zapewnia podstawowe narzędzia potrzebne do obsługi żądań sieciowych, odpowiadania użytkownikom i zarządzania danymi, nie narzucając przy tym jednego, konkretnego sposobu pisania kodu. Użyjemy go do zbudowania naszego projektu API **My DIY Library**.

## Upewnij się, że środowisko wirtualne jest aktywne

Przed przystąpieniem do jakiejkolwiek instalacji upewnij się, że aktywowałeś środowisko wirtualne z poprzedniej lekcji. W swoim terminalu powinieneś widzieć oznaczenie `(venv)`.

Jeśli go nie ma, wróć do sekcji **Aktywacja środowiska wirtualnego** w poprzednim materiale.

> **Ważne:** Przed instalacją jakichkolwiek pakietów lub uruchomieniem kodu Pythona zawsze upewnij się, że Twoje środowisko wirtualne jest aktywne. W przeciwnym razie pakiety mogą zainstalować się w złym miejscu, a Twój projekt nie będzie działał poprawnie.

---

## Instalacja narzędzia Flask

Gdy środowisko wirtualne jest aktywne, zainstaluj framework Flask za pomocą menedżera `pip` (instalatora pakietów Pythona):

```bash
pip install flask

```

Spowoduje to pobranie i zainstalowanie Flaska oraz wszystkich bibliotek, których potrzebuje on do poprawnego działania.

---

## Instalacja rozszerzenia Flask-SQLAlchemy

Będziemy również potrzebować rozszerzenia Flask-SQLAlchemy, które pomaga nam w znacznie prostszy sposób współpracować z bazami danych:

```bash
pip install flask-sqlalchemy

```

---

## Weryfikacja instalacji

Upewnijmy się, że wszystko zainstalowało się bez błędów. Uruchom następujące polecenie:

```bash
python -c "import importlib.metadata; print(importlib.metadata.version('flask'))"

```

W konsoli powinien pojawić się numer wersji, na przykład `3.0.0`. Jeśli go widzisz, Flask został zainstalowany pomyślnie!

---

## Zapisywanie zależności projektu

Dobrą praktyką jest zapisywanie listy wszystkich zainstalowanych pakietów. Dzięki temu bardzo łatwo odtworzyć to samo środowisko i uruchomić projekt na innym komputerze:

```bash
pip freeze > requirements.txt

```

Ta komenda wygeneruje plik o nazwie `requirements.txt`, który zawiera spis wszystkich zainstalowanych bibliotek wraz z ich dokładnymi wersjami.

---

## Podsumowanie

* Flask to lekki framework służący do budowania sieciowych interfejsów API
* Zawsze instaluj pakiety wewnątrz aktywnego środowiska wirtualnego
* Komenda `pip install flask` instaluje podstawowy framework Flask
* Komenda `pip install flask-sqlalchemy` dodaje wsparcie dla baz danych
* Plik `requirements.txt` przechowuje listę zależności Twojego projektu

---

## Rozwiązywanie problemów (Troubleshooting)

### Nie znaleziono polecenia pip

Jeśli widzisz komunikat błędu:

```bash
pip: command not found

```

Spróbuj użyć składni:

```bash
python -m pip install flask

```

---

### Niepoprawne środowisko

Jeśli Flask został zainstalowany, ale aplikacja nie chce działać:

* Upewnij się, że znacznik `(venv)` jest widoczny na początku linii poleceń w terminalu
* Ponownie aktywuj swoje środowisko wirtualne

---

### Nieprawidłowa wersja Pythona

Upewnij się, że korzystasz z Pythona w wersji 3.11 lub nowszej:

```bash
python --version

```
