# What is Python?

Python is a programming language that's easy to read and write. It's perfect for beginners because its code looks similar to English. Many companies use Python for web development, data science, and automation. In our case, we'll use it to build our **My DIY Library** application.

---

## Installing on Windows

1. Visit [python.org](https://www.python.org/downloads/)
2. Click the big "Download Python" button
3. Run the installer when it downloads
4. **Very important**: Check the box that says "Add Python to PATH" before clicking Install
5. Click "Install Now" and wait for it to finish

## Installing on macOS

1. Visit [python.org](https://www.python.org/downloads/)
2. Download the macOS installer
3. Open the downloaded file and follow the installation prompts
4. You may need to enter your password

## Installing on Linux

Most Linux systems already have Python installed. To check, open a terminal (a program where you type commands) and type:

```bash
python3 --version
```

If you see a version number, you're all set! If not, install it using your package manager:

```bash
sudo apt install python3  # For Ubuntu/Debian
sudo dnf install python3  # For Fedora
```

---

## Verify Your Installation

After installing, open a terminal (or Command Prompt on Windows) and type:

```bash
python --version
```

### Expected output:

```bash
Python 3.12.4
```

(The exact version may be different, but it should be 3.11 or newer.)

> If the `python` command does not work on your system, try `python3` instead. This is common on Linux and macOS.

---

## Conclusion
You now have Python installed. You're ready to create your first virtual environment!

## Troubleshooting

If you see an error saying "python is not recognized", make sure you checked "Add Python to PATH" during installation on Windows. You may need to restart your terminal or computer.