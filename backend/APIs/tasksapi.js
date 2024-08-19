

//create express mini user api App
const exp = require('express')
const tasksApp = exp.Router()
const { ObjectId } = require('mongodb');

//import asynchrous handler to handle asynchronous error
const expressAsyncHandler = require('express-async-handler');

require('dotenv').config()


let todocollection;
//get userCollection this app level middleware--- it is required by every route
tasksApp.use((req,res,next)=>{
    todocollection = req.app.get('todocollection')
    next()
})

tasksApp.post('/new-task',expressAsyncHandler(async(req,res)=>{
    //get user resource from client
    const todo = req.body;
    await todocollection.insertOne(todo)
    //send response
    res.send({message:"task added"})
}))

tasksApp.put('/update-task/:id', expressAsyncHandler(async (req, res) => {
    const task = req.body;
    const id = req.params.id;

    // Ensure ObjectId conversion
    try {
        const objectId = new ObjectId(id);
        await todocollection.updateOne({ _id: objectId }, { $set: { status: task.status } });
        res.send({ message: "task updated" });
    } catch (error) {
        res.status(400).send({ message: "Invalid task ID" });
    }
}));

tasksApp.get('/tasks/:username',expressAsyncHandler(async(req,res)=>{
    //get user resource from client
    const username = req.params.username
    const todos = await todocollection.find({username:username}).toArray()
    //send response
    res.send(todos)
}))

tasksApp.delete('/delete-task/:id', expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    // Ensure ObjectId conversion
    try {
        const objectId = new ObjectId(id);
        await todocollection.deleteOne({ _id: objectId });
        res.send({ message: "task deleted" });
    } catch (error) {
        res.status(400).send({ message: "Invalid task ID" });
    }
}))

// articleApp.get('/articles',expressAsyncHandler(async(req,res)=>{
//     const articles = await articlescollection.find({}).toArray()
//     //send response
//     res.send(articles)
// }))

// articleApp.post('/add-comment',expressAsyncHandler(async(req,res)=>{
//     const comment = req.body
//     const articleId = new ObjectId(comment.articleid);
//     await articlescollection.updateOne({_id:articleId},{$push:{comments:comment}})
//     res.send({message:"comment added"})
// }))




//export userApp
module.exports = tasksApp;