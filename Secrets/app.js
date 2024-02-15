//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const password = require("passport");
const passwordLocalMongoose = require("passport-local-mongoose");
const passport = require('passport');
var findOrCreate = require('mongoose-findorcreate');
const { log } = require('console');

const app = express();
app.use(express.static("Public"));

app.set("view engine","ejs");

app.use(bodyParser.urlencoded(
{
    extended:true
}));

app.use(session({
    secret: "our little secret",
    resave: false,
    saveUninitialized: false,

}));

app.use(passport.initialize());
app.use(passport.session());





mongoose.connect('mongodb://127.0.0.1:27017/userDB');
  

const userSchema = new mongoose.Schema( {
    email: String,
    password: String,
    googleId: String

});

userSchema.plugin(passwordLocalMongoose);
userSchema.plugin(findOrCreate)


const User = new mongoose.model("User",userSchema)

passport.use(User.createStrategy());

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
     
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
  
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.listen(3000,function(){
    console.log("server started on port 3000 ")
});

app.get("/", function(req,res){
    res.render("home")
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });

app.get("/login", function(req,res){
    res.render("login")
})

app.get("/secrets", function(req,res){
   if (req.isAuthenticated()){
    res.render("secrets")
   }else{
    res.redirect("/login")
   }
})

app.get("/register", function(req,res){
    res.render("register")
})

app.post("/register", function(req, res) {
    User.register({ username: req.body.username }, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            // Handle the error, for example, by rendering the "register" page with an error message.
            return res.render("register", { error: "Registration failed, please try again." });
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/secrets"); // Redirects to the "secrets" page upon successful registration.
            });
        }
    });
});

app.post("/login", function(req, res){
    const user = new User({
        username: req.body.username,
        password:req.body.password
    });
    req.login(user,function(err){
        if(err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secrets");
            })
        }
    })
    
  
})

app.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });