// NPM PACKAGES TO RUN THE SERVER.
const express = require('express'); /*use for making clean backend request between the server and the website/app */
const bcrypt = require('bcrypt-nodejs'); /*use to encrypt passwords in hash format so it is not easily hacked by attackers on the web */
const cors = require('cors'); /*use to make http request to a server and allows for the client to send back a response */
const knex = require('knex'); /*use to connect the database to the server*/



// DEPENDENCY INJECTION
const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const user = require('./controllers/user')
const image = require('./controllers/imageSubmit')

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      host : process.env.DATABASE_HOST,
      port : 5432,
      user : process.env.DATABASE_USER,
      password : process.env.DATABASE_PW,
      database : process.env.DATABASE_DB
    }
  }); /*use to connect the database to the server*/
      /*knex helps to build our SQL statement for us*/
      /*ex: db.select('*').from('users') --> this is used as well in postgreSQL to select everything from users table and display */ 

// db.select('*').from('users').then(data => {
//     console.log(data)
// }); // USED FOR VIEWING THE USERS IN MY NODE TERMINAL

const app = express(); /*To use the express npm package, it must be declared to a variable and given whatever title desired for your project, mine is 'app' */

// what MIDDLEWARE does?
// app.use is a generic express middleware
// A. as the request is coming in, it's going to pass through the use function and then trickle down to whatever is at the bottom
// and this middleware is going to do something to the request from the website/app in order to perharps make it easier to work with 
app.use(express.json());
app.use(cors())

// WHEN EVER YOU SENDING AN HTTP REQUEST OR RESPONSE BETWEEN SERVERS AND WEBSITES
// MAKE SURE YOU SEND IT THROUGH JSON
app.get('/', (req, res) => {
    // when a website sends a request with the root url,
    // it sends back a response of the database variable
    res.json('Page Loaded Successful')
})
app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
// {register.handleRegister(req, res, db, bcrypt)}: this is called Dependency Injection which means
// injecting whatever dependencies this functions need to run
app.get('/user/:id', (req, res) => {user.handleUserGet(req, res)});
app.put('/image', (req, res) => {image.handleImageSubmit(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})



console.log(process.env)


app.listen(3001, () =>{
    console.log('App is running on port 3001')
})

// NOTE TO SELF
// ALWAYS USE POSTMAN TO TEST RUN YOUR SERVER AND DATABASE
// TO MAKE SURE YOUR WEBSITE/APP IS WORKING FINE



/*
KNEX QUERY BUILDERS TO KNOW WHILE BUILDING A SERVER
INSERT
SELECT
WHERE
UPDATE
INCREMENT
TRASACTIONS

SERVER ROUTES
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/