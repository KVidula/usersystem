const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserModel = mongoose.model('UserModel');

//add new user
router.post('/adduser',(req,res)=>{
    const { userName, email, phone } = req.body;
    if(!userName || !email || !phone){
        return res.status(400).json({error:"One or more mandatory fields are empty"});
    }

    const userObj = new UserModel({userName,email,phone});
    userObj.save()
    .then((newUser)=>{
       res.status(201).json({user:newUser});
    })
    .catch((error)=>{
        console.log(error);
    })
});

//get all user details
router.get('/allusers',(req,res)=>{
    UserModel.find()
    .then((allusers)=>{
        res.status(200).json({users:allusers});
    })
    .catch((error)=>{
        console.log(error);
    })
});

//get user details by id
router.get('/user/:id',(req,res)=>{
    UserModel.findOne({_id:req.params.id})
    .then((user)=>{
        res.status(200).json({userdetails:user});
    })
    .catch((error)=>{
        console.log(error);
    })
});

//delete user
router.delete("/deleteuser/:id", (req,res) => {
    UserModel.findOne({_id: req.params.id})
    .exec((error,userFound)=>{
      if(error || !userFound){
         return res.status(400).json({error : "User does not exist"});
      }else{
        userFound.remove()
         .then((data)=>{
             res.status(200).json({result : data});
         }) 
         .catch((error)=>{
             console.log(error);
         })
        }
    }) 
 });   

 //edit user
router.put("/edituser/:id", (req,res)=>{
    const { userName, email, phone } = req.body;
    if (!userName || !email || !phone) {
        return res.status(400).json({ error: "one or more mandatory fields are empty" });
    }
    UserModel.updateOne({_id: req.params.id},{$set:{userName:userName,email:email,phone:phone}})
    .then((data)=>{
        res.status(200).json({result: data});
    })
    .catch((error)=>{
        console.log(error);
    })
});


 module.exports = router;
