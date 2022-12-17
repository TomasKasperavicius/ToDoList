const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router()
const mongoConnection = require('../mongoConnection');
// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log(req.body)
//   next()
// })
router.get('/all', async (req,res)=>{
    try {
        const connection = await mongoConnection('ToDoList')
        var result = await connection.collection('Todo').find({}).toArray()
        res.status(200).send(result)    
    } catch (error) {
        console.log(error);
        res.status(500).send({error:error})
    }
})
router.post('/add', async (req,res)=>{
    try {
        var todo = {}
        for (const key in req.body) {
            todo= {...todo, [key]:req.body[key]}
        }
        const connection = await mongoConnection('ToDoList')
        const insertedTodo = await connection.collection('Todo').insertOne(todo)
        res.status(200).send({id:insertedTodo.insertedId})
    } catch (error) {
        console.log(error);
        res.status(500).send({error:error})
    }
})
router.post('/update/:id', async (req,res)=>{
    try {
        var update = {}
        for (const key in req.body) {
                update= {...update, [key]:req.body[key]}
            }
        const connection = await mongoConnection('ToDoList')
        await connection.collection('Todo').updateOne({_id: ObjectId(req.params.id)},{$set:update})
        res.status(200).send({message:"success"})
    } catch (error) {
        res.status(500).send({error:error})
    }
})
router.delete('/delete/:id', async (req,res)=>{
    try {
        const connection = await mongoConnection('ToDoList')
        console.log(req.params.id);
        const a =  (await connection.collection('Todo').deleteOne({_id: ObjectId(req.params.id)})).deletedCount
        res.status(200).send({message:"success"})
    } catch (error) {
        res.status(500).send({error:error})
    }
})
module.exports = router