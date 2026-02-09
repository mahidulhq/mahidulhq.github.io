---
title: "Subnetting Practice Problem"
date: 2025-02-09 19:08:00 +0600
categories: [writing]
---
Given the network 192.168.1.0/24 (subnet mask 255.255.255.0, supporting 254 hosts), subnet it to create segments where each subnet supports exactly 30 usable hosts. Provide the new subnet mask, number of subnets, and details for all resulting subnets (network address, host range, broadcast)
## Determine Required Host Bits

Usable hosts per subnet formula:

$2^h - 2 \ge 30$ 

Try values:

- $(2^4 - 2 = 14)$ → Not enough
- $(2^5 - 2 = 30)$ → Perfect

So we need **5 host bits**.

Original network was /24 → meaning 8 host bits originally.

If 5 bits are for hosts, then:
 
$32 - 5 = 27$  

So the new prefix is:

> **/27**

---

## New Subnet Mask

/27 in dotted decimal:

```
255.255.255.224
```

Why?

Last octet in binary:

```
11100000 = 224
```

---

## Number of Subnets Created

Originally: /24  
Now: /27

Borrowed bits:

$27 - 24 = 3 \text{ bits}$  

Number of subnets:

$2^3 = 8 \text{ subnets}$ 

---

## Block Size

Block size = 256 − 224 = **32**

So subnets increase by **32** in the last octet.

---

# Final Subnet Breakdown

Each subnet has:

- 32 total addresses
- 30 usable hosts
- 1 network
- 1 broadcast

---

### Subnet 1

Network: **192.168.1.0/27**  
Usable: **192.168.1.1 – 192.168.1.30**  
Broadcast: **192.168.1.31**

---

### Subnet 2

Network: **192.168.1.32/27**  
Usable: **192.168.1.33 – 192.168.1.62**  
Broadcast: **192.168.1.63**

---

### Subnet 3

Network: **192.168.1.64/27**  
Usable: **192.168.1.65 – 192.168.1.94**  
Broadcast: **192.168.1.95**

---

### Subnet 4

Network: **192.168.1.96/27**  
Usable: **192.168.1.97 – 192.168.1.126**  
Broadcast: **192.168.1.127**

---

### Subnet 5

Network: **192.168.1.128/27**  
Usable: **192.168.1.129 – 192.168.1.158**  
Broadcast: **192.168.1.159**

---

### Subnet 6

Network: **192.168.1.160/27**  
Usable: **192.168.1.161 – 192.168.1.190**  
Broadcast: **192.168.1.191**

---

### Subnet 7

Network: **192.168.1.192/27**  
Usable: **192.168.1.193 – 192.168.1.222**  
Broadcast: **192.168.1.223**

---

### Subnet 8

Network: **192.168.1.224/27**  
Usable: **192.168.1.225 – 192.168.1.254**  
Broadcast: **192.168.1.255**

---

# Final Answers

- **New Subnet Mask:** 255.255.255.224
- **CIDR Notation:** /27
- **Number of Subnets:** 8
- **Usable Hosts per Subnet:** 30
- **Total Usable Hosts Across All Subnets:** 240