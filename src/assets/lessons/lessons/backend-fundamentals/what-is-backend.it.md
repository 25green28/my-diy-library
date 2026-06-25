# Cos'è un backend?

Quando usi un sito web o un'app, vedi il "frontend" - i pulsanti, il testo e le immagini con cui interagisci. Ma c'è un'altra parte che non vedi: il "backend". Il backend è il sistema dietro le quinte che fa funzionare tutto.

## Cosa fa un backend?

Pensa a un ristorante: il frontend è la sala da pranzo dove ordini il cibo, ma il backend è la cucina dove il cibo viene effettivamente preparato. Nelle applicazioni web, il backend:

- Memorizza e recupera i dati (come i libri nella nostra biblioteca)
- Elabora le richieste degli utenti (come l'aggiunta di un nuovo libro)
- Gestisce la logica di business (come verificare se un libro esiste già)
- Comunica con i database
- Invia le risposte all'utente

## Frontend vs Backend

Il **frontend** è ciò che gli utenti vedono e con cui interagiscono: l'interfaccia visiva. Il **backend** è il sistema invisibile che elabora i dati e prende decisioni.

Nel nostro progetto **My DIY Library**:

- Un frontend potrebbe essere un sito web che mostra i libri (che è già stato creato per te)
- Il backend è il sistema che memorizza, aggiorna ed elimina quei libri

## Come comunicano

Il frontend e il backend comunicano tra loro tramite richieste HTTP. Quando fai clic su un pulsante per aggiungere un libro, il frontend invia una richiesta al backend. Il backend elabora la richiesta, salva il libro nel database e invia una risposta dicendo "successo!".

## Perché stiamo costruendo un backend?

In questo progetto, stiamo costruendo una API (Application Programming Interface) di backend. Un'API è un insieme di regole que consente a diversi programmi di comunicare tra loro.

La nostra API consentirà a qualsiasi applicazione (un sito web, un'app mobile o un altro servizio) di gestire i libri nel nostro sistema **My DIY Library**.

---

## Conclusione

In questa lezione hai imparato:

- Cos'è un backend
- In cosa si differenzia dal frontend
- Come comunicano il frontend e il backend
- Perché esistono le API
- Come si inserisce il nostro progetto in questa struttura