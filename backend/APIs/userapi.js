//create express mini user api App
const exp = require('express')
const userApp = exp.Router()
//import bcryptjs module
const bcryptjs = require("bcryptjs")
//import asynchrous handler to handle asynchronous error
const expressAsyncHandler = require('express-async-handler')
//import json web token
const jwt = require('jsonwebtoken')
require('dotenv').config()


let userscollection;
//get userCollection this app level middleware--- it is required by every route
userApp.use((req,res,next)=>{
    userscollection = req.app.get('userscollection')
    next()
})

//user registration route
userApp.post('/register',async(req,res)=>{
    //get user resource from client
    const newUser = req.body;
    //check for duplicate user based on username
    const dbuser = await userscollection.findOne({email:newUser.email})
    //if user found in db
    if(dbuser!==null){
        res.send({message:"user existed"})
    }
    //
    else{
        //hash the password
        const hashedPassword = await bcryptjs.hash(newUser.password,6)
        //replace hashed password with plain password
        newUser.password = hashedPassword;
        //create new user
        await userscollection.insertOne(newUser)
        //send response
        res.send({message:"user created"})
    }
})

//user login route
userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    //get cred obj from client
    const userCred = req.body;
    //check for username
    const dbuser = await userscollection.findOne({username:userCred.username})

    if(dbuser===null){
        res.send({message:"User does not exist"})
    }
    else{
        //check for password
        const status = await bcryptjs.compare(userCred.password,dbuser.password)
        if(status === false){
            res.send({message:"Invalid Password"})
        }
        
        else{
            //create jwt token and encode it
            const user = dbuser
            const signedtoken = jwt.sign(user,process.env.SECRET_KEY,{expiresIn:"1d"})
            //send res
            res.send({message:"Login successful",token:signedtoken,user:dbuser})
        }

    }
    
}))



//export userApp
module.exports = userApp;