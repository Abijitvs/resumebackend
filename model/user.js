const mongoose =require("mongoose")

let UserSchema =mongoose.Schema({
    fullname:{type:String,require:true,unique:true},
    email:{type:String},
    password:{type:String}
})

module.exports=mongoose.model("resume",UserSchema)