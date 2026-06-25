# Creazione del modello Book

Un modello è una classe Python che rappresenta una tabella del database. Invece di scrivere codice SQL per creare tabelle e gestire i dati, definiamo classi Python e lasciamo che SQLAlchemy gestisca il lavoro del database per noi.

---

## Definire il modello Book

Aggiungi questo codice al tuo file `app.py` (dopo l'inizializzazione di SQLAlchemy):

```python
# Book model
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(50))
    published_year = db.Column(db.Integer)

    # Return a readable output
    def __repr__(self):
        return f'<Book {self.title}>'

```

E assicurati che il database venga creato quando esegui l'app (in caso contrario, sostituisci l'attuale blocco `if __name__ == '__main__':` con il seguente):

```python
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

```

---

## Comprendere il modello

### Cosa sta succedendo qui?

* `class Book(db.Model)` → crea un modello di database chiamato Book
* Ogni `db.Column(...)` → rappresenta una colonna nella tabella del database
* La classe diventa automaticamente una tabella chiamata `book` (o `books`, a seconda della configurazione di SQLAlchemy)

---

## Tipi di colonne

SQLAlchemy utilizza tipi diversi a seconda dei dati:

* `db.Integer` → numeri interi (ID)
* `db.String(length)` → testo breve (titoli, nomi)
* `db.Text` → testo lungo (descrizioni)
* `db.Boolean` → valori vero/falso (true/false)
* `db.Float` → numeri decimali
* `db.DateTime` → valori di data e ora
* `db.JSON` → dati JSON strutturati

---

## Opzioni delle colonne

Queste opzioni controllano il comportamento dei dati:

* `primary_key=True` → identifica in modo univoco ogni riga (chiave primaria)
* `nullable=False` → il campo è richiesto
* `unique=True` → i valori devono essere unici
* `default=value` → valore predefinito se non ne viene fornito nessuno
* `index=True` → velocizza la ricerca

---

## Esercizio di riflessione

Prima di guardare la soluzione, prova a rispondere:

Se dovessi aggiungere un nuovo campo chiamato `rating` (un numero da 1 a 5), come lo definiresti nel modello?

Prova a scriverlo da solo prima.

```python
rating = db.Column(db.Integer)

```

Miglioramenti opzionali:

```python
rating = db.Column(db.Integer, nullable=True)

```

---

## Il metodo `__repr__`

Questo metodo definisce il modo in cui l'oggetto viene visualizzato quando viene stampato.

```python
def __repr__(self):
    return f'<Book {self.title}>'

```

Invece di mostrare un riferimento all'oggetto confuso, ottieni qualcosa di leggibile come:

```
<Book 1984>

```

Questo è molto utile per il debug.

---

## Best practices

* Usa nomi di colonna chiari e descrittivi
* Contrassegna i campi richiesti con `nullable=False`
* Aggiungi `__repr__` per facilitare il debug
* Mantieni i modelli organizzati

---

## Conclusione

Ora hai capito come definire i modelli di database utilizzando SQLAlchemy. Ora dovresti sapere che:

* I modelli sono classi Python che rappresentano tabelle del database
* Ogni colonna definisce un campo nel database
* SQLAlchemy gestisce automaticamente l'SQL partendo dal tuo codice Python
* I vincoli come `nullable`, `unique` e `primary_key` controllano le regole dei dati
* Il modello è la base della struttura dati del tuo backend

Nella prossima lezione inizieremo a utilizzare il modello per creare libri reali e interagire con il database.

---

## Risoluzione dei problemi (Troubleshooting)

### La mia tabella non viene creata

Assicurati di eseguire la tua app almeno una volta in modo che `db.create_all()` venga eseguito.

---

### Ho modificato il mio modello ma non si è aggiornato nulla

SQLite non aggiorna automaticamente le tabelle.

Potrebbe essere necessario eliminare il file `library.db` e riavviare l'app durante la fase di sviluppo.

---

### Ricevo errori relativi a `app.app_context()`

Assicurati che `db.create_all()` sia all'interno di:

```python
with app.app_context():

```