---
title: "THM - Fool's Mate"
date: 2026-07-22 00:23:13 +0600
categories: [writeup]
---

## Executive Summary
- **Room:** Fool's Mate
- **Platform:** TryHackMe
- **Difficulty:** Easy
- **Category:** Web Security / Client-Side Validation

The **Fool's Mate** challenge demonstrates the dangers of relying solely on client-side validation for business logic and access controls. The target application is a chess-themed Node.js web application that uses JavaScript in the browser to prevent users from making winning moves. By bypassing the browser validation entirely and sending a direct API request to the backend, we can trigger the checkmate condition and retrieve the flag.

## 1. Enumeration

### Port Scanning

We begin by scanning the target host using `nmap` to identify open ports and running services:


```bash
nmap -Pn -sC -sV -p- <TARGET_IP>
```

**Findings:**

- **Web Server:** Node.js / Express application serving the web interface.
- No additional sensitive services (FTP, SMB, exposed database ports) were detected.

![nmap](/assets/images/screenshots/nmap_scan.png)

### Web Application Reconnaissance

Running `whatweb` against the web service confirms the backend stack:


```bash
whatweb http://<TARGET_IP>
```

**Key Stack Info:**

- **Framework:** Express (Node.js)
- **Application Title:** Endgame Trainer

![whatweb](/assets/images/screenshots/whatweb.png)

## 2. Vulnerability Analysis

Upon interacting with the web interface and playing chess moves, attempting a winning move triggers a client-side warning dialog ("_I'll shut down your PC if you play that._") and blocks the action.

![checkmate](/assets/images/screenshots/shutdown.png)

Inspecting the client-side JavaScript source code reveals the following check:


```javascript
if (probe.isCheckmate()) {
    showSystemNotice("I'll shut down your PC if you play that.");
    return false;
}
```

![viewsource](/assets/images/screenshots/viewsource.png)

### Root Cause Analysis

- **Client-Side Enforcer:** The application relies on client-side JavaScript running in the user's browser to evaluate whether a move leads to a checkmate and blocks the UI from sending the request if it does.

- **Lack of Server-Side Validation/Enforcement:** The backend application relies on the browser to perform validation instead of enforcing security and game rules on the server side.

## 3. Exploitation

Since client-side controls can be easily bypassed by crafting raw HTTP requests, we bypass the browser environment completely using `curl`.

We send a raw `POST` request directly to the move endpoint (`/api/move`) containing the winning move payload:

```bash
curl -X POST http://<TARGET_IP>/api/move \
  -H "Content-Type: application/json" \
  -d '{"from":"a1","to":"a8"}'
```

### Server Response

The backend server processes the move without evaluating the client-side restriction and returns the checkmate status along with the flag:

![curl](/assets/images/screenshots/curl.png)