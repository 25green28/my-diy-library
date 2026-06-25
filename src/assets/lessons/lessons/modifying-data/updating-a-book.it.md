# Aggiornamento di un libro (PUT)

Le richieste PUT vengono utilizzate per modificare le risorse esistenti.

Nella nostra API della libreria, questo significa aggiornare le informazioni relative a un libro già presente all'interno del database.

> **Suggerimento:** In questo progetto, il nostro endpoint PUT aggiorna esclusivamente i campi forniti nella richiesta. Tecnicamente questo comportamento rispecchia quello di una richiesta PATCH, ma continueremo a usare PUT per motivi di semplicità.

---

## Perché serve una rotta di aggiornamento?

Immagina che un utente voglia correggere un refuso all'interno del titolo di un libro.

Libro corrente:

```json
{
  "id": 1,
  "title": "19844",
  "author": "George Orwell"
}

```

Libro aggiornato:

```json
{
  "id": 1,
  "title": "1984",
  "author": "George Orwell"
}

```

Invece di creare un record completamente nuovo, aggiorniamo quello esistente.

---

## La rotta di aggiornamento

Aggiungi la seguente rotta sotto quella creata nella lezione precedente:

```python
@app.route('/api/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    book = Book.query.get(book_id)

    # Handle missing book
    if not book:
        return jsonify({'error': 'Book not found'}), 404

    data = request.get_json()

    # Update fields if provided
    if 'title' in data:
        book.title = data['title']

    if 'author' in data:
        book.author = data['author']

    if 'genre' in data:
        book.genre = data['genre']

    if 'published_year' in data:
        book.published_year = data['published_year']

    # Save changes
    db.session.commit()

    return jsonify(book_to_dict(book)), 200

```

---

## Comprendere il funzionamento della rotta

### Recuperare il libro

```python
book = Book.query.get(book_id)

```

L'ID del libro viene estratto direttamente dall'URL:

```text
/api/books/1

```

Se il libro esiste, SQLAlchemy restituisce il record corrispondente.

---

### Gestione dei libri mancanti

```python
if not book:
    return jsonify({'error': 'Book not found'}), 404

```

Se nessun libro corrisponde all'ID fornito, viene restituita una risposta `404 Not Found`.

---

### Leggere i dati JSON

```python
data = request.get_json()

```

Questa riga converte il corpo della richiesta JSON in un dizionario Python.

Esempio:

```json
{
  "title": "Nineteen Eighty-Four"
}

```

diventa:

```python
{
    "title": "Nineteen Eighty-Four"
}

```

---

### Aggiornare i campi

```python
if 'title' in data:
    book.title = data['title']

```

Vengono aggiornati solo ed esclusivamente i campi inclusi nella richiesta.

Ad esempio:

```json
{
  "title": "Nineteen Eighty-Four"
}

```

modificherà soltanto il titolo. Tutti gli altri campi rimarranno invariati.

---

## Perché è necessario commit()?

La modifica del valore di una proprietà non aggiorna immediatamente il database fisico.

Ad esempio:

```python
book.title = "New Title"

```

modifica l'oggetto soltanto all'interno della memoria RAM dell'applicazione.

Per salvare permanentemente la modifica nel database:

```python
db.session.commit()

```

Pensa a `commit()` come alla pressione del pulsante "Salva". Senza di esso, le modifiche andrebbero perse al termine del ciclo della richiesta.

---

## Mettiti alla prova

Supponiamo che il database contenga il seguente record:

```json
{
  "id": 1,
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "published_year": 1949
}

```

Quale sarà l'aspetto del libro dopo aver inviato questa richiesta?

```json
{
  "title": "Nineteen Eighty-Four"
}

```

```json
{
  "id": 1,
  "title": "Nineteen Eighty-Four",
  "author": "George Orwell",
  "genre": "Dystopian",
  "published_year": 1949
}

```

Cambia solo il titolo.

---

## PUT vs PATCH

Esistono due metodi principali per gestire gli aggiornamenti nelle API REST:

### PUT

Tradizionalmente sostituisce l'intera risorsa con una nuova rappresentazione completa.

Esempio:

```json
{
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "published_year": 1949
}

```

### PATCH

Aggiorna parzialmente la risorsa modificando solo i campi forniti.

Esempio:

```json
{
  "title": "Nineteen Eighty-Four"
}

```

Poiché la nostra rotta modifica solo i campi ricevuti, si comporta all'atto pratico come una PATCH. Manterremo comunque l'uso di PUT per motivi di semplicità didattica.

---

## Prova con Postman

Crea una nuova richiesta all'interno di Postman.

**Metodo**

```text
PUT

```

**URL**

```text
[http://127.0.0.1:5000/api/books/1](http://127.0.0.1:5000/api/books/1)

```

Sostituisci il numero `1` con l'ID di un libro realmente esistente nel tuo database.

Apri la scheda **Body**, seleziona le opzioni:

```text
raw → JSON

```

Invia il seguente payload:

```json
{
    "genre": "Science Fiction"
}

```

Fai clic su **Send**. Se la richiesta ha successo, Postman restituirà il libro aggiornato in formato JSON.

---

## Best practices

* Verifica sempre che la risorsa esista prima di procedere al suo aggiornamento.
* Convalida i dati in ingresso prima di salvarli permanentemente.
* Invoca sempre `commit()` dopo aver apportato le modifiche ai campi.
* Restituisci la risorsa aggiornata quando l'operazione va a buon fine.
* Utilizza i codici di stato HTTP appropriati (`200`, `404`, ecc.).

---

## Conclusione

In questa lezione hai imparato:

* Come funzionano le richieste PUT.
* Come recuperare un libro specifico prima di modificarlo.
* Come leggere i dati JSON da una richiesta.
* Come funzionano gli aggiornamenti parziali dei campi.
* Perché l'istruzione `db.session.commit()` è obbligatoria.
* La differenza teorica tra i metodi PUT e PATCH.

Nella prossima lezione vedremo come convalidare i dati in ingresso prima di salvarli nel database.

---

## Risoluzione dei problemi (Troubleshooting)

### Ricevo il messaggio:

```text
Book not found

```

L'ID fornito nell'URL non esiste all'interno del database. Assicurati che il libro sia stato creato prima di tentare l'aggiornamento.

---

### Le mie modifiche non vengono salvate

Assicurati di aver inserito la chiamata a:

```python
db.session.commit()

```

Senza questa riga, SQLAlchemy annullerà le modifiche al termine della richiesta.

---

### Ricevo l'errore:

```text
NameError: name 'request' is not defined

```

Verifica di aver importato correttamente l'oggetto request da Flask:

```python
from flask import request

```

---

### Ricevo l'errore:

```text
TypeError: argument of type 'NoneType' is not iterable

```

Questo indica solitamente che non è stato inviato alcun dato JSON nel corpo della richiesta. Assicurati che il body su Postman contenga del codice JSON valido.

---

### Le modifiche apportate non sono visibili

Controlla che:

* Il server Flask sia regolarmente in esecuzione.
* Il file di codice sia stato salvato sul disco.
* Il server si sia riavviato automaticamente dopo il salvataggio.

Se necessario, riavvialo manualmente digitando:

```bash
python app.py

```
