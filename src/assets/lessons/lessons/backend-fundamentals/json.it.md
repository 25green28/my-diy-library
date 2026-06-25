# JSON

JSON (**J**ava**S**cript **O**bject **N**otation) è il formato che utilizzeremo per inviare dati tra i client e il nostro backend. È un modo semplice e leggibile per strutturare i dati.

---

## Cos'è JSON?

JSON è un formato di testo per memorizzare e trasportare dati. Nonostante il nome, non è specifico di JavaScript (linguaggio di programmazione usato principalmente per i siti web) - funziona infatti con tutti i linguaggi di programmazione. JSON è popolare perché è facile da leggere per gli umani e facile da elaborare per i computer.

## Perché usare JSON?

- **Leggibile**: Ha un aspetto simile alle strutture dati che vedi nel codice
- **Universale**: Ogni linguaggio di programmazione può lavorare con JSON
- **Leggero**: Non ha sovraccarichi di dati non necessari
- **Flessibile**: Può rappresentare strutture dati complesse

## Struttura JSON

JSON utilizza coppie chiave-valore, in modo simile a un dizionario in Python. Le chiavi sono sempre racchiuse tra virgolette, seguite da due punti e poi dal valore:

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "year": 1925
}

```

## Tipi di dati JSON

JSON supporta diversi tipi di dati:

* **Stringhe**: Testo tra virgolette, come `"Hello World"`
* **Numeri**: Come `42` o `3.14`
* **Booleani**: `true` o `false`
* **Array**: Liste tra parentesi quadre, come `[1, 2, 3]`
* **Oggetti**: Coppie chiave-valore annidate tra parentesi graffe
* **null**: Rappresenta l'assenza di un valore

---

## Esempio: Un libro in JSON

Ecco come rappresenteremo un libro nel nostro Book Management Backend:

```json
{
  "id": 1,
  "title": "1984",
  "author": "George Orwell",
  "publication_year": 2022,
  "genre": "dystopian"
}

```

## JSON nella nostra API

Quando i client comunicano con il nostro backend:

* **Richieste POST**: I client inviano dati JSON per creare nuovi libri
* **Richieste GET**: Il nostro server invia indietro dati JSON con le informazioni sui libri
* **Richieste PUT**: I client inviano JSON per aggiornare i libri esistenti

## Python e JSON

Python rende semplice lavorare con JSON. I dizionari di Python possono essere convertiti in stringhe JSON, e le stringhe JSON possono essere convertite nuovamente in dizionari. Flask gestisce questo processo automaticamente con la funzione `jsonify` che useremo più avanti.

---

## Conclusione

In questa lezione hai imparato:

* Cos'è JSON e perché viene utilizzato
* Come JSON struttura i dati utilizzando coppie chiave-valore
* I tipi di dati JSON più comuni
* Come viene utilizzato JSON nella nostra API My DIY Library
* Come Python lavora con i dati JSON

Congratulazioni! Ora conosci la terminologia di base dello sviluppo backend. Nella prossima lezione inizieremo a creare la nostra applicazione Flask.