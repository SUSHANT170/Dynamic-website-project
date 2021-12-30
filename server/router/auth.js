const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
require('../db/conn')
const User = require('../model/userSchema');
const cookieParser=require("cookie-parser")
const authenticate=require("../middleware/authenticate");
router.use(cookieParser());


router.get('/', (req, res) => {
    res.send("hello from auth");

})

// ************************using promises*****************************************

// router.post('/register',(req,res)=>{
//     console.log(req.body);
//     // res.json({message:req.body});
//     const {name,email,phone,work,password,cpassword}=req.body;
//     if(!name|| !email|| !phone|| !work|| !password|| !cpassword){
//       return  res.status(422).json({error:"fill properly"});
//     }
//     User.findOne({email:email}).then((userExist)=>{
//         if(userExist){
//             return  res.status(422).json({error:"Already exist"});

//         }
//         const user=new User({name:name,email,phone,work,password,cpassword});
//         user.save().then(()=>{
//             res.status(201).json({messgae:"successfully registered"})
//         }).catch((err)=>{
//             res.status(500).json({error:"failed"})
//         })
//     }).catch((err)=>{
//         console.log(err);
//     })
// })

router.post('/register', async (req, res) => {
    console.log(req.body);
    // res.json({message:req.body});
    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "fill properly" });
    }

    try {

        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ error: "Already exist" });

        }
        else if (password != cpassword) {
            return res.status(422).json({ error: "occured" });
            


        }
        const user = new User({ name: name, email, phone, work, password, cpassword });
        // password hash
        const userRegister = await user.save();
        res.status(201).json({ messgae: "successfully registered" })
    } catch (error) {
        console.log(error);

    }

})
router.get('/signin',(req,res)=>{
    res.send("signin page");
})
router.post('/signin', async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "fill data" })
        }
        const userLogin = await User.findOne({ email: email });
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            const token=await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+500000),
                httpOnly:true
            })

            if (!isMatch) {
                res.status(400).json({ message: "error" })

            }
            else {
                res.status(201).json({ message: "successfully login" })
            }

        }

        else {
            return res.status(400).json({ error: "fill data" })
        }

    } catch (error) {
        console.log(error);

    }



});

router.get('/about',authenticate,(req,res)=>{
    console.log('hello from about');
    // console.log(req);
    res.send(req.rootUser);


})

// get user data for contact and home page
router.get('/getdata',authenticate,(req,res)=>{
    console.log('hello from getdata backend');
    // console.log(req);
    res.send(req.rootUser);

})

// contact us page
router.post('/contact',authenticate,async(req,res)=>{
    // res.send("hello contact");
    try {
        // console.log('from contact backend');
        // console.log(req.body);
        const {name,email,phone,message}=req.body;
        if(!name || !email || !phone || !message){
            if(!name){
                console.log("name emoty");
            }
            if(!email){
                console.log("email empty");
            }
            if(!message){
                console.log("message empty");
            }
            // if(!phone){
            //     console.log("phone empty");
            // }
            console.log("error in contact form");
            return res.json({error:"plzz fill contact form"})
        }

        // getting userID from authenticate
        // console.log(req.userId);
        const userContact=await User.findOne({_id:req.userId});
        // console.log(userContact);
        if(userContact){
            const userMessage=await userContact.addMessge(name,email,phone,message);
            await userContact.save();
            res.status(201).json({message:"user contact successfully"});
        }
        
    } catch (error) {
        console.log(error);
        
    }

})







module.exports = router;