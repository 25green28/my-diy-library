# Avviare il server di sviluppo

Ora creiamo una semplice applicazione Flask e avviamola per verificare che tutto sia configurato correttamente. Questo sarà il tuo primo server web funzionante!

---

## La struttura del tuo progetto

A questo punto, la cartella del tuo progetto dovrebbe apparire simile a questa:

```text
your-folder/
├── venv/              # Il tuo ambiente virtuale
└── requirements.txt   # L'elenco dei pacchetti installati

```

---

## Crea la tua prima app Flask

### Passo 1: Crea un nuovo file

All'interno della cartella del tuo progetto, crea un nuovo file chiamato:

```text
app.py

```

Il tuo progetto ora dovrebbe apparire così:

```text
your-folder/
├── venv/
├── requirements.txt
└── app.py

```

### Passo 2: Aggiungi il codice Flask

Apri il file `app.py`.

Dovresti vedere un file vuoto; il passo successivo consiste nell'aggiungere il seguente codice:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)

```

---

## Cosa fa questo codice?

* **`from flask import Flask`**
* Importa Flask in modo da poter creare un'applicazione web.


* **`app = Flask(__name__)`**
* Crea la tua applicazione Flask.
* Pensa a questo passaggio come alla creazione del progetto backend vero e proprio.


* **`@app.route('/')`**
* Crea una rotta (route).
* La rotta `/` rappresenta la homepage.
* Quando qualcuno visita `http://127.0.0.1:5000/`, Flask eseguirà la funzione sottostante.


* **`def hello():`**
* Restituisce una risposta al browser.
* Il browser visualizzerà il testo: `Hello, World!`


* **`app.run(debug=True)`**
* Avvia il server di sviluppo locale di Flask.



---

## Avvia il tuo server

### Passo 1: Apri un terminale

Assicurati che:

* Ti trovi all'interno della cartella del tuo progetto
* Il tuo ambiente virtuale sia attivato

### Passo 2: Avvia Flask

Esegui il comando:

```bash
python app.py

```

Se tutto funziona correttamente, dovresti vedere qualcosa di simile a:

```text
* Running on [http://127.0.0.1:5000](http://127.0.0.1:5000)

```

Lascia questo terminale aperto durante i test della tua applicazione.

---

## Gestisci il test nel tuo browser

Apri l'indirizzo:

```text
[http://127.0.0.1:5000](http://127.0.0.1:5000)

```

Dovresti vedere la scritta:

```text
Hello, World!

```

Se visualizzi questo messaggio, il tuo server Flask sta funzionando correttamente.

---

## Prova tu stesso

### Modifica il messaggio

Apri il file `app.py`.

Trova la riga:

```python
return 'Hello, World!'

```

Sostituisila con:

```python
return 'My first Flask app'

```

Salva il file.

Aggiorna la pagina del browser.

Ora dovresti vedere:

```text
My first Flask app

```

---

### Aggiungi una seconda rotta

Apri il file `app.py`.

Aggiungi il seguente codice direttamente sotto la funzione `hello()`:

```python
@app.route('/test')
def test():
    return 'This is a second route'

```

Il tuo file ora dovrebbe apparire così:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'My first Flask app'

@app.route('/test')
def test():
    return 'This is a second route'

if __name__ == '__main__':
    app.run(debug=True)

```

Salva il file e poi visita l'indirizzo:

```text
[http://127.0.0.1:5000/test](http://127.0.0.1:5000/test)

```

Dovresti vedere:

```text
This is a second route

```

---

## Arrestare il server

Per fermare l'esecuzione di Flask:

1. Fai clic sulla finestra del terminale
2. Premi la combinazione di tasti:

```text
Ctrl + C

```

Il server smetterà di funzionare.

---

## Cos'è la modalità di debug (debug mode)?

Il parametro `debug=True` abilita utili funzionalità per la fase di sviluppo:

* Ricarica automaticamente il server quando il codice viene modificato
* Mostra messaggi di errore dettagliati in caso di anomalie
* Rende il processo di debug molto più semplice

> **Importante:** Non utilizzare mai `debug=True` in un'applicazione di produzione reale.

---

## Conclusione

* Hai creato la tua prima app Flask
* Hai imparato come funzionano le rotte (routes)
* Hai avviato un server web locale
* Hai testato la tua applicazione all'interno del browser
* Hai aggiunto una seconda rotta al progetto

---

## Risoluzione dei problemi (Troubleshooting)

### Il server non si avvia

* Assicurati che l'ambiente virtuale sia attivato correttamente
* Assicurati che Flask sia installato correttamente

---

### La pagina non si carica

* Controlla l'URL inserito:
```text
[http://127.0.0.1:5000](http://127.0.0.1:5000)

```


* Assicurati che il server Flask sia effettivamente in esecuzione

---

### Porta già in uso (Port already in use)

Un'altra applicazione sul computer potrebbe già utilizzare la porta 5000.

Arresta l'altra applicazione oppure riavvia il terminale e riprova.