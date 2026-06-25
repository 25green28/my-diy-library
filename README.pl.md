# 📚 Moja Biblioteka DIY

Przyjazny dla początkujących projekt full-stack do nauki, który krok po kroku pokazuje, jak zbudować REST API w Pythonie i połączyć je z nowoczesnym frontendem.

Skupia się na nauce poprzez praktykę: od podstawowych pojęć związanych z Flaskiem, aż po w pełni funkcjonalny backend z integracją bazy danych i przesyłaniem zdjęć.

🌍 Języki:

- 🇺🇸 [English](README.md)
- 🇵🇱 Polski (bieżący)
- 🇮🇹 [Italiano](README.it.md)

## 🚀 Funkcje

- Pełne API CRUD do zarządzania książkami
- Architektura RESTful (GET, POST, PUT, DELETE)
- Integracja z bazą danych SQLite
- Obsługa przesyłania zdjęć
- Funkcja wyszukiwania książek
- Gotowy frontend w React w zestawie
- Przyjazna dla początkujących struktura nauki krok po kroku

## 🧠 Czego się nauczysz

- Podstaw backendu z Flaskiem
- Zasad projektowania REST API
- Pracy z bazami danych (SQLAlchemy + SQLite)
- Obsługi metod HTTP i kodów statusu
- Parametrów ścieżki (route) i zapytania (query)
- Przesyłania plików i obsługi obrazów
- Testowania API za pomocą narzędzi takich jak Postman

## 🛠️ Stos technologiczny

### Backend
- Python
- Flask
- SQLAlchemy
- SQLite

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide Icons

## ⚙️ Instalacja

### Konfiguracja dla początkujących (zalecana)

1. Upewnij się, że masz zainstalowany Node.js:
```bash
node -v

```

Jeśli nie, pobierz go ze strony https://nodejs.org, zalecana wersja to 24 LTS.

2. Pobierz plik ZIP z GitHub
3. Rozpakuj projekt
4. Otwórz terminal w folderze projektu
5. Zainstaluj zależności:

```bash
npm install

```

6. Uruchom frontend:

```bash
npm run dev

```

7. Otwórz:

```text
http://localhost:5173

```

8. Kliknij na `Learning`

### Konfiguracja zaawansowana

```bash
git clone [https://github.com/25green28/my-diy-library.git](https://github.com/25green28/my-diy-library.git)
cd my-diy-library
npm install
npm run dev

```

## 🔌 Punkty końcowe API (Endpoints)

| Metoda | Punkt końcowy | Opis |
| --- | --- | --- |
| GET | /api/books | Pobierz wszystkie książki |
| GET | /api/books/ | Pobierz pojedynczą książkę |
| GET | /api/books/search?q=... | Wyszukaj książki |
| POST | /api/books | Utwórz książkę |
| PUT | /api/books/ | Zaktualizuj książkę |
| DELETE | /api/books/ | Usuń książkę |
| GET | /api/books//image | Pobierz okładkę książki |

## 📦 Przykładowy obiekt książki

```json
{
  "id": 1,
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "published_year": 1949,
  "image_url": "/api/books/1/image"
}

```

## 🖼️ Przesyłanie zdjęć

Okładki książek są przechowywane w folderze `/uploads`.

W bazie danych zapisywane są tylko nazwy plików w celu zapewnienia wydajności i skalowalności.

Zdjęcia są serwowane przez:

```
GET /api/books/<id>/image

```

## 🔍 Funkcja wyszukiwania

Możesz wyszukiwać książki za pomocą:

```
/api/books/search?q=slowo_kluczowe

```

Wyszukiwanie działa po polach:

* tytuł (title)
* autor (author)

## 📈 Przyszłe ulepszenia

* System uwierzytelniania (JWT)
* Stronicowanie (Pagination)
* Zaawansowane filtrowanie
* Przechowywanie zdjęć w chmurze
* Wdrożenie / Deployment (Render / Railway / Vercel)

## 📄 Licencja

Ten projekt jest dostępny na licencji MIT.

## 🤖 Wsparcie AI

Narzędzia AI (w tym asystenci kodowania opierający się na agentach oraz sugestie wklejane bezpośrednio w kodzie) zostały wykorzystane w ograniczonym zakresie podczas rozwoju projektu, głównie jako pomoc w nauce, debugowaniu oraz przy tłumaczeniach. Ich użycie miało charakter okazjonalny i zadaniowy, a nie ogólnoprojektowy. Wszystkie sugestie zostały przeanalizowane, zrozumiane i zastosowane w sposób selektywny. Architektura, struktura oraz kluczowa implementacja zostały zaprojektowane i wykonane ręcznie.