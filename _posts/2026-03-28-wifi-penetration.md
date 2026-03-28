---
title: "WiFi Penetration Testing (minimal draft)"
date: 2026-03-14 00:20:00 +0600
categories: [writing]
---

### 1. Introduction

WiFi penetration testing is a controlled security assessment performed to identify vulnerabilities in wireless networks. The primary goal is to evaluate how easily an attacker could gain unauthorized access and to recommend mitigation strategies.

Wireless networks, especially those using WPA/WPA2 encryption, rely heavily on password strength and proper configuration. Weak passwords or misconfigurations can expose networks to attacks such as handshake capture and dictionary-based cracking.

It is critical to emphasize that WiFi penetration testing must only be conducted with **explicit authorization** from the network owner. Unauthorized access or testing is illegal and violates cybersecurity ethics and regulations.

### 2. Lab Setup

The testing environment consisted of:

- A **Virtual Machine (VM)** running Kali Linux
- An **external WiFi adapter** supporting:
    
    - Monitor mode
    - Packet injection

The external adapter is essential because most internal WiFi cards do not support advanced attack capabilities required for penetration testing.

### 3. Reconnaissance & Interface Identification

The first step involved identifying available network interfaces using:

```bash
iwconfig
```

This command lists wireless-related interfaces such as:

- **lo (Loopback Interface):** Internal system communication
- **eth0:** Wired network interface (used for internet connectivity)
- **wlan0:** Wireless interface used for WiFi operations

Understanding these interfaces is crucial. For wireless attacks, **wlan0** is the primary interface, while **eth0** should remain untouched to maintain internet access if needed.

### 4. Preparing the Environment

Before enabling monitor mode, it is necessary to terminate processes that may interfere with packet capture:

```bash
sudo airmon-ng check kill
```

This step stops services like NetworkManager or wpa_supplicant that can disrupt monitor mode functionality. Skipping this step often leads to unreliable results or failure to capture packets.

### 5. Enabling Monitor Mode

Monitor mode allows the wireless adapter to capture all packets in the air rather than only those addressed to it.

```bash
sudo airmon-ng start wlan0
```

After execution, a new interface (typically **wlan0mon**) is created. This interface is specifically used for monitoring and injection tasks.

### 6. Network Discovery

To identify nearby wireless networks, the following command was used:

```bash
sudo airodump-ng wlan0mon
```

This displays a list of networks along with key information:

- **BSSID:** MAC address of the access point
- **Channel (CH):** Frequency channel used
- **ESSID:** Network name
- **Encryption type:** WPA/WPA2

The target network was selected based on these parameters, specifically noting its **BSSID** and **channel**.

### 7. Capturing Handshake

To capture authentication data (handshake), targeted packet capture was initiated:

```bash
sudo airodump-ng --bssid [BSSID] -c [Channel] -w capture-file wlan0mon
```

A **WPA/WPA2 handshake** occurs when a client connects to a WiFi network. This handshake contains encrypted information that can later be used in offline password cracking attempts.

At this stage, the system waits for a client device to connect or reconnect to the network.

### 8. Deauthentication Attack

To speed up the process, a deauthentication attack was launched:

```bash
sudo aireplay-ng --deauth 10 -a [BSSID] wlan0mon
```

This forces connected clients to disconnect and reconnect, thereby triggering the handshake.

This technique is effective but must be used responsibly, as it temporarily disrupts network connectivity for users.

### 9. Verifying Handshake Capture

Handshake capture is confirmed directly within the airodump-ng interface.

A message such as **“WPA Handshake: [BSSID]”** appears in the top-right corner of the terminal. Without this confirmation, password cracking will fail.

### 10. Packet Analysis

Captured packets were analyzed using:

```bash
wireshark capture-file.cap &
```

Wireshark provides a graphical interface to inspect network packets in detail. While not required for cracking, it helps in understanding traffic patterns, authentication exchanges, and potential anomalies.

### 11. Password Cracking

The captured handshake was subjected to a dictionary attack using:

```bash
sudo aircrack-ng capture-file.cap -w rockyou.txt
```

This method compares hashed handshake data against a wordlist. If the correct password exists in the wordlist, it will be recovered.

**Result:**  
The password was successfully cracked and identified as:  
**password123**

This demonstrates that the network relied on a weak, dictionary-based password.

### 12. Results

- Successfully captured WPA2 handshake
- Performed dictionary-based attack
- Recovered WiFi password
- Identified weak password policy as the primary vulnerability

The attack required no advanced exploitation—only poor password strength.

### 13. Security Recommendations

1. **Adopt WPA3 Encryption**  
    WPA3 provides stronger encryption and improved resistance to brute-force attacks.
2. **Use Strong Passwords**  
    Passwords should include:
    
    - Uppercase and lowercase letters
    - Numbers
    - Special characters
    - Minimum length of 12–16 characters
3. **Avoid Common Wordlists**  
    Do not use predictable or dictionary-based passwords.
4. **Disable WPS (WiFi Protected Setup)**  
    WPS can introduce additional attack vectors.
5. **Monitor Network Activity**  
    Use intrusion detection systems to identify unusual disconnections or repeated authentication attempts.

### 14. Ethical & Legal Disclaimer

This assessment was conducted in a controlled environment with proper authorization.

WiFi penetration testing must **only** be performed on networks where explicit permission has been granted. Unauthorized testing is illegal and punishable under cybersecurity laws.

### 15. Conclusion

This penetration test demonstrated how a WPA2-protected WiFi network can be compromised through handshake capture and dictionary attacks when weak passwords are used.

Key takeaways:

- Security depends heavily on password strength
- Tools like Aircrack-ng are powerful but rely on human misconfiguration
- Even basic attacks can succeed if defensive measures are weak

**Limitations:**

- Success depends on wordlist quality
- Strong passwords remain resistant to dictionary attacks
- Advanced techniques (e.g., brute force with GPUs) were not explored

Overall, the test reinforces a fundamental principle:  
**Weak passwords undermine even strong encryption standards.**