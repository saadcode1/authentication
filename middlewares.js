const mongoose = require("mongoose");


module.exports=isLoggedIn=(req,res,next)=>{
    if(req.isAuthenticated()){
        console.log("middlewares")
      next()
    }
    else{
    return res.redirect("/signIn");
}
}