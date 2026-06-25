# Jak działa przesyłanie plików graficznych

Teraz, gdy wdrożyłeś już funkcjonalność przesyłania plików graficznych, warto zrozumieć, jak wszystkie te elementy współpracują ze sobą w praktyce.

---

## Ogólny obraz systemu

Proces przesyłania obrazów składa się z kilku powiązanych ze sobą komponentów:

1. **Model bazy danych** → przechowuje nazwę pliku obrazu
2. **Obsługa przesyłania** → odbiera i zapisuje plik na serwerze
3. **Przechowywanie plików** → zapisuje obraz bezpośrednio na dysku
4. **Trasa obrazu (Image route)** → serwuje i wyświetla obraz klientom
5. **Logika aktualizacji** → zastępuje stare obrazy nowymi plikami
6. **Logika usuwania** → usuwa nieużywane pliki z dysku

Wspólnie te komponenty pozwalają użytkownikom przesyłać, przeglądać, aktualizować i usuwać okładki książek.

---

## Przesyłanie obrazu na serwer

Kiedy użytkownik tworzy nową książkę wraz ze zdjęciem, proces wygląda następująco:

```text
Klient (Client)
  │
  ├─ POST /api/books
  │   (multipart/form-data)
  ▼
Aplikacja Flask
  │
  ├─ Zapisz obraz w folderze uploads
  ├─ Zapisz nazwę pliku w bazie danych
  ▼
Baza danych + System plików

```

Kluczowe punkty:

* Żądania korzystają z formatu `multipart/form-data`
* Pola tekstowe są dostępne za pośrednictwem obiektu `request.form`
* Przesłane pliki są dostępne za pośrednictwem obiektu `request.files`
* Funkcja `secure_filename()` oczyszcza i zabezpiecza nazwy plików przed zapisem
* Plik graficzny fizycznie trafia do folderu uploads

---

## Gdzie dokładnie przechowywane jest zdjęcie?

Zdjęcie jest zapisywane w dwóch oddzielnych miejscach:

```text
System plików:
uploads/book-cover.jpg

Baza danych:
Book.image_filename = "book-cover.jpg"

```

Rzeczywisty plik obrazu znajduje się na dysku serwera, podczas gdy baza danych przechowuje wyłącznie samą nazwę tego pliku.

### Dlaczego przechowujemy tylko nazwę pliku?

Utrzymywanie plików graficznych poza bazą danych niesie za sobą wiele korzyści:

* Mniejszy rozmiar pliku bazy danych
* Szybsze wykonywanie zapytań do bazy
* Łatwiejsze tworzenie kopii zapasowych (backupów)
* Wyższa wydajność całej aplikacji
* Łatwiejsza migracja do chmury obliczeniowej (cloud storage) w przyszłości

Jest to najbardziej powszechne i zalecane podejście w aplikacjach internetowych.

---

## Serwowanie i wyświetlanie obrazu

Kiedy klient wysyła żądanie o wyświetlenie zdjęcia:

```text
Klient (Client)
  │
  ├─ GET /api/books/1/image
  ▼
Aplikacja Flask
  │
  ├─ Znajdź książkę w bazie danych
  ├─ Odczytaj nazwę pliku obrazu
  ├─ Załaduj plik z folderu uploads
  ▼
Odpowiedź z plikiem graficznym

```

Trasa odpowiedzialna za obraz łączy rekord z bazy danych z fizycznym plikiem zapisanym na dysku.

---

## Aktualizacja pliku graficznego

Kiedy użytkownik przesyła nowy obraz dla istniejącej już książki:

```text
Klient (Client)
  │
  ├─ PUT /api/books/1
  ▼
Aplikacja Flask
  │
  ├─ Usuń stary plik graficzny (jeśli istnieje)
  ├─ Zapisz nowy plik graficzny na dysku
  ├─ Zaktualizuj nazwę pliku w bazie danych
  ▼
Baza danych + System plików

```

Usuwanie starego pliku zapobiega gromadzeniu się bezużytecznych, osieroconych danych na przestrzeni czasu.

---

## Usuwanie książki

W momencie usuwania książki z systemu:

```text
Klient (Client)
  │
  ├─ DELETE /api/books/1
  ▼
Aplikacja Flask
  │
  ├─ Usuń plik graficzny z dysku
  ├─ Usuń rekord z bazy danych
  ▼
Czyszczenie zakończone

```

Bez tego kroku czyszczącego, pliki graficzne pozostałyby na dysku na stałe, mimo że powiązane z nimi książki już nie istnieją.

---

## Przegląd architektury

```text
┌─────────────┐
│   Klient    │
└──────┬──────┘
       │
       ▼
┌────────────────────┐
│   Backend Flask    │
│                    │
│   Trasy i logika   │
└────────┬───────────┘
         │
         ├───────────────┐
         ▼               ▼
┌──────────────┐   ┌──────────────┐
│ Baza danych  │   │    Folder    │
│              │   │   Uploads    │
│              │   │              │
│image_filename│   │ book.jpg     │
└──────────────┘   └──────────────┘

```

Baza danych przechowuje metadane (informacje o pliku), podczas gdy system plików przechowuje fizyczny plik obrazu.

---

## Dlaczego warto korzystać z tej architektury?

### Podział odpowiedzialności (Separation of responsibilities)

Każdy komponent ma jedno, jasno określone zadanie:

* Baza danych → przechowuje informacje o książkach
* System plików → przechowuje pliki graficzne
* Trasy Flaska → obsługują żądania przychodzące i wysyłają odpowiedzi

Dzięki temu aplikacja jest o wiele łatwiejsza w utrzymaniu i rozwoju.

### Skalowalność

To podejście działa świetnie w miarę rozwoju aplikacji:

* Baza danych pozostaje mała i szybka
* Pliki graficzne można łatwo przenieść do dedykowanej chmury (np. AWS S3)
* Obrazy mogą być serwowane za pośrednictwem sieci CDN
* Wiele serwerów może współdzielić ten sam zasób sieciowy do przechowywania plików

### Bezpieczeństwo

System przesyłania plików zawiera kluczowe zabezpieczenia:

```python
filename = secure_filename(image.filename)

```

Zapobiega to zapisywaniu na serwerze niebezpiecznych nazw plików.

Dodatkowo do systemu można wdrożyć:

* Walidację dozwolonych typów plików (rozszerzeń)
* Limity maksymalnego rozmiaru plików
* System uwierzytelniania i autoryzacji użytkowników

---

## Pomyśl, zanim przejdziesz dalej

Wyobraź sobie, że przechowujemy całe pliki graficzne bezpośrednio w bazie danych (jako dane binarne), zamiast zapisywać tylko ich nazwy.

Jakie zalety i wady miałoby takie rozwiązanie?

### Przechowywanie danych obrazu w bazie danych

Zalety:

* Jeden spójny system przechowywania danych
* Prostsze tworzenie kopii zapasowych (wszystko jest w jednym pliku)
* Transakcje bazy danych gwarantują idealną spójność danych

Wady:

* Znacznie większy rozmiar bazy danych
* Wolniejsze wykonywanie zapytań (baza jest obciążona ciężkimi plikami)
* Tworzenie i przywracanie kopii zapasowych trwa o wiele dłużej
* Wyższe zużycie pamięci RAM serwera

### Przechowywanie samych nazw plików w bazie danych

Zalety:

* Mała i szybka baza danych
* Wyższa ogólna wydajność systemu
* Łatwiejsze skalowanie aplikacji
* Standard stosowany powszechnie w branży

Wady:

* Konieczność zarządzania dwoma oddzielnymi systemami (baza + dysk)
* Wymaga ręcznego czyszczenia plików z dysku podczas usuwania rekordów

Dla większości projektów i aplikacji przechowywanie samych nazw plików jest bezkonkurencyjnie lepszym wyborem.

---

## Najlepsze praktyki

* Przechowuj nazwy plików w bazie zamiast surowych danych binarnych zdjęć
* Zawsze używaj funkcji `secure_filename()`
* Dokładnie waliduj typy i rozszerzenia plików
* Nakładaj limity na rozmiary przesyłanych plików
* Usuwaj stare pliki z dysku podczas aktualizacji zdjęć
* Czyść system plików z powiązanych obrazów podczas usuwania rekordów
* Dbaj o stałą synchronizację danych pomiędzy bazą a systemem plików

---

## Kwestie wydajnościowe

W miarę wzrostu popularności aplikacji, obsługę obrazów można zoptymalizować poprzez:

* Kompresowanie obrazów przed ich ostatecznym zapisaniem na dysku
* Konwersję plików do nowoczesnych i lekkich formatów, takich jak WebP
* Serwowanie plików bezpośrednio przez serwery www, np. Nginx lub Apache
* Wykorzystanie chmury obiektowej (np. AWS S3, Cloudflare R2)
* Wdrożenie sieci CDN (Content Delivery Network) do szybszego dostarczania plików na całym świecie

---

## Podsumowanie

Rozumiesz już pełny cykl życia i przepływ procesu przesyłania plików:

1. Przesłanie obrazu z wykorzystaniem formatu `multipart/form-data`
2. Zapisanie pliku graficznego w dedykowanym folderze uploads
3. Zapisanie samej nazwy pliku w bazie danych jako referencji
4. Serwowanie i udostępnianie pliku przez dedykowaną trasę API
5. Zastępowanie i usuwanie starych plików podczas aktualizacji danych
6. Usuwanie fizycznych plików z dysku podczas kasowania książek

Ta architektura jest powszechnie stosowana w profesjonalnych aplikacjach internetowych ze względu na swoją prostotę, wysoką wydajność oraz łatwość skalowania.

---

## Rozwiązywanie problemów (Troubleshooting)

### Obraz się nie wyświetla

Sprawdź:

* Czy dedykowana trasa obsługująca pobieranie obrazu została poprawnie napisana
* Czy nazwa pliku jest prawidłowo zapisana w bazie danych
* Czy plik fizycznie istnieje i znajduje się w folderze uploads

---

### Stare zdjęcia pozostają na dysku serwera

Upewnij się, że kod odpowiedzialny za usuwanie plików wykonuje się poprawnie podczas:

* Aktualizacji zdjęć (metoda PUT)
* Usuwania książek (metoda DELETE)

---

### Folder uploads bez przerwy rośnie i zapełnia dysk

Zazwyczaj oznacza to, że stare, niepotrzebne pliki nie są prawidłowo usuwane.

Przeanalizuj kod swoich tras aktualizujących i usuwających dane, aby upewnić się, że funkcja usuwania plików z systemu działa bez zarzutu.
