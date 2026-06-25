# Installazione di Flask

Flask è un "micro-framework" — è leggero e semplice, ma abbastanza potente da consentire la creazione di applicazioni reali e strutturate. Ti fornisce gli strumenti fondamentali di cui hai bisogno per gestire le richieste web, rispondere agli utenti e amministrare i dati, senza costringerti a seguire un unico approccio predefinito. Lo useremo per sviluppare l'API del nostro progetto **My DIY Library**.

## Assicurati che l'ambiente virtuale sia attivo

Prima di installare qualsiasi componente, assicurati di aver attivato l'ambiente virtuale creato nella lezione precedente. Dovresti visualizzare il prefisso `(venv)` all'inizio del tuo terminale.

In caso contrario, torna alla sezione **Attivare l'ambiente virtuale** della lezione precedente.

> **Importante:** Prima di installare pacchetti o eseguire codice Python, verifica sempre che l'ambiente virtuale sia attivo. In caso contrario, i pacchetti verranno installati globalmente nel sistema e il progetto potrebbe non funzionare correttamente.

---

## Installare Flask

Con l'ambiente virtuale regolarmente attivo, installa Flask utilizzando `pip` (il gestore di pacchetti nativo di Python):

```bash
pip install flask

```

Questo comando scaricherà e installerà Flask insieme a tutte le dipendenze necessarie al suo funzionamento.

---

## Installare Flask-SQLAlchemy

Avremo bisogno anche di Flask-SQLAlchemy, un'estensione che semplifica notevolmente l'interazione e il lavoro con i database:

```bash
pip install flask-sqlalchemy

```

---

## Verificare l'installazione

Assicuriamoci che l'installazione sia andata a buon fine. Esegui questo comando nel terminale:

```bash
python -c "import importlib.metadata; print(importlib.metadata.version('flask'))"

```

Dovresti vedere stampato a schermo il numero di versione di Flask, ad esempio `3.0.0`. Se compare, significa che Flask è installato correttamente!

---

## Salvare le dipendenze del progetto

È considerata un'ottima pratica salvare l'elenco di tutti i pacchetti installati. Questo renderà semplicissimo configurare e riprodurre lo stesso ambiente di sviluppo su un altro computer:

```bash
pip freeze > requirements.txt

```

Questo comando genera un file chiamato `requirements.txt` che tiene traccia di tutti i pacchetti installati e delle relative versioni.

---

## Conclusione

* Flask è un framework leggero progettato per lo sviluppo di API web
* Installa sempre i pacchetti all'interno del tuo ambiente virtuale attivo
* Il comando `pip install flask` si usa per installare Flask
* Il comando `pip install flask-sqlalchemy` aggiunge il supporto per la gestione dei database
* Il file `requirements.txt` memorizza le dipendenze ufficiali del progetto

---

## Risoluzione dei problemi (Troubleshooting)

### pip non trovato

Se ricevi un errore del tipo:

```bash
pip: command not found

```

Prova a digitare:

```bash
python -m pip install flask

```

---

### Ambiente virtuale errato

Se Flask risulta installato ma non riesci a utilizzarlo:

* Controlla che la dicitura `(venv)` sia visibile all'inizio della riga di comando nel terminale
* Riattiva l'ambiente virtuale seguendo la procedura

---

### Versione di Python errata

Verifica che sul tuo sistema sia in uso una versione di Python pari o superiore alla 3.11:

```bash
python --version

```
