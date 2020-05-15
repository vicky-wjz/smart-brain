const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

var db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'vicky',
    password : '1111',
    database : 'smart-brain'
  }
});



const app = express();

app.use(express.json()); 


app.use(cors())

app.get('/', (req, res) => {
	res.send(db.select('*').from('users').then());
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