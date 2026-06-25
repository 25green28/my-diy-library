# Richieste HTTP

HTTP (**H**yper**t**ext **T**ransfer **P**rotocol) è il “linguaggio” che client e server usano per comunicare sul web. Ogni volta che visiti un sito web, il tuo browser invia richieste HTTP ai server.

---

## Cosa sono i metodi HTTP?

I metodi HTTP sono diversi tipi di richieste che puoi fare. Puoi considerarli come diverse azioni che puoi eseguire. I più comuni sono:

### GET - Recuperare dati

Le richieste GET chiedono al server di inviare dati. Non modificano nulla sul server — leggono solo informazioni. Per esempio:
- Ottenere un elenco di tutti i libri
- Ottenere i dettagli di un libro specifico

### POST - Creare qualcosa di nuovo

Le richieste POST inviano dati al server per creare una nuova risorsa. Modificano i dati sul server. Per esempio:
- Aggiungere un nuovo libro alla libreria
- Creare un nuovo account utente

### PUT - Aggiornare

Le richieste PUT aggiornano una risorsa esistente con nuovi dati. Per esempio:
- Aggiornare il titolo o l’autore di un libro
- Cambiare l’anno di pubblicazione di un libro

### DELETE - Eliminare

Le richieste DELETE rimuovono una risorsa dal server. Per esempio:
- Eliminare un libro dalla libreria
- Rimuovere un account utente

---

## Codici di stato HTTP

Quando un server risponde a una richiesta, invia un codice di stato per indicare cosa è successo. I codici più comuni includono:

- **200 OK**: La richiesta è stata eseguita correttamente
- **201 Created**: Una nuova risorsa è stata creata con successo
- **400 Bad Request**: Il client ha inviato qualcosa di non valido
- **404 Not Found**: La risorsa richiesta non esiste
- **500 Internal Server Error**: Qualcosa è andato storto sul server

----

## Anatomia di una richiesta HTTP

Ogni richiesta HTTP ha diverse parti:
- **Metodo**: Il tipo di richiesta (GET, POST, PUT, DELETE)
- **URL**: L’indirizzo della risorsa
- **Headers**: Informazioni aggiuntive sulla richiesta
- **Body**: I dati inviati (per richieste POST e PUT)

## Nel nostro My DIY Library

Useremo tutti questi metodi HTTP per creare una API completa:
- GET per recuperare i libri
- POST per aggiungere nuovi libri
- PUT per aggiornare le informazioni dei libri
- DELETE per rimuovere libri dalla libreria

---

## Conclusione

In questa lezione hai imparato:

- Cos’è HTTP e perché viene utilizzato
- I principali metodi HTTP (GET, POST, PUT, DELETE)
- Cosa significano i codici di stato HTTP
- La struttura di una richiesta HTTP
- Come HTTP viene utilizzato nel nostro progetto My DIY Library

Ora sai come client e server comunicano sul web usando HTTP. Nella prossima lezione vedremo come restituire dati ai client usando il formato JSON.