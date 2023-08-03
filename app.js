require("dotenv").config();
const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.send('Twat')
})

app.listen(process.env.PORT,()=>{
    console.log("Server started");
})