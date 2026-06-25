# 📚 My DIY Library

Un progetto full-stack didattico e adatto ai principianti che insegna come creare un'API REST in Python passo dopo passo e collegarla a un frontend moderno.

Il focus è sull'apprendimento pratico: dai concetti base di Flask fino a un backend completamente funzionante con integrazione di database e caricamento di immagini.

🌍 Lingue:

- 🇺🇸 [English](README.md)
- 🇵🇱 [Polski](README.pl.md)
- 🇮🇹 Italiano (corrente)

## 🚀 Funzionalità

- API CRUD completa per la gestione dei libri
- Architettura RESTful (GET, POST, PUT, DELETE)
- Integrazione con database SQLite
- Supporto per il caricamento di immagini
- Funzionalità di ricerca dei libri
- Frontend in React pre-creato incluso
- Struttura di apprendimento passo dopo passo adatta ai principianti

## 🧠 Cosa imparerai

- Fondamenti di backend con Flask
- Principi di progettazione di API REST
- Lavorare con i database (SQLAlchemy + SQLite)
- Gestione dei metodi HTTP e dei codici di stato
- Parametri di rotta (route) e di query
- Caricamento di file e gestione delle immagini
- Testare le API utilizzando strumenti come Postman

## 🛠️ Stack Tecnologico

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

## ⚙️ Installazione

### Configurazione per principianti (consigliata)

1. Assicurati di avere Node.js installato:
```bash
node -v

```

In caso contrario, scaricalo da https://nodejs.org, la versione consigliata è la 24 LTS.

2. Scarica lo ZIP da GitHub
3. Estrai il progetto
4. Apri il terminale nella cartella del progetto
5. Installa le dipendenze:

```bash
npm install

```

6. Avvia il frontend:

```bash
npm run dev

```

7. Apri:

```text
http://localhost:5173

```

8. Clicca su `Learning`

### Configurazione avanzata

```bash
git clone [https://github.com/25green28/my-diy-library.git](https://github.com/25green28/my-diy-library.git)
cd my-diy-library
npm install
npm run dev

```

## 🔌 Endpoint dell'API

| Metodo | Endpoint | Descrizione |
| --- | --- | --- |
| GET | /api/books | Ottieni tutti i libri |
| GET | /api/books/ | Ottieni un singolo libro |
| GET | /api/books/search?q=... | Cerca libri |
| POST | /api/books | Crea un libro |
| PUT | /api/books/ | Aggiorna un libro |
| DELETE | /api/books/ | Elimina un libro |
| GET | /api/books//image | Ottieni l'immagine del libro |

## 📦 Esempio di Oggetto Libro

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

## 🖼️ Caricamento Immagini

Le copertine dei libri sono memorizzate nella cartella `/uploads`.

Nel database vengono salvati solo i nomi dei file per questioni di prestazioni e scalabilità.

Le immagini vengono servite tramite:

```
GET /api/books/<id>/image

```

## 🔍 Funzionalità di Ricerca

Puoi cercare i libri usando:

```
/api/books/search?q=parola_chiave

```

La ricerca funziona su:

* titolo (title)
* autore (author)

## 📈 Miglioramenti Futuri

* Sistema di autenticazione (JWT)
* Paginazione
* Filtraggio avanzato
* Archiviazione cloud per le immagini
* Distribuzione / Deployment (Render / Railway / Vercel)

## 📄 Licenza

Questo progetto è a scopo didattico.