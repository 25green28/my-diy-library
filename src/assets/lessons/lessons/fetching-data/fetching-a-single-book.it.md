# Recuperare un singolo libro

Ora creiamo un endpoint per recuperare un libro specifico tramite il suo ID. Questo è un pattern molto comune nelle API — ottenere una singola risorsa dal database.

---

## L'endpoint GET

Aggiungi questa rotta (route) al tuo file `app.py` (sotto la rotta POST):

```python
@app.route('/api/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = Book.query.get(book_id)

    # Return the book data if found
    if book:
        return jsonify({
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'genre': book.genre,
            'published_year': book.published_year
        }), 200

    # Return error if book not found
    return jsonify({'error': 'Book not found'}), 404

```

## Come funziona

1. `<int:book_id>` cattura l'ID del libro dall'URL (ad esempio `/api/books/1`)
2. `Book.query.get(book_id)` cerca un libro con quell'ID specifico
3. Se il libro esiste, restituiamo i suoi dati con il codice di stato `200 OK`
4. Se il libro non esiste, restituiamo un messaggio di errore con il codice di stato `404 Not Found`

## Comprendere `Book.query.get()`

`Book.query.get(book_id)` è un metodo di SQLAlchemy utilizzato per trovare un record tramite la sua chiave primaria (solitamente la colonna `id`).

Per esempio:

```python
book = Book.query.get(1)

```

Questo dice a SQLAlchemy:

> "Trova il libro il cui ID è 1."

Se non esiste alcun libro corrispondente, SQLAlchemy restituisce `None`.

---

## Testare l'endpoint

Dopo aver creato alcuni libri, prova ad aprire (in Postman o nel browser) questo indirizzo:

```text
[http://127.0.0.1:5000/api/books/1](http://127.0.0.1:5000/api/books/1)

```

Se il libro esiste, dovresti ricevere una risposta JSON simile a:

```json
{
  "id": 1,
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "published_year": 1949
}

```

Se il libro non esiste:

```json
{
  "error": "Book not found"
}

```

e il server restituirà il codice di stato `404`.

---

## Creazione di una funzione di supporto (helper)

Man mano che il tuo progetto cresce, potresti notare che ripeti la stessa struttura JSON in più rotte.

Una funzione helper può rendere il tuo codice più pulito (per favore inseriscila tra il modello e la rotta POST):

```python
# Helper function to convert book into JSON
def book_to_dict(book):
    return {
        'id': book.id,
        'title': book.title,
        'author': book.author,
        'genre': book.genre,
        'published_year': book.published_year
    }

```

Ora la rotta diventa:

```python
@app.route('/api/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = Book.query.get(book_id)

    # Return the book data if found
    if book:
        return jsonify(book_to_dict(book)), 200

    # Return error if book not found
    return jsonify({'error': 'Book not found'}), 404

```

## Esercizio

Prima di guardare le risposte, prova a rispondere a queste domande da solo:

1. Quale URL visiteresti per recuperare il libro con ID `5`?
2. Quale codice di stato dovrebbe essere restituito se il libro non esiste?
3. Perché controlliamo `if book:` prima di restituire i dati?

1. `/api/books/5`
2. `404 Not Found`
3. Perché la query potrebbe restituire `None` se non esiste alcun libro con quell'ID.

---

# Conclusione

* Le richieste GET vengono utilizzate per recuperare dati dal server
* I parametri di rotta ci consentono di identificare una risorsa specifica
* Possiamo recuperare un libro usando il suo ID univoco
* Controlla sempre se una risorsa esiste prima di restituirla
* Restituisci `404 Not Found` quando la risorsa richiesta non esiste
* Restituire dati in formato JSON mantiene l'API coerente e facile da usare

---

## Risoluzione dei problemi (Troubleshooting)

### Ricevo sempre "Book not found"

Questo di solito significa che:

* L'ID richiesto non esiste nel database
* Non è stato ancora creato alcun libro

**Risoluzione:**

Crea prima un libro utilizzando l'endpoint POST e poi prova a recuperarlo.

---

### Errore `404 Not Found`

Assicurati che il tuo URL corrisponda esattamente alla rotta definita.

Corretto:

```text
/api/books/1

```

Errato:

```text
/api/book/1

```

Nota la mancanza della lettera `s`.

---

### Errore `NameError: name 'jsonify' is not defined`

Questo accade quando la funzione `jsonify` di Flask non è stata importata.

**Risoluzione:**

```python
from flask import jsonify

```

---

### La rotta non viene mai eseguita

Assicurati che la rotta sia posizionata sopra il blocco:

```python
if __name__ == '__main__':
    app.run(debug=True)

```

Flask deve conoscere tutte le rotte prima dell'avvio dell'applicazione.

---

### Le modifiche non sono visibili

A volte il server deve essere ricaricato dopo le modifiche al codice.

**Risoluzione:**

* Salva il file
* Riavvia il server Flask se necessario
