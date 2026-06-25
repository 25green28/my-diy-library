# Configurazione del database

Ora colleghiamo la nostra applicazione Flask a un database.

Utilizzeremo **Flask-SQLAlchemy**, una libreria che ci consente di lavorare con i database usando codice Python invece di dover scrivere continuamente codice SQL crudo.

## Assicurati che Flask-SQLAlchemy sia installato

Se non lo hai ancora installato, esegui questo comando (sempre all'interno del tuo ambiente virtuale):

```bash
pip install flask-sqlalchemy

```

---

## Configurare il database

Apri il tuo file `app.py` e sostituisci il suo contenuto con il seguente codice:

```python
from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///library.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

if __name__ == '__main__':
    app.run(debug=True)

```

> **Info**: Per semplicità, ho incluso fin da subito tutti gli import necessari, così non dovrai preoccuparti di aggiungerli in seguito.

---

## Comprendere la configurazione

Diamo un'occhiata alle linee di codice più importanti.

### Posizione del database

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///library.db'

```

Questa riga dice a SQLAlchemy dove si trova il database.

Nel nostro caso:

```text
sqlite:///library.db

```

significa:

> Crea o usa un file di database SQLite chiamato `library.db` all'interno della cartella del progetto.

---

### Disabilitare il tracciamento delle modifiche

```python
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

```

Questo disabilita una funzionalità extra che consuma memoria aggiuntiva.

Per la maggior parte dei progetti, si raccomanda di impostare questo valore su `False`.

---

### Creare l'oggetto database

```python
db = SQLAlchemy(app)

```

Questo crea un oggetto database che utilizzeremo in tutto il progetto.

In seguito useremo l'oggetto `db` per:

* Creare modelli di database
* Inserire libri
* Recuperare libri
* Aggiornare libri
* Eliminare libri

---

## Cos'è `library.db`?

Dopo aver creato le tabelle del nostro database, un nuovo file chiamato:

```text
library.db

```

apparirà nella cartella del progetto.

Questo file memorizza tutti i dati della nostra applicazione.

Pensa a questo file come a un contenitore che racchiude tutti i tuoi libri.

> Non preoccuparti se non vedi ancora il file. Dobbiamo prima creare il nostro primo modello affinché il database possa essere generato.

---

## Esercizio

Guarda la seguente configurazione:

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///myLibrary.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

```

Prima di aprire la soluzione, prova a rispondere:

1. Quale riga dice a Flask dove è memorizzato il database?
2. Quale riga crea l'oggetto SQLAlchemy?
3. Come si chiamerà il file del database?

1. ```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///myLibrary.db'

```


2. ```python
db = SQLAlchemy(app)

```


3. Il file del database si chiamerà:
```text
myLibrary.db

```



---

## Conclusione

Hai configurato con successo Flask per funzionare con un database. Ora hai capito che:

* Flask-SQLAlchemy collega Flask a un database
* SQLite memorizza i dati all'interno di un file sul tuo computer
* `library.db` conterrà tutti i dati della nostra applicazione
* `SQLALCHEMY_DATABASE_URI` definisce dove si trova il database
* `db = SQLAlchemy(app)` crea l'oggetto database che useremo in tutto il progetto

Nella prossima lezione creeremo il nostro primo modello di database e definiremo finalmente l'aspetto di un libro all'interno della nostra applicazione.

---

## Risoluzione dei problemi (Troubleshooting)

### ModuleNotFoundError: No module named 'flask_sqlalchemy'

Assicurati che Flask-SQLAlchemy sia installato:

```bash
pip install flask-sqlalchemy

```

Verifica anche che il tuo ambiente virtuale sia attivato.

---

### Non vedo il file `library.db`

Questo è normale.

Il file apparirà solo dopo aver creato le tabelle del database in una lezione successiva.