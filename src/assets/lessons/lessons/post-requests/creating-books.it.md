# Creazione di libri (POST)

Le richieste POST vengono utilizzate per creare nuove risorse. Nel nostro caso, le useremo per aggiungere nuovi libri alla libreria.

---

## L'endpoint POST

Aggiungi questa rotta al tuo file `app.py` (dopo la definizione del modello e prima del blocco `if __name__ == '__main__':`):

```python
@app.route('/api/books', methods=['POST'])
def create_book():
    data = request.get_json()

    # Create a new book from the request data
    new_book = Book(
        title=data['title'],
        author=data['author'],
        genre=data.get('genre'),
        published_year=data.get('published_year')
    )

    # Add the new book to the database
    db.session.add(new_book)
    db.session.commit()

    # Return the created book with a 201 status code
    return jsonify({
        'id': new_book.id,
        'title': new_book.title,
        'author': new_book.author,
        'genre': new_book.genre,
        'published_year': new_book.published_year
    }), 201

```

---

## Come funziona

1. `request.get_json()` legge i dati JSON inviati dal client.
2. Viene creato un nuovo oggetto `Book` utilizzando tali dati.
3. `db.session.add(new_book)` predispone (mette in "staging") l'oggetto per il salvataggio.
4. `db.session.commit()` salva permanentemente l'oggetto all'interno del database.
5. L'API restituisce il libro appena creato insieme al codice di stato `201 (Created)`.

---

## Comprendere la sessione del database

Pensa alla sessione del database come a un'**area di sosta** (o di preparazione):

* `add()` → inserisce il libro nell'area di preparazione.
* `commit()` → salva tutto in modo permanente sul disco.
* Se qualcosa va in errore prima del `commit()`, non viene salvato assolutamente nulla.

---

## Esercizio di riflessione

Prima di consultare la soluzione, prova a riflettere:

Cosa succederebbe se un client inviasse questo oggetto JSON?

```json
{
  "author": "George Orwell",
  "genre": "Dystopian"
}

```

1. La richiesta avrà successo o andrà in errore?
2. Per quale motivo?
3. Quale campo risulta mancante?

1. La richiesta andrà in errore.
2. Perché il campo `title` è obbligatorio nel codice (`data['title']`).
3. Il campo mancante è `title`.

---

## Utilizzo di `.get()` vs accesso diretto

* `data['title']` → campo obbligatorio (solleva un errore se risulta mancante).
* `data.get('genre')` → campo opzionale (restituisce `None` se risulta mancante).

Utilizziamo entrambi gli approcci a seconda che un determinato campo sia strettamente necessario o puramente facoltativo.

---

## Prova con Postman

Crea una nuova richiesta all'interno di Postman.

**Metodo**

```text
POST

```

**URL**

```text
[http://127.0.0.1:5000/api/books](http://127.0.0.1:5000/api/books)

```

Apri la scheda **Body** e seleziona le opzioni:

```text
raw → JSON

```

Invia il seguente payload:

```json
{
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "published_year": 1949
}

```

Fai clic su **Send**. Se la richiesta ha successo, Postman restituirà il libro appena creato insieme al codice di stato `201 Created`.

---

## Conclusione

Ora hai compreso come creare nuove risorse utilizzando le richieste POST. A questo punto dovresti sapere che:

* Le richieste POST si usano per inserire nuovi dati nel sistema.
* `request.get_json()` legge il codice JSON in ingresso inviato dal client.
* Le sessioni di SQLAlchemy richiedono l'uso combinato di `add()` e `commit()`.
* I campi obbligatori vanno gestiti con attenzione per evitare crash dell'applicazione.
* I campi opzionali possono utilizzare in sicurezza il metodo `.get()`.

Nella prossima lezione impareremo come recuperare i libri dal database utilizzando le richieste GET.

---

## Risoluzione dei problemi (Troubleshooting)

### `400 Bad Request`

Questo errore indica solitamente che il server non è stato in grado di decodificare la tua richiesta.

**Cause comuni:**

* Mancanza dell'header `Content-Type: application/json`.
* Formato JSON non valido all'interno del corpo della richiesta.
* Corpo (body) della richiesta vuoto.

**Soluzione:**

* Assicurati di inviare del codice JSON sintatticamente valido.
* Ricordati sempre di includere l'header corretto durante i test (su Postman o tramite curl).

---

### `KeyError: 'title'`

Questo accade quando il codice tenta di accedere a un campo obbligatorio che non è stato inserito nella richiesta del client.

**Esempio di causa:**

```python
data['title']

```
