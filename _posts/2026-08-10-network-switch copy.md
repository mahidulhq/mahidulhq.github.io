---
title: "Passive Reconnaissance"
date: 2026-09-04 00:02:42 +0600
categories: [writing]
---

**Passive reconnaissance** is the process of gathering intelligence about a target from publicly available sources without directly interacting with their systems. Think of it as observing a building from a distance using binoculars, rather than walking up and testing the door handles (which is **active reconnaissance**).

Because you do not send any direct traffic to the target, passive reconnaissance is virtually undetectable, carries low legal risk, and remains a crucial first step in security assessments, bug bounties, and threat hunting.

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*ZRNQasTnljr-BoXBEKEhFw.jpeg)

cvr

## Passive vs. Active Reconnaissance

- **Passive Reconnaissance:** Relies entirely on public data. Examples include checking public DNS records, searching certificate logs, reading public job postings to guess a company’s technology stack, or using search engines designed for internet-connected devices.
- **Active Reconnaissance:** Involves direct engagement, such as sending pings to see if a computer is online, scanning for open ports, or socially engineering employees. This triggers security alerts and requires strict authorization.

## Domain Registration Intelligence: WHOIS and RDAP

Every website must be registered, and these registration records provide valuable background information on a target.

## The Shift from WHOIS to RDAP

Historically, the **WHOIS** protocol provided domain registration details. However, privacy laws like GDPR have largely hidden personal registrant data.

![](https://miro.medium.com/v2/resize:fit:700/1*tzMLx6x6Nvb32ZO0GvE21A.png)

> As of January 2025, ICANN officially retired the traditional WHOIS protocol for standard domain names in favor of **RDAP (Registration Data Access Protocol)**. RDAP is more secure (uses HTTPS), returns easily readable, structured data (JSON), and offers better privacy controls.

While legacy WHOIS lookups still function through failovers, RDAP is now the modern standard.

**What to look for in these records:**

- **Dates:** Registration and expiration dates help estimate a company’s age or pinpoint when they might be vulnerable to renewal-based phishing attacks.
- **Name Servers:** Identifies which servers control the domain’s web traffic.
- **Registrar:** The company leasing the domain (e.g., Namecheap, GoDaddy).

**Helpful Links:**

- Modern RDAP Lookup: [lookup.icann.org](https://lookup.icann.org/)
- Legacy WHOIS: [whois.icann.org](https://whois.icann.org/)
- Historical Data: [whoxy.com](https://www.whoxy.com/) (useful for seeing past owners or previous infrastructure)

**Command Line Snippets:**

_Legacy WHOIS lookup:_
```
whois example.com
```
_Modern RDAP lookup (using_ `_curl_` _and_ `_jq_` _for readability):_
```
curl -s https://rdap.verisign.com/com/v1/domain/example.com | jq .
```
## Querying Public DNS Records

Domain Name System (DNS) acts like the internet’s phonebook, translating human-readable website names into IP addresses. Querying public DNS servers is fully passive.

**Common DNS Record Types:**

- **A:** IPv4 address for the domain.
- **AAAA:** IPv6 address.
- **CNAME:** An alias that points one domain name to another.
- **MX:** Mail servers (shows who handles the organization’s email).
- **TXT:** Text records often used for domain verification and email security (SPF, DMARC).

## Tools: `dig` vs `nslookup`

While `nslookup` is older and commonly found on Windows systems, `**dig**` is the modern, preferred tool. `dig` provides cleaner output, shows how long records are cached (TTL), and is more reliable.

[](https://medium.com/write?source=promotion_paragraph---post_body_banner_better_place_blocks--d7fc1b6df347---------------------------------------)

Here is detailed information about using [Domain Information Groper](https://mahidulhq.github.io/dig.html).

**Command Line Snippets:**

_Check an IPv4 address (Legacy_ `_nslookup_`_):_
```
nslookup -type=A example.com
```
_Check Mail Servers (Modern_ `_dig_` _querying via Cloudflare's 1.1.1.1 public resolver for privacy):_
```
dig @1.1.1.1 example.com MX
```
_Check TXT records:_
```
dig example.com TXT
```
## Passive Subdomain Discovery

Standard DNS queries only find names you ask for directly. They won’t uncover hidden subdomains like `dev.company.com` or `blog.company.com`. Subdomains are high-value targets because they often host forgotten, outdated, or misconfigured services.

1. **DNSDumpster:**

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*DLnUdrDITOac244yMhSWKg.png)

[DNSDumpster](https://dnsdumpster.com/)

[DNSDumpster](https://dnsdumpster.com/) aggregates public DNS data from search engine caches and databases without sending any direct traffic to the target. It maps out subdomains, IPs, and mail servers visually.

**2. Certificate Transparency (CT) Logs:**

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*agRrLuQv-u5ymUwgSmWdMg.png)

[crt.sh](http://crt.sh/)

The most effective passive method today is checking CT logs. Every issued SSL/TLS certificate is publicly logged. By searching these logs, you can find almost every secure subdomain tied to an organization.

- **Tool:** [crt.sh](http://crt.sh/)
- **How to use:** Search for `%.example.com` (the `%` acts as a wildcard) to reveal all issued certificates and subdomains for that domain.

## Exploring Exposed Services with Shodan

[Shodan](https://www.shodan.io/) is a search engine for internet-connected devices (servers, webcams, routers, industrial systems). Unlike normal search engines that index website content, Shodan scans the internet to index the “banners” and responses of exposed ports and services.

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*KCzJWyURlgz82KhbgX3uTA.png)

[Shodan](https://www.shodan.io/)

Using Shodan allows you to see what a target has exposed to the internet without ever scanning it yourself. Censys is another excellent alternative for cross-referencing this data.

**What you can find:**

- Network block owners and hosting providers (e.g., AWS, Cloudflare).
- Approximate geographic locations of servers.
- Open ports, service versions, and associated known vulnerabilities.

**Shodan Search Filters:**

- `hostname:example.com` (Finds a specific hostname)
- `org:"Company Name"` (Filters by the organization that owns the IP)
- `port:443 country:US` (Filters by open ports and geographical location)
- `http.component:"wordpress"` (Identifies specific technology stacks)