# Ricerca dei libri

Implementiamo una funzionalità di ricerca per trovare i libri in base al titolo o all'autore. La ricerca è una funzionalità comune nelle API che rende facile per gli utenti trovare elementi specifici.

---

## L'endpoint di ricerca

Aggiungi questa rotta (route) al tuo file `app.py` (sotto la rotta della lezione precedente):

```python
@app.route('/api/books/search', methods=['GET'])
def search_books():
    query = request.args.get('q', '')

    # Check if the query is empty
    if not query:
        return jsonify({'error': 'Search query is required'}), 400

    # Perform the search
    books = Book.query.filter(
        (Book.title.ilike(f'%{query}%')) |
        (Book.author.ilike(f'%{query}%'))
    ).all()

    return jsonify([book_to_dict(book) for book in books]), 200

```

## Come funziona

1. Otteniamo la stringa di ricerca dal parametro di query denominato `q`.
2. Se non viene fornita alcuna query, restituiamo un errore.
3. Il metodo `ilike()` esegue una ricerca che non tiene conto delle lettere maiuscole e minuscole (case-insensitive).
4. Il simbolo `%` funge da carattere jolly (wildcard) e corrisponde a qualsiasi carattere.
5. Il simbolo `|` rappresenta l'operatore logico OR.
6. Tutti i libri corrispondenti vengono restituiti in formato JSON.

---

## Comprendere la ricerca

La ricerca cerca la stringa specificata in qualsiasi punto all'interno del titolo o dell'autore.

Per esempio:

| Query di ricerca | Corrispondenze |
| --- | --- |
| `198` | `1984` |
| `orwell` | `George Orwell` |
| `ring` | `The Lord of the Rings` |

Poiché utilizziamo `ilike()`, la distinzione tra maiuscole e minuscole non ha importanza.

Queste ricerche restituiranno tutte lo stesso risultato:

```text
orwell
Orwell
ORWELL

```

## Comprendere il carattere `%`

Il simbolo `%` significa "qualsiasi carattere".

Esempi:

```python
Book.title.ilike('%ring%')

```

Corrisponde a:

```text
The Lord of the Rings
Ringworld

```

perché la parola "ring" appare in un punto qualsiasi all'interno del titolo.

Senza il carattere `%`, il titolo dovrebbe corrispondere esattamente alla stringa cercata.

---

## Testare l'endpoint

Avvia il tuo server Flask e visita (in Postman o nel browser) il seguente indirizzo:

```text
[http://127.0.0.1:5000/api/books/search?q=1984](http://127.0.0.1:5000/api/books/search?q=1984)

```

oppure

```text
[http://127.0.0.1:5000/api/books/search?q=Orwell](http://127.0.0.1:5000/api/books/search?q=Orwell)

```

Se nel database sono presenti libri corrispondenti, verranno restituiti in formato JSON.

---

## Prova tu stesso

Attualmente gli utenti possono effettuare ricerche in base a:

* Titolo (Title)
* Autore (Author)

Sei in grado di modificare la ricerca in modo che gli utenti possano cercare anche per **genere** (genre)?

Rifletti su:

* Quale campo deve essere aggiunto?
* Dove deve essere inserita la nuova condizione?
* Dovrebbe utilizzare anch'essa il metodo `ilike()`?

```python
books = Book.query.filter(
    (Book.title.ilike(f'%{query}%')) |
    (Book.author.ilike(f'%{query}%')) |
    (Book.genre.ilike(f'%{query}%'))
).all()

```

---

## Conclusione

In questa lezione hai imparato:

* Come creare un endpoint di ricerca
* Come i parametri di query possono essere utilizzati per effettuare ricerche
* Come `ilike()` esegue ricerche senza fare distinzione tra maiuscole e minuscole
* Come funziona il carattere `%` come jolly
* Come restituire i record corrispondenti del database in formato JSON

Nella prossima lezione imparerai come aggiornare i libri esistenti nel database.

---

## Risoluzione dei problemi (Troubleshooting)

### Ricevo il messaggio:

```text
Search query is required

```

Assicurati di includere il parametro di query `q` all'interno dell'URL:

```text
/api/books/search?q=1984

```

---

### Ricevo l'errore:

```text
NameError: name 'request' is not defined

```

Assicurati di aver importato l'oggetto `request`:

```python
from flask import request

```

---

### La mia ricerca restituisce una lista vuota

```json
[]

```

Questo di solito significa che:

* Nessun libro corrisponde al termine di ricerca inserito.
* Il database è vuoto.
* Il termine di ricerca è scritto in modo diverso rispetto ai dati memorizzati.

Prova a cercare un termine più generico.

---

### Le modifiche non sono visibili

Assicurati che:

* Il server Flask sia in esecuzione.
* Tu abbia salvato il file.
* Il server si sia riavviato dopo le modifiche.

Se necessario, interrompi il server e avvialo di nuovo:

```bash
python app.py

```