# Ritornare gli errori

Anche con la validazione attiva, le cose possono comunque andare storte. Un client può richiedere un libro che non esiste, inviare dati non validi o scatenare un errore imprevisto del server.

Le buone API restituiscono messaggi di errore chiari che aiutano i client a capire cosa sia successo.

---

## Perché ritornare gli errori?

Immagina che un client provi a recuperare un libro che non esiste.

Senza una corretta gestione degli errori, potrebbe ricevere una risposta confusa o nessuna informazione utile.

Invece, dovremmo restituire:

```json
{
  "error": "Book not found"
}

```

insieme a un codice di stato HTTP appropriato.

Questo rende l'API più facile da usare e da sottoporre a debug.

---

## Creazione di una funzione di supporto (helper)

Fino ad ora, avrai probabilmente scritto risposte di errore in questo modo:

```python
return jsonify({
    'error': 'Book not found'
}), 404

```

Questo funziona, ma finirai per ripetere lo stesso codice in molte rotte (routes).

Creiamo una funzione helper che generi le risposte di errore per noi.

### Passo 1: Aggiungi la funzione helper

Apri `app.py`.

Posiziona la seguente funzione sotto la funzione `book_to_dict` e sopra la tua prima rotta.

```python
# Helper function to return an error response
def error_response(message, status_code):
    return jsonify({
        'error': message,
        'status': status_code
    }), status_code

```

### Passo 2: Usa la funzione helper

Ogni volta che vedi del codice come:

```python
return jsonify({
    'error': 'Book not found'
}), 404

```

puoi sostituirlo con:

```python
return error_response(
    'Book not found',
    404
)

```

Entrambe le versioni funzionano esattamente allo stesso modo.

---

## Codici di stato di errore comuni

Questi sono i codici di stato più comuni che utilizzerai:

| Codice di stato | Significato |
| --- | --- |
| 400 | Bad Request |
| 404 | Resource Not Found |
| 500 | Internal Server Error |

### 400 Bad Request

Il client ha inviato dati non validi.

Esempio:

```python
return error_response(
    'Title is required',
    400
)

```

---

### 404 Not Found

La risorsa richiesta non esiste.

Esempio:

```python
return error_response(
    'Book not found',
    404
)

```

---

### 500 Internal Server Error

Si è verificato un imprevisto sul server.

Esempio:

```python
return error_response(
    'Internal server error',
    500
)

```

---

## Gestione degli errori imprevisti

A volte succede qualcosa di imprevisto durante l'interazione con il database.

Python ci consente di catturare questi errori usando `try` ed `except`.

### Passo 1: Trova il commit del database

Hai già un codice simile a:

```python
db.session.add(new_book)
db.session.commit()

return jsonify(book_to_dict(new_book)), 201

```

nella tua funzione `create_book` e,

```python
db.session.commit()

return jsonify(book_to_dict(book)), 200

```

nella tua funzione `update_book`.

### Passo 2: Avvolgi il commit in un bloco try/except

Sostituiscilo con:

```python
db.session.add(new_book)

try:
    # Commit the transaction
    db.session.commit()

except Exception:
    # Rollback the transaction and return an error
    db.session.rollback()

    return error_response(
        'Internal server error',
        500
    )

return jsonify(book_to_dict(new_book)), 201

```

per la funzione `create_book`, e con:

```python
try: 
    # Commit the transaction
    db.session.commit()

except Exception:
    # Rollback the transaction and return an error
    db.session.rollback()

    return error_response(
        'Internal server error',
        500
    )

return jsonify(book_to_dict(book)), 200

```

per la funzione `update_book`.

### Cosa fa questo codice?

* `try` esegue il codice
* Se si verifica un errore, Python passa ad `except`
* `rollback()` annulla le modifiche al database non completate
* L'API restituisce un errore invece di bloccarsi (crash)

Pensa a `rollback()` wie a un pulsante "Annulla" (Undo) per le operazioni del database.

---

## Prova tu stesso

Supponiamo che un utente richieda un libro che non esiste.

Completa il codice di stato mancante:

```python
if not book:
    return error_response(
        'Book not found',
        ?
    )

```

Quale codice di stato dovrebbe essere restituito?

```python
if not book:
    return error_response(
        'Book not found',
        404
    )

```

---

## Ritornare gli errori di validazione

> **Nota:** Questa sezione è solo a scopo informativo. Raccomando di saltare l'implementazione di questa sezione.

A volte esistono più problemi contemporaneamente nella richiesta.

Per esempio:

```json
{
  "title": ""
}

```

Questa richiesta:

* Ha un titolo vuoto
* Non contiene un autore

Possiamo restituire più errori insieme:

```python
return jsonify({
    'error': 'Validation failed',
    'errors': [
        'Title cannot be empty',
        'Author is required'
    ]
}), 400

```

Risposta:

```json
{
  "error": "Validation failed",
  "errors": [
    "Title cannot be empty",
    "Author is required"
  ]
}

```

Questo fornisce ai client informazioni più utili.

---

## Conclusione

In questa lezione hai imparato:

* Perché le API dovrebbero restituire messaggi di errore chiari
* Come creare una funzione helper di errore riutilizzabile
* La differenza tra i codici di stato 400, 404 e 500
* Come restituire risposte di errore coerenti
* Come funzionano `try` ed `except`
* Perché `rollback()` è importante quando le operazioni del database falliscono

Nella prossima lezione continueremo a migliorare la nostra API rendendola più affidabile e facile da usare.

---

## Risoluzione dei problemi (Troubleshooting)

### Ricevo:

```text
NameError: name 'error_response' is not defined

```

Assicurati di aver creato la funzione helper:

```python
# Helper function to return an error response
def error_response(message, status_code):
    return jsonify({
        'error': message,
        'status': status_code
    }), status_code

```

prima di utilizzarla.

---

### Ricevo:

```text
Working outside of application context

```

Questo di solito accade quando le operazioni del database vengono eseguite al di fuori del contesto dell'applicazione Flask.

Assicurati che le operazioni del database avvengano all'interno delle tue rotte Flask (Flask routes) o all'interno di:

```python
with app.app_context():

```

---

### Ricevo:

```text
Internal server error

```

Si è verificato un errore imprevisto.

Controlla l'output del tuo terminale per il vero messaggio di errore.

Il terminale contiene solitamente informazioni più dettagliate rispetto alla risposta dell'API.

---

### La mia API si blocca (crash) invece di restituire un errore

Assicurati che il codice a rischio sia all'interno di un blocco `try`:

```python
try:
    db.session.commit()

except Exception:
    db.session.rollback()

    return error_response(
        'Internal server error',
        500
    )

```

Senza `try/except`, Python interromperà l'esecuzione quando si verifica un errore.