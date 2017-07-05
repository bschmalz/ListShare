var express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userController = require('./userController.js');

mongoose.connect('mongodb://localhost/solo-Project');
mongoose.connection.once('open', () => {
  console.log('Connected to Database yo');
});

app.use(bodyParser.urlencoded({ extended: true }));
console.log('dirname is', __dirname);
app.use('/client', express.static(__dirname +'./../client')); 
app.use('/build', express.static(__dirname +'./../build'));


app.get('/signup', (req, res, next) => {
	res.sendFile(__dirname+'/html/signup.html');
}); 

app.get('/find', userController.test)

app.post('/signup', userController.createUser, (req, res, next) => {
	console.log('post singup');
	res.end();
}); 

app.get('/login', (req, res, next) => {
	console.log('got login');
	res.sendFile(__dirname+'/html/login.html');
}); 

app.get('/', (req, res, next) => {
	console.log('got index');
	res.sendFile(__dirname+'/html/index.html');
}); 
// app.get('/listView', (req, res) => {
//   console.log('list view');
//   express.static(__dirname +'./../'); 
// });

//serves the index.html

//app.use(express.static(__dirname +'./../')); //serves the index.html

app.listen(3000); //listens on port 3000 -> http://localhost:3000/

