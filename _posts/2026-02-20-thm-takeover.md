---
title: "THM - TakeOver"
date: 2026-02-20 01:03:00 +0600
categories: [writeup]
---

###### ***Task 1: Help Us***  
Hello there,  
  
I am the CEO and one of the co-founders of futurevera.thm. In Futurevera, we believe that the future is in space. We do a lot of space research and write blogs about it. We used to help students with space questions, but we are rebuilding our support.  

Recently blackhat hackers approached us saying they could takeover and are asking us for a big ransom. Please help us to find what they can takeover.  
  
Our website is located at [https://futurevera.thm](https://futurevera.thm/)

Hint: Don't forget to add the 10.48.130.209 in /etc/hosts for futurevera.thm ; )

***
Lets start-
Starting with basic nmap scan against the target:  

![image](/assets/images/screenshots/1020.jpg) 

> [!Breakdown]
> The command `nmap 10.48.130.209 -oN nmapResult.txt` performs a basic Nmap scan on the target IP address 10.48.130.209 and saves the results to a file named `nmapResult.txt`.
> 
> - `nmap 10.48.130.209`: Runs the default scan, checking the 1,000 most common TCP ports on host 10.48.130.209 (likely the futurevera.thm machine from context).
>     
> - `-oN nmapResult.txt`: Outputs results in "normal" human-readable format to that text file (same as screen output, plus scan command details at top). Screen still shows live results.
> 

In the statement of the room, we are told the company is rebuilding their `support`. They may have a subdomain named `support`. Let's add it to `/etc/hosts`, and see what we can find on this subdomain :

> [!Breakdown]
> 
> The `/etc/hosts` file is a plain text configuration file on Linux/Unix systems used for local hostname resolution.
> It maps IP addresses to hostnames (or domain names), allowing your machine to resolve names directly without querying a DNS server. This is checked before DNS lookups, making it ideal for testing local servers, subdomains, or bypassing DNS in pentesting scenarios like TryHackMe rooms


![image](/assets/images/screenshots/1021.jpg)  

add `10.48.130.209   futurevera.thm  support.futurevera.thm`  

![image](/assets/images/screenshots/1022.jpg)  

save and go the the browser  and browse `support.futurevera.thm`   

![image](/assets/images/screenshots/1023.jpg)  

on the DNS Name there is an alternative subdomain and view certificate. Lets open the link:   

![image](/assets/images/screenshots/1024.jpg) 

we found the flag.  

For more knowledge on `subdomain takeover`, some referance links (collected) :
- [book.hacktricks.xyz](https://book.hacktricks.xyz/pentesting-web/domain-subdomain-takeover)
- [hackerone.com](https://www.hackerone.com/application-security/guide-subdomain-takeovers)
- [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/Security/Subdomain_takeovers)
