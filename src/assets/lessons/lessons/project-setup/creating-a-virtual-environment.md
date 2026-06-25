# Creating a virtual environment

A virtual environment is like a separate sandbox for your Python project. It keeps all the tools and libraries you need for this project isolated from other projects on your computer.

## Why do we need a virtual environment?

Think of it like this: different projects might need different versions of the same tool. If you install everything in the same place, some projects can conflict with each other. A virtual environment gives each project its own space with its own tools. This keeps your projects organized and prevents problems.

---

## Make sure you're in the correct folder

Before creating a virtual environment, open a terminal and navigate to your project folder. This is important because the virtual environment will be created inside the current directory.

Example:

```bash
cd my-project-folder
```

> **Recommendation:** The easiest way to navigate to your project folder is to:
>
> 1. Open your file explorer.
> 2. Find your project folder.
> 3. Copy the **full folder path** (you can usually right-click the folder and choose **Copy as path**, or copy the path shown in the address bar at the top of your file explorer).
> 4. In the terminal, type `cd ` (with a space after it).
> 5. Paste the path and press Enter.
>
> Example:
>
> ```bash
> cd "C:/Users/<Your Username>/Documents/Book Management Backend"
> ```
>
> The quotation marks are needed when the folder name contains spaces.
## Creating your virtual environment

Then run:

```bash
python -m venv venv
```

This command tells Python to create a new virtual environment named `venv`. You'll see a new folder called `venv` appear in your project directory.

---

## Activating the virtual environment

Before you can use the virtual environment, you need to activate it. The command is different for Windows and macOS/Linux.

### On Windows:

#### PowerShell:
```bash
venv\Scripts\activate
```

#### Command Prompt (cmd):
```bash
venv\Scripts\activate.bat
```

> If you get an error `execution of scripts is disabled on this system` see the Troubleshooting section below.


### On macOS or Linux:

```bash
source venv/bin/activate
```

After running this command, you should see `(venv)` at the beginning of your terminal prompt. This means the virtual environment is active for this session.

---

## Working with the virtual environment

Once activated, any Python packages you install will only be available in this environment.

When you're done working on the project, you can deactivate it:

```bash
deactivate
```

The `(venv)` will disappear from your prompt.

> Important: You need to activate the virtual environment every time you reopen your terminal and return to this project.


## Conclusion

- A virtual environment isolates project dependencies
- Always create it inside your project folder
- Activate it before working on your project
- Deactivate it when you're done
- Reactivate it every time you come back

---

## Troubleshooting

### ⚠️ Windows PowerShell issue (common problem)

On some Windows systems, when using PowerShell, you may see an error like:

```bash
execution of scripts is disabled on this system
```

This happens because PowerShell restricts running scripts by default for security reasons.

### How to fix it (recommended option)

Open PowerShell **as Administrator** and run:

```bash
Set-ExecutionPolicy RemoteSigned
```

Then type:

```bash
Y
```

After that, try activating the virtual environment again:

```bash
venv\Scripts\activate
```



### Alternative (no changes to system)

If you don't want to change settings, you can use **Command Prompt (cmd)** instead of PowerShell:

```bash
venv\Scripts\activate.bat
```

Both methods work the same — they just use different terminals.