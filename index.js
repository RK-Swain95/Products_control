const express= require('express');
const app= express();
const port=process.env.PORT || 8000;
const dotenv=require("dotenv").config();
const expresslayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

//use the body
app.use(express.urlencoded({extended:true}));
app.use(expresslayouts);
//extract styles ans scripts from sub pages into to layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//set up view engine
app.set('view engine','ejs');
app.set('views','./views');
app.use('/', require('./routes/index'));

app.listen(port,function(err){
    if(err){ console.log("error in starting server"); return;}
    console.log("server is running on Port :", port);
})

