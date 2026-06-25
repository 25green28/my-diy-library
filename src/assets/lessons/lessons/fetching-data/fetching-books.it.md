# Recuperare più libri (GET)

Ora creiamo un endpoint per recuperare tutti i libri dal database. Questo è utile quando i client vogliono mostrare un elenco di libri o vedere tutto ciò che è memorizzato nella biblioteca.

---

## L'endpoint GET per tutte le risorse

Aggiungi questa rotta (route) al tuo file `app.py` (sotto la rotta della lezione precedente):

```python
@app.route('/api/books', methods=['GET'])
def get_books():
    books = Book.query.all()

    books_list = []

    # Convert each book to a dictionary and add to the list
    for book in books:
        books_list.append({
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'genre': book.genre,
            'published_year': book.published_year
        })

    return jsonify(books_list), 200

```

## Come funziona

1. `Book.query.all()` recupera tutti i libri dal database.
2. Creiamo una lista vuota chiamata `books_list`.
3. Iteriamo attraverso ogni libro restituito dal database utilizzando un ciclo.
4. Ogni libro viene convertito in un dizionario (dictionary).
5. I dizionari vengono aggiunti alla lista.
6. La lista viene restituita in formato JSON con il codice di stato `200 OK`.

## Comprendere `.all()`

In precedenza, abbiamo utilizzato la sintassi:

```python
Book.query.get(book_id)

```

per recuperare un singolo libro.

Questa volta utilizziamo:

```python
Book.query.all()

```

che recupera **tutti i libri** dal database.

Se sono memorizzati 5 libri, SQLAlchemy restituirà una lista contenente 5 oggetti Book.

---

## Utilizzo della funzione di supporto (helper)

Se hai creato la funzione helper della lezione precedente, il tuo codice diventerà molto più pulito:

```python
@app.route('/api/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    # Convert each book to a dictionary and return as JSON
    return jsonify([book_to_dict(book) for book in books]), 200

```

Entrambi gli approcci funzionano esattamente allo stesso modo.

Per i principianti, la versione con il ciclo tradizionale `for` è solitamente più facile da comprendere.

---

## Testare l'endpoint

Avvia il tuo server Flask e visita l'indirizzo:

```text
[http://127.0.0.1:5000/api/books](http://127.0.0.1:5000/api/books)

```

Se nel database sono presenti dei libri, dovresti vedere qualcosa di simile a:

```json
[
  {
    "id": 1,
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "published_year": 1949
  }
]

```

## Cosa succede se non ci sono libri?

Se il database è vuoto, Flask restituirà:

```json
[]

```

Questo è completamente normale.

Una lista vuota significa semplicemente che non è ancora stato creato alcun libro.

---

## Conclusione

In questa lezione hai imparato:

* Come recuperare tutti i record da un database
* Come funziona il metodo `Book.query.all()`
* Come convertire gli oggetti del database in formato JSON
* Come restituire una lista di libri da un'API
* Perché le funzioni helper possono ridurre la duplicazione del codice

Nella prossima lezione imparerai come cercare e filtrare i libri utilizzando i parametri di query (query parameters).

---

## Risoluzione dei problemi (Troubleshooting)

### Ricevo una lista vuota (`[]`)

Questo di solito significa che non ci sono ancora libri nel database.

Crea alcuni libri utilizzando l'endpoint POST e riprova.

---

### Visualizzo un errore del tipo:

```text
Object of type Book is not JSON serializable

```

Non è possibile restituire direttamente gli oggetti di SQLAlchemy.

Convertili prima in dizionari:

```python
{
    "id": book.id,
    "title": book.title
}

```

oppure utilizza la tua funzione helper `book_to_dict()`.

---

### Ricevo l'errore:

```text
NameError: name 'jsonify' is not defined

```

Assicurati di aver importato la funzione `jsonify`:

```python
from flask import jsonify

```

---

### Le mie modifiche non sono visibili

Assicurati che:

* Il server Flask sia in esecuzione
* Tu abbia salvato il file
* Il server si sia riavviato dopo le modifiche

Se necessario, arresta il server e avviato di nuovo:

```bash
python app.py

```