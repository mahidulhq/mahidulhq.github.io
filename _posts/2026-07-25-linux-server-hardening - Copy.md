---
layout: post
title: Python Practice & Projects
category: projects
---

A curated collection of Python practice scripts and mini-projects focused on automation, utilities, and beginner-to-intermediate experimentation.

> Repository: [`mahidulhq/python`](https://github.com/mahidulhq/python)  
> Primary Language: **Python (100%)**  
> Description: *practice and projects*

## Table of Contents

- [Overview](#overview)
- [Repository Structure](#repository-structure)
- [Project Modules](#project-modules)
- [Getting Started](#getting-started)
- [Running a Project](#running-a-project)
- [Environment & Dependencies](#environment--dependencies)
- [Contributing](#contributing)
- [Contact](#contact)


## Overview

This repository is a personal Python lab containing standalone scripts and small projects.  
It is designed to:

- reinforce Python fundamentals,
- explore practical automation use cases,
- build reusable utility workflows,
- and provide a project-based learning path.

Projects are organized by topic/use case rather than as a single monolithic application.


## Repository Structure

```text
python/
├── basics/
├── browserAutomate/
├── covidAlert/
├── emailSender/
├── getIP_fromHost/
├── imageTOtxt/
├── passwordGenerator/
├── pyTalks2007/
├── screenshotAPP_CLI/
├── screenshotGUI/
├── speedtest/
├── .gitattributes
├── .gitignore
└── README.md
```


## Project Modules


### 1. `basics/`
Foundational Python exercises and syntax practice.

### 2. `browserAutomate/`
Browser automation scripts (likely task automation such as navigation, form interaction, or repetitive web tasks).

### 3. `covidAlert/`
A utility/project related to COVID-19 data alerts or notifications.

### 4. `emailSender/`
Scripts for sending emails programmatically (SMTP-based workflows or templated mail tasks).

### 5. `getIP_fromHost/`
Hostname-to-IP lookup utility scripts for basic networking tasks.

### 6. `imageTOtxt/`
Image-to-text conversion project (potential OCR experimentation).

### 7. `passwordGenerator/`
Utility for generating secure/random passwords.

### 8. `pyTalks2007/`
Python talk/demo-related materials or experiments.

### 9. `screenshotAPP_CLI/`
Command-line screenshot capture utility.

### 10. `screenshotGUI/`
GUI-based screenshot tool.

### 11. `speedtest/`
Internet/network speed test scripts.


## Getting Started

### Prerequisites

- Python **3.9+** (recommended)
- `pip` package manager
- Virtual environment tool (`venv`)

### Clone the Repository

```bash
git clone https://github.com/mahidulhq/python.git
cd python
```

### Create and Activate Virtual Environment

**Linux/macOS**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

**Windows (PowerShell)**
```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```


## Running a Project

Because each folder is a standalone mini-project, run scripts from the relevant directory:

```bash
cd passwordGenerator
python main.py
```

If a folder uses a different entry file name, run that script directly (for example `app.py`, `script.py`, etc.).


## Environment & Dependencies

This repository currently appears to be a multi-project workspace.  
For best maintainability, consider one of these approaches:

1. **Single root `requirements.txt`** (if most dependencies are shared), or
2. **Per-project `requirements.txt`** inside each module folder.

Install dependencies (if present):

```bash
pip install -r requirements.txt
```

or per module:

```bash
pip install -r <module>/requirements.txt
```

## Contributing

Contributions, refactors, and documentation improvements are welcome.

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/improve-docs
   ```
3. Commit your changes:
   ```bash
   git commit -m "docs: improve module documentation"
   ```
4. Push and open a Pull Request


## Contact

GitHub: [@mahidulhq](https://github.com/mahidulhq)