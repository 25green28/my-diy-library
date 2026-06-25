# Introduzione a Postman

Postman è uno strumento fondamentale per testare le API.

Invece di utilizzare il browser o complessi comandi da terminale, Postman offre un'interfaccia grafica intuitiva da cui è possibile inviare richieste HTTP e ispezionare le risposte ricevute.

Nel corso di queste lezioni, userai Postman per verificare il corretto funzionamento di tutti gli endpoint che andrai a creare.

---

## Installazione di Postman

1. Visita il sito:

```text
[https://www.postman.com/downloads/](https://www.postman.com/downloads/)

```

2. Scarica la versione adatta al tuo sistema operativo.
3. Installa e avvia l'applicazione Postman.

La creazione di un account sulla piattaforma è totalmente opzionale.

---

## Cosa permette di fare Postman?

Postman ti consente di:

* Inviare richieste HTTP
* Visualizzare le risposte del server
* Controllare i codici di stato (status codes)
* Inviare dati in formato JSON
* Testare le API senza dover scrivere il codice per la parte visibile (front-end)

Ad esempio:

```text
GET    /books
POST   /books
PUT    /books/1
DELETE /books/1

```

Tutte estas richieste possono essere simulate e testate direttamente dall'interfaccia di Postman.

---

## La tua prima richiesta

Prima di passare al test dell'applicazione Flask che scriverai nei prossimi capitoli, facciamo una prova pratica utilizzando un'API pubblica e gratuita.

Crea una nuova richiesta:

1. Fai clic su **New → HTTP Request**
2. Seleziona il metodo **GET**
3. Inserisci il seguente URL:

```text
[https://jsonplaceholder.typicode.com/posts/1](https://jsonplaceholder.typicode.com/posts/1)

```

4. Fai clic sul pulsante **Send**

Dovresti ricevere una risposta in formato JSON simile a questa:

```json
{
  "userId": 1,
  "id": 1,
  "title": "...",
  "body": "..."
}

```

Congratulazioni! Hai appena eseguito con successo la tua prima richiesta a un'API.

---

## Comprendere l'interfaccia

Ogni richiesta all'interno del programma è composta da:

### Metodo HTTP (HTTP Method)

Esempi:

```text
GET
POST
PUT
DELETE

```

Il metodo indica chiaramente il tipo di azione che si desidera compiere sulla risorsa.

### URL

L'indirizzo web esatto dell'endpoint dell'API:

```text
[https://jsonplaceholder.typicode.com/posts/1](https://jsonplaceholder.typicode.com/posts/1)

```

### Risposta (Response)

Dopo aver fatto clic su **Send**, Postman mostra i dettagli restituiti dal server:

* Corpo della risposta (Response body)
* Codice di stato (Status code)
* Intestazioni (Headers)

---

## Comprendere i codici di stato

I codici di stato HTTP più comuni includono:

```text
200 OK

```

La richiesta è andata a buon fine.

```text
201 Created

```

La nuova risorsa è stata creata correttamente sul server.

```text
404 Not Found

```

La risorsa richiesta non esiste all'indirizzo specificato.

```text
500 Internal Server Error

```

Si è verificato un errore generico all'interno del server.

---

## Collezioni (Collections)

Man mano che il tuo progetto crescerà, ti troverai a gestire molte richieste diverse. Postman ti permette di organizzarle in comode cartelle chiamate Collezioni.

Esempio:

```text
My DIY Library API

```

All'interno della collezione potrai salvare e ordinare le tue richieste:

```text
Get All Books (Ottieni tutti i libri)
Get Book (Ottieni un libro specifico)
Create Book (Crea un libro)
Update Book (Aggiorna un libro)
Delete Book (Elimina un libro)

```

---

## Variabili (Variables)

Invece di digitare continuamente lo stesso indirizzo locale:

```text
[http://127.0.0.1:5000](http://127.0.0.1:5000)

```

puoi definire una comoda variabile:

| Variabile | Valore |
| --- | --- |
| base_url | http://127.0.0.1:5000 |

In questo modo, nel campo dell'URL potrai scrivere semplicemente:

```text
{{base_url}}/api/books

```

Questo accorgimento renderà la gestione delle richieste molto più rapida e pulita.

---

## Mettiti alla prova

Invia una richiesta di tipo GET al seguente indirizzo URL:

```text
[https://jsonplaceholder.typicode.com/users/1](https://jsonplaceholder.typicode.com/users/1)

```

Prima di premere il pulsante Send, prova a prevedere:

* Quale metodo HTTP deve essere utilizzato?
* La risposta sarà in formato JSON o testo semplice?

Metodo:

```text
GET

```

Risposta:

```text
JSON

```

---

## Conclusione

In questa lezione hai imparato:

* Cos'è Postman e a cosa serve
* Perché gli sviluppatori lo usano quotidianamente
* Come strutturare e inviare una richiesta HTTP
* Come analizzare la risposta e i dati restituiti
* Il significato dei principali codici di stato
* Come funzionano le collezioni e le variabili di ambiente

Userai Postman in tutte le prossime lezioni per verificare che il codice del tuo server funzioni esattamente come previsto.

---

## Risoluzione dei problemi (Troubleshooting)

### Impossibile inviare la richiesta (Could not send request)

Controlla che la tua connessione a Internet sia attiva e verifica che non ci siano errori di battitura nell'URL.

---

### Errori SSL o di certificato

Assicurati che l'indirizzo URL inizi correttamente con il prefisso:

```text
https://

```

quando richiesto in modo esplicito dalle specifiche dell'API.

---

### La risposta è diversa rispetto a quella mostrata nella lezione

Le API pubbliche di test possono subire modifiche nel tempo. Concentrati sul comprendere la struttura generale della richiesta e della risposta piuttosto che sulla corrispondenza esatta di ogni singolo dato.
