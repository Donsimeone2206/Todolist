//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/todolistDB", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false});

const itemsSchema = {
    name: String
};
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Buy Food"
});

const item2 = new Item({
    name: "Cook Food"
});

const item3 = new Item({
    name: "Eat Food"
});

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems, function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("successfully inserted");
    }
});


// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

app.get("/", function(req, res) {

const day = date.getDate();

  res.render("list", {listTitle: "Today", newListItems: ["Buy Food", "Cook Food", "Eat Food"]});

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: ["Buy Food", "Cook Food", "Eat Food"]});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
