const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const app = express();

app.use(express.json()); 


app.use(cors());


process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

var db = require('knex')({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl:true,

  }
});


app.get('/', (req, res) => {
	res.send('test');
});



app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)});

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id', (req,res) => {profile.handleProfile(req,res,db)});   

app.put('/image', (req,res) => {image.handleImage(req,res,db)})

app.post('/imageUrl', (req,res) => {image.handleApiCall(req,res)})



app.listen(process.env.PORT || 3000,() => {
	console.log(`app is running on port ${process.env.PORT}`);
})

console.log(process.env)