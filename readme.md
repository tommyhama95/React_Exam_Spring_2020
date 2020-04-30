#Pokémon Collection

##PGR6301 Webdevelopment and API
##### Spring 2020 - University of Kristiania, Oslo
##### 48hr individual home exam (28.04-30.04)

##About Exam
In this years exam the assignment was to create a SPA of a Cacha game. Theme was opened
to whatever wanted, and for that reason I chose Pokémon.

The goal of the exam was to use React for making a Singel Page Application which could serve static
files with only a single NodeJS instance serving both the frontend and backend of the application. 
Yarn was used in this case together with REST API and Websocket for the backend, and Enzyme and Jest for
testing of frontend and backend implementation.
<br>

Other languages, such as TypeScript, CoffeScipt, etc. Was prohibited on this exam.
<br>
 
##What is Pokémon Collection?
Pokémon Collection is a webpage based Lootbox system where users of the system is required
to make an account in order to collect Pokémon. As of now the total possible to collect only holds 20 Pokémon.
Upon opening the website you'll be greated to Home page where there are some small instructions of how the system works.
Each newly created user is given 3 Lootboxes which each contains 3 random Pokémon. Upon opening all the recieved Lootboxes a user can ask for more.
As of in this version of the implementation there is nothing hindering the user from <b>not</b> aquiring more Lootboxes. 
For example in game currency. (48hr proved to be a bit more challenging than expected)

So since there isn't anything stopping the user from aquiring more it could be fun to see how long it
would take to aquire 20 of each Pokémon.


##Implementations and technologies
Since this is a first time experience with React, Enzyme and Jest, most of the implementations were hard to grasp at first.
It hasn't been until the closing end of the lecture and exam time that I have gotten the grasp of
how the system works and what some parts of the codes does.

For storing most of the data in the system I have chosen to do maps and categories it into three parts; 
<b>Users, Lootboxes </b> and <b>StorageBox</b>.

<b>Users:</b> Holds an Id that is the username of the user which is the key for the value that is the user information; username, password, lootboxId, storageId.

<b>Lootboxes:</b> Id here is the one given to the user for reference back to the box that contains the array of lootbox id's. Whenever the user wants to call for a new Lootbox
 they will either call one they have available in their Lootbox, or create a new one.
 
<b>StorageBox:</b> This is taken from the Pokémon games. A storagebox is for storing Pokémon and this
is where I have chosen to store the obtained Pokémon the user har aquired through the lootboxes.  
(A storagebox in the games can only store captured / traded Pokémo, hence the name).

 



