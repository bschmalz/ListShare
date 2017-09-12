var express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userController = require('./userController.js');

// Sets up connection to local mongo database
mongoose.connect('mongodb://localhost/solo-Project');
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

// Make sure all requests run through cookie parser and body parser
app.use(cookieParser(), bodyParser.urlencoded({ extended: true }));

// Static routes set up for client and build
app.use('/client', express.static(__dirname +'./../client')); 
app.use('/build', express.static(__dirname +'./../build'));

// Signup route, checks cookie first
app.get('/signup', userController.checkCookie, (req, res, next) => {
	res.sendFile(__dirname+'/html/signup.html');
}); 

// Route for showing all users
app.get('/showUsers', userController.showAll);

// Route for getting items for a specific user
app.get('/getData', userController.findList);

// Route for editing the list info for a specific user
app.post('/editData', userController.editData);

// Route for users posting to the signup page. Sends them to the create user controller and then to the list if they are 
// sucessfully added to the database
app.post('/signup', userController.createUser, (req, res, next) => {
	res.redirect('/showList?' + res.locals.username);
}); 

// Route for people access the login page, can be bypassed with a valid cookie
app.get('/login', userController.checkCookie, (req, res, next) => {
	res.sendFile(__dirname+'/html/login.html');
}); 

// Route for posting to the login page, we run it through the verifyuser controller before showing the list
app.post('/login', userController.verifyUser, (req, res, next) => {
	res.redirect('/showList?' + res.locals.username);
})

// Default route goes to signup unless you have a valid session cookie
app.get('/', userController.checkCookie, (req, res, next) => {
	res.redirect('/signup');
}); 

// Route for showing the list
app.get('/showList', userController.verifyCookie, (req, res, next) => {
	res.sendFile(__dirname+'/html/index.html');
}); 

// Let's people log out, clears cookie, sends them to signup page
app.get('/logout', (req, res, next) => {
	res.clearCookie('ssid');
	res.redirect('/signup');
});

// Route specifically for the oAuth callback recieved from github
app.get('/callback', userController.verifyOAuth,
 (req, res) => res.redirect('/showList'));


app.listen(3000); //listens on port 3000 -> http://localhost:3000/

