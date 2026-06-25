# Czym jest Python?

Python to język programowania, który jest niezwykle łatwy do czytania i pisania. Jest idealny dla osób początkujących, ponieważ jego kod przypomina zwykły język angielski. Wiele firm używa Pythona do tworzenia stron i aplikacji internetowych (web development), analizy danych (data science) oraz automatyzacji zadań. W naszym przypadku użyjemy go do zbudowania aplikacji **My DIY Library**.

---

## Instalacja w systemie Windows

1. Odwiedź stronę [python.org](https://www.python.org/downloads/)
2. Kliknij duży przycisk „Download Python”
3. Uruchom pobrany plik instalatora
4. **Bardzo ważne**: Zanim klikniesz „Install Now”, zaznacz pole wyboru (checkbox) z napisem **„Add Python to PATH”** na dole okna
5. Kliknij „Install Now” i poczekaj na zakończenie instalacji

## Instalacja w systemie macOS

1. Odwiedź stronę [python.org](https://www.python.org/downloads/)
2. Pobierz instalator dla systemu macOS
3. Otwórz pobrany plik i postępuj zgodnie z instrukcjami wyświetlanymi na ekranie
4. System może poprosić Cię o podanie hasła administratora

## Instalacja w systemie Linux

Większość dystrybucji systemu Linux ma już zainstalowanego Pythona. Aby to sprawdzić, otwórz terminal (program, w którym wpisujesz komendy tekstowe) i wpisz:

```bash
python3 --version

```

Jeśli zobaczysz numer wersji, wszystko jest gotowe! Jeśli nie, zainstaluj go za pomocą menedżera pakietów swojego systemu:

```bash
sudo apt install python3  # Dla systemu Ubuntu/Debian
sudo dnf install python3  # Dla systemu Fedora

```

---

## Weryfikacja instalacji

Po zakończeniu instalacji otwórz terminal (lub Wiersz polecenia w systemie Windows) i wpisz:

```bash
python --version

```

### Oczekiwany rezultat (output):

```bash
Python 3.12.4

```

(Dokładny numer wersji może się różnić, ale powinna to być wersja 3.11 lub nowsza).

> Jeśli polecenie `python` nie działa w Twoim systemie, spróbuj wpisać `python3`. Jest to częsty przypadek w systemach Linux i macOS.

---

## Podsumowanie

Masz już zainstalowanego Pythona. Jesteś gotowy, aby utworzyć swoje pierwsze środowisko wirtualne!

## Rozwiązywanie problemów (Troubleshooting)

Jeśli zobaczysz błąd mówiący, że komenda „python” nie została rozpoznana („python is not recognized”), upewnij się, że podczas instalacji na Windowsie zaznaczyłeś opcję „Add Python to PATH”. Może być również konieczne ponowne uruchomienie terminala lub komputera.
