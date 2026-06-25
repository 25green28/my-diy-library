# Parametri di query (Query parameters)

I parametri di query (query parameters) sono coppie chiave-valore opzionali che compaiono all'interno dell'URL subito po dopo il carattere `?`. Vengono comunemente utilizzati per filtrare, cercare e gestire la paginazione dei dati nelle API.

## Cosa sono i parametri di query?

I parametri di query costituiscono la parte dell'URL che segue il simbolo `?`. Ad esempio, nell'URL `/search?q=python`, il parametro di query è `q=python`. Quando sono presenti più parametri contemporaneamente, questi vengono separati dal carattere ampersand `&`: `/books?author=Orwell&year=1949`.

---

## Utilizzo di base

Ecco come accedere ai parametri di query all'interno di un'applicazione Flask:

```python
@app.route('/search')
def search():
    query = request.args.get('q', '')
    return f'Searching for: {query}'

```

L'istruzione `request.args.get('q', '')` recupera il valore associato al parametro `q`. Se il parametro non viene inserito nell'URL, restituisce come fallback una stringa vuota `''`.

## Gestione di parametri multipli

È possibile catturare più parametri all'interno della stessa funzione:

```python
@app.route('/books')
def get_books():
    author = request.args.get('author')
    year = request.args.get('year')
    return f'Author: {author}, Year: {year}'

```

Invocando l'URL `/books?author=Orwell&year=1949` il server restituirà il testo: "Author: Orwell, Year: 1949".

---

### Esercizio

Prima di guardare la soluzione, prova a prevedere l'output di questa rotta:

```python
@app.route('/books')
def get_books():
    author = request.args.get('author')
    year = request.args.get('year')
    return f'Author: {author}, Year: {year}'

```

URL d'esempio:

```text
/books?author=Tolkien&year=1954

```

Quale sarà il risultato stampato?

```
Author: Tolkien, Year: 1954

```

---

## Valori predefiniti e conversione dei tipi

È possibile impostare valori di default e forzare la conversione del tipo di dato ricevuto:

```python
@app.route('/items')
def get_items():
    limit = request.args.get('limit', 10, type=int)
    offset = request.args.get('offset', 0, type=int)
    return f'Limit: {limit}, Offset: {offset}'

```

L'argomento `type=int` indica a Flask di convertire automaticamente la stringa di testo ricevuta in un numero intero (integer).

---

## Valori multipli per lo stesso parametro

In alcuni scenari, una singola chiave di parametro può contenere un elenco di più valori:

```python
@app.route('/tags')
def get_tags():
    tags = request.args.getlist('tag')
    return f'Tags: {tags}'

```

Visitando l'URL `/tags?tag=python&tag=flask` la risposta conterrà la lista: "Tags: ['python', 'flask']".

---

## Verificare l'esistenza di un parametro

È possibile verificare in modo condizionale se un determinato parametro è stato effettivamente passato nella richiesta:

```python
@app.route('/filter')
def filter():
    if 'category' in request.args:
        category = request.args['category']
        return f'Filtering by: {category}'
    return 'No category filter'

```

---

## Conclusione

* I parametri di query consentono ai client di inviare dati opzionali nell'URL dopo il carattere `?`
* Vengono usati per filtrare i dati, effettuare ricerche e personalizzare le risposte del server
* Vi si accede in Flask utilizzando l'oggetto nativo `request.args`
* Possono includere valori predefiniti o essere considerati puramente facoltativi
* Si usa il metodo `get()` per recuperare valori singoli e `getlist()` per ottenere liste di valori

---

## Risoluzione dei problemi (Troubleshooting)

### Il parametro restituisce sempre `None`

Controlla che:

* Il nome del parametro nel codice corrisponda esattamente a quello digitato nell'URL (la distinzione tra maiuscole e minuscole è attiva)
* L'URL contenga la corretta sintassi di formattazione per i parametri

Esempio:

```text
/books?author=Orwell

```

Deve trovare corrispondenza esatta nel codice con:

```python
request.args.get('author')

```

---

### Errore nella conversione del tipo (Wrong type conversion)

Se utilizzi la conversione esplicita del tipo:

```python
request.args.get('limit', type=int)

```

assicurati che il valore passato nell'URL sia effettivamente un valore numerico valido:

Corretto:

```text
/items?limit=10

```

Errato:

```text
/items?limit=ten

```
