# Servire le immagini tramite una nuova rotta

Ora che siamo in grado di caricare le immagini, abbiamo bisogno di un modo per servirle e mostrarle nuovamente al client. Creeremo una nuova rotta che restituirà il file dell'immagine.

---

## Creare la rotta per servire le immagini

Aggiungi questa nuova rotta alla tua applicazione (sotto la rotta di eliminazione):

```python
@app.route('/api/books/<int:book_id>/image', methods=['GET'])
def get_book_image(book_id):
    book = Book.query.get(book_id)

    # Check if book exists and has an image
    if not book or not book.image_filename:
        return error_response('Image not found', 404)

    # Serve the image file from the upload folder
    return send_from_directory(
        app.config['UPLOAD_FOLDER'],
        book.image_filename
    )

```

---

## Comprendere il funzionamento della rotta

### Pattern della rotta

```python
@app.route('/api/books/<int:book_id>/image', methods=['GET'])

```

* `/api/books/<int:book_id>/image` → URL dinamico strutturato come `/api/books/1/image`
* `<int:book_id>` → cattura l'ID del libro passandolo come numero intero
* `methods=['GET']` → risponde esclusivamente alle richieste di tipo GET

---

### Gestione degli errori

```python
if not book or not book.image_filename:
    return error_response('Image not found', 404)

```

Restituisce un errore 404 se:

* Il libro non esiste nel database
* Il libro esiste ma non ha un'immagine associata

---

### Servire il file dal disco

```python
return send_from_directory(
    app.config['UPLOAD_FOLDER'],
    book.image_filename
)

```

* `send_from_directory()` → funzione nativa di Flask che permette di servire file da una cartella in totale sicurezza
* Primo argomento → la directory in cui risiedono i file (upload folder)
* Secondo argomento → il nome del file memorizzato nel database

Questa funzione **lavora automaticamente con qualsiasi formato di immagine**, come ad esempio:

* `.jpg`
* `.jpeg`
* `.png`
* `.webp`
* `.gif`
* `.bmp`

Flask NON richiede né presuppone un formato specifico — si limita a servire il file esattamente per come esiste sul disco.

---

## Flusso operativo completo

1. Il client richiede l'indirizzo `/api/books/1/image`
2. Flask estrae il parametro `book_id = 1`
3. Viene eseguita una ricerca nel database per recuperare il record del libro
4. Il valore `image_filename` viene letto dal database
5. Flask serve il file prendendolo direttamente dalla cartella uploads
6. Il browser renderizza automaticamente l'immagine in base al tipo di file rilevato

---

## Utilizzare l'URL dell'immagine

La tua funzione helper `book_to_dict()` genera il campo:

```python
'image_url': f"/api/books/{book.id}/image" if book.image_filename else None

```

Esempio di risposta dell'API:

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

Utilizzo all'interno del codice Front-end (HTML):

```html
<img src="/api/books/1/image" alt="Book cover">

```

---

## Esercizio

Supponendo di avere nel database libri con ID indicizzati da 1 a 100, cosa succede se un utente richiede l'URL:

```
/api/books/999/image

```

L'API restituisce un errore 404 perché:

* Il libro non esiste OPPURE
* Non è stata memorizzata alcuna immagine per quel determinato libro

Il controllo viene gestito da questa condizione:

```python
if not book or not book.image_filename:
    return error_response('Image not found', 404)

```

---

## Best practices

* Convalida sempre che il libro esista sul database prima di provare a servire dei file
* Salva all'interno del database esclusivamente i nomi dei file
* NON limitare i formati delle immagini in questa fase (jpg/png/webp/ecc. sono tutti ugualmente validi)
* Assicurati che la validazione dei file avvenga durante la fase di upload e non quando vengono serviti
* Mantieni la cartella uploads al di fuori di static/ per motivi di sicurezza

---

## Conclusione

Ora sai come servire le immagini caricate in modo corretto.

I punti chiave da ricordare sono:

* Creare una rotta per l'immagine dedicata per ciascun libro
* Recuperare il nome del file dal database
* Utilizzare `send_from_directory()` per servire i file in sicurezza
* Il sistema supporta automaticamente TUTTI i formati di immagine più comuni
* Il front-end può utilizzare direttamente l'URL restituito all'interno dei tag `<img>`

Nella prossima lezione vedremo come aggiornare le immagini esistenti utilizzando le richieste PUT.

---

## Risoluzione dei problemi (Troubleshooting)

### Errore "Image not found" anche se il file esiste sul disco

* Verifica il valore del campo `image_filename` nel database
* Assicurati che il file si trovi realmente all'interno della cartella uploads
* Verifica la correttezza dell'ID del libro inviato

---

### L'immagine non viene visualizzata nel browser

* Controlla che non ci siano errori di digitazione nell'URL
* Assicurati che l'estensione del file corrisponda al tipo reale dell'immagine
* Verifica che il file dell'immagine non sia corrotto

---

### Errore di importazione: send_from_directory

Assicurati di aver inserito la funzione negli import all'inizio del file:

```python
from flask import Flask, request, jsonify, send_from_directory

```
