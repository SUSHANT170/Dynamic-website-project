const express=require('express');
const app=express();
const mongoose=require('mongoose');

require('./db/conn');
const User=require('./model/userSchema');

const dotenv=require("dotenv");
dotenv.config({path:'./config.env'});
const PORT=process.env.PORT;
app.use(express.json());


// setting up router
app.use(require('./router/auth'));

// const middleware=(req,res,next)=>{
//     console.log("it is middleware");
//     next();
// }


// app.get('/',(req,res)=>{
//     res.send("hello");

// })
// app.get('/about',middleware,(req,res)=>{
//     res.send("hello about");

// })
// app.get('/contact',(req,res)=>{
//     res.send("hello contact");

// })
app.get('/',(req,res)=>{
    res.send("hello");

})
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})