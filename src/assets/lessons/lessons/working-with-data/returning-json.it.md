# Ritornare dati in formato JSON

Quando si creano delle API, di norma non si restituiscono risposte in formato testo semplice (plain text).

Al contrario, le API restituiscono le informazioni in un formato strutturato chiamato **JSON**.

Il formato JSON è lo standard globale utilizzato dalle applicazioni moderne per scambiare dati in modo efficiente tra la parte visibile (front-end) e il server (back-end).

> **Suggerimento:** Non è necessario copiare tutti gli esempi di questo capitolo all'interno del tuo file `app.py`. Questi esempi servono unicamente a farti comprendere la logica di funzionamento delle risposte JSON.

## Cos'è il JSON?

JSON è l'acronimo di:

```text
JavaScript Object Notation (Notazione Oggettiva di JavaScript)

```

Nonostante il nome richiami esplicitamente il linguaggio JavaScript, il JSON è un formato indipendente utilizzato da quasi tutti i linguaggi di programmazione esistenti.

Un oggetto JSON si presenta così:

```json
{
    "id": 1,
    "title": "1984",
    "author": "George Orwell"
}

```

Il JSON organizza e memorizza le informazioni combinando:

* Chiavi (`"title"`)
* Valori (`"1984"`)

Puoi vederlo come un modo pulito e rigoroso di strutturare le informazioni.

---

## Perché le API usano il formato JSON

Immagina che il front-end richieda al tuo server backend i dettagli relativi a un libro.

Restituire una stringa di testo del genere:

```text
1984 by George Orwell

```

può risultare facilmente leggibile per un essere umano, ma diventa estremamente difficile da interpretare ed elaborare per un software in modo automatizzato.

Le API risolvono questo problema restituendo dati strutturati:

```json
{
    "id": 1,
    "title": "1984",
    "author": "George Orwell"
}

```

In questo modo, il codice del front-end può accedere istantaneamente alle singole proprietà:

```text
title → 1984
author → George Orwell

```

Ecco perché il JSON è diventato lo standard assoluto per le risposte delle API web.

---

## Cos'è jsonify()?

Flask mette a disposizione una funzione di supporto nativa chiamata:

```python
jsonify()

```

Questa funzione ha il compito di convertire le strutture dati di Python (come i dizionari) in stringhe JSON formattate correttamente, impostando in automatico anche i corretti header di risposta HTTP.

Prima di poterla richiamare nel codice, è necessario importarla:

```python
from flask import jsonify

```

Senza l'utilizzo di `jsonify()`, Flask non sarebbe in grado di capire che la tua intenzione è inviare al client dei dati in formato JSON.

---

## Restituire un oggetto JSON

Un dizionario Python (dictionary) può essere convertito istantaneamente in JSON tramite la funzione `jsonify()`.

Esempio:

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/book')
def get_book():

    book = {
        "id": 1,
        "title": "1984",
        "author": "George Orwell"
    }

    return jsonify(book)

```

Quando un utente naviga all'indirizzo:

```text
/api/book

```

Il server Flask risponderà con il seguente oggetto:

```json
{
    "id": 1,
    "title": "1984",
    "author": "George Orwell"
}

```

---

## Mettiti alla prova

Aggiungi l'anno di pubblicazione (publication year) al dizionario del libro e restituisci l'oggetto aggiornato in formato JSON.

Prova a scrivere il codice prima di consultare la soluzione.

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/book')
def get_book():

    book = {
        "id": 1,
        "title": "1984",
        "author": "George Orwell",
        "year": 1949
    }

    return jsonify(book)

```

---

## Restituire liste di elementi (Array)

Molto spesso le API devono restituire interi elenchi di dati correlati.

Esempio:

```python
@app.route('/api/books')
def get_books():

    books = [
        {"id": 1, "title": "1984"},
        {"id": 2, "title": "Brave New World"}
    ]

    return jsonify(books)

```

La chiamata a questa rotta produrrà un array JSON:

```json
[
    {
        "id": 1,
        "title": "1984"
    },
    {
        "id": 2,
        "title": "Brave New World"
    }
]

```

---

## Mettiti alla prova

Inserisci un terzo libro a tua scelta all'interno della lista precedente.

Prova a farlo da solo prima di guardare la soluzione ufficiale.

```python
@app.route('/api/books')
def get_books():

    books = [
        {"id": 1, "title": "1984"},
        {"id": 2, "title": "Brave New World"},
        {"id": 3, "title": "Fahrenheit 451"}
    ]

    return jsonify(books)

```

---

## Codici di stato HTTP

Ogni singola risposta inviata dal server può includere un codice di stato HTTP numerico.

Esempio:

```python
return jsonify(book), 200

```

Il secondo valore inserito dopo la virgola comunica esplicitamente al client se la richiesta è andata a buon fine o meno.

I codici di stato più utilizzati:

| Codice | Significato |
| --- | --- |
| 200 | Successo (OK) |
| 201 | Risorsa Creatta (Created) |
| 400 | Richiesta Errata (Bad request) |
| 404 | Non Trovato (Not found) |
| 500 | Errore Interno del Server (Internal server error) |

---

## Restituire risposte di errore

Anche le segnalazioni di errore devono essere inviate strutturandole in formato JSON, così che il client possa gestirle.

Esempio:

```python
@app.route('/api/book/<int:book_id>')
def get_book(book_id):

    if book_id > 100:
        return jsonify({
            "error": "Book not found"
        }), 404

    return jsonify({
        "id": book_id,
        "title": "Book Title"
    }), 200

```

Se un utente richiede un libro con un ID inesistente, l'API risponderà con il JSON:

```json
{
    "error": "Book not found"
}

```

unito al codice di stato HTTP `404 Not Found`.

---

## L'importanza di un JSON coerente

Immagina lo scenario in cui una rotta del tuo progetto restituisca:

```json
{
    "title": "1984"
}

```

e un'altra rotta restituisca invece:

```json
{
    "book_title": "1984"
}

```

Chi sviluppa il front-end sarà costretto a implementare logiche extra per gestire queste differenze di nomenclatura.

Un'API coerente è molto più semplice da usare, integrare e mantenere nel tempo. Cerca di mantenere sempre la stessa struttura di chiavi per tutta la durata del tuo progetto.

---

## Best practices

* Restituisci sempre i dati in formato JSON avvalendoti di `jsonify()`
* Mantieni la struttura delle risposte il più semplice e coerente possibile
* Utilizza nomi di proprietà (chiavi) chiari e autoesplicativi
* Associa sempre il corretto codice di stato HTTP alle risposte
* Gestisci anche i messaggi di errore inviandoli in formato JSON
* Invia esclusivamente i dati strettamente necessari al client

---

## Conclusione

In questa lezione hai appreso:

* Cos'è e come si presenta il formato JSON
* Per quale motivo le API moderne scelgono il JSON
* Qual è il ruolo della funzione `jsonify()` in Flask
* Come inviare oggetti JSON singoli o liste di elementi
* Come configurare i codici di stato HTTP nelle risposte
* Come strutturare le risposte in caso di errore del server

Il formato JSON rappresenta il pilastro della comunicazione tra front-end e back-end, di conseguenza comprenderne l'utilizzo è un requisito essenziale prima di iniziare a scrivere i tuoi endpoint.

Nel prossimo capitolo inizierai a implementare le rotte API che interagiranno direttamente con i dati reali della tua applicazione.

---

## Risoluzione dei problemi (Troubleshooting)

### Errore: jsonify is not defined

Se sul terminale compare l'errore:

```text
NameError: name 'jsonify' is not defined

```

verifica di aver inserito correttamente la riga di importazione in cima al file:

```python
from flask import jsonify

```

---

### La risposta non è in formato JSON

Assicurati di aver inserito la chiamata alla funzione di supporto nella riga del return:

```python
return jsonify(data)

```

invece di scrivere semplicemente:

```python
return data

```

---

### Le modifiche apportate non si aggiornano

Se vedi che Flask non applica le modifiche in tempo reale dopo il salvataggio del file:

1. Arresta manualmente il server dal terminale premendo:

```text
Ctrl + C

```

2. Avvia nuovamente lo script:

```bash
python app.py

```

Assicurati inoltre che il debug sia configurato su True:

```python
app.run(debug=True)

```

---

### Il browser mostra il codice JSON come testo semplice

Questo comportamento è del tutto normale. I browser web mostrano nativamente il JSON come testo statico non formattato. In un'applicazione reale, è proprio il codice del front-end a catturare questo flusso di dati invisibile all'utente finale per poi impaginarlo all'interno di una veste grafica moderna e piacevole.
