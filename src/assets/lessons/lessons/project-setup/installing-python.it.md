# Cos'è Python?

Python è un linguaggio di programmazione molto facile da leggere e da scrivere. È perfetto per i principianti perché la sintassi del suo codice assomiglia molto alla lingua inglese. Moltissime aziende utilizzano Python per lo sviluppo web, la data science e l'automazione dei processi. Nel nostro caso, lo useremo per creare l'applicazione **My DIY Library**.

---

## Installazione su Windows

1. Visita il sito [python.org](https://www.python.org/downloads/)
2. Fai clic sul grande pulsante "Download Python"
3. Avvia il file di installazione una volta scaricato
4. **Molto importante**: Spunta la casella **"Add Python to PATH"** prima di fare clic su Install
5. Seleziona "Install Now" e attendi il completamento della procedura

## Installazione su macOS

1. Visita il sito [python.org](https://www.python.org/downloads/)
2. Scarica l'installer specifico per macOS
3. Apri il file scaricato e segui le istruzioni sullo schermo
4. Potrebbe esserti richiesto di inserire la password del computer

## Installazione su Linux

La maggior parte dei sistemi Linux ha già Python preinstallato. Per verificare se è presente, apri il terminale (il programma in cui si digitano i comandi testuali) e digita:

```bash
python3 --version

```

Se compare un numero di versione, sei a posto! In caso contrario, installalo tramite il gestore di pacchetti della tua distribuzione:

```bash
sudo apt install python3  # Per Ubuntu/Debian
sudo dnf install python3  # Per Fedora

```

---

## Verificare l'installazione

Dopo aver completato l'installazione, apri il terminale (o il Prompt dei comandi su Windows) e digita:

```bash
python --version

```

### Risultato atteso (output):

```bash
Python 3.12.4

```

(La versione esatta potrebbe variare, ma l'importante è che sia la 3.11 o una successiva).

> Se il comando `python` non funziona sul tuo sistema, prova a digitare `python3`. Questo succede molto spesso su Linux e macOS.

---

## Conclusione

Ora Python è installato correttamente sul tuo computer. Sei pronto per creare il tuo primo ambiente virtuale!

## Risoluzione dei problemi (Troubleshooting)

Se ricevi un errore che indica che "python non è riconosciuto come comando interno o esterno", assicurati di aver spuntato l'opzione "Add Python to PATH" durante l'installazione su Windows. Potrebbe essere necessario riavviare il terminale o il computer per applicare le modifiche.
