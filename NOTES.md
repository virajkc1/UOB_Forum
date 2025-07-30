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
