const express=require('express');
const path=require("path");

const hbs=require("hbs");
require("./db/conn");
const Register=require("./models/registers");
const {json}=require("express");
const app=express();
const port=process.env.PORT || 3008 ;
const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//console.log(path.join(__dirname,"../public"));
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

//setting the path
//const staticpath=path.join(__dirname,"../pub");


app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.get("/register",(req,res)=>{
    res.render("register");
})
app.post("/register",async(req,res)=>{
   try{
    const password= req.body.password;
    const cpassword=req.body.confirmpassword;
    if(password=== cpassword){
        const registerEmployee=new Register({
            
            email:req.body.email,
            password:req.body.password,
            confirmpassword:req.body.confirmpassword,
            mobile:req.body.mobile
        })
      const register=await  registerEmployee.save();
      res.status(201).render("index", { message: "Success: You are Registered Successfully" });
      
        
    }
    else{
        res.send("password mismatched");
    }

   }catch(error){
    res.status(400).send(error);
   }
 })

 app.post("/login",async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;
        console.log(`${email} and password is ${password}`);
        const useremail =await Register.findOne({email:email});
        if(useremail.password===password){
            
            res.status(201).render("index", { message: "Success: You are logged in!" });

        }
        else{
            res.send("Error:password are not matching");
        }

    }catch(error){
        res.status(400).send("Error:Invalid email")
    }
})

app.get('/search',(req,res)=>{
    res.render("search");
})
app.post('/search', (req, res) => {
    const location = req.body.location;
    //res.redirect(`https://www.google.com/search?q=${location}`)
     if (location === 'rajasthan') {
         res.redirect('https://www.tourism.rajasthan.gov.in');
     } 
     else if (location === 'goa') {
        res.redirect('https://goatourism.gov.in');
    }
     else if (location === 'delhi') {
         res.redirect('https://delhitourism.gov.in');
     } 
     else if (location === 'uttarakhand') {
        res.redirect('http://uttarakhandtourism.gov.in');
    }
     else if (location === 'mumbai') {
        res.redirect('https://mumbaisuburban.gov.in');
    }
    else if (location === 'uttar pradesh') {
        res.redirect('https://upstdc.co.in');
    }
    else if (location === 'bihar') {
        res.redirect('https://tourism.bihar.gov.in');
    }
    else if (location === 'banglore') {
        res.redirect('https://karnatakatourism.org');
    }
    else if (location === 'telangana') {
        res.redirect('https://tourism.telangana.gov.in');
    }
    
    else if (location === 'assam') {
        res.redirect('https://tourism.assam.gov.in');
    }
    else if (location === 'westbengal') {
        res.redirect('https://wbtourism.gov.in');
    }
    else if (location === 'punjab') {
        res.redirect('https://punjabtourism.punjab.gov.in');
    }
    else if (location === 'haryana') {
        res.redirect('https://haryanatourism.gov.in');
    }
    else if (location === 'tamilnadu') {
        res.redirect('https://www.tamilnadutourism.tn.gov.in');
    }
    else if (location === 'andhra pradesh') {
        res.redirect('https://tourism.ap.gov.in');
    }
    
    else if (location === 'jharkhand') {
        res.redirect('https://');
    }
    else if (location === 'gujrat') {
        res.redirect('https://www.gujrattourism.com');
    }
    else if (location === 'Arunachal Pradesh') {
        res.redirect('https://arunachaltourism.com');
    }
    else if (location === 'karnataka') {
        res.redirect('https://karnatakatourism.org');
    }
    else if (location === 'kerela') {
        res.redirect('https://www.kerelatourism.org');
    }
    else if (location === 'maharashtra') {
        res.redirect('https://maharashtratourism.gov.in');
    }
    
     else {
         res.status(400).send('Invalid location');
     
}
});



app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})