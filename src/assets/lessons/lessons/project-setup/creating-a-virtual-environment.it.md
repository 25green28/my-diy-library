# Creazione di un ambiente virtuale

Un ambiente virtuale (virtual environment) è come una sandbox separata per il tuo progetto Python. Mantiene tutti gli strumenti e le librerie necessari per questo specifico progetto isolati dagli altri progetti presenti sul tuo computer.

## Perché abbiamo bisogno di un ambiente virtuale?

Pensa a questo scenario: progetti diversi potrebbero richiedere versioni diverse dello stesso identico strumento. Se installi tutto nello stesso spazio globale, alcuni progetti potrebbero andare in conflitto tra loro. Un ambiente virtuale fornisce a ciascun progetto un proprio spazio indipendente con i propri strumenti dedicati. Questo mantiene i tuoi progetti organizzati ed evita malfunzionamenti.

---

## Assicurati di essere nella cartella corretta

Prima di creare un ambiente virtuale, apri il terminale e naviga fino alla cartella del tuo progetto. Questo passaggio è fondamentale perché l'ambiente virtuale verrà generato direttamente all'interno della directory corrente.

Esempio:

```bash
cd cartella-del-mio-progetto

```

> **Consiglio:** Il modo più semplice per spostarsi nella cartella del progetto è:
> 1. Apri il tuo gestore dei file (Esplora file).
> 2. Trova la cartella del tuo progetto.
> 3. Copia il **percorso completo della cartella** (di solito puoi fare clic con il pulsante destro del mouse sulla cartella e scegliere **Copia come percorso**, oppure copiare il percorso mostrato nella barra degli indirizzi in alto).
> 4. Nel terminale, digita `cd ` (lasciando uno spazio dopo il comando).
> 5. Incolla il percorso copiato e premi Invio.
>
>
> Esempio:
> ```bash
> cd "C:/Users/<Tuo Nome Utente>/Documents/Book Management Backend"
> 
> ```
>
>
> Le virgolette sono necessarie quando il nome della cartella contiene degli spazi vuoti.

---

## Creare l'ambiente virtuale

A questo punto esegui il comando:

```bash
python -m venv venv

```

Questo comando indica a Python di creare un nuovo ambiente virtuale chiamato `venv`. Vedrai apparire una nuova cartella denominata `venv` all'interno della directory del tuo progetto.

---

## Attivare l'ambiente virtuale

Prima di poter utilizzare l'ambiente virtuale, è necessario attivarlo. Il comando varia a seconda che tu utilizzi Windows oppure macOS/Linux.

### Su Windows:

#### PowerShell:

```bash
venv\Scripts\activate

```

#### Prompt dei comandi (cmd):

```bash
venv\Scripts\activate.bat

```

> Se ricevi un errore del tipo "l'esecuzione di script è disabilitata su questo sistema" (`execution of scripts is disabled on this system`), consulta la sezione Risoluzione dei problemi riportata qui sotto.

### Su macOS o Linux:

```bash
source venv/bin/activate

```

Dopo aver eseguito questo comando, dovresti vedere la dicitura `(venv)` all'inizio del prompt del tuo terminale. Ciò indica che l'ambiente virtuale è correttamente attivo per la sessione corrente.

---

## Lavorare con l'ambiente virtuale

Una volta attivato, qualsiasi pacchetto Python installato sarà disponibile esclusivamente all'interno di questo ambiente isolato.

Quando avrai terminato di lavorare sul progetto, potrai disattivarlo digitando:

```bash
deactivate

```

Il prefisso `(venv)` scomparirà dal prompt del terminale.

> Importante: Ricordati che è necessario attivare l'ambiente virtuale ogni volta che riapri il terminale e ritorni a lavorare su questo progetto.

---

## Conclusione

* Un ambiente virtuale isola le dipendenze e le librerie di un progetto
* Crealo sempre all'interno della cartella principale del tuo progetto
* Attivalo prima di iniziare a scrivere o eseguire il codice del progetto
* Disattivalo quando hai terminato la sessione di lavoro
* Riattivalo ogni volta che riprendi in mano il progetto

---

## Risoluzione dei problemi (Troubleshooting)

### ⚠️ Problema con Windows PowerShell (errore molto comune)

Su alcuni sistemi Windows, quando si utilizza PowerShell, potrebbe apparire un messaggio di errore simile a:

```bash
execution of scripts is disabled on this system

```

Questo accade perché PowerShell limita l'esecuzione degli script di terze parti per impostazione predefinita per motivi de sicurezza.

### Come risolvere (soluzione consigliata)

Apri PowerShell **come Amministratore** ed esegui il comando:

```bash
Set-ExecutionPolicy RemoteSigned

```

Successivamente digita:

```bash
Y

```

Fatto questo, torna sul terminale del tuo progetto e prova ad attivare nuovamente l'ambiente virtuale:

```bash
venv\Scripts\activate

```

### Alternativa (senza modificare le impostazioni di sistema)

Se preferisci non modificare le impostazioni globali di sicurezza, puoi semplicemente utilizzare il **Prompt dei comandi (cmd)** classico al posto di PowerShell:

```bash
venv\Scripts\activate.bat

```

Entrambi i metodi portano allo stesso risultato — utilizzano semplicemente due terminali differenti.
