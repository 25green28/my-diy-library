# Eliminare un libro (DELETE)

Le richieste DELETE vengono utilizzate per rimuovere risorse dal database. Implementiamo un endpoint che consenta ai client di eliminare libri dalla nostra biblioteca.

---

## L'endpoint DELETE

Aggiungi questa rotta (route) al tuo file `app.py` (dopo le altre rotte):

```python
@app.route('/api/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = Book.query.get(book_id)

    # If the book doesn't exist, return a 404 error
    if not book:
        return error_response('Book not found', 404)

    # Delete the book from the database
    db.session.delete(book)
    db.session.commit()

    return jsonify({'message': 'Book deleted successfully'}), 200

```

## Come funziona

1. Troviamo il libro tramite il suo ID
2. Se il libro non esiste, restituiamo un errore 404
3. `db.session.delete(book)` contrassegna il libro per l'eliminazione
4. `db.session.commit()` lo rimuove permanentemente dal database
5. Restituiamo un messaggio di successo con stato 200

## Gestione degli errori del database

Proprio come nelle lezioni precedenti, le operazioni del database possono fallire.

Sostituisci il codice:

```python
db.session.delete(book)
db.session.commit()

return jsonify({'message': 'Book deleted successfully'}), 200

```

con il seguente:

```python
try:
    # Delete the book from the database
    db.session.delete(book)
    db.session.commit()

    return jsonify({
        'message': 'Book deleted successfully'
    }), 200

except Exception:
    # In case of an error, rollback the transaction
    db.session.rollback()

    return error_response(
        'Internal server error',
        500
    )

```

Questo impedisce alla tua API di bloccarsi (crash) se qualcosa va storto.

## Ritornare lo stato 204 No Content

Alcune API restituiscono il codice `204 No Content` invece di un messaggio testuale di successo.

Sostituisci il codice:

```python
return jsonify({
    'message': 'Book deleted successfully'
}), 200

```

con il seguente:

```python
return '', 204

```

Il codice di stato `204` significa:

* L'eliminazione è andata a buon fine
* Non viene restituito alcun corpo della risposta (response body)

Entrambi gli approcci sono validi.

## La scelta migliore

La tua biblioteca attualmente memorizza i seguenti dati:

* book_id
* title
* author
* genre
* published_year

Prima di guardare la soluzione, rifletti:

Se un utente elimina un libro, quale valore dovrebbe essere utilizzato per identificare il libro?

La scelta migliore è:

```python
book_id

```

perché ogni libro ha un identificatore ID univoco.

I titoli e gli autori possono essere duplicati, ma gli ID sono unici.

Questo è il motivo per cui la nostra rotta utilizza il codice:

```python
@app.route('/api/books/<int:book_id>', methods=['DELETE'])

```

---

## Provalo con Postman

Crea una nuova richiesta in Postman.

**Metodo**

```text
DELETE

```

**URL**

```text
[http://127.0.0.1:5000/api/books/1](http://127.0.0.1:5000/api/books/1)

```

Sostituisci `1` con l'ID di un libro esistente.

Fai clic su **Send**.

Se la richiesta va a buon fine, il libro verrà rimosso dal database e l'API restituirà una risposta di successo.

---

## Best practices

* Verifica sempre se la risorsa esiste prima di provare a eliminarla
* Utilizza l'ID del libro per identificare i record
* Restituisci messaggi di successo e di errore chiari
* Avvolgi le operazioni del database in un blocco `try/except`
* Chiama il metodo `rollback()` quando si verifica un errore del database

---

## Conclusione

In questa lezione hai imparato:

* Come funzionano le richieste DELETE
* Come creare un endpoint DELETE in Flask
* Come rimuovere i record utilizzando SQLAlchemy
* Come restituire un errore 404 quando un libro non esiste
* Come gestire gli errori del database in modo sicuro
* La differenza tra i codici di stato 200 e 204

Nella prossima lezione continueremo a migliorare la nostra API rendendola più robusta e facile da mantenere.

---

## Risoluzione dei problemi (Troubleshooting)

### Ricevo:

```text
Book not found

```

L'ID del libro richiesto non esiste.

Prova a eseguire:

```text
GET /api/books

```

per vedere quali libri sono attualmente memorizzati nel database.

---

### Ricevo:

```text
AttributeError: 'NoneType' object has no attribute ...

```

Questo di solito significa che il libro non è stato trovato, ma il tuo codice ha comunque cercato di utilizzarlo.

Assicurati di aver inserito il controllo:

```python
if not book:
    return error_response(
        'Book not found',
        404
    )

```

prima di procedere all'eliminazione del libro.

---

### Ricevo:

```text
Internal server error

```

Controlla l'output del tuo terminale.

L'API restituisce un messaggio di errore generico, ma il terminale mostra solitamente l'eccezione (exception) reale.

---

### Il libro è ancora visibile dopo averlo eliminato

Assicurati di aver chiamato il metodo:

```python
db.session.commit()

```

dopo:

```python
db.session.delete(book)

```

Senza `commit()`, l'eliminazione non viene salvata nel database.

---

### La richiesta DELETE non funziona

Assicurati che il parametro:

```python
methods=['DELETE']

```

sia presente nella rotta:

```python
@app.route(
    '/api/books/<int:book_id>',
    methods=['DELETE']
)

```

Se Flask non consente le richieste DELETE, verifica che la rotta sia stata salvata e che il server sia stato riavviato.