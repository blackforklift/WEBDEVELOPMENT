const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

Items=["example item"]

app.get("/",function(req,res){


    var today = new Date;

    const options = {month: 'long', day: 'numeric',weekday: 'long' };
    
    var day = today.toLocaleDateString("en-US",options)



    res.render("list",{kindOfDay:day,listItems:Items});

})

app.post("/",function(req,res){

   var Item= req.body.listItem;
   Items.push(Item);
   res.redirect("/");
    
 })

app.listen(3000,function(){

    console.log("running on port 3000")
})