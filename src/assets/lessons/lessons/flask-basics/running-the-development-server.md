# Running the development server

Now let's create a simple Flask application and run it to verify everything is set up correctly. This will be your first working web server!

---

## Your project structure

Your project folder should look like this:

```
your-folder/
├── venv/              # Your virtual environment
├── app.py             # Your Flask application
└── requirements.txt   # List of installed packages
```


## Create your first Flask app

Create a new file in your project folder called `app.py`.

Instead of copying everything at once, try filling in the missing parts below:

```python
from flask import Flask

app = Flask(__name__)

@app.route('___')  # What should go inside here for homepage?
def hello():
    return '___'  # What message should be shown?

if __name__ == '__main__':
    app.run(debug=True)
```



## Full solution (only if you need it)

<details>
<summary>Show solution</summary>

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
```

</details>

---

## What does this code do?

Let's break it down:

- `from flask import Flask` - imports Flask
- `app = Flask(__name__)` - creates your application
- `@app.route('/')` - defines the URL path
- `def hello():` - function that runs when the route is accessed
- `return 'Hello, World!'` - what the browser receives
- `app.run(debug=True)` - starts the server

---

## Run your server

Open your terminal, make sure your virtual environment is active, and run:

```bash
python app.py
```

You should see:

```
 * Running on http://127.0.0.1:5000
```


## Test it in your browser

Open:

```
http://127.0.0.1:5000
```

You should see:
```
Hello, World!
```

---

## Try this (important)

Now modify your code:

### 1. Change the message
Instead of `"Hello, World!"`, return something personal like:

- `"My first Flask app"`
- `"Welcome to My DIY Library"`

### 2. Add a second route

Try adding:

```python
@app.route('/test')
def test():
    return 'This is a second route'
```

Then visit:
```
http://127.0.0.1:5000/test
```

---

## Stopping the server

Press inside a terminal:

```
Ctrl + C
```

---

## What is debug mode?

The `debug=True` parameter enables helpful features:

- Auto-reload when code changes
- Detailed error messages
- Debugging tools in browser

> **Important!** Never use debug mode in production.

---

## Summary

- You created your first Flask app
- You learned about routes and responses
- You ran a local web server
- You tested it in the browser
- You modified and extended the app

---

## Troubleshooting

### Server not starting
- Make sure virtual environment is active
- Make sure Flask is installed

### Page not loading
- Check URL: `http://127.0.0.1:5000`
- Make sure server is running

### Port already in use
Stop other servers or restart terminal