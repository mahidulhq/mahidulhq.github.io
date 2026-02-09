---
title: "Quick Subnetting NOTE"
date: 2026-02-09 19:00:00 +0600
categories: [writing]
---

Given:

> 192.168.1.0/24  
> Need 30 usable hosts per subnet.

---

# Step 1 — One Rule

Memorize this host table:

- 2 hosts → /30
- 6 hosts → /29
- 14 hosts → /28
- 30 hosts → /27
- 62 hosts → /26
- 126 hosts → /25

You don’t calculate this every time. You **know it**.

Since they want **30 usable hosts**, you immediately know:

> 30 usable → /27

Done. No math needed.

---

# Step 2 — How Many Subnets?

You started with /24.  
Now you’re using /27.

Difference:

27 − 24 = 3 bits borrowed

2³ = 8 subnets

Again — mental math.

---

# Step 3 — Block Size Trick (Fastest Way)

To find subnet increments, do this:

Look at the last octet of the mask.

For /27, mask is 255.255.255.224

Block size =  
256 − 224 = 32

So subnets increment by 32.

That’s it.

---

# Step 4 — Write Subnets in 10 Seconds

Just count by 32:

0  
32  
64  
96  
128  
160  
192  
224

You already know each subnet spans 32 addresses.

So:

Subnet = start value  
Broadcast = start + 31  
Next subnet = start + 32

---

Example:

192.168.1.0  
Broadcast = 0 + 31 = 31  
Usable = 1–30

Next:

192.168.1.32  
Broadcast = 32 + 31 = 63  
Usable = 33–62

And repeat.

No formulas. Just counting.

---

# Why This Works

Because every subnet size is a power of 2.

32 addresses per subnet  
→ 30 usable  
→ 1 network  
→ 1 broadcast

---

Practice Question:

192.168.10.0/24  
Need 62 usable hosts

Answer these immediately:

1. What prefix?
2. Block size?
3. How many subnets?