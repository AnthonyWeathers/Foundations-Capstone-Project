# User fortune collection app
Allows a user login, then set how many fortunes they wish to obtain at a time, from 1 - 3. See what fortunes they get, then be able to view all of their obtained fortunes in the collection page. The fortunes shown in the collection page will be linked to their account, so that each newly registered user can collect the fortunes themselves, and be able to continue from where they left off without it being affected by another user.

## Technologies used:
* Javascript (full-stack)
* HTML, CSS
* postgresSQL

## Features:
* Login:
![Login page](/static/loginPage.png)
    * Requires a username and password that has been registered into the database
    * Changes if the login was successful and provide a link for user to click to move to the main page
![Login Success page](/static/LoginSuccess.png)
    * Has a link to register if making a new user/account (before successful login)
* Register:
![Register page](/static/RegistrationPage.png)
    * Requires a username, password, and re-entered password before clicking register button
    * Needs a unique username that has not already been used, otherwise gives alert of “user already exists”
    * Gives alert of a successful registration and display a link to return to login page
![Register Success](/static/RegistrationSuccess.png)
* Main/fortune:
![Main page](/static/mainPage.png)
    * Allows user to enter between 1 - 3 for number of fortunes that the “get fortunes” button will obtain and then display
    * Clicking “update” will give an alert saying what the number of fortunes that will be obtained was changed to, if number is different than the current number
![Update Fortune Number](/static/updateFortuneNumber.png)
    * Clicking “Get Fortunes” will causes page to display a random fortune(s) each time its pressed (no fortune will be displayed in two slots, provided number of fortunes obtained is 2 or higher)
    * Has a sign out link, and a collection link

* Collection:
![Collection page](/static/collectionPage.png)
    * When loaded, displays all fortunes obtained by the specific user (in order of their fortune_id in the database)
    * A back link to return to main page

## Instructions on how to run a cloned repo
If a user wishes to try this app out on their own device, then there is some requirements needed to run this as I did, or equivalents:
* Programs used (may use equivalents if similar):
    * Visual Studio Code
    * Git
    * Node
    * Postman (needed to send a post request the url to seed the database or can use seed() in the server.js to initialize database, comment out seed() after initializing otherwise it'll reset each time nodemon restarts)
    * PostgreSQL (to setup the basebase name, password, and server port)

* Steps to install:
    * clone repo: git clone {insert github repo link of project}
    * at the root of the directory (where you'd see the public, server, and static folders, and other files), open terminal and run npm i
    * download pgAdmin4 and make a user, make password without a "?", setup a database, and find the server port of it
        * create a .env file
            * create SERVER_PORT, and set = to what port number you want
            * create CONNECTION_STRING and set = to postgres://postgres:{password}@localhost:{port}/{database name}
                * you would replace {password} with the password you use to access your database
                * replace {port} with the port assigned to PostgreSQL 16, or the server under Servers that has your database
                * replace {database name} with the name you gave the database that will be used on local device