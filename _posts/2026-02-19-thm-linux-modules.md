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
###### ***Task 7: sed***  

Download Task Files

Reminds me of the dialogue, "That's what she sed". But this has been on my mind since I started creating this room. Nvm, so sed. is THE. 2nd most powerful tool of all. I especially consider using sed most of the time, because that's what she sed... jk, it's because it offers good number of strops in short commands. Easy to use, once get a habit of it. 

The sed life

sed(Stream EDitor) is a tool that can perform a number of string operations. Listing a few, could be: FIND AND REPLACE, searching, insertion, deletion. I think sed of a stream-oriented vi editor... Ok so a few questions popped up, like how? and what is stream-oriented? Let's not dive deep into streams, just keep in mind that I said it in contrast with "orientation with input stream". You can't call vi stream oriented, because it doesn't work with neither of input or output stream. So for vi users, feel free to use your previous experience with vim to connect the dots.  

On the other hand, you can easily perform operations with sed command by either piping the input or redirecting(<) the input from a file. I prefer sublime over vim for note taking (No offence to vim fanboys/fangirls out there, I just use sublime to keep things like notes formatting in GUI :).  

Syntax: `sed [flags] [pattern/script] [input file]`

Important Flags

|   |   |
|---|---|
|Flags|Description|
|-e|To add a script/command that needs to be executed with the pattern/script(on searching for pattern)|
|-f|Specify the file containing string pattern|
|-E|Use extended regular expressions|
|-n|Suppress the automatic printing or pattern spacing|

The sed command

There are endless ways of using sed. I am gonna walk you through a very detailed general syntax of (mostly all) sed patterns, with some general examples. Rest is your thinking and creativity, on how YOU utilize this tool.

'[condition(s)(optional)] [command/mode(optional)]/[source/to-be-searched pattern(mandatory)]/[to-be-replaced pattern(depends on command/mode you use)]/[args/flags to operate on the pattern searched(optional)]'

Hope these colors could have helped you identify the parts. If you have any previous knowledge of sed, feel free to co-relate. Again, this is just the pattern inside sed command (excluding external flags). Also, note the single quotes at the start/end.

Hmm, but may be, it's still not clear. Alright let's take a simple example to relate this.

sed -e '1,3 s/john/JOHN/g' file.txt

Let's not care about what's meaning of 1,3 all that slashes, that s,g. And focus on the color codes. Hope the syntax is now making a little sense... Great. Moving forward to modes and args.

Modes/Commands  

|   |   |
|---|---|
|Commands|Description|
|s|(Most used)Substitute mode (find and replace mode)|
|y|Works same as substitution; the only difference is, it works on individual bytes in the string provided(this mode takes no arguments/conditions)|

**[Update] ﻿I used the word "mode" in the rest of the task just to avoid the confusion of using a command(s/y) within the command(sed). But just to be clear, official documentation list them as commands used in sed.**

Args

|   |   |
|---|---|
|Flags/Args|Description|
|/g|globally(any pattern change will be affected globally, i.e. throughout the text; generally works with s mode)|
|/i|To make the pattern search case-insensitive(can be combined with other flags)|
|/d|To delete the pattern found(Deletes the whole line; takes no parameter like conditions/modes/to-be-replaced string)|
|/p|prints the matching pattern(a duplicate will occur in output if not suppressed with -n flag.)|
|/1,/2,/3../n|To perform an operation on an nth occurrence in a line(works with s mode)|

Let's see these in action... Explaining the previously taken command, (sed -e '1,3 s/john/JOHN/g' file.txt)

- Starting with the sed keyword itself, initializes the sed command.
- With -e flag specifying that following is a script command.(you don't need to specify -e if it's a single command; as it will be automatically interpreted by sed as a positional argument)
- Then comes the pattern. Starting with the yellow portion is the condition (or range selection to be specific), specifying to take range of lines 1,3 (line index starts from 1) and execute the following code on that range of lines. Following a space comes the mode, specifying that we need to use a substitution mode(as we are substituting a value) by using s. Then we specify / as a delimiter to differentiate between the parts of code. After the first slash came the pattern we want to operate the substitution on(you may choose to use regex in this region too). Following the 2nd slash comes the string we want to replace the pattern with. Finally, after the last slash was an arg/flag, /g specifying to operate this operation globally, wherever the pattern was found.
- Finally was the filename we want to take input from and apply operation/code that we specified beside it.

Hope there is no confusion as per sed is concerned. Hence, the output for the above command would be like:

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/0619cdceb1052e842a1e2978bdb163c0.png)  

  

Let's view a few more examples to get the concept clear:

- Viewing a range of Lines

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/0e828482c6fa7936c760e23bca6de2f9.png)  

-n flag suppressed the output and we got the duplicates created by p arg.

- Viewing the entire file except a given range

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/03970ba8b717a40a44a108ad2cc241f8.png)  

- Viewing multiple ranges of lines inside a file

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/258302ef50825d6984227374da2d8e58.png)  

- To start searching from nth pattern occurrence in a line you can use combination of /g with /1,/2,/3.

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/e6db438becf3ba1788b28c5823261e3b.png)  

You can see when I specified /1 it gave a change in the text, with /2 it didn't. This is because there was only 1 occurrence of the string "youtube", and the 2nd occurrence couldn't be found. Also I didn't used 1g or 2g because there were no further occurrences of the pattern, so there is no need to use it. Still it would have worked the same, if used. Try it on your own. 

- If you have log files to view which have trailing white spaces, and it is hard to read them, then you can fix that using regex.

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/9a29bed30be1ec6f7985a8202623cde6.png)  

Let's take one last example on this sed command. 

- More on regex can be: Making every line to start with a bullet point and enclose the digits in square brackets... Ok, but how? Let's first view it, and then we'll take a look at the explanation.

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/19a7f3b3edece4a0fc61dba4f525cee3.png)  

 "What is this?! where's that :alpha: came from? I understand the \b is part of regex you used, following those, un-identifiable escape characters and some \1 and \2 referenced either wrong, as it's /1, /2 to identify the nth occurrence. I mean, it's so confusing".

I agree, it's so noisy, and hard to read. But believe 70% of it is nothing to do with `sed`, it's all regex, so take your time. Try to understand what the regex is doing. Rest the "to-be-replaced" part is just a way sed is assigning the groups to it's default variables we created within regex.

Explanation

sed 's/\(^\b[[:alpha:] ]*\)\([[:digit:]]*\)/\=\> \1\[\2\]/g' file.txt

Hope things are a little clear, by undertaking the knowledge of previous color coding. You can easily differentiate the mode, pattern, to-be-replaced string. _Later I removed the background from the part belonging to the keywords in sed. As there was some issue in changing the font color, it just won't persist._

- Starting with the regex part. Opening a group with escape character, ^ to put the cursor at the starting of the line, and then \b represents to search for beginning of a word, and then defines a set of characters to include, following a "*" to specify 'n' number of characters. Then closes the group by escaping the closing brackets. Creating another regex group, using escape sequence, we then initialized another set and specified * at the end of the set to take n characters of that set, at last group is closed using escape sequence. 
- At the replaced end, we are using escape sequences to make a bullet(it's just a good practice to use escape sequence with every symbolic character; even if the output is same), then we have escape characters for the square brackets enclosing a sed variable /2 (after /1 which is coming up).
- Now its turn for the sed's keyword part. We used [:alpha:] in the set defined by regex, which is nothing but another representation of using `a-zA-Z` in regex, which means to capture any alphabetic characters. sed offers such keywords(calling them "bracket expressions"), which we can use to make the input code look cleaner. Similarly we used the bracket expression for specifying digit as well which we specified using [:digit:].

Note: There's a space after the first bracket expression inside the regex set ([[:alpha:]{space}]). As you see, this space was to indicate the regex set _so that * could take multiple words until the digits start occurring in the text__(regex logic)_.

- Then there are some in-built variables as we saw in awp awk, that we used in the to-be-replace part of sed. \1 depicted the first group which selected everything until the first character occurred. The second group comprised of a set consisting decimal characters, which were enclosed with [\2] with the use of escseq.

Here, we finished learning about sed variables, the number of groups you create with regex, can be later indexed as variable \n in sed.

Well this is pretty much it, on the sed command. If you want to learn more, check-out the resources on the sed command.

Resources:

- [Sed Command in Linux/Unix with examples - GeeksforGeeks](https://www.geeksforgeeks.org/sed-command-in-linux-unix-with-examples/)
- [sed, a stream editor (gnu.org)](https://www.gnu.org/software/sed/manual/sed.html) (Official Documentation)
- [15 Useful 'sed' Command Tips and Tricks for Daily Linux System Administration Tasks (tecmint.com)](https://www.tecmint.com/linux-sed-command-tips-tricks/)

Again, if there is not much you could learn about this command don't feel bad, just go through the resources and try practicing by making your own texts and play with this command.


1. How would you substitute every 3rd occurrence of the word 'hack' to 'back' on every line inside the file file.txt?  
ANS: `sed 's/hack/back/3g' file.txt`  
2. How will you do the same operation only on 3rd and 4th line in file.txt?   
ANS: `sed '3,4 s/hack/back/3g' file.txt`  
3. Download the given file, and try formatting the trailing spaces in sed1.txt with a colon(:).   
ANS: `sed 's/  */:/g' sed1.txt`  
4. View the  sed2 file in the directory. Try putting all alphabetical values together, to get the answer for this question.   
ANS: `CONGRATULATIONS YOU MADE IT THROUGH THIS SMALL LITTLE CHALLENGE`  
5. What pattern did you use to reach that answer string?  
ANS: `'s/[[:digit:]]//g'`  
Alternatively, you can use tr to remove all the digits, and then pipe the output in sed to remove trailing whitespaces.

cat sed2.txt | tr '[:digit:]' ' ' | sed 's/  *//g'

[Update] Another good way suggested by a room do-er. You can simply use tr -d command to delete all the digits from the file.

cat sed2.txt | tr -d '[:digit:]'  

6. What did she sed?(In double quotes)   
ANS: `"That's What"`  

###### ****Task 8: xargs****  

Download Task Files

﻿xargs, a very simple command to use when it comes to make passed string a command's argument, technically, positional argument. The official documentation says, xargs is a command line tool used to build and execute command from the standard input. 

Important flags  

|   |   |
|---|---|
|Flags|Description|
|-0|Will terminate the arguments with null character (helps to handle spaces in the argument)|
|-a file|This option allows xargs to read item from a file|
|-d delimiter|To specify the delimiter to be used when differentiating arguments in stdin|
|-L int|Specifies max number non-blank inputs per command line|
|-s int|Consider this as a buffer size that you allocate while running xargs, it sets the max-chars for the command, which includes it's initial arguments and terminating nulls as well.(You won't be using this most of the times but it's good to know). Default size is around 128kB (if not specified).|
|-x|This flag will exit the command execution if the size specified is exceeded.(For security purposes.)|
|-E str|This is to specify the end-of-file string (You can use this in case you are reading arguments from a file)|
|-I str|(Capital i) Used to replace str occurrence in arguments with the one passed via stdin(More like creating a variable to use later)|
|-p|prompt the user before running any command as a token of confirmation.|
|-r|If the standard input is blank (i.e. no arguments passed) then it won't run the command.|
|-n int|This specifies the limit of max-args to be taken from command input at once. After the max-args limit is reached, it will pass the rest arguments into a new command line with the same flags issued to the previously ran command. (More like a looping)|
|-t|verbose; (Print the command before running it).Note: This won't ask for a prompt|

﻿xargs packs with a very large option of flags, although, a very simple tool to work with. You don't have to stress too much on xargs, it is just a small tool like sort, uniq (Coming soon). Go through the following examples and then I have a useful note, _on using flags as a positional arguments._

﻿Examples

- What if we want to run multiple command with xargs in one line.

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/c4e4a6b6486f7e362139afb87a2cae6c.png)  

You can see I defined a variable _argVar_ to use later in the 2 commands I ran with `bash -c`.

- You can use xargs with conjunction to find command to enhance the search results.

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/e32dea6d1d1bb15264a5d3c157ec3dde.png)  

Note: The find command prints results to standard output by default, so the `-print` option is normally not needed, but `-print0` separates the filenames with a \0 (NULL) byte so that names containing spaces or newlines can be interpreted correctly.

- You can use xargs command to grep a text from any file in any directory meeting a specific pattern/criteria.

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/489835f044ee5037c8962fe0421133cb.png)  

You can see that I used xargs to grep a pattern matching anything starting with r with any bunch of characters[:alnum:] and ending with 0. Which returned me this string. If you want to practice on your own, you can find flag.txt file inside the downloaded zip archive. Pick a string find a unique pattern for it and then grep it. Peace.

Note: If the xargs is having same flags, that can also be interpreted by the following module, in that case you need not worry, because the flags used after the command are the one's that are interpreted. Just keep that in mind and you're good to go.

A note on XARGS (and almost every command line module in linux/unix system)

Let's take an example from one of the rooms I solved on privilege escalating through tar running as super user. Room: [Linux PrivEsc | Task 10](https://tryhackme.com/room/linuxprivesc)

Gtfobins said, "tar -cf /dev/null /dev/null --checkpoint=1 --checkpoint-action=exec=/bin/sh"

Great, but the catch in the challenge was, sudo was not given to tar, SUID permissions were given to a file, which was not allowed to be edited by any other user(owner: root). So if that script has to run it will run with the root privileges. What we could do is make the files in that directory in flag format, that tar could interpret as it's flag. So when in our case, tar would start scanning the directory to get the overview of the files to compress and combine them, it will interpret those flags and will give us root shell.

Awesome technique. Isn't it? Well that's not the point. The point here is, I found a little difficulty in creating those files (via command line) with -- appended to them. I tried xargs but didn't work. I then found an article [here](https://www.hackingarticles.in/exploiting-wildcard-for-privilege-escalation/), which helped me and I solved the challenge. Then when I started with the 5th phase of hacking(Covering Tracks). I couldn't seem to delete those earlier created `--checkpoint` files with `rm`. I tried for an hour or so, but couldn't and left. Well, I didn't knew this, until I started reading documentations and man pages. Call it an instinct or just luck that I found a way to _escape command line flags as a positional argument_. Why all this theory, when I can simply get to this point? Well, I believe that it's just a better way of learning, when you can append your learnings with an event that had previously occurred. So later, I was able to remove the files using the following command.

`rm -- --checkpoint=1`

`rm -- --checkpoint-action=exec=sh`

Notice something different? I was able to escape the following flags using an empty flag notation. Infact. This padding technique works in ALMOST EVERY command line module available for linux, unix systems. Let's see this in action with xargs, and know that if this theory actually works.

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/dbca3dd790522bc5ad41d029eb1d0438.png)  

You can see the rm didn't interpreted the files inside directory as a flag when used -- padding. Also before we move forward, I want to show one more thing...

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/56c12a40e728ceec66d060b49d81b4f3.png)  

Wutt? I gave the padding it still showed me an error. Hmm... Did you found what was the issue? Well even if you specify that padding to escape the flags there are '/'s inside this string, which are making `touch` to interpret them as create the file _bash_, inside _bin_ directory that is inside, some _--checkpoint-action=exec=_ directory. You may try using \/bin\/bash to escape the slashes, but that won't work either, because files can't contain slashes in their name.

We can easily bypass this by just using bash or sh instead of specifying the whole path, but make sure that your path is set to normal. Moving forward...

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/9ed0f42497cf60ccaf17ffdcf31c7f11.png)  

Focus on the -n2 I used after xargs. 2 arguments at once, in first loop `touch -- --checkpoint=1`, then `touch -- --checkpoint-action=exec=sh`. Now let's try running tar.

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/096f4bc5dc58bb2a15089e56827a1e32.png)  

Ohh ok, I see where the problem occurred, those 2 flag files that we created were interpreted as flags and then tar had nothing to compress, that's not a problem, let's create a testfile...

![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5eff6381a8b8f6323ba744fe/room-content/63da13df61e7212d410ec4bdf7a99373.png)  

Bingo, we got a shell(not as root, because that was executed as my user. Could give us root, if ran as it).

Hope this last was a good example on xargs usage. Remember, xargs is a great command when it comes to handling command line arguments. It's not a very vast tool which you could dive in. Though it has max-ly covered all the areas in it's domain of passing and handling arguments to other modules/commands. Like a sidekick, this can help you ease your daily tasks. So keep a space for this tool in your arsenal.

Read the above.


1. You're working in a team and your team leader sent you a list of files that needs to be created ASAP within current directory so that he can fake the synopsis report (that needs to be submitted within a minute or 2) to the invigilator and change the permissions to read-only to only you(Numberic representation). You can find the files list in the "one" folder.  

Use the following flags in ASCII order:

- Verbose
- Take argument as "files"    
ANS: `cat file | xargs -I files -t sh -c "touch files; chmod 400 files"`  

Your friend trying to run multiple commands in one line, and wanting to create a short version of rockyou.txt, messed up by creating files instead of redirecting the output into "shortrockyou". Now he messed up his home directory by creating a ton of files. He deleted rockyou wordlist in that one liner and can't seem to download it and do all that long process again.

He now seeks help from you, to create the wordlist and remove those extra files in his directory. You being a pro in linux, show him how it's done in one liner way.

Use the following flags in ASCII order:

- Take argument as "word"
- Verbose
- Max number of arguments should be 1 in for each file

2. You can find the files for this task in two folder.   
ANS: `ls | xargs -I word -n 1 -t sh -c 'echo word >> shortrockyou; rm word'`  
3. Which flag to use to specify max number of arguments in one line.  
ANS: `-n`   
4. How will you escape command line flags to positional arguments?  
ANS: `--`  