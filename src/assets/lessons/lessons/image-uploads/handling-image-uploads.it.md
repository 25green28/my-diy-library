# Gestione del caricamento di immagini nelle richieste POST

Ora che il nostro modello supporta le immagini, dobbiamo gestire il caricamento dei file (upload) quando creiamo nuovi libri tramite richieste POST.

---

## Comprendere il formato multipart/form-data

Nelle lezioni precedenti abbiamo utilizzato richieste basate su JSON:

```python
data = request.get_json()

```

Questo approccio funziona perfettamente per i dati testuali, ma non permette di caricare file.

Quando si caricano immagini, è obbligatorio utilizzare il formato:

```text
multipart/form-data

```

Questo formato consente di inviare contemporaneamente:

* Campi di testo (title, author, genre, ecc.)
* File (immagini)

all'interno della stessa richiesta.

---

## Aggiornare la rotta create_book

Apri la tua rotta `create_book()` esistente.

Attualmente si presenta in questo modo:

```python
@app.route('/api/books', methods=['POST'])
def create_book():
    data = request.get_json()

    # validazione...

    new_book = Book(
        title=data['title'],
        author=data['author'],
        genre=data.get('genre'),
        published_year=data.get('published_year')
    )

```

Dobbiamo sostituire l'approccio basato su JSON con la gestione dei moduli (form) e dei file.

---

### Passo 1: Sostituire `request.get_json()`

Trova la riga:

```python
data = request.get_json()

```

Rimuovila completamente e sostituisila con:

```python
# Recupera i dati dal modulo
title = request.form.get('title')
author = request.form.get('author')
genre = request.form.get('genre')
published_year = request.form.get('published_year')

image = request.files.get('image')

```

Ora:

* `request.form` gestisce i campi di testo del modulo
* `request.files` gestisce i file caricati

---

### Passo 2: Aggiornare la validazione

Sostituisci la vecchia validazione:

```python
if not data:
    return error_response(
        'No data provided',
        400
    )

if not data['title'].strip():
    return error_response(
        'Title cannot be empty',
        400
    )

if not data['author'].strip():
    return error_response(
        'Author cannot be empty',
        400
    )

```

con il seguente codice:

```python
# Convalida i campi obbligatori
if not title or not author:
    return error_response(
        'Title and author are required',
        400
    )

```

---

### Passo 3: Salvare l'immagine caricata

Prima della validazione del campo dell'anno di pubblicazione del libro (`if 'published_year' in data:`), aggiungi:

```python
filename = None

# Salva l'immagine caricata (se presente)
if image:
    filename = secure_filename(image.filename)

    image.save(
        os.path.join(
            app.config['UPLOAD_FOLDER'],
            filename
        )
    )

```

Questo codice:

1. Recupera il file caricato
2. Genera un nome di file sicuro
3. Salva l'immagine all'interno della cartella uploads

---

### Passo 4: Aggiornare la creazione del modello Book

Trova la sezione:

```python
new_book = Book(
    title=data['title'],
    author=data['author'],
    genre=data.get('genre'),
    published_year=data.get('published_year')
)

```

Sostituisila con:

```python
new_book = Book(
    title=title,
    author=author,
    genre=genre,
    published_year=published_year,
    image_filename=filename
)

```

Nota il nuovo campo inserito:

```python
image_filename=filename

```

Questo memorizza il nome dell'immagine caricata all'interno del database.

---

### Passo 5: Convertire l'anno in un valore numerico

Prima di creare il libro, sostituisci la validazione corrente di `published_year` con la seguente:

```python
# Convalida l'anno di pubblicazione
if published_year:
    try:
        published_year = int(published_year)

    except ValueError:
        return error_response(
            'Published year must be a number',
            400
        )

```

In questo modo ci assicuriamo che l'anno venga memorizzato come numero intero (integer).

---

## La rotta finale completa

Dopo tutte le modifiche, la tua rotta dovrebbe apparire così:

```python
@app.route('/api/books', methods=['POST'])
def create_book():

    # Recupera i dati dal modulo
    title = request.form.get('title')
    author = request.form.get('author')
    genre = request.form.get('genre')
    published_year = request.form.get('published_year')

    image = request.files.get('image')

    # Convalida i campi obbligatori
    if not title or not author:
        return error_response(
            'Title and author are required',
            400
        )

    filename = None

    # Salva l'immagine caricata (se presente)
    if image:
        filename = secure_filename(image.filename)

        image.save(
            os.path.join(
                app.config['UPLOAD_FOLDER'],
                filename
            )
        )

    # Convalida l'anno di pubblicazione
    if published_year:
        try:
            published_year = int(published_year)

        except ValueError:
            return error_response(
                'Published year must be a number',
                400
            )

    # Crea un nuovo libro dai dati della richiesta
    new_book = Book(
        title=title,
        author=author,
        genre=genre,
        published_year=published_year,
        image_filename=filename
    )

    db.session.add(new_book)

    try:
        db.session.commit()

    except Exception:
        db.session.rollback()

        return error_response(
            'Internal server error',
            500
        )

    return jsonify(book_to_dict(new_book)), 201

```

---

## Spiegazione delle modifiche chiave

### Utilizzo di `request.form`

```python
title = request.form.get('title')

```

Legge i campi di testo da una richiesta multipart.

---

### Utilizzo di `request.files`

```python
image = request.files.get('image')

```

Intercetta e legge il file caricato.

---

### Mettere in sicurezza il nome del file

```python
filename = secure_filename(
    image.filename
)

```

Rimuove i caratteri potenzialmente pericolosi dai nomi dei file.

Ad esempio, una stringa del tipo:

```text
../../../secret.txt

```

viene convertita in un nome di file sicuro.

---

### Salvataggio del file

```python
image.save(
    os.path.join(
        app.config['UPLOAD_FOLDER'],
        filename
    )
)

```

Salva l'immagine all'interno della cartella di upload configurata.

---

## Testare con Postman

Per verificare il corretto funzionamento del caricamento immagini:

1. Crea una nuova richiesta POST
2. Inserisci l'URL:

```text
[http://127.0.0.1:5000/api/books](http://127.0.0.1:5000/api/books)

```

3. Apri la scheda **Body**
4. Seleziona l'opzione **form-data**
5. Aggiungi le seguenti coppie chiave-valore:

| Chiave (Key) | Tipo (Type) | Valore (Value) |
| --- | --- | --- |
| title | Text | Harry Potter |
| author | Text | J.K. Rowling |
| genre | Text | Fantasy |
| published_year | Text | 1997 |
| image | File | Seleziona img |

6. Fai clic su **Send**

L'immagine dovrebbe essere salvata all'interno della cartella uploads.

---

## Esercizio di riflessione

Prima di guardare la soluzione, prova a rispondere:

Cosa succederebbe se un utente caricasse un file chiamato:

```text
../../etc/passwd

```

Perché abbiamo assoluto bisogno di `secure_filename()`?

Prova a rispondere prima di consultare la soluzione.

Senza `secure_filename()`, un utente malintenzionato potrebbe tentare di salvare file al di fuori della cartella di upload designata.

Questo tipo di azione è noto come attacco Path Traversal (attraversamento di percorsi).

La funzione `secure_filename()` rimuove i caratteri pericolosi e converte la stringa in una versione sicura del nome del file prima che venga scritta sul disco del server.

---

## Best practices

* Utilizza sempre la funzione `secure_filename()`
* Convalida le estensioni e i tipi di file caricati
* Limita la dimensione massima dei file consentiti per l'upload
* Rendi il caricamento delle immagini facoltativo, a meno che non sia strettamente richiesto
* Memorizza nel database esclusivamente i nomi dei file
* Conserva i file caricati all'interno di una cartella dedicata

---

## Conclusione

In questa lezione hai imparato:

* Perché il formato JSON non può essere usato per il caricamento dei file
* Cos'è il formato `multipart/form-data`
* Come sostituire `request.get_json()` con `request.form`
* Come accedere ai file caricati usando `request.files`
* Come salvare le immagini all'interno della cartella uploads
* Perché `secure_filename()` è fondamentale per la sicurezza
* Come salvare i nomi dei file delle immagini nel database

Nella prossima lezione creeremo una nuova rotta che permetterà agli utenti di visualizzare le immagini caricate.

---

## Risoluzione dei problemi (Troubleshooting)

### Ricevo l'errore:

```text
NameError: name 'secure_filename' is not defined

```

Assicurati di aver aggiunto la riga di importazione:

```python
from werkzeug.utils import secure_filename

```

all'inizio del tuo file.

---

### Ricevo l'errore:

```text
NameError: name 'os' is not defined

```

Assicurati di aver importato il modulo os:

```python
import os

```

nella parte superiore del file.

---

### Ricevo un errore "400 Bad Request"

Assicurati che Postman stia utilizzando l'opzione:

```text
form-data

```

e non:

```text
raw

```

oppure

```text
JSON

```

---

### L'immagine non viene salvata sul disco

Verifica che:

* La cartella uploads esista effettivamente sul disco
* L'applicazione disponga dei permessi di scrittura del sistema operativo
* Il tipo di campo per `image` sia impostato su **File** in Postman
* Il file selezionato per il caricamento non sia vuoto

---

### Il libro viene creato ma l'immagine risulta mancante

Verifica che il parametro:

```python
image_filename=filename

```

sia stato inserito correttamente durante l'istanziazione dell'oggetto `Book`.

Senza questa riga, il nome del file non verrà mai salvato nel database.
