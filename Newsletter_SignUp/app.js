const express = require('express');
const app =express();
const mailchimp = require("@mailchimp/mailchimp_marketing");
const bodyParser=require("body-parser");


mailchimp.setConfig({
    apiKey: "9a03c233b84a89f2509b9cde7832106b-us8",
    server: "us8",
  });

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/signup.html")
    
    
});



app.post("/",function(req,res) {

    const  firstName=req.body.fName;
    const  lastName=req.body.lName;
    const  email=req.body.email;

    const run = async () => {

        try{
            const response = await mailchimp.lists.addListMember("5848f5f22", {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
    
                }
              
            } );
            
            res.sendFile(__dirname+"/success.html")
            console.log(response);
            
        } catch(error) {
            res.sendFile(__dirname+"/failure.html")
        }
        
        

       
        
    };
    run();
  
});

app.post("/failure",function(req,res){

    res.redirect("/");


})

app.listen(3000,function(){

    console.log("server is running on port 3000");
});

// 9a03c233b84a89f2509b9cde7832106b-us8

//audience id  55848f5f22