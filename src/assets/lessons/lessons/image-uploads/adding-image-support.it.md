# Aggiungere il supporto per le immagini al modello Book

Per supportare il caricamento di immagini (upload) per i libri, dobbiamo aggiungere un nuovo campo al nostro modello Book che memorizzerà il nome del file dell'immagine caricata.

---

## Aggiornare il modello Book

Apri il tuo modello `Book` esistente.

Attualmente dovrebbe apparire simile a:

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

Aggiungi la seguente riga subito dopo la colonna `published_year`:

```python
image_filename = db.Column(db.String(200))

```

Il tuo modello aggiornato dovrebbe ora apparire così:

```python
# Book model
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(50))
    published_year = db.Column(db.Integer)
    image_filename = db.Column(db.String(200))

    # Return a readable output
    def __repr__(self):
        return f'<Book {self.title}>'

```

---

## Comprendere la modifica

* `image_filename` → memorizza il nome del file dell'immagine caricata (es. `"book-cover.jpg"`)
* `db.String(200)` → consente l'utilizzo di nomi di file lunghi
* Nessun parametro `nullable=False` → le immagini sono facoltative per i libri

---

## Perché memorizzare il nome del file invece dell'immagine?

Non memorizziamo i dati effettivi dell'immagine all'interno del database perché:

* Le immagini possono essere di grandi dimensioni e renderebbero il file del database molto più pesante
* È molto più efficiente memorizzare i file direttamente sul filesystem (sul disco)
* Il database deve solo ricordare quale immagine appartiene a quale specifico libro
* Questo approccio è comunemente utilizzato nelle applicazioni reali e professionali

---

## Aggiornare la funzione di supporto (helper)

Apri la tua funzione `book_to_dict()` esistente.

Aggiungi la seguente riga all'interno del dizionario restituito (dopo `published_year`):

```python
'image_url': f"/api/books/{book.id}/image" if book.image_filename else None

```

La tua funzione helper aggiornata dovrebbe apparire così:

```python
# Helper function to convert book into JSON
def book_to_dict(book):
    return {
        'id': book.id,
        'title': book.title,
        'author': book.author,
        'genre': book.genre,
        'published_year': book.published_year,
        'image_url': f"/api/books/{book.id}/image" if book.image_filename else None
    }

```

Questo genera un URL simile a:

```text
/api/books/1/image

```

che potrà in seguito essere utilizzato per recuperare e mostrare l'immagine.

---

## Configurare la cartella per i caricamenti (upload)

Prima di creare la cartella di upload, aggiungi l'istruzione:

```python
import os

```

nella parte superiore del file insieme agli altri import.

---

Ora apri la sezione di configurazione del tuo file `app.py`.

Trova la riga:

```python
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

```

Direttamente sotto di essa, aggiungi il seguente codice:

```python
# Configuration for file uploads
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

```

La tua sezione di configurazione dovrebbe ora apparire così:

```python
# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///library.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configuration for file uploads
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

```

Questo codice crea una directory denominata `uploads` in cui verranno memorizzati i file delle immagini.

L'argomento `exist_ok=True` impedisce la generazione di errori nel caso in cui la cartella esista già sul disco.

---

## Esercizio di riflessione

Prima di guardare la soluzione, prova a rispondere:

Se volessi aggiungere un campo per memorizzare un file PDF per i libri, come lo faresti e quale tipo di dato useresti?

Prova a scriverlo da solo prima di procedere.

```python
pdf_filename = db.Column(db.String(200))

```

O se preferisci memorizzare il percorso completo del file:

```python
pdf_path = db.Column(db.String(300))

```

---

## Best practices

* Utilizza nomi di campo descrittivi (es. `image_filename` invece di abbreviazioni come `img`)
* Rendi i campi delle immagini facoltativi, a meno che non siano strettamente richiesti dal tuo caso d'uso
* Memorizza nel database solo i nomi dei file e non i percorsi assoluti del disco
* Mantieni i file caricati all'interno di una cartella dedicata
* Utilizza le funzioni helper per garantire che le risposte dell'API rimangano coerenti

---

## Conclusione

Ora sai come aggiungere il supporto per le immagini al tuo modello di database. I punti chiave sono:

* Aggiungere un campo di tipo stringa per memorizzare il nome del file dell'immagine
* Aggiornare le funzioni helper per includere gli URL delle immagini
* Configurare una cartella di upload dedicata alla memorizzazione dei file
* Salvare i riferimenti ai file nel database, non i file stessi
* Preparare la struttura dell'applicazione per gestire i caricamenti di file

Nella prossima lezione imparerai come gestire il caricamento effettivo delle immagini all'interno delle richieste POST.

---

## Risoluzione dei problemi (Troubleshooting)

### Ricevo un errore che indica che la colonna non esiste

Potrebbe essere necessario eliminare il file del database `library.db` e riavviare l'applicazione per ricreare la tabella con la nuova colonna inclusa.

---

### Ricevo l'errore:

```text
NameError: name 'os' is not defined

```

Assicurati di aver aggiunto l'importazione:

```python
import os

```

nella parte superiore del file.

---

### La cartella di upload non viene creata

Assicurati di aver inserito la riga:

```python
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

```

Questo assicura che la cartella esista sul disco prima che l'applicazione provi a salvare dei file al suo interno.

---

### Non vedo il campo `image_url` nella risposta dell'API

Assicurati di aver aggiornato la tua funzione `book_to_dict()` inserendo la riga:

```python
'image_url': f"/api/books/{book.id}/image" if book.image_filename else None

```

all'interno del dizionario restituito.