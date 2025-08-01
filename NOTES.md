Day1 Notes

===========================================================================
#Installing my Dependencies
Tier 1 - MOST IMPORTANT

1. typescript - to write in TS
2. ts-node - so you can run ts files on node
3. @types/node - TS knows the inbuilt functions of node
4. express - for server setup

Tier 2 - Server Functionality

1. cors - lets frontend and backend interact
2. dotenv for environ variables
3. @types/express - TS knows the inbuilt express functions

Tier 3 - Database

1. mongoose - Connects MongoDB and manages data
2. @types/mongoose - TS definitions for mongoose

Tier 4 Authentication
brcryptjs - Hashes passwords securely
jsonwebtoken - Create and verify JWT
@types/bcryptjs & @types/jsonwebtoken - TS definitions

Tier 5 Development Tools
nodemon
@types/cors
===========================================================================

I have set my express JS server up too
Git repo is setup

TS and Express JS and Node JS

- good practice to run TS in real time

Why Module esnext doesnt work with Express js but common JS does
so firstly common js is a syntax and so is esnext (a newer syntax)
so with esnext you cant use it with node js alone as nodejs only knows the old syntax
you would need to include more paramaters in your ts.config.json file and that comes with issues down the line so use common js

===========================================================================
Day2 Notes
===========================================================================

Starting off - i need to do the following in this order

- Database setup - Connect to MongoDB
- User authentication - Student login system
- API endpoints - Create routes for questions/answers
- Frontend setup - Start the React client

Database setup
Important packages are mongoDB Atlas (link to the database), mongoose (set up the schemas) and dotenv (for environment variables)

Note: mongoDB links with database on local machine but mongoDB Atlas lets you link to the database in the cloud

Sign up to mongoDB Atlas

mongoDB Atlas Basics
Cluster = collection of servers hosting the mongoDB database in the cloud,
We have associated IP Address (only valid computers can login ) and username and password (only valid users on that computer can access the database)
i added these in the dotenv file
database user = user that can access the database
Connection method = how the app talks to the database

Connection method is NOT SHELL as this is for manual running database queries but we need to programmatic connection (code runs auto)
AND we need API endpoints but SHell is for 1 time use

MongoDB driver = software to let your app communicate with the database

we using the mongoose driver (a wrapper around mongoDB driver) as its easier, schema based,

DATABASE SETUP

imports explained, with TS, you should not specifiy the extension as it can be configured itself so test.ts will cause errors but test would be fine

you set up the database yourself and have configured it to the express app using an async function call which will export it so that when the test.ts is run and the PORT is on, then it works.

DATA Models
Now i need to think of the data i need to store

User Model - for student accounts contains following fields
\_id (MongoDB auto-generated)
name (String)
email (String)
password (String - hashed)
university (String)
createdAt (Date)
updatedAt (Date)
role (String - "student" or "admin")
avatar (String - URL, optional)

Question Model - for student questions
\_id (MongoDB auto-generated)
title (String)
content (String)
author (ObjectId - reference to User)
dateCreated (Date)
tags (Array of Strings)
votes (Number)
answers (Array of ObjectIds - references to Answers)
isResolved (Boolean)
updatedAt (Date)

Answer Model - for student Answers fields are:
\_id (MongoDB auto-generated)
content (String)
author (ObjectId - reference to User)
questionId (ObjectId - reference to Question)
answerCreationDate (Date)
votes (Number)
isAccepted (Boolean)
updatedAt (Date)

To create each Model
Mongoose Schema
Basic Structure of a Model

How to connect models to database

===========================================================================
DAY 3
===========================================================================
I have created all the Models and i removed isAccepted field from Answer Model, i dont think it is needed

Next steps: User Authentication System
Reason to make Auth next?

1. You need to know who is creating q or a's
2. Question & Answers - need authors
3. Testing - harder to test without knowing who is making the reqs
4. User Experience - you first need account then can post

Setting Auth Routes
Organise the routes -
Registration - new User is made
Login -
Admin or Student
Logout

TypeScript Interfaces Explained

- Blueprint of types for properties in an object
  eg:
  interface RegisterBody {
  username: string;
  password: string;
  }

RegisterUser Route

1. its an async function because we need to pause execution of the function until we recieve a Promise (resolved or not). At each await keyword we wait there until the promise is recieved

2. Check if all the relevant request fields for User schema are present
3. Check if user already exists
4. Now we can hash the password
5. Add the User to the database

TypeScript Overloads
Functions can be called in more than 1 way = overloaded functions
Overload means you call a function multiple ways but with different parameters like:

function greet(name: string): string; // overload #1
function greet(name: string, age: number): string; // overload #2

2 functions with the same name but can both be called differently

Today all the Models are defined
I worked on setting up the routes and controllers for Authentication
Both Registering a User & Logging a user have been created

Topics I learnt:
Overloading
TS Interface
Hashed Passwords with Bcrypt
JSON Web Token Generation
How to define controllers
