# Cos'è SQL?

SQL (**S**tructured **Q**uery **L**anguage) è il linguaggio standard utilizzato per interagire con i database relazionali. È il modo in cui gli sviluppatori dicono a un database quali dati vogliono recuperare, creare, aggiornare o eliminare.

---

## Cosa fa SQL?

SQL ti consente di:

- Recuperare dati da un database
- Aggiungere nuovi dati
- Aggiornare dati esistenti
- Eliminare dati
- Creare e modificare strutture di database

La buona notizia è che in questo corso non avrai bisogno di diventare un esperto di SQL. In seguito, useremo SQLAlchemy, che genera automaticamente la maggior parte delle query SQL.

---

## SELECT - Recuperare i dati

Questo è il modo in cui si ottengono i dati da un database:

```sql
SELECT * FROM books;

SELECT title, author FROM books;

SELECT * FROM books WHERE year = 1949;

```

## INSERT - Aggiungere dati

Questo comando aggiunge un nuovo record:

```sql
INSERT INTO books (title, author, year)
VALUES ('1984', 'George Orwell', 1949);

```

## UPDATE - Modificare i dati

Questo comando modifica i dati esistenti:

```sql
UPDATE books
SET year = 1950
WHERE id = 1;

```

## DELETE - Rimuovere i dati

Questo comando elimina i record:

```sql
DELETE FROM books
WHERE id = 1;

```

---

## Clausole SQL comuni

### WHERE - Filtrare i risultati

```sql
SELECT * FROM books
WHERE author = 'Orwell';

```

Questo comando restituisce solo i libri scritti da Orwell.

### ORDER BY - Ordinare i risultati

```sql
SELECT * FROM books
ORDER BY year DESC;

```

Questo comando ordina i libri dal più recente al più vecchio.

### LIMIT - Limitare i risultati

```sql
SELECT * FROM books
LIMIT 10;

```

Questo comando restituisce solo i primi 10 risultati.

---

## SQL in Python con SQLAlchemy

In questo progetto, non scriveremo codice SQL crudo per la maggior parte del tempo.

Utilizzeremo invece **SQLAlchemy**, una libreria Python che:

* Traduce il codice Python in SQL
* Gestisce le connessioni al database
* Rende il codice più facile da leggere
* Aiuta a proteggere l'applicazione da comuni problemi di sicurezza

---

## Esempio di confronto

Questi due esempi fanno esattamente la stessa cosa.

### SQL Crudo

```sql
SELECT * FROM books
WHERE id = 1;

```

### SQLAlchemy

```python
Book.query.get(1)

```

La versione con SQLAlchemy è più breve e assomiglia molto di più al normale codice Python.

---

## Esercizio

Guarda la seguente query SQL:

```sql
DELETE FROM books
WHERE id = 5;

```

Prima di aprire la soluzione, prova a rispondere:

1. Quale comando SQL viene utilizzato?
2. Quale libro sarà interessato dalla modifica?
3. Cosa succederà dopo l'esecuzione della query?

1. Il comando utilizzato è `DELETE`.
2. Il libro il cui `id` è uguale a `5`.
3. Quel libro verrà rimosso dal database.

---

## Conclusione

Ora hai una comprensione di base di SQL e di come i database lo utilizzano per gestire i dati. Ora dovresti comprendere che:

* SQL è il linguaggio utilizzato per comunicare con i database relazionali
* I comandi SQL più comuni sono `SELECT`, `INSERT`, `UPDATE` e `DELETE`
* SQL può filtrare, ordinare e limitare i risultati
* SQLAlchemy può generare automaticamente SQL partendo dal codice Python
* Non è necessario memorizzare la sintassi di SQL per questo corso

Nella prossima lezione configureremo la nostra applicazione Flask per connettersi a un database e la prepareremo per memorizzare i libri.

---

## FAQ

### Devo imparare SQL prima di continuare?

No. Comprendere i concetti di base è sufficiente per questo progetto. SQLAlchemy genererà automaticamente la maggior parte delle query SQL.

### Gli esempi SQL sembrano complicati

È completamente normale. L'obiettivo di questa lezione è riconoscere cosa fa SQL, non memorizzare ogni singolo comando.

### Scriveremo codice SQL più avanti?

Solo occasionalmente. La maggior parte delle operazioni di database in questo corso sarà scritta utilizzando Python e SQLAlchemy.