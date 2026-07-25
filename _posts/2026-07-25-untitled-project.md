---
layout: post
title: Project Showcase 01 - keeylogger
category: projects
---

# Documentation of `keeylogger`

## Index
- [Overview](#overview)
- [What This Script Does](#what-this-script-does)
- [Features](#features)
- [Output File](#output-file)
- [Installation](#installation)
- [How to Run](#how-to-run)
- [Usage Example](#usage-example)
- [Important Notes](#important-notes)
- [Troubleshooting](#troubleshooting)
- [Contact & Support](#contact--support)

### Related Links:  
1. [Github Repository](https://github.com/mahidulhq/keeyLogger)  
2. [Main Documentation](https://github.com/mahidulhq/keeyLogger/blob/main/README.md)  
3. [License](https://github.com/mahidulhq/keeyLogger/blob/main/LICENSE)

## Overview

This is a lightweight keylogger script that captures and logs typed text in a formatted manner. Instead of logging raw key events, it captures actual readable text that the user types, making it easy to review what was typed.

## What This Script Does

- **Captures typed text**: Records characters as they are typed
- **Handles special keys**: Properly handles Space, Enter, and Backspace keys
- **Removes formatting noise**: Ignores modifier keys (Shift, Ctrl, Alt, etc.)
- **Line-based logging**: Logs each line of text when Enter is pressed
- **Graceful exit**: Press ESC to stop the logger and save any remaining text
- **Timestamp logging**: Each logged entry includes a timestamp

## Features

| Feature | Behavior |
|---------|----------|
| Regular typing (a-z, 0-9, symbols) | Captured as-is |
| Space key | Adds a space to the buffer |
| Enter key | Logs the complete line and starts fresh |
| Backspace key | Removes the last character (simulates real deletion) |
| ESC key | Stops the logger gracefully |
| Other special keys (Shift, Ctrl, Alt) | Ignored (not logged) |

## Output File

The script logs all captured text to `kiLikho.txt` in the same directory. Each entry includes a timestamp.

### Example Log Output

```
2026-03-04 14:23:45,123: Hello World
2026-03-04 14:23:52,456: This is a test
2026-03-04 14:24:10,789: Python keylogger demo
```

## Installation

### Prerequisites

You need Python 3.6+ and the `pynput` library.

### Windows

1. **Install Python** (if not already installed):
   - Download from <https://www.python.org/>
   - During installation, check "Add Python to PATH"

2. **Install pynput library**:

   ```powershell
   pip install pynput
   ```

3. **Verify installation**:

   ```powershell
   python -c "import pynput; print('pynput installed successfully')"
   ```

### Linux (Ubuntu/Debian)

1. **Install Python and pip**:

   ```bash
   sudo apt update
   sudo apt install python3 python3-pip
   ```

2. **Install required dependencies** (for keyboard monitoring):

   ```bash
   sudo apt install python3-tk python3-dev
   ```

3. **Install pynput library**:

   ```bash
   pip3 install pynput
   ```

4. **Grant keyboard monitoring permissions** (required for listening to keyboard events):

   ```bash
   sudo usermod -a -G input $USER
   ```

   Then log out and log back in for changes to take effect.

### Linux (Fedora/RHEL)

1. **Install Python and pip**:

   ```bash
   sudo dnf install python3 python3-pip
   ```

2. **Install required dependencies**:

   ```bash
   sudo dnf install python3-devel libxcb-devel libxkbcommon-devel
   ```

3. **Install pynput**:

   ```bash
   pip3 install pynput
   ```

4. **Grant keyboard monitoring permissions**:

   ```bash
   sudo usermod -a -G input $USER
   ```

## How to Run

### Windows

#### Option 1: Command Prompt

```cmd
python keeyLogger.py
```

#### Option 2: PowerShell

```powershell
python keeyLogger.py
```

#### Option 3: Using Python virtual environment

```powershell
# Activate virtual environment (if you have one)
.\myenv\Scripts\Activate.ps1

# Run the script
python keeyLogger.py
```

### Linux

#### Option 1: Terminal

```bash
python3 keeyLogger.py
```

#### Option 2: Using Python virtual environment

```bash
# Activate virtual environment (if you have one)
source myenv/bin/activate

# Run the script
python3 keeyLogger.py
```

#### Option 3: Run as background process

```bash
nohup python3 keeyLogger.py &
```

#### Option 4: Run with sudo (if permissions issue occurs)

```bash
sudo python3 keeyLogger.py
```

## Usage Example

### Step-by-step Guide

1. **Open terminal/command prompt** in the script directory

2. **Run the script**:
   - Windows: `python keeyLogger.py`
   - Linux: `python3 keeyLogger.py`

3. **The script is now active** and listening to keyboard input

4. **Start typing** - your text will be captured:
   - Type: "Hello World" and press Enter → Logged
   - Type: "Testing 123" and press Enter → Logged
   - If you make mistakes, Backspace works correctly

5. **To stop the script**: Press the ESC key

6. **Check the log file**: Open `kiLikho.txt` to view captured text

### Sample Session

```
> python keeyLogger.py
# Script is running, listening for keystrokes...

# You type: "Hello World" [ENTER]
# You type: "My name is John" [ENTER]
# You type: "Python is fun!" [ENTER]
# Press ESC to stop

> cat kiLikho.txt
2026-03-04 14:23:45,123: Hello World
2026-03-04 14:23:52,456: My name is John
2026-03-04 14:24:10,789: Python is fun!
```

## Important Notes

⚠️ **Legal & Ethical Considerations**:

- This script captures keyboard input system-wide
- Use only on your own devices or with explicit permission
- Unauthorized keylogging is illegal in most jurisdictions
- Always comply with local laws and regulations

## Troubleshooting

### Issue: "pynput not found" error

**Solution**: Install pynput

```bash
# Windows
pip install pynput

# Linux
pip3 install pynput
```

### Issue: Permission denied on Linux

**Solution**: Add user to input group

```bash
sudo usermod -a -G input $USER
# Log out and log back in
```

### Issue: Script doesn't capture keyboard input

**Causes**:

- Press ESC to stop and restart
- Check if another application is consuming keyboard events
- Try running with elevated privileges (sudo on Linux)

### Issue: Unicode/Special characters not captured

**Solution**: This is a limitation of pynput's char attribute. The script captures what `key.char` returns, which may vary by keyboard layout.


## Contact & Support

For issues or questions, refer to:

- pynput documentation: <https://pynput.readthedocs.io/>
- Python documentation: <https://docs.python.org/>

---

**Version**: 1.0  
**Last Updated**: March 4, 2026  
**Compatibility**: Python 3.6+, Windows, Linux, macOS (with pynput)