const express = require('express');
const app = express()
const mongoose =require('mongoose')
const mongodbUrl ='mongodb+srv://abijithvs1999:7558@cluster0.e2j9chq.mongodb.net/'
const UserRouter = require('./routes/User')
const cors =require('cors')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"hello world"
    })
})

app.use("/user",UserRouter)

mongoose.connect(mongodbUrl).then(()=>{
    app.listen(5000,(err)=>{
        if(err) throw err
        console.log('mongodb connected')
    })
}).catch((err)=>{
    console.log(err)
})