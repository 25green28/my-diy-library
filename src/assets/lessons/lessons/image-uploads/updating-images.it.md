# Aggiornamento delle immagini nelle richieste PUT

Così come possiamo caricare immagini durante la creazione dei libri, dobbiamo anche consentire agli utenti di aggiornare o sostituire le immagini esistenti quando modificano un libro.

---

## Aggiornare la rotta update_book

Modifica la tua rotta PUT per gestire gli aggiornamenti delle immagini (la funzione `update_book`):

```python
@app.route('/api/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    book = Book.query.get(book_id)

   # Handle missing book
    if not book:
        return error_response('Book not found', 404)

    title = request.form.get('title')
    author = request.form.get('author')
    genre = request.form.get('genre')
    published_year = request.form.get('published_year')
    image = request.files.get('image')

    # Update fields if provided
    if title:
        book.title = title

    if author:
        book.author = author

    if genre:
        book.genre = genre

    if published_year:
        try:
            book.published_year = int(published_year)
        except:
            return error_response('Published year must be a number', 400)

    if image:
        # Delete old image if it exists
        if book.image_filename:
            old_path = os.path.join(app.config['UPLOAD_FOLDER'], book.image_filename)
            if os.path.exists(old_path):
                os.remove(old_path)

        # Save new image
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        book.image_filename = filename

    try: 
        db.session.commit()

    except Exception:
        db.session.rollback()

        return error_response(
            'Internal server error',
            500
        )
    
    return jsonify(book_to_dict(book)), 200

```

---

## Spiegazione delle modifiche chiave

### Recuperare l'immagine aggiornata

```python
image = request.files.get('image')

```

Eseguiamo il recupero del file caricato direttamente dalla richiesta (esattamente come avviene nella rotta POST).

Se non viene inviato alcun file, la variabile `image` assumerà il valore `None`.

---

### Aggiornare l'immagine solo se fornita

```python
if image:
    filename = secure_filename(image.filename)
    image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    book.image_filename = filename

```

* Questo codice viene eseguito solo se viene inviata una nuova immagine
* Salva il nuovo file all'interno della cartella uploads
* Aggiorna il database inserendo il nuovo nome del file
* L'immagine preesistente non viene modificata se non viene fornito un nuovo file

---

## Importante: Pulizia del vecchio file

Al momento, le vecchie immagini NON vengono eliminate automaticamente dal disco.

Ciò significa che la sostituzione frequente delle immagini lascerà file inutilizzati e orfani sul server.

### Miglioramento raccomandato (specialmente nei progetti reali):

Aggiorna l'attuale blocco `if image` in modo da includere la logica di rimozione del vecchio file:

```python
if image:
    # Elimina la vecchia immagine se esiste
    if book.image_filename:
        old_path = os.path.join(app.config['UPLOAD_FOLDER'], book.image_filename)
        if os.path.exists(old_path):
            os.remove(old_path)

    # Salva la nuova immagine
    filename = secure_filename(image.filename)
    image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    book.image_filename = filename

```

Questo accorgimento evita l'accumulo di file superflui sul server.

---

## Comportamento atteso dell'applicazione

### Cosa succede se viene inviata solo un'immagine?

Se un utente decide di inviare:

* esclusivamente un file immagine
* nessun campo di testo come title / author / genre

Il sistema continuerà a funzionare senza errori.

Questo accade perché ogni singolo campo viene aggiornato solo se effettivamente presente all'interno della richiesta:

```python
if title:
    book.title = title

```

Di conseguenza:

* campi mancanti nella richiesta → ignorati
* dati esistenti nel database → invariati

---

## Testare con Postman

1. Metodo: `PUT`
2. URL: `http://localhost:5000/api/books/1`
3. Scheda Body → seleziona `form-data`
4. Aggiungi i campi:
* title (opzionale)
* author (opzionale)
* genre (opzionale)
* published_year (opzionale)
* image (tipo: File)



Infine, fai clic su **Send**

---

## Best practices

* Progetta l'aggiornamento dell'immagine in modo che rimanga sempre opzionale
* Utilizza la funzione `secure_filename()` per garantire la sicurezza del sistema
* Rimuovi le vecchie immagini per evitare sprechi di spazio sul server
* Non sovrascrivere mai i dati nel database a meno che non siano esplicitamente forniti nella richiesta
* Mantieni la logica di gestione dei file uniforme tra le rotte POST e PUT

---

## Conclusione

Ora sai come gestire correttamente l'aggiornamento delle immagini all'interno delle richieste PUT.

I concetti chiave sono:

* Utilizzare l'oggetto `request.files` per intercettare i file multimediali caricati
* Aggiornare l'immagine solo se esplicitamente passata nella richiesta
* Preservare i dati presenti nel database quando alcuni campi non vengono inviati
* Eliminare le vecchie immagini dal disco per ottimizzare lo spazio di archiviazione
* Mantenere la logica di upload coerente con quella utilizzata nella rotta POST

Nella prossima lezione impareremo come gestire correttamente l'eliminazione dei file immagine quando un libro viene rimosso dal sistema.

---

## Risoluzione dei problemi (Troubleshooting)

### L'immagine non si aggiorna

* Assicurati di inviare una richiesta con metodo `PUT` e non `POST`
* Verifica che il formato form-data includa un campo di tipo file denominato esattamente `image`
* Controlla la correttezza dell'ID del libro passato nell'URL

---

### Le vecchie immagini rimangono sul disco del server

Questo comportamento è normale a meno che tu non abbia implementato la logica di pulizia descrittiva sopra.

Inserisci lo snippet opzionale di rimozione del file se necessario.

---

### Errore nell'applicazione quando non viene inviata alcuna immagine

Assicurati che tutta la logica legata all'immagine sia racchiusa all'interno del controllo condizionale:

```python
if image:

```

Questo previene il crash dell'interfaccia API in caso di richieste prive di file.
