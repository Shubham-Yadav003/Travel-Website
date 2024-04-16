const mongoose=require("mongoose");
const employeeSchema=new mongoose.Schema({
    
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true

    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    }
})

const Register= new mongoose.model("data" , employeeSchema);
module.exports=Register;