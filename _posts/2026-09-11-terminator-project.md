---
layout: post
title: TERMINATOR - an Open-Source Phishing Threat Intelligence CLI
category: projects
---


When analyzing potential phishing URLs, security analysts and end-users need fast, reliable, and transparent answers. Relying solely on third-party API lookups isn't always optimal—APIs have rate limits, cost money, and can miss brand-new, zero-day infrastructure before threat intelligence feeds index them.

To bridge this gap, I built **TERMINATOR**: a command-line threat intelligence tool written in Python. It combines fast, multi-layered local heuristic inspection with dynamic API integrations to provide comprehensive risk assessments.

Below is a deep dive into the engineering decisions, detection mechanics, and technical architecture behind TERMINATOR.


> Repository: [`mahidulhq/TERMINATOR`](https://github.com/mahidulhq/TERMINATOR)  
> Primary Language: **Python (100%)**  
> Description: *Open-Source Phishing Threat Intelligence CLI*

## Table of Contents

* [Core Detection Engine & Technical Rationale](#core-detection-engine--technical-rationale)
* [Integrated Threat Intelligence & Secret Management](#integrated-threat-intelligence--secret-management)
* [Python Architecture & Dependencies](#python-architecture--dependencies)
* [Open-Source Deployment & Binary Packaging](#open-source-deployment--binary-packaging)
* [Getting Started](#getting-started)

## 1. Core Detection Engine & Technical Rationale

Rather than acting as a simple wrapper around an external API, TERMINATOR prioritizes **static heuristic inspection**. It evaluates key indicators of compromise (IOCs) locally before initiating any network calls.

### A. Protocol & Transport Inspection (`analyze_protocol`)

* **What it checks:** Verifies whether the endpoint operates over unencrypted `http://` rather than `https://`.
* **Why it matters:** While most modern phishing kits now use free automated certificates (e.g., Let's Encrypt), legacy or hastily deployed phishing infrastructure frequently drops back to plain HTTP. Flagging unencrypted endpoints provides an immediate baseline risk signal.

### B. Direct IP Host Detection (`analyze_ip_hostname`)

* **What it checks:** Evaluates if the hostname is a raw IPv4 or IPv6 address using Python’s native `ipaddress` library.
* **Why it matters:** Standard web destinations use registered Domain Name System (DNS) records. Phishing campaigns host credential harvesters on bare IP addresses (e.g., `[http://192.168.1.1/login](http://192.168.1.1/login)`) to bypass domain-based blocklists and avoid DNS logging.

### C. Shannon Entropy Analysis (`analyze_entropy`)

* **What it checks:** Calculates the mathematical randomness of character distribution in the primary domain string using Shannon Entropy:

$$H(X) = -\sum_{i=1}^{n} P(x_i) \log_2 P(x_i)$$


* **Why it matters:** Threat actors frequently use Domain Generation Algorithms (DGAs) or high-randomness subdomains (e.g., `a8f9x2z1-login.com`) to churn disposable infrastructure. A Shannon entropy score above `3.8` strongly indicates automated or randomized string generation rather than human-readable branding.

### D. Typosquatting & IDN Homograph Defense (`analyze_homograph_and_typosquatting`)

* **What it checks:** Uses string distance algorithms and prefix checks to identify brand impersonation:
* **Punycode Inspection:** Detects domain strings starting with `xn--`, indicating Internationalized Domain Name (IDN) homograph attacks (e.g., replacing Latin characters with Cyrillic lookalikes).
* **Levenshtein Distance Calculation:** Measures the single-character edit distance (insertions, deletions, substitutions) between the target domain and common brand targets (e.g., `paypal`, `google`, `microsoft`).


* **Why it matters:** Attackers register visually similar domain names (e.g., `paypa1.com` or `micros0ft.com`) to trick victims. A Levenshtein distance of $1$ or $2$ against protected brand names triggers a critical threat warning.

### E. Redirection Chain Tracing (`analyze_redirects`)

* **What it checks:** Issues non-destructive HTTP `HEAD` requests following redirection chains (`allow_redirects=True`) using the `requests` library.
* **Why it matters:** Phishers obscure final destinations behind URL shorteners, open redirects, or compromised intermediate servers. Tracing the full chain exposes multiple hop counts and captures the ultimate destination URL.



## 2. Integrated Threat Intelligence & Secret Management

### VirusTotal API v3 Lookup (`query_virustotal`)

Once local heuristic checks are complete, TERMINATOR queries the **VirusTotal v3 API** to retrieve live vendor reputation stats.

* It extracts real-time counts for `malicious` and `suspicious` classifications across dozens of global antivirus and web-reputation engines.
* The findings are merged into a unified **Risk Score (0–10)**, providing an aggregated verdict ranging from `LOW RISK / CLEAN` to `HIGH RISK / MALICIOUS`.

### Environment Hygiene (`python-dotenv`)

Hardcoding API credentials inside source code poses a critical risk of accidental public leaks on GitHub. TERMINATOR uses `python-dotenv` to isolate secrets into a local `.env` file (`VT_API_KEY=...`). The application includes a built-in configuration utility (**Press `K**`) that lets users save, update, or clear their API credentials locally without touching source code.



## 3. Python Architecture & Dependencies

TERMINATOR was built with modularity and cross-platform reliability in mind:

| Library | Architectural Role |
| --- | --- |
| **`tldextract`** | Accurately extracts subdomains, registered domains, and top-level domains (TLDs) using the Public Suffix List, preventing false flags on complex TLDs (like `.co.uk`). |
| **`colorama`** | Translates ANSI color escape sequences seamlessly across Windows CMD/PowerShell and POSIX terminals. |
| **`requests`** | Manages outbound network requests, redirect headers, and TLS verifications cleanly with configurable timeouts. |
| **`ipaddress`** | Performs strict type parsing to distinguish raw network IP addresses from standard domain hostnames. |



## 4. Open-Source Deployment & Binary Packaging

To support both security researchers running Python and non-technical users looking for a single tool, the project provides two distribution options:

1. **Source Code Execution (Cross-Platform):** Automated launcher scripts (`launch/run.bat` for Windows and `launch/run.sh` for Linux/macOS) handle virtual environment dependencies and pathing dynamically.
2. **Standalone Windows Executable (`TERMINATOR.exe`):** Built via PyInstaller for single-file Windows deployment.

### Addresssing Antivirus Heuristics (False Positives)

Packaging Python tools as single-file executables often causes security tools (like Windows Defender) to generate heuristic flags (`Trojan:Win32/Wacatac.B!ml`).

As explained in the repository documentation, this occurs because PyInstaller uses generic, pre-compiled C bootloader wrappers that malware authors also frequently abuse. Because open-source tools lack expensive enterprise EV Code Signing certificates, security software defaults to low-trust classification. To mitigate this, users can compile PyInstaller bootloaders from source, build native binaries via Nuitka, or run the application directly from source using the provided `run.bat` / `run.sh` scripts.



## Getting Started

TERMINATOR is open-source and available on GitHub:

```planetext
run TERMINATOR.exe or run.bat for Windows
run run.sh for Linux/Mac
```

*Contributions, brand list expansions, and heuristic rule suggestions are welcome via Pull Requests!*