# Installing Flask

Flask is a "micro-framework" — it's lightweight and simple, but powerful enough to build real applications. It gives you the basic tools you need to handle web requests, respond to users, and manage data, without forcing you to use any specific way of doing things. We'll use it to build our **My DIY Library** API.

## Make sure your virtual environment is active

Before installing anything, make sure you activated your virtual environment from the previous lesson. You should see `(venv)` in your terminal.

If not, go back to the section **Activating the virtual environment** in the previous lesson.

---

## Installing Flask

With your virtual environment active, install Flask using pip (Python's package installer):

```bash
pip install flask
```

This will download and install Flask and everything it needs to work.



## Installing Flask-SQLAlchemy

We also need Flask-SQLAlchemy, which helps us work with databases in a simpler way:

```bash
pip install flask-sqlalchemy
```

---

## Verify the installation

Let's make sure everything installed correctly. Run this command:

```bash
python -c "import importlib.metadata; print(importlib.metadata.version('flask'))"
```

You should see a version number printed, like `3.0.0`. If you see this, Flask is installed correctly!



## Saving your dependencies

It's good practice to save a list of all the packages you've installed. This makes it easy to set up the project on another computer:

```bash
pip freeze > requirements.txt
```

This creates a file called `requirements.txt` that lists all installed packages and their versions.

---

## Summary

- Flask is a lightweight framework for building web APIs
- Always install packages inside your virtual environment
- `pip install flask` installs Flask
- `pip install flask-sqlalchemy` adds database support
- `requirements.txt` stores project dependencies

---

## Troubleshooting

### pip not found

If you see:

```bash
pip: command not found
```

Try:

```bash
python -m pip install flask
```

---

### Wrong environment

If Flask is installed but not working:

- Make sure `(venv)` is visible in your terminal
- Re-activate your virtual environment

---

### Wrong Python version

Make sure you're using Python 3.11 or newer:

```bash
python --version
```