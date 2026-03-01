---
title: "THM - Neighbour"
date: 2026-03-02 00:27:00 +0600
categories: [writeup]
---


### **Task 1: Neighbour**

Start Machine

Check out our new cloud service, Authentication Anywhere -- log in from anywhere you would like! Users can enter their username and password, for a totally secure login process! You definitely wouldn't be able to find any secrets that other people have in their profile, right?

**Access this challenge** by deploying both the vulnerable machine by pressing the green "Start Machine" button located within this task, and the TryHackMe AttackBox by pressing the  "Start AttackBox" button located at the top-right of the page.

Navigate to the following URL using the AttackBox: [http://10.48.164.74](http://10.48.164.74/)[](http://10.48.164.74/)

  

Check out similar content on TryHackMe:

- [IDOR](https://tryhackme.com/room/idor)


Find the flag on your neighbor's logged in page!  
**Process:** 
First lets go to the link the room provide, 

![image](/assets/images/screenshots/1051.jpg)  

lets attempt few username and password like admin:admin, test:test etc.
![image](/assets/images/screenshots/1052.jpg)   

Now nothing works here lets try `ctrl + u` as the page says to use guest account,  

![image](/assets/images/screenshots/1053.jpg)  

if we look properly we can find guest login credentials which is `guest:guest`. let's try this out:  

![image](/assets/images/screenshots/1054.jpg)  

we logged in. now if you notice the link it says `user=guest`, if we change the guest to admin what happens?  

![image](/assets/images/screenshots/1055.jpg)  

you got the flag.  