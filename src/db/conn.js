const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/main").then(()=>{
    console.log("connection success");
}).catch((error)=>{
    console.log(error);
})