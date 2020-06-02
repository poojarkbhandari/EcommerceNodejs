# Project Title

E-Commerce website (POC)

## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.
Need to install express, bcrypt, mongoose, dotenv, jsonwebtoken, validator packages.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.

If the installation was successful, you should be able to run the following command.

    $ node --version
    v12.16.2

    $ npm --version
    6.10.0

###

## Install
 
    $ cd PROJECT_TITLE
    $ npm install

## Running the project

    $ npm start

## Database

Using mongoose, database connection in /src/db/mongoose.js file

## Models

All the models required for project are created in /src/models/ folder

## Routers

All the routers and it's working is there in /src/routers/ folder.

## Authentication

Authentication for users performed using jwt. Refer code in /src/middleware/auth.js file

## Environmental variables

All the environmental variables in .env file

## Other

Port, Routers are mentioned in app.js and index.files

## Tests

For testing, Test framework jest is used. Testcases are in /tests folder.

## Running using Postman

For authenticated routes, need to mention parameter Authentication with value Bearer[space]generated jwt token.
