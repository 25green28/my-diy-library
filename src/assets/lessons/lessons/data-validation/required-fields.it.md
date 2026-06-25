# Campi richiesti

La validazione dei dati garantisce che i dati ricevuti dalla tua API siano corretti e completi prima di elaborarli. Questo impedisce l'inserimento di dati errati nel database e fornisce un feedback utile agli utenti.

## Perché validare i dati?

Senza validazione, gli utenti potrebbero inviare dati incompleti o non validi, causando:

- Dati errati nel database
- Errori confusi in seguito nel processo
- Esperienza utente scadente (poor user experience)
- Comportamento imprevisto dell'applicazione

La validazione ci consente di individuare i problemi prima di salvare i dati.

---

## Validazione dei campi richiesti

Aggiungiamo la validazione al nostro endpoint POST (modificando quello esistente) per assicurarci che i campi richiesti siano forniti:

```python
@app.route('/api/books', methods=['POST'])
def create_book():
    data = request.get_json()

    # Validate that data is provided
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    if 'title' not in data:
        return jsonify({'error': 'Title is required'}), 400

    if 'author' not in data:
        return jsonify({'error': 'Author is required'}), 400

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
    return jsonify(book_to_dict(new_book)), 201

```

---

## Controllo dei valori vuoti

Un campo può esistere ma contenere comunque un valore vuoto:

```json
{
  "title": "",
  "author": "George Orwell"
}

```

Possiamo prevenire questo problema usando il metodo `.strip()` (sostituisci l'attuale validazione di title e author con la seguente):

```python
if not data['title'].strip():
    return jsonify({'error': 'Title cannot be empty'}), 400

if not data['author'].strip():
    return jsonify({'error': 'Author cannot be empty'}), 400

```

Il metodo `.strip()` rimuove gli spazi all'inizio e alla fine di una stringa.

Per esempio:

```python
"   ".strip()

```

diventa:

```python
""

```

che viene considerato vuoto.

---

## Validazione del tipo di dati

A volte gli utenti inviano valori nel formato errato.

Per esempio:

```json
{
  "published_year": "abc"
}

```

Possiamo verificare se il valore è un numero (aggiungi questa validazione di published_year sotto la validazione di title e author):

```python
if 'published_year' in data:
    try:
        data['published_year'] = int(data['published_year'])
    except (ValueError, TypeError):
        return jsonify(
            {'error': 'Published year must be a number'}
        ), 400

```

---

## Validazione API vs validazione del database

La validazione può avvenire in due punti.

### Validazione API

Questa è la validazione que scriviamo nella nostra rotta (route):

```python
if 'title' not in data:
    return jsonify({'error': 'Title is required'}), 400

```

Fornisce un feedback utile all'utente.

### Validazione del database

Possiamo anche definire delle regole nel her nostro modello:

```python
title = db.Column(
    db.String(100),
    nullable=False
)

```

Questo impedisce a SQLAlchemy di salvare dati non validi.

L'utilizzo di entrambi i tipi di validazione rende l'applicazione più affidabile.

---

## Prova tu stesso

Supponiamo di volere che anche il campo **genre** sia richiesto.

Puoi aggiungere una validazione che restituisca:

```json
{
  "error": "Genre is required"
}

```

quando il campo manca?

Pensa a:

* Quale istruzione `if` dovrebbe essere aggiunta?
* Dove dovrebbe essere posizionata?

```python
if 'genre' not in data:
    return jsonify({'error': 'Genre is required'}), 400

```

Posizionala insieme ai controlli degli altri campi richiesti.

---

## Conclusione

In questa lezione hai imparato:

* Perché la validazione è importante
* Come verificare se i campi richiesti esistono
* Come prevenire i valori vuoti
* Come validare i tipi di dati
* La differenza tra la validazione API e la validazione del database
* In che modo la validazione migliora l'affidabilità dell'applicazione

Nella prossima lezione continueremo a migliorare la nostra API aggiungendo una validazione più avanzata e la gestione degli errori.

---

## Risoluzione dei problemi (Troubleshooting)

### Ricevo:

```text
No data provided

```

Assicurati di inviare dati JSON nel corpo della richiesta (request body).

Esempio:

```json
{
  "title": "1984",
  "author": "George Orwell"
}

```

---

### Ricevo:

```text
Title is required

```

Il JSON non contiene un campo `title`.

Controlla se ci sono errori di ortografia:

```json
{
  "title": "1984"
}

```

non:

```json
{
  "book_title": "1984"
}

```

---

### Ricevo:

```text
Author is required

```

Il campo `author` manca dalla richiesta.

---

### Ricevo:

```text
Title cannot be empty

```

Il titolo esiste ma contiene solo spazi o una stringa vuota.

Esempio:

```json
{
  "title": "",
  "author": "George Orwell"
}

```

---

### Ricevo:

```text
Published year must be a number

```

Assicurati che il valore possa essere convertito in un numero intero (integer).

Valido:

```json
{
  "published_year": 1949
}

```

o

```json
{
  "published_year": "1949"
}

```

Non valido:

```json
{
  "published_year": "nineteen forty-nine"
}

```

---

### Ho modificato il mio codice ma non succede nulla

Assicurati che:

* Il server Flask sia in esecuzione
* Hai salvato il file
* Il server si sia riavviato dopo la modifica

Se necessario, ferma il server ed esegui:

```bash
python app.py

```