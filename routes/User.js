const router =require("express").Router()
const bcrypt =require('bcrypt')
const Usermodel=require("../model/user")
const jwt = require("jsonwebtoken")
require("dotenv").config()

router.get('/',(req,res)=>{
    res.status(200).json({
        message:"welcome to the user"
    })
})

// sign up

router.post('/signup',async(req,res)=>{
    let fullname =req.body.fullname;
    let email = req.body.email;
    let password = req.body.password;
    

    Usermodel.findOne({fullname:fullname}).then(async(data)=>{
        if (!data){
            let hashedpassword = await bcrypt.hash(password,10) 
            Usermodel.create({
                fullname:fullname,
                email:email,
                password:hashedpassword
            }).then((result)=>{
                res.status(200).json({
                    message:"user signup successfully"
                })
            }).catch((err)=>{
                res.status(400).json({
                    message:'something went wrong',
                    error:err
                })
            })
        }else{
            res.status(401).json({
                message:'user already exist'
            })
        }
    }).catch((err)=>{
        res.status(400).json({
            message:"something wend wrong",
            error:err
        })
    })
})

//login

router.post("/login",(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    console.log(password);
    Usermodel.findOne({email:email}).then(async(result)=>{
        console.log(result.password);
        if(result){
            let haspasswordmatch=await bcrypt.compare(password,result.password)
            if(haspasswordmatch){
                let tocken=jwt.sign({_id:result._id,
                    email:result.email
                },process.env.JWT_KEY,{expiresIn:'1hr'});

                res.status(200).json({

                    message:"user loggedin successfully",
                    tocken:tocken
                })
            }else{res.status(401).json({
                message:"password is incorrect"
            })
        }
        }else{res.status(401).json({
            message:"user not found"
        })
    }
    }).catch((err)=>{
        console.log(err);
        res.status(400).json({
        message:"something went wrong",
        error:err
    })

})
})
module.exports=router