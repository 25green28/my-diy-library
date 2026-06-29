# Parametri di rotta (Route parameters)

I parametri di rotta (route parameters) consentono a Flask di catturare valori variabili direttamente dall'URL per poi passarli come argomenti alle tue funzioni Python.

Sono elementi fondamentali nello sviluppo delle API perché permettono di interagire con risorse specifiche, come un singolo libro, un utente o un preciso ordine.

> **Suggerimento:** Non è necessario copiare tutti gli esempi di questo capitolo all'interno del tuo file `app.py`. Servono esclusivamente a farti comprendere la logica di funzionamento dei parametri di rotta.

## Perché abbiamo bisogno dei parametri di rotta?

Immagina di voler sviluppare un'API per la gestione di una libreria.

Un utente potrebbe voler visualizzare:
* Il libro con ID 1
* Il libro con ID 15
* Il libro con ID 42

Creare una rotta statica separata per ogni singolo libro presente nel sistema diventerebbe rapidamente impossibile:

```text
/book/1
/book/2
/book/3
...

```

Per evitare questo problema, Flask permette di rendere dinamica una parte dell'URL.

Ad esempio:

```python
@app.route('/book/<book_id>')
def get_book(book_id):
    return f'Book ID: {book_id}'

```

Adesso, questa singola rotta è in grado di gestire autonomamente chiamate diverse come:

```text
/book/1
/book/15
/book/42

```

Flask estrae il valore dinamico dall'URL e lo passa direttamente alla funzione associata.

---

## Il tuo primo parametro di rotta

Un parametro di rotta viene definito inserendo il nome tra parentesi angolari:

```python
@app.route('/user/<username>')
def user_profile(username):
    return f'User: {username}'

```

Se un utente naviga all'indirizzo:

```text
/user/john

```

Flask cattura la stringa:

```text
john

```

e la assegna alla variabile:

```python
username

```

Di conseguenza, la risposta restituita sarà:

```text
User: john

```

---

## Come Flask assegna il valore

Fai attenzione a un dettaglio: il nome del parametro deve comparire esattamente due volte:

```python
@app.route('/user/<username>')
def user_profile(username):

```

Il nome specificato nella rotta:

```python
<username>

```

deve coincidere perfettamente con il nome dell'argomento della funzione:

```python
def user_profile(username):

```

In caso contrario, Flask non saprà dove inserire il valore recuperato dall'URL.

---

## Mettiti alla prova

Crea una rotta che catturi un nome utente (username) e lo mostri a schermo.

Prova a scriverla da solo prima di visualizzare la soluzione.

```python
@app.route('/user/<username>')
def user_profile(username):
    return f'User: {username}'

```

---

## Convertitori di tipo (Type converters)

Di default, tutti i parametri di rotta estratti vengono trattati da Flask come stringhe di testo semplici.

Tuttavia, Flask offre la possibilità di convertirli automaticamente in tipi di dato Python specifici.

Esempio:

```python
@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'Post ID: {post_id}'

```

Configurato così, Flask accetterà esclusivamente valori numerici interi:

L'indirizzo `/post/42` funzionerà correttamente, mentre l'indirizzo `/post/hello` restituirà un errore.

### Convertitori disponibili

| Convertitore | Descrizione |
| --- | --- |
| `<int:id>` | Numero intero (Integer) |
| `<float:value>` | Numero decimale (Float) |
| `<string:name>` | Testo semplice (comportamento di default) |
| `<path:subpath>` | Testo che può includere anche gli slash (`/`) |

---

## Mettiti alla prova

Cosa dovresti inserire al posto dello spazio vuoto (`_____`) per fare in modo che la rotta accetti solo numeri interi?

```python
@app.route('/post/<_____:post_id>')
def show_post(post_id):
    return f'Post ID: {post_id}'

```

```python
@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'Post ID: {post_id}'

```

---

## Parametri multipli

Le rotte possono catturare più di un valore dinamico contemporaneamente all'interno dello stesso URL.

Esempio:

```python
@app.route('/user/<username>/post/<int:post_id>')
def show_user_post(username, post_id):
    return f"{username}'s post #{post_id}"

```

Navigando all'indirizzo `/user/john/post/42`, Flask assegnerà le seguenti variabili:

```text
username = john
post_id = 42

```

restituendo in output il testo: "john's post #42".

---

## Parametri opzionali

In alcuni casi, potresti volere che una rotta risponda correttamente sia quando il parametro viene inserito, sia quando viene omesso.

Esempio:

```python
@app.route('/page')
@app.route('/page/<int:page_num>')
def show_page(page_num=1):
    return f'Page {page_num}'

```

Se visiti l'indirizzo `/page`, l'output sarà "Page 1" poiché verrà applicato il valore di default inserito nella funzione (`page_num=1`).

Se visiti l'indirizzo `/page/5`, l'output sarà "Page 5" perché Flask sovrascriverà l'argomento con il valore presente nell'URL.

---

## Perché la convalida dei dati rimane importante

I convertitori di tipo si occupano esclusivamente di verificare la natura del dato (ad esempio, che sia un numero).

Un costrutto come:

```python
@app.route('/book/<int:book_id>')

```

garantisce solo che `book_id` sia un intero. Flask non può sapere se quel numero sia valido o logico all'interno del contesto della tua applicazione. Un utente malizioso o distratto potrebbe comunque inviare richieste agli indirizzi `/book/0` o `/book/-10`.

È fondamentale implementare una logica di convalida manuale all'interno della funzione quando necessario:

```python
@app.route('/book/<int:book_id>')
def get_book(book_id):

    if book_id < 1:
        return 'Invalid book ID', 400

    return f'Book {book_id}'

```

---

## Mettiti alla prova

Completa la condizione logica sottostante in modo da rifiutare tutti gli ID inferiori a 1 con un codice di errore 400.

```python
@app.route('/book/<int:book_id>')
def get_book(book_id):

    if _______:
        return 'Invalid book ID', 400

    return f'Book {book_id}'

```

```python
if book_id < 1:

```

---

## L'importanza dei parametri di rotta nelle API reali

I parametri di rotta sono i pilastri strutturali su cui si poggiano le API REST nel mondo reale.

Esempi di chiamate standard:

```text
GET    /api/books/1
GET    /api/books/15
DELETE /api/books/42

```

Dichiarando una rotta generica `@app.route('/api/books/<int:book_id>')`, Flask è in grado di identificare e servire le risorse in modo completamente automatizzato. Senza i parametri di rotta, strutturare architetture web dinamiche risulterebbe estremamente complesso.

---

## Conclusione

In questa lezione hai appreso:

* Cosa sono i parametri di rotta
* In che modo Flask estrae i valori dinamici dagli URL
* Come mappare correttamente i parametri all'interno delle funzioni Python
* Come forzare la conversione dei tipi di dato (`int`, `float`, ecc.)
* Come gestire più parametri all'interno dello stesso URL
* Come definire rotte flessibili con parametri opzionali
* Perché è importante aggiungere una convalida logica ai valori numerici

I parametri di rotta sono i mattoni fondamentali delle API REST poiché consentono alla tua applicazione di puntare e manipolare specifiche risorse in modo dinamico.

Nel prossimo capitolo imparerai come leggere ulteriori informazioni opzionali fornite all'interno degli URL mediante i parametri di query (query parameters).

---

## Risoluzione dei problemi (Troubleshooting)

### Ricevo un errore 404 Not Found

Assicurati che la struttura dell'URL digitato nel client corrisponda esattamente alla rotta definita nel codice.

Se la tua rotta `@app.route('/book/<int:book_id>')` richiede esplicitamente un valore numerico intero, l'URL `/book/10` funzionerà correttamente, mentre `/book/hello` fallirà restituendo un errore 404 perché la stringa non soddisfa i vincoli del convertitore `int`.

---

### Il parametro non risulta accessibile all'interno della funzione

Verifica accuratamente che il nome del parametro coincida in entrambi i punti:

```python
@app.route('/user/<username>')
def user_profile(username):

```

La nomenclatura e la distinzione tra maiuscole e minuscole devono corrispondere al 100%.

---

### La rotta risponde, ma il valore visualizzato è errato

Inserisci una riga di controllo per stampare sul terminale il valore catturato:

```python
print(book_id)

```

In questo modo potrai verificare nella console del server se i dati estratti dall'URL corrispondono a quelli attesi.

---

### Le modifiche applicate al codice non si aggiornano

Se noti que Flask non ricarica automaticamente lo script dopo il salvataggio:

1. Arresta manualmente il processo dal terminale premendo:

```text
Ctrl + C

```

2. Riavvia il server:

```bash
python app.py

```

Controlla inoltre che la modalità di debug sia attiva nel file:

```python
app.run(debug=True)

```
