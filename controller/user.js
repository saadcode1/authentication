const mongoose = require("mongoose");
const User=require("../models/user");

module.exports.loginPage=(req,res)=>{
   
        res.render("googleApi.ejs");
}
module.exports.homePage=async (req,res)=>{
        res.render("signIn.ejs");
 }
module.exports.signUp=async (req,res)=>{
          let {email,username,password}=req.body;
          let ragisterUser=new User({
                email,
                username,
          })
         let user= await User.register(ragisterUser,password);
         console.log(user);
         req.login(user,(err)=>{
                if(err){
                  console.log(err);
                  return next(err);
                }
                
               return res.render("home.ejs");
  })
}

module.exports.loginForm=(req,res)=>{
         res.render("login.ejs");
     }

     module.exports.loggedIn=(req,res)=>{
        console.log(req.body);
        res.send("u r successfully logged In");
}
module.exports.loggedOut=function(req, res, next){
        req.logout(function(err) {
          if (err) { return next(err); }
         return res.redirect("/signIn");
        });
      }