# Maggiori dettagli sulle rotte (Routes)

Le rotte sono il cuore di ogni applicazione Flask. Definiscono quale codice deve essere eseguito quando qualcuno visita un URL specifico. Senza le rotte, Flask non saprebbe come rispondere alle richieste. Puoi pensare alle rotte come a una mappa che collega gli URL alle funzioni Python.

> **Suggerimento**: Non è necessario copiare il codice di questa lezione nel tuo file `app.py`, a meno che tu non voglia fare l'esercizio.

## Cos'è una rotta?

Una rotta collega:

```text
URL → Funzione Python

```

Per esempio:

```python
@app.route('/')
def home():
    return 'Hello, World!'

```

Quando qualcuno visita l'indirizzo:

```text
[http://127.0.0.1:5000/](http://127.0.0.1:5000/)

```

Flask esegue la funzione `home()` e restituisce il suo risultato.

---

## Come funzionano le rotte

Analizziamo la struttura della rotta:

```python
@app.route('/')
def home():
    return 'Hello, World!'

```

* **`@app.route('/')`**
* Dice a Flask:
> "Esegui la funzione sottostante ogni volta che qualcuno visita l'indirizzo `/`."




* **`def home():`**
* Definisce la funzione che deve essere eseguita.


* **`return`**
* Restituisce la risposta che viene inviata nuovamente al browser.



## Regole delle rotte

Tieni a mente queste regole:

* Ogni rotta inizia con il carattere `/`
* Le rotte fanno distinzione tra lettere maiuscole e minuscole (case-sensitive)
* Ogni rotta ha bisogno di una funzione associata
* I nomi delle funzioni non devono necessariamente coincidere con gli URL

Esempio:

```python
@app.route('/books')
def library():
    return 'Books page'

```

L'URL è `/books`, ma la funzione si chiama `library()`.

---

## Rotte multiple per lo stesso contenuto

A volte, URL diversi devono mostrare lo stesso identico contenuto.

Esempio:

```python
@app.route('/')
@app.route('/home')
def home():
    return 'Welcome!'

```

Entrambi gli URL funzioneranno:

```text
/

```

e

```text
/home

```

---

## Prova tu stesso

Crea una rotta chiamata `/about`. Dovrà restituire il testo "About page".

Prima di guardare la soluzione, prova a scriverla da solo.

```python
@app.route('/about')
def about():
    return 'About page'

```

---

## Gestione dei metodi HTTP

Per impostazione predefinita, le rotte rispondono solo alle richieste di tipo GET.

È possibile abilitare altri metodi:

```python
@app.route('/submit', methods=['POST'])
def submit():
    return 'Form submitted'

```

Questa rotta accetta esclusivamente richieste POST.

---

## Metodi multipli

Una rotta può supportare più di un metodo HTTP contemporaneamente.

Esempio:

```python
from flask import request

@app.route('/data', methods=['GET', 'POST'])
def data():

    if request.method == 'POST':
        return 'Data received'

    return 'Send data via POST'

```

---

## Parametri dell'URL (URL parameters)

Le rotte possono catturare i valori direttamente dall'interno dell'URL.

Esempio:

```python
@app.route('/book/<int:book_id>')
def get_book(book_id):
    return f'Book ID: {book_id}'

```

Visitando l'indirizzo:

```text
/book/42

```

verrà restituito il testo:

```text
Book ID: 42

```

Flask converte automaticamente il valore in un numero intero (integer).

---

## Prova tu stesso

Cosa verrà visualizzato visitando l'indirizzo:

```text
/book/100

```

utilizzando questa rotta?

```python
@app.route('/book/<int:book_id>')
def get_book(book_id):
    return f'Book ID: {book_id}'

```

```text
Book ID: 100

```

---

## Parametri di query (Query parameters)

A volte i dati vengono passati dopo il carattere `?` all'interno dell'URL.

Esempio:

```text
/search?q=python

```

Il valore dopo `q=` viene chiamato parametro di query (query parameter).

Esempio di rotta:

```python
from flask import request

@app.route('/search')
def search():

    query = request.args.get('q', '')

    return f'Searching for: {query}'

```

Visitando l'indirizzo:

```text
/search?q=python

```

verrà restituito il testo:

```text
Searching for: python

```

---

## Perché le rotte sono importanti

Ogni endpoint API che costruirai in seguito utilizzerà le rotte.

Per esempio:

```text
GET    /api/books
POST   /api/books
PUT    /api/books/1
DELETE /api/books/1

```

Queste sono semplicemente rotte che rispondono a richieste differenti.

Imparare a gestire le rotte ora renderà la creazione della tua API molto più semplice.

---

## Conclusione

In questa lezione hai imparato:

* Cosa sono le rotte
* Come gli URL si collegano alle funzioni Python
* Come creare rotte multiple per la stessa funzione
* Come utilizzare i metodi GET e POST
* Come funzionano i parametri dell'URL
* Come funzionano i parametri di query (query parameters)

Le rotte sono le fondamenta di ogni applicazione Flask e di ogni endpoint API che costruirai lungo questo corso.

Nella prossima lezione inizieremo a creare rotte che restituiscono dati strutturati invece di semplice testo.

---

## Risoluzione dei problemi (Troubleshooting)

### Ricevo un errore 404

Assicurati che la definizione:

```python
@app.route('/about')

```

corrisponda esattamente all'URL che stai visitando:

```text
[http://127.0.0.1:5000/about](http://127.0.0.1:5000/about)

```

Le rotte devono coincidere in ogni singolo carattere.

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

### Le mie modifiche non appaiono

Se il server non si ricarica automaticamente:

1. Arresta il server:

```text
Ctrl + C

```

2. Avvialo di nuovo:

```bash
python app.py

```

Inoltre, assicurati che la modalità di debug sia attiva:

```python
app.run(debug=True)

```

---

### Il parametro dell'URL non funziona

Assicurati che il parametro esista in entrambi i punti e che i nomi coincidano:

```python
@app.route('/book/<int:book_id>')
def get_book(book_id):

```

Il nome della variabile deve essere esattamente lo stesso.