
//create express App
const exp = require('express');
const app=exp()
require('dotenv').config()
//import mangodb client
const mongoClient = require('mongodb').MongoClient;
const cors = require('cors')
app.use(cors())

//import Api routes
const tasksapi = require('./APIs/tasksapi')
const userapi = require('./APIs/userapi')
const quizapi = require('./APIs/quizapi')

//to parse the request of the body object
app.use(exp.json())
const port = process.env.PORT || 8000


//connect to DB
mongoClient.connect(process.env.MONGO_URI)
.then(client=>{
    //get db obj
    const blogdb = client.db('todolist')
    //get collection obj
    const todocollection = blogdb.collection('todocollection')
    const userscollection = blogdb.collection('userscollection')
    const quizcollection = blogdb.collection('quizcollection')
    const solvedquizzescollection = blogdb.collection('solvedquizzescollection')
    //share that collection obj with express app
    app.set('userscollection',userscollection)
    app.set('todocollection',todocollection)
    app.set('quizcollection',quizcollection)
    app.set('solvedquizzescollection',solvedquizzescollection)
    //confirm db connection success
    console.log("DB connection success")
})
.catch(err=>console.log("err in DB connection",err)) 



app.use("/userapi", userapi)
app.use("/tasksapi", tasksapi)
app.use("/quizapi", quizapi)


//express error handler
app.use((err,req,res,nest)=>{
    res.send({message:"error",payload:err.message})
})

//assign port no.
app.listen(port,()=>console.log(`Web Server on port ${port}`))