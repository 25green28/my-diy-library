# Running the development server

Now let's create a simple Flask application and run it to verify everything is set up correctly. This will be your first working web server!

---

## Your project structure

At this point, your project folder should look similar to this:

```text
your-folder/
├── venv/              # Your virtual environment
└── requirements.txt   # List of installed packages
```

---

## Create your first Flask app

### Step 1: Create a new file

Inside your project folder, create a new file called:

```text
app.py
```

Your project should now look like:

```text
your-folder/
├── venv/
├── requirements.txt
└── app.py
```

### Step 2: Add the Flask code

Open `app.py`.

You should see an empty file, the next step is to add the following code:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
```

---

## What does this code do?

- **`from flask import Flask`**
    - Imports Flask so we can create a web application.

- **`app = Flask(__name__)`**
    - Creates your Flask application.
    - Think of this as creating the backend project itself.

- **`@app.route('/')`**
    - Creates a route.
    - The `/` route is the homepage.
    - When someone visits `http://127.0.0.1:5000/`, Flask will run the function below it.

- **`def hello():`**
    - Returns a response to the browser.
    - The browser will display: `Hello, World!`

- **`app.run(debug=True)`**
    - Starts the Flask development server.

---

## Run your server

### Step 1: Open a terminal

Make sure:

* You are inside your project folder
* Your virtual environment is activated


### Step 2: Start Flask

Run:

```bash
python app.py
```

If everything works correctly, you should see something similar to:

```text
* Running on http://127.0.0.1:5000
```

Leave this terminal open while testing your application.

---

## Test it in your browser

Open:

```text
http://127.0.0.1:5000
```

You should see:

```text
Hello, World!
```

If you see that message, your Flask server is working correctly.

---

## Try this by yourself

### Change the message

Open `app.py`.

Find:

```python
return 'Hello, World!'
```

Replace it with:

```python
return 'My first Flask app'
```

Save the file.

Refresh the browser.

You should now see:

```text
My first Flask app
```

---

### Add a second route

Open `app.py`.

Add the following code directly below the `hello()` function:

```python
@app.route('/test')
def test():
    return 'This is a second route'
```

Your file should now look like:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'My first Flask app'

@app.route('/test')
def test():
    return 'This is a second route'

if __name__ == '__main__':
    app.run(debug=True)
```

Save the file and then visit:

```text
http://127.0.0.1:5000/test
```

You should see:

```text
This is a second route
```

---

## Stopping the server

To stop Flask:

1. Click on the terminal window
2. Press:

```text
Ctrl + C
```

The server will stop running.

---

## What is debug mode?

The `debug=True` parameter enables helpful development features:

* Automatically reloads the server when code changes
* Shows detailed error messages
* Makes debugging easier

> **Important:** Never use `debug=True` in a production application.

---

## Conclusion

* You created your first Flask app
* You learned how routes work
* You started a local web server
* You tested your application in the browser
* You added a second route

---

## Troubleshooting

### Server not starting

* Make sure the virtual environment is activated
* Make sure Flask is installed

---

### Page not loading

* Check the URL:

  ```text
  http://127.0.0.1:5000
  ```
* Make sure the Flask server is running

---

### Port already in use

Another application may already be using port 5000.

Stop the other application or restart your terminal and try again.
