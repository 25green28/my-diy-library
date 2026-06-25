# Eliminare le immagini quando si eliminano i libri

Quando eliminiamo un libro, dovremmo anche ripulire il file dell'immagine associato per evitare di lasciare file orfani sul server.

> **Importante**: Elimina l'immagine solo se nessun altro libro la sta utilizzando. Questo evita di cancellare accidentalmente un'immagine condivisa da più libri.

---

## Aggiornare la rotta delete_book

Modifica la tua rotta DELETE per includere la pulizia dell'immagine con il conteggio dei riferimenti (la funzione `delete_book`):

```python
@app.route('/api/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = Book.query.get(book_id)

    # If the book doesn't exist, return a 404 error
    if not book:
        return error_response('Book not found', 404)

    # Delete image file if it exists and no other books use it
    if book.image_filename:
        # Check if any other books use the same image
        other_books_with_image = Book.query.filter(
            Book.id != book_id,
            Book.image_filename == book.image_filename
        ).count()

        # Only delete if this is the only book using this image
        if other_books_with_image == 0:
            path = os.path.join(app.config['UPLOAD_FOLDER'], book.image_filename)

            if os.path.exists(path):
                os.remove(path)

    try:
        db.session.delete(book)
        db.session.commit()

        return jsonify({
            'message': 'Book deleted successfully'
        }), 200

    except Exception:
        db.session.rollback()

        return error_response(
            'Internal server error',
            500
        )

```

---

## Comprendere il codice di pulizia

### Verificare se l'immagine esiste

```python
if book.image_filename:

```

Tentiamo l'eliminazione del file solo se il libro ha effettivamente un nome di file d'immagine memorizzato nel database.

---

### Verificare l'utilizzo di un'immagine condivisa

```python
other_books_with_image = Book.query.filter(
    Book.id != book_id,
    Book.image_filename == book.image_filename
).count()

```

Questo frammento conta quanti altri libri (escludendo quello in corso di eliminazione) utilizzano lo stesso nome di file per l'immagine.

* `Book.id != book_id` → esclude il libro corrente dal conteggio
* `Book.image_filename == book.image_filename` → trova i libri con la stessa immagine

---

### Eliminazione condizionale

```python
if other_books_with_image == 0:
    path = os.path.join(app.config['UPLOAD_FOLDER'], book.image_filename)

    if os.path.exists(path):
        os.remove(path)

```

L'immagine viene eliminata dal disco solo se:

* Nessun altro libro fa riferimento ad essa (`count == 0`)
* Il file esiste effettivamente sul disco

---

## Comportamento atteso dell'applicazione

### Se l'immagine è unica per questo libro:

* il file viene rimosso dal disco
* il libro viene eliminato dal database

### Se l'immagine è condivisa da altri libri:

* il file NON viene rimosso (gli altri libri ne hanno ancora bisogno)
* il libro viene eliminato dal database
* l'immagine rimane disponibile per gli altri libri

### Se l'immagine NON esiste sul disco:

* avviene solo l'eliminazione dal database
* non viene generato alcun errore

---

## Perché questo passaggio è fondamentale

Senza il conteggio dei riferimenti:

* eliminare un libro potrebbe compromettere la visualizzazione di altri libri che condividono la stessa immagine
* gli utenti vedrebbero immagini corrotte o mancanti per i libri rimanenti
* l'integrità dei dati verrebbe compromessa

Senza alcuna pulizia dei file:

* i libri eliminati lascerebbero dietro di sé i propri file di immagine
* la cartella `/uploads` crescerebbe a dismisura nel tempo
* lo spazio sul disco verrebbe sprecato
* i file orfani si accumulerebbero sul server

---

## Esercizio

Cosa succede se due libri condividono la stessa immagine e ne elimini uno?

Il file dell'immagine NON viene eliminato.

Perché:

```python
other_books_with_image = Book.query.filter(
    Book.id != book_id,
    Book.image_filename == book.image_filename
).count()

if other_books_with_image == 0:
    # elimina l'immagine

```

Quando elimini il primo libro:

* `other_books_with_image` restituisce `1` (il secondo libro la sta ancora usando)
* La condizione `other_books_with_image == 0` risulta `False`
* Il file dell'immagine NON viene eliminato
* Il secondo libro continua ad avere accesso all'immagine

Quando elimini il secondo libro:

* `other_books_with_image` restituisce `0` (nessun altro libro la usa)
* La condizione `other_books_with_image == 0` risulta `True`
* Il file dell'immagine VIENE eliminato

---

## Opzionale: versione di produzione più sicura

Se desideri un tracciamento degli errori più sicuro (consigliato nelle app reali):

```python
if book.image_filename:
    # Check if any other books use the same image
    other_books_with_image = Book.query.filter(
        Book.id != book_id,
        Book.image_filename == book.image_filename
    ).count()

    # Only delete if this is the only book using this image
    if other_books_with_image == 0:
        path = os.path.join(app.config['UPLOAD_FOLDER'], book.image_filename)

        try:
            if os.path.exists(path):
                os.remove(path)
        except Exception as e:
            print(f"Failed to delete image: {e}")

```

Questo assicura che l'API non si blocchi mai a causa di imprevisti legati al file system.

---

## Best practices

* Elimina sempre i file correlati quando rimuovi i record dal database
* Verifica sempre l'esistenza del file sul disco prima di procedere all'eliminazione
* Non permettere mai che gli errori del file system blocchino le operazioni del database
* Prevedi il tracciamento (logging) dei fallimenti di eliminazione dei file
* Mantieni pulita la cartella dei caricamenti per evitare sprechi di spazio

---

## Conclusione

Ora gestisci l'intero ciclo di vita delle immagini:

* Caricare immagini
* Aggiornare le immagini in sicurezza
* Sostituire i vecchi file con i nuovi
* Eliminare le immagini quando i libri vengono rimossi

Concetto chiave:

L'eliminazione dal database e la pulizia del file system devono sempre muoversi in modo sincronizzato.

---

## Risoluzione dei problemi (Troubleshooting)

### Il file dell'immagine non viene eliminato

Verifica che:

* `image_filename` non sia impostato su None
* il percorso della cartella di upload sia corretto
* il codice sia inserito all'interno della rotta associata al metodo DELETE

---

### Errore di permessi (Permission error) durante l'eliminazione

Possibili cause:

* il file è bloccato da un altro processo
* mancano i permessi di scrittura o modifica del sistema
* restrizioni del sistema operativo

Correggi i permessi delle cartelle all'interno della directory del tuo progetto.

---

### Il libro viene eliminato ma il file rimane sul disco

Questo significa che:

* il codice di pulizia è mancante o non viene eseguito
* oppure il percorso del file (`path`) non è corretto

Aggiungi una stampa di controllo (debug print) per verificare il percorso:

```python
print(path)

```