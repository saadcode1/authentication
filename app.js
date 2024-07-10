if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
}
const express =require("express");
const mongoose=require("mongoose");
const app=express();
const port=8888;
const session = require('express-session');
const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./models/user.js")

// mongooDb connection
main()
     .then(()=>{
        console.log("connections successfully done");
     })
     .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp_clone');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json()) 
const path = require("path");

const engine=require("ejs-mate");
const { profile } = require('console');
app.engine('ejs', engine);
app.set("view engine", "ejs");

// requiring Routes
const userRoute=require("./routes/user.js");

app.set("views", path.join(__dirname, "/views"));
app.use(session({
  secret: process.env.SECRET_CODE,
  resave: false,
saveUninitialized: true,
cookie:{
  expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
  maxAge: 7 * 24 * 60 * 60 * 1000
}
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/",userRoute);


app.listen(port,()=>{
    console.log(`Server is Running on port ${port}`);
})