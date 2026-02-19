---
title: "THM - Linux Modules"
date: 2026-02-19 10:51:00 +0600
categories: [writeup]
---
##### ***Task 1: Let's Introduce***  

This room is entirely based on, you can say revision, or may help you familiarize more with terminal. 

Note: This room is purely for familiarizing more with command line (so no first bloods; Points Only) hence no need to rush, take your time in doing this room. The hints with the tasks may contain direct answers, so peek at your own risk.

Just a short intro on what's coming ahead:

- du
- grep, egrep, fgrep
- tr
- awk
- sed
- xargs
- curl
- wget
- xxd
- and some more...

I created this list so that I could read their documentation 1 by 1, and this room is to save you from reading all those long man pages where (while reading) you might not know the exact meanings of the flag used, as you might just started linux, or may be didn't use it till that extent to encounter that particular topic. Hope you get the idea... 

﻿Scope of this room

﻿This room is based on understanding these tools so that they can reduce our effort while working with the command line. Also, this skill that you develop will help you manage your terminal sessions efficiently while working on a pentest or any project.

Just make sure that you're using a linux VM, so that you can get a hands on if you want to. Or simply start the attackbox(free users can deploy the attackbox for an hour, which I think is pretty much enough time to complete this room). I highly recommend to complete the "Linux Fundamentals" rooms before proceeding further with these topics. 

Happy Learning ;)

###### ***Task 2: du***  
About the Command

`du` is a command in linux (short for disk usage) which helps you identify what files/directories are consuming how much space. If you run a simple du command in terminal...

![Terminal output after running the du command, showing size and path><br></p><p style=](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/c378db9fe2baa7d2a42b59d2b87b58b9.png)

The folders in their respective folders are listed here with the size they occupy on the disk. The size here is shown in KB. Note: The files inside a folder are not shown, only the folders are listed by running du /<directory> command.

  

Important flags

|   |   |
|---|---|
|Flag|Description|
|-a|Will list files as well with the folder.|
|-h|Will list the file sizes in human readable format(B,MB,KB,GB)|
|-c|Using this flag will print the total size at the end. Jic you want to find the size of directory you were enumerating|
|-d <number>|Flag to specify the depth-ness of a directory you want to view the results for (eg. -d 2)|
|--time|To get the results with time stamp of last modified.|

  

Examples

`du -a /home/` will list every file in the /home/ directory with their sizes in KB.

If there's a lot of output you can surely use grep...

`du -a /home/ | grep user` will list any file/directory whose name is containing the string "_user_" in it.

  

Final Words

du command can alternate `ls` with the following flags:

`du --time -d 1 .`

It won't specify you the user ownership though, so you can use `stat` command on the file you want to know who is the owner of that particular file 

Syntax: `stat`

###### ***Task 3: Grep, Egrep, Fgrep***

Download Task Files

IMPORTANT: To proceed further with this task, make sure you have completed the "[Regular Expressions](https://tryhackme.com/room/catregex)" room by [concatenate](https://tryhackme.com/p/concatenate). This room will brief you about the regular expressions that can come handy while working with egrep.

There are a lot of rooms that you must have already done where you used grep a lot of times, so most of this task will sound familiar to you, or this is your first attempt on reading about grep, in any case, a 5 min read won't harm your busy day...

Introduction

It is a must known tool to everyone and that's why linux modules won't be complete without doing a mention of its amazing charisma. This tool, is what filters the good output we need from the residue. The official documentation says, The grep filter searches a file for a particular pattern of characters, and displays all lines that contain that pattern. The pattern that is searched in the file is referred to as the regular expression. The pattern is what I am gonna brief you about.

Syntax: `grep "PATTERN" file.txt` will search the file.txt for the specified "PATTERN" string, if the string is found in the line, the grep will return the whole line containing the "PATTERN" string. 

The Family Tree

egrep and fgrep are no different from grep(other than 2 flags that can be used with grep to function as both). In simple words, egrep matches the regular expressions in a string, and fgrep searches for a fixed string inside text. Now grep can do both their jobs by using -E and -F flag, respectively.

In other terms, `grep -E` functions same as `egrep` and `grep -F` functions same as `fgrep`.

Important Flags

|   |   |
|---|---|
|Flags|Description|
|-R|Does a recursive grep search for the files inside the folders(if found in the specified path for pattern search; else grep won't traverse diretory for searching the pattern you specify)|
|-h|If you're grepping recursively in a directory, this flag disables the prefixing of filenames in the results.|
|-c|This flag won't list you the pattern only list an integer value, that how many times the pattern was found in the file/folder.|
|-i|I prefer to use this flag most of the time, this is what specifies grep to search for the PATTERN while IGNORING the case|
|-l|will only list the filename instead of pattern found in it.|
|-n|It will list the lines with their line number in the file containing the pattern.|
|-v|This flag prints all the lines that are NOT containing the pattern|
|-E|This flag we already read above... will consider the PATTERN as a regular expression to find the matching strings.|
|-e|The official documentation says, it can be used to specify multiple patterns and if any string matches with the pattern(s) it will list it.|

You might be wondering the difference between -E and -e flag. I suggest to understand this as the following:

- -e flag can be used to specify multiple patterns, with multiple use of -e flag( grep -e PATTERN1 -e PATTERN2 -e PATTERN3 file.txt), whereas, -E can be used to specify one single pattern(You can't use -E multiple times within a single grep statement).

Other point that you can use to understand the difference is, -e works on the BREs(Basic Regular Expressions) and -E works on EREs (Extended Regular Expressions).

- BREs tend to match a single pattern in a file (Simplest examples can be direct words like "sun", "comic")
- EREs tend to match 2 or more patterns in a file (To select a no of words like (sun sunyon sandston) the pattern could be "^s.*n$"). 

Hope, you get an idea how this works. 

Here's a real short note, you might wanna read, on official GNU documentation: [Basic vs Extended (GNU Grep 3.5)](https://www.gnu.org/software/grep/manual/html_node/Basic-vs-Extended.html). If you didn't understand much from that paragraph, make sure, you've practiced your regex well.

1. Is there a difference between egrep and fgrep? (Yea/Nay)  
ANS: `Yea`  
2. Which flag do you use to list out all the lines NOT containing the 'PATTERN'?  
ANS: `-v`  
3. What user did you find in that file?   
ANS: `bobthebuilder`  
4. What is the password of that user?   
ANS: `LinuxIsGawd`  
5. Can you find the comment that user just left?   
ANS: fs0ciety  


###### ***Task 4: Did someone said STROPS?***  

I believe from here on, things are going to be a little different other than grepping the patterns. To keep things as simple as possible, we are going to start with a short note on what and where.

String Manipulations (STRing OPerationS)

Many people discard this topic in their tutorials/courses, which I believe is leaving behind the true power of linux and it's terminal interface. You ever see someone typing a very long command piping their outputs into some other commands? Well believe me when I say, you can select a single byte character from a GB long array of string bytes, if you could master that. 

If you're from a programming background you might have used indexing in arrays, slicing in python, or even grepping in terminal... All are a means of string manipulations. Especially in bash, we have a TON of tools to perform a same kind of operation, with different flags or string patterns specified, but obviously we will be choosing the one, providing us the shortest and easiest syntax possible. 

For strops, we have the following tools that I always keep in my arsenal and you should too:

- tr
- awk
- sed
- xargs

Other commands to be familiar with:

- sort
- uniq

I am gonna walk you through the commands I mentioned above in the following tasks.

###### ***Task 5: tr***  

Translate command(`tr`) can help you in number of ways, ranging from changing character cases in a string to replacing characters in a string. It's awesome at it's usage. Plus, it's the easiest command and a must know module for quick operations on strings.

Syntax: `tr [flags] [source]/[find]/[select] [destination]/[replace]/[change]`

This I guess is an appropriate representation of how you can use this tool. Moreover, we have the following flags offered by this command:

  
|   |   |
|---|---|
|Flags|Description|
|-d|To delete a given set of characters|
|-t|To concat source set with destination set(destination set comes first; t stands for truncate)|
|-s|To replace the source set with the destination set(s stands for squeeze)|
|-c|This is the REVERSE card in this game, for eg. If you specify -c with -d to delete a set of characters then it will delete the rest of the characters leaving the source set which we specified (c stands for complement; as in doing reverse of something)|

You must have noticed the word "set" while reading the flags. Well that's true... tr command works in sets of character.

Examples

- If you want to convert every alphabetic character to upper case.

![Terminal output of a simple cat command, as well as to uppercase converted output><span style=](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/4931e5b54dad039aad2737c99c3ffbb0.png)  

Or I am not sure, if you ever used emojis on discord, coz on desktop app you could use emojis using :keyword:. Similarly, tr allows us to select a set by these keywords. In that case the output would be same.

`cat file.txt | tr -s '[:lower:]' '[:upper:]'`

There are more of these (interpreted sequences) which you can view, by just `tr --help` command. I am not including them here, because they are just straight forward, and you've been using most of them, if you're familiar with (mostly) any programming language out there.

- If you want to view creds of a user which are in digits.

![Terminal](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/801400336ac11dfc91e8ff255bf5b9dd.png)  

You can see that I used regex here, and deleted all lower/upper case characters, including the (:) symbol and a space.

Note: This is a short note on how you can use this tool. Now try out these features on your own and get use to this tool. You can also refer to the following sites for more on the tool:

- [tr command in Unix/Linux with examples - GeeksforGeeks](https://www.geeksforgeeks.org/tr-command-in-unix-linux-with-examples/)
- [Tr Command in Linux with Examples | Linuxize](https://linuxize.com/post/linux-tr-command/)



****
1. Run tr --help command and tell how will you select any digit character in the string?   
ANS: `:digit:`   
2. What sequence is equivalent to [a-zA-Z] set?  
ANS: `:alpha:`  
3. What sequence is equivalent to selecting hexadecimal characters?  
ANS: `:xdigit:`  

###### ***Task 6: awk***  

Download Task Files

﻿The AWK Command

This is the most-est powerful tool in my arsenal, I can't think of any other command that can do something and not awk. It's like the all-in-one tool. If you ever played CSGO, you can totally relate AWK with AWP.

  

_"Awk is a scripting language used for manipulating data and generating reports.The awk command programming language requires no compiling, and allows the user to use variables, numeric functions, string functions, and logical operators."_

Sidenote: Just because it's the super tool, that's not necessary that there is no need to learn about other tools. The awk commands can be fairly longer to solve an operation than that of sed or xargs. A GNU project of awk (namely, gawk) which is also the one installed on every linux distro, is compatible with both awk and nawk( New-awk; also project by AT&T).

Syntax: `awk [flags] [select pattern/find(sort)/commands] [input file]`

Note: awk does support getting output via piping.

- If the commands you wrote are in a script you can execute the script commands by using the `-f` flag and specifying the name of the script file. (`awk -f script.awk input.txt`)

Using AWK

- To simply print a file with awk.

![Outputting the same file, one time with cat and one time with awk](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/3ca435289ab1db18e0d21b2ab9b36c56.png)  

You can see it simply just printed out data from file.txt.

- To search for a pattern inside a file you enclose the pattern in forward slashes `/pattern/` . For instance, if I want to know who all plays CTF competitions the command should be like: `awk '/ctf/' file.txt`  
    

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/d35231b4a0a5a378ff6fca85026cd7dd.png)  

Built-In variables in AWK  

Let's talk a little bit about some of the in-built variables. Built-in variables include field variables ($1, $2, $3 .. $n). These field variables are used to specify a piece of data (data separated by a delimeter defaulting to space). If I run `awk '{print $1 $3}' file.txt` it will list me the words that are at 1st and 3rd fields.

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/449e7ed96e5963d1e86b5d1768e353ad.png)  

You can see, it joined the words together because we didn't specify the output delimeter. We will come to that later in this task. Right now, let's just use a ","(comma) to bring the space.

Note: You may notice the use of {} around the print statement, that's where we used a function. To use commands in awk scripts, you need to mention them inside a function.

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/3ef149bbfacf96c502357ee9fba3b42d.png)  

Great, this seems a little nice.

Note: The $0 variable points to the whole line.  _Also, make sure to use single quotes('') to specify patterns, awk treats double quotes("") as a raw string. To use double quotes make sure that you escape the ($) sign(s) with a backslash (\) each, to make it work properly._

More on variables  

**NR:** (Number Record) is the variable that keeps count of the rows after each line's execution... You can use NR command to number the lines (`awk '{print NR,$0}' file.txt`). Note that awk considers rows as records.

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/d688834ef3ced5e4372854c7080ce82e.png)

**FS:** (Field Separator) is the variable to set in case you want to define the field for input stream. The field separation (defaut to space) that we talked above and can be altered to whatever you want while specifying the pattern. FS can be defined to another character(s)(yea, can be plural) at the BEGIN{command}.

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/b2c02cf22b0b2a4e17a8cc7ecf5246fc.png)  

If you don't know the BEGIN yet, take it as a pattern that we specify and following is the action on that pattern. Similarly, there is END command, this is also a pattern that we specify, following the action to perform on that pattern, and simply, we use them to define _actions_ like Field Separator, Record Separator etc. that are to be performed at the start and at the end of the script, respectively.

`awk "BEGIN {FS='o'} {print $1,$3} END{print 'Total Rows=',NR}"`

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/95f71444689a3df7ea54d51cd5d8a5a4.png)  

The output is weird because I separated the fields using a letter that was making sense with the words in text. In short, this is actually how a complete script is written in awk.

**RS**: (Record Separator): By default it separate rows with '\n', you can specify something else too.

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/172bb025bc33e04b42845d0ebddb1ebb.png)  

Notice that their has been a new line created wherever 'o' was used. It also interpreted '\n' used in the text file, so there are new lines after end of every number too.

**OFS****:** (Output Field Separator) You must have gathered some idea by the full form, it is to specify a delimeter while outputing... 

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/69f626d9996db8c25f09e0882d8f2fba.png)  

I used OFS in both the commands, you can see that only in 2nd one the delimiter was used. Note that the output field separator will separate fields using (:) only when the fields are defined with the print statement. With $0 I didn't had anything else, if it were to be $0,$0 then the lines would be joining their reflection(non-laterally) with a colon(:). 

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/cdc4c110720a6a1cd374f6562519fc07.png)  

**ORS:** (Output Record Separator) I don't think I really need to specify it's usage...

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/e2e579b42b0b145eeb4ae4d2792bbc1a.png)  

My delimiter was a double new-line character.

This is not it... There is a lot more on AWK, you can do operations, find string length, use conditions to sort, regex within awk and other fun stuff. But I guess the task is already went a lot longer. Let's quickly move on to some important flags that can come in handy while doing strops.  

JIC if you wanna read more on the tool, here are some great resources regarding awk scripting.  

- [AWK - Workflow - Tutorialspoint](https://www.tutorialspoint.com/awk/awk_workflow.htm) (For learning awk scripting in brief and quick)
- [The printf statement in awk](http://osr5doc.xinuos.com/en/OSUserG/_The_printf_statement.html) (If you want to do more with formatting strings; you can use printf function also)  
    
- [AWK command in Unix/Linux with examples - GeeksforGeeks](https://www.geeksforgeeks.org/awk-command-unixlinux-examples/)
- And if you really want to dive deep on this tool, do check out man pages on gawk 

Important Flags

|   |   |
|---|---|
|Flags|Description|
|-F|With this flag you can specify FIELD SEPARATOR (FS), and thus don't need to use the BEGIN rule|
|-v|Can be used to specify variables(like we did in BEGIN{OFS=":"}|
|-D|You can debug your .awk scripts specifying this flag(`awk -D script.awk`)|
|-o|To specify the output file (if no name is given after the flag, the output is defaulted to awkprof.out)|

There are other flags as well, but they are of not much use. Especially if you're learning this as a beginner

Just relax if you don't get much of this task, learning a scripting language inside a single task is not an easy job. Just make sure you understood the above told syntax well and followed the resources, rest is all practice :-).

Ending this task with a fun fact, AWK is abbreviated after it's creators (Aho, Weinberger, and Kernighan).

1. Download the above given file `awk.txt`, and use the `awk` command to print the following output: 

_ippsec:34024   
john:50024   
thecybermentor:25923   
liveoverflow:45345   
nahamsec:12365   
stok:1234_    
ANS: `awk 'BEGIN{OFS=":"} {print $1, $4}' awk.txt`   
2. How will you make the output as following (there can be multiple; answer it using the above specified variables in BEGIN pattern):  
_ippsec, john, thecybermentor, liveoverflow, nahamsec, stok,_   
ANS: `awk 'BEGIN{ORS=", "} {print $1}' awk.txt`   