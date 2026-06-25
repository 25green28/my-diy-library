# Tworzenie środowiska wirtualnego

Środowisko wirtualne (virtual environment) jest jak odizolowana piaskownica dla Twojego projektu w Pythonie. Sprawia, że wszystkie narzędzia i biblioteki potrzebne do danego projektu są odseparowane od innych projektów na Twoim komputerze.

## Dlaczego potrzebujemy środowiska wirtualnego?

Pomyśl o tym w ten sposób: różne projekty mogą wymagać różnych wersji tego samego narzędzia. Jeśli zainstalujesz wszystko w jednym, tym samym miejscu, niektóre projekty mogą zacząć ze sobą konkurować lub wywoływać konflikty. Środowisko wirtualne daje każdemu projektowi jego własną przestrzeń wraz z niezależnymi narzędziami. Pozwala to zachować porządek i zapobiega problemom ze stabilnością aplikacji.

---

## Upewnij się, że jesteś w odpowiednim folderze

Przed utworzeniem środowiska wirtualnego otwórz terminal i przejdź do folderu swojego projektu. To kluczowe, ponieważ środowisko wirtualne zostanie utworzone bezpośrednio wewnątrz bieżącego katalogu.

Przykład:

```bash
cd moj-folder-projektu

```

> **Zalecenie:** Najprostszym sposobem na przejście do folderu projektu jest:
> 1. Otwórz menedżer plików (Eksplorator plików).
> 2. Znajdź folder swojego projektu.
> 3. Skopiuj **pełną ścieżkę do folderu** (zazwyczaj możesz kliknąć folder prawym przyciskiem myszy i wybrać **Kopiuj jako ścieżkę** lub skopiować ścieżkę widoczną na pasku adresu u góry okna).
> 4. W terminalu wpisz `cd ` (pamiętając o spacji po komendzie).
> 5. Wklej skopiowaną ścieżkę i naciśnij Enter.
>
>
> Przykład:
> ```bash
> cd "C:/Users/<Twoja Nazwa Użytkownika>/Documents/Book Management Backend"
> 
> ```
>
>
> Cudzysłowy są wymagane, gdy nazwa folderu zawiera spacje.

---

## Tworzenie środowiska wirtualnego

Następnie uruchom komendę:

```bash
python -m venv venv

```

To polecenie nakazuje Pythonowi utworzenie nowego środowiska wirtualnego o nazwie `venv`. Zobaczysz, że w katalogu Twojego projektu pojawi się nowy folder o nazwie `venv`.

---

## Aktywacja środowiska wirtualnego

Zanim zaczniesz korzystać ze środowiska wirtualnego, musisz je aktywować. Komenda różni się w zależności od tego, czy używasz systemu Windows, czy macOS/Linux.

### W systemie Windows:

#### PowerShell:

```bash
venv\Scripts\activate

```

#### Wiersz polecenia (cmd):

```bash
venv\Scripts\activate.bat

```

> Jeśli napotkasz błąd informujący, że wykonywanie skryptów jest zablokowane w systemie (`execution of scripts is disabled on this system`), przejdź do sekcji „Rozwiązywanie problemów” poniżej.

### W systemie macOS lub Linux:

```bash
source venv/bin/activate

```

Po uruchomieniu tego polecenia na samym początku znaku zachęty (promptu) w terminalu powinno pojawić się oznaczenie `(venv)`. Oznacza to, że środowisko wirtualne jest aktywne dla tej sesji terminala.

---

## Praca ze środowiskiem wirtualnym

Gdy środowisko jest aktywne, wszelkie pakiety Pythona, które zainstalujesz, będą dostępne wyłącznie w tym konkretnym otoczeniu.

Kiedy skończysz pracę nad projektem, możesz je dezaktywować:

```bash
deactivate

```

Prefiks `(venv)` zniknie wtedy z paska linii poleceń.

> Ważne: Musisz aktywować środowisko wirtualne za każdym razem, gdy na nowo otwierasz terminal i wracasz do pracy nad tym projektem.

---

## Podsumowanie

* Środowisko wirtualne izoluje zależności (biblioteki) projektu
* Zawsze twórz je bezpośrednio wewnątrz folderu swojego projektu
* Aktywuj je przed rozpoczęciem jakichkolwiek prac nad projektem
* Dezaktywuj je, kiedy kończysz pracę
* Aktywuj je ponownie za każdym razem, gdy wracasz do kodu

---

## Rozwiązywanie problemów (Troubleshooting)

### ⚠️ Problem z Windows PowerShell (częsty błąd)

Na niektórych systemach Windows podczas korzystania z konsoli PowerShell możesz zobaczyć błąd o treści:

```bash
execution of scripts is disabled on this system

```

Dzieje się tak, ponieważ PowerShell domyślnie ogranicza możliwość uruchamiania zewnętrznych skryptów ze względów bezpieczeństwa.

### Jak to naprawić (rekomendowane rozwiązanie)

Otwórz program PowerShell **jako Administrator** i uruchom polecenie:

```bash
Set-ExecutionPolicy RemoteSigned

```

Następnie wpisz:

```bash
Y

```

Po wykonaniu tego kroku spróbuj ponownie aktywować środowisko wirtualne w terminalu swojego projektu:

```bash
venv\Scripts\activate

```

### Rozwiązanie alternatywne (bez zmian w systemie)

Jeśli nie chcesz zmieniać globalnych ustawień systemu, możesz po prostu użyć klasycznego **Wiersza polecenia (cmd)** zamiast konsoli PowerShell:

```bash
venv\Scripts\activate.bat

```

Obie metody działają dokładnie tak samo — korzystają po prostu z innych powłok terminala.
