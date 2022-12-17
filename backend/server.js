const dotenv = require('dotenv').config();
const cors = require('cors');
const express = require("express");
const app = express()
const todo = require('./routes/Todo');
app.use(express.json());
app.use(cors())

app.get('/',(req,res)=>{
    res.send("Hello world")
})
app.use('/todo',todo)
app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})