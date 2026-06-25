# Client vs Server

Per capire come funzionano le applicazioni web, è necessario comprendere la relazione tra client e server. Questo è fondamentale per costruire la nostra My DIY Library.

---

## Cos’è un client?

Un client è qualsiasi dispositivo o applicazione che richiede informazioni o servizi. Puoi pensare al client come a un cliente in un negozio: entra e chiede qualcosa. Esempi di client includono:

- Browser web come Chrome, Firefox o Safari
- App mobili sul tuo telefono
- Applicazioni desktop
- Anche altri server possono agire come client

## Cos’è un server?

Un server è un computer o un programma che fornisce risorse, dati o servizi ai client. Puoi pensare al server come al negozio che ha ciò di cui il cliente ha bisogno. Esempi includono:

- Server web che servono siti internet
- Server applicativi come la nostra applicazione Flask
- Server di database che memorizzano dati

---

## Come funzionano insieme

L’interazione tra client e server segue un semplice schema chiamato ciclo richiesta-risposta:

1. **Il client invia una richiesta**: Il client chiede qualcosa (come “mostrami tutti i libri”)
2. **Il server elabora la richiesta**: Il server capisce cosa vuole il client ed esegue il lavoro
3. **Il server invia una risposta**: Il server rimanda le informazioni richieste
4. **Il client mostra la risposta**: Il client visualizza le informazioni all’utente

## Un esempio reale

Quando visiti Amazon.com:
1. Il tuo browser (client) invia una richiesta ai server di Amazon
2. I server di Amazon elaborano la richiesta e trovano i prodotti che desideri
3. I server inviano i dati dei prodotti al tuo browser
4. Il browser mostra i prodotti sullo schermo

## Nel nostro progetto

Per la nostra My DIY Library:
- La nostra applicazione Flask è il **server** — gestirà le richieste e i dati dei libri
- Un browser web o uno strumento di test API è il **client** — invierà richieste al nostro server
- Costruiremo degli “endpoint” — URL specifici che i client possono chiamare per eseguire azioni come aggiungere o visualizzare libri

---

## Conclusione

In questa lezione hai imparato:

- Cos’è un client nelle applicazioni web
- Cos’è un server e cosa fa
- Come client e server comunicano tramite il ciclo richiesta-risposta
- Come applicazioni reali come Amazon usano questo sistema
- Come questo si applica al nostro progetto My DIY Library

Ora capisci come i dati si muovono tra utenti e server. Nella prossima lezione esploreremo in dettaglio come avviene questa comunicazione tramite le richieste HTTP.