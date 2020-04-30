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
(A storagebox in the games can only store captured / traded Pokémon, hence the name).

The description of one Pokémon is in itself a file just for saving and keeping it simple either delete or add a new one.
A Pokémon is shown with it's name, what type or types it is, if it has two. And a default value that is used for when rendering the table of what the user has collected.
 
Databases like these maps can be found under src/server/db/ 
 

For each of these there have been created an API call handling methods for simulating a call to a REST API. Depending on what is called the system will either update or post certain data.
API handling can be found under src/server/routes/


##Requirements implemented, tried to and not done
In this part I have (tried my best) to implemented R1, R2, R3 and R4. R5 I took an early approach of implementing 
password requirements with the help of Regex.

The one thing however that I was a bit in a confusion with was R2 that states; <b>"Create a RESTful API handling at least one
GET, one POST, one PUT and one DELETE (besides the ones for authentication/authorization of users), usin JSON as data transfer format. Note:
you MUST have those endpoints even if they are not used by the frontend".</b>

The part I was confused about was that IF I were supposed to show the full handling of such a a call or not. I chose to add these to the end of mye API routes, but not with how the code would handled them all the way through. I might have misunderstood this part. 
In my case of the implementation the PUT and DELETE isn't something I'm using in the application since I'm using POST for handling data transfer for rendering on page. And as 
of DELETE I don't have any specific parts I feel there was a need for it. 

If I were able to have more time to make it so a specifig user (admin), could add or remove a pokemon from the obtainable list, then DELETE would have been used for that purpose. 

So at the end of each of the API files (auth-api, loot-api and pokestorage-api) you'll find these blank calls to be used if needed. That is at least of I understood and waged my decision on.

Example passwords if needed: Testtest12




Link to stackoverflow of Regex: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
 

<hr>
As of in the Topic requirements I have again (tried my best) to implement T1, T2, T3 and T4. I have not done T5 or T6, since lack of time was a huge factor when getting stuck on code for multiple hours.
As of in other users being able to see and check other users lootboxes or collection there shouldn't be any way for this to happen in my knowledge. If there is an exploit or something else that allowed this to happen, a feedback is much appreciated for future improvements.

 ## Bugs or other known crashes
 As of in my knowledge there isn't anything that has triggered a crash to occure. 
 
 The one bug that is known, but which is intentional is the "GET 401" message showing in Console window on load up. This is due to trying to look for
 if the user is signed in previously and therefore keep the session alive. If there is no user logged (such as in first load up), this message will show up.
 
 Other than that there isn't anymore to my knowledge or what I have been able to create during development. If there is any, please tell me how and what caused it to happen.
 
 Maybe a visual bug if the user decides to use a huge long name since the name isn't made to be scaleable based on length of username.
 
 
## Test cases

As of the time of delivery the overall test coverage is 57,97%. Just shy of reaching 60%...


As of the reason is that during testing I have had more issues with function that are supposed to be called and used from
parent components, being read as "not a function". Multiple hours could not resolve this issue or trying to check if there was any code from lecture
that could help me fix it. This was mostly affected on the components for Collection (Page that renders the lootboxes and what pokémon the user has obtained through them).
This problem made it so that simulating a fetching of who the user is could not be done. There might be something that I have missed on this, so again, feedbacks are amazing if it's do-able.


##How to start this project in your localhost:8080

First download the repository. 

When downloaded start in a command window of either a text editor (Visual Studio Code, WebStorm), and write these commands: 
1. yarn init -y
2. yarn install
3. yarn build
4. yarn dev 

yarn start, can also be used instead of yarn dev



 
 
 
 
 