const express = require ("express");
const app = express();
const bodyParser = require("body-parser");
// const date = require(__dirname+"/date.js")
const mongoose = require("mongoose");
const { Db } = require("mongodb");
let workItems = [];

app.set('view engine', 'ejs');

app.use(express.static("public"));

main().catch(err => console.log(err));
 
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');
 
}

const itemsSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model("Item",itemsSchema);
const item1 = new Item({
    name:"Hit the + button to add new item."
});

const item2 = new Item({
    name:"< --- Hit this to delete an item."
});
const defaultItems = [item1, item2];

const listSchema = {
    name:String,
    items:[itemsSchema]
};

const List=mongoose.model("List",listSchema);

app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function (req, res) {

    // const day =date.getDate();

    async function myitems() {
        const founditems = await Item.find({});

        if (founditems.length === 0) {

            Item.insertMany(defaultItems);
            res.redirect("/");
        } else {
            res.render("list", { listTitle: "Today", listItems: founditems });

        }
    }

    myitems();

});

app.post("/",function(req,res){

    const itemName = req.body.newItem;
    if (req.body.list == "work"){
        workItems.push(itemName);
        res.redirect("/work"); 
    }else{
        const item = new Item({
            name: itemName
        })
        item.save();
    
        
    }
    res.redirect("/"); 

});


app.get("/:customListName",function(req,res){
    // console.log(req.params.customListName)
   const customListName = req.params.customListName;


   async function findone() {
    const founditem = await Item.exists({name:customListName});
    console.log(founditem);

    if (founditem != null) {
        console.log("not null " ,founditem)
        res.render("list", { listTitle: founditem.name, listItems: founditem.items });
        
       
    } else {
        const list = new List ({
            name:customListName,
            items:defaultItems
           });
       list.save()
    }
}

findone();
})



app.post("/delete",function(req,res){
const checckedItemId = req.body.checkbox;
async function deleteitem() {
    await Item.deleteOne({_id:checckedItemId});

    res.redirect("/");
  

}
deleteitem()

})


app.listen(3000,function(){

    console.log("server started on port 3000");
});