# Cos'è un database?

Un database è una raccolta organizzata di dati che possono essere facilmente memorizzati, consultati e gestiti. Pensalo come un foglio di calcolo super-potenziato in grado di gestire in modo efficiente migliaia (o addirittura milioni) di record.

---

## Perché abbiamo bisogno di un database?

Senza un database, i tuoi dati sparirebbero ogni volta che interrompi l'esecuzione del programma.

Per esempio:

```python
books = []

```

Se chiudi l'applicazione, tutto ciò che è memorizzato in `books` andrà perso.

Un database risolve questo problema memorizzando i dati in modo permanente sul computer, consentendo di caricarli nuovamente ogni volta che l'applicazione si avvia.

I database offrono inoltre:

* **Archiviazione persistente (Persistent storage)**: I dati rimangono disponibili anche dopo l'arresto del programma
* **Query efficienti (Efficient querying)**: Trovano rapidamente record specifici
* **Integrità dei dati (Data integrity)**: Regole che aiutano a mantenere i dati accurati e coerenti
* **Scalabilità (Scalability)**: Gestiscono quantità crescenti di dati
* **Accesso simultaneo (Concurrent access)**: Più utenti possono accedere ai dati contemporaneamente

---

## Tipi di database

Sono disponibili molti sistemi di database, ma generalmente rientrano in due categorie.

### Database relazionali (SQL)

I database relazionali memorizzano i dati in tabelle composte da righe e colonne, in modo simile ai fogli di calcolo.

Gli esempi includono:

* SQLite
* MySQL
* PostgreSQL

Questi database utilizzano il linguaggio **SQL** (**S**tructured **Q**uery **L**anguage) per memorizzare, recuperare e modificare i dati.

Sono ideali quando i dati hanno una struttura e relazioni chiare.

### Database NoSQL

I database NoSQL memorizzano i dati in modi diversi, ad esempio sotto forma di documenti o coppie chiave-valore.

Gli esempi includono:

* MongoDB
* Redis

Sono spesso utilizzati per applicazioni altamente flessibili o specializzate.

Per questo progetto ci concentreremo sui database relazionali perché sono più facili da imparare e si adattano perfettamente alla nostra libreria di libri.

---

## Concetti chiave del database

### Tabella (Table)

Una tabella è una raccolta di dati correlati.

Ad esempio, tutti i libri della nostra biblioteca potrebbero essere memorizzati in una tabella `books`.

### Riga (Row)

Una riga rappresenta un singolo record.

Una riga equivale a un libro.

### Colonna (Column)

Una colonna rappresenta una specifica informazione.

Esempi:

* title (titolo)
* author (autore)
* publication year (anno di pubblicazione)

### Chiave primaria (Primary key)

Una chiave primaria è un identificatore univoco per ogni riga.

Ci permette di identificare in modo univoco un record specifico.

### Chiave esterna (Foreign key)

Una chiave esterna collega i dati tra le tabelle.

Non utilizzeremo immediatamente le chiavi esterne, ma diventano importanti quando le applicazioni crescono.

---

## Esempio: Tabella dei libri

Ecco come potrebbero apparire i nostri libri in una tabella di database:

| id | title | author | year |
| --- | --- | --- | --- |
| 1 | 1984 | George Orwell | 1949 |
| 2 | Brave New World | Aldous Huxley | 1932 |

## Rifletti prima di continuare

Guarda la seguente tabella:

| id | title | author |
| --- | --- | --- |
| 1 | 1984 | George Orwell |
| 2 | Dune | Frank Herbert |

### Domanda

Qual è la chiave primaria (primary key) in questa tabella?

La chiave primaria è:

```text
id

```

perché il suo valore è unico per ogni libro e può essere utilizzato per identificare un record specifico.

---

## Perché SQLite per questo progetto?

Utilizziamo SQLite perché:

* È integrato in Python — non è richiesta alcuna installazione separata
* È perfetto per l'apprendimento e per piccoli progetti
* Memorizza i dati in un singolo file
* Utilizza l'SQL standard, il che significa che le competenze apprese si trasferiranno in seguito su database più grandi
* Funziona perfettamente con Flask e SQLAlchemy

---

## Conclusione

* Un database è un sistema utilizzato per memorizzare e organizzare i dati
* A differenza delle variabili, i dati del database rimangono disponibili dopo l'arresto del programma
* I database memorizzano le informazioni in tabelle composte da righe e colonne
* Ogni record ha solitamente un identificatore univoco chiamato chiave primaria
* SQLite è un semplice database relazionale perfetto per l'apprendimento e per piccoli progetti
* In questo progetto, utilizzeremo un database per memorizzare i nostri libri in modo permanente

Ora hai capito cos'è un database e perché è una parte essenziale della maggior parte delle applicazioni. Nella prossima lezione impareremo come i database organizzano i dati usando SQL.

---

## FAQ

### Perché non posso semplicemente usare le variabili di Python?

Le variabili esistono solo mentre il programma è in esecuzione.

```python
books = []

```

Se interrompi l'applicazione, tutto ciò che è memorizzato in `books` andrà perso.

Un database memorizza i dati in modo permanente in modo da poter essere caricati nuovamente in seguito.

---

### Un database è la stessa cosa di un file Excel?

Non esattamente.

Entrambi memorizzano i dati in righe e colonne, ma i database sono progettati per:

* Gestire quantità di dati molto più grandi
* Consentire l'accesso simultaneo a più utenti
* Cercare i record in modo efficiente
* Imporre regole e relazioni tra i dati

---

### Devo installare SQLite?

No.

SQLite viene fornito in bundle con Python, quindi hai già tutto il necessario per questo corso.