const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { json } = require("body-parser");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(bodyParser.json());

const users = [{userName :"Mahesh Prajapati", userID: "maheshprajapati@gmail.com", userPassword: "mahesh99"}, {userName :"Vishnu Nair", userID: "vishnunair@gmail.com", userPassword: "vishnu99"}, {userName :"Rupesh Yadav", userID: "rupeshyadav@gmail.com", userPassword: "rupesh99"}];
var checkUser = {};
app.get("/", function(req, res){
    res.render("home");
});

app.get("/addVehicle", function(req,res){
    res.render("addVehicle");
});

app.post("/addVehicle", function(req,res){
    const vehicleDetails = {Img: req.body.fileToUpload, company: req.body.selectCompany , model: req.body.selectModel, year: req.body.Year}
    console.log(vehicleDetails);
    res.redirect("/");
});

app.get("/about", function(req,res){
    res.render("about");
})

app.get("/login", function(req,res){
    res.render("login");
});

app.get("/signup", function(req,res){
    res.render("signup");
});

app.post("/signup", function(req,res){
    const user = {userName: req.body.name, userID : req.body.id, userPassword: req.body.password};
    users.push(user);
    res.redirect("/login");
});

app.get("/loginFailed", function(req,res){
    res.render("loginFailed");
});

app.post("/login", function(req,res){
    checkUser = {userID : req.body.id, userPassword: req.body.password};
    users.forEach(user =>{
        if(user.userID === checkUser.userID && user.userPassword === checkUser.userPassword){
            res.render("mainPage",{user : user});
        }        
    });
    res.redirect("loginFailed");
});

app.get("/mainPage", function(req,res){
    res.render("mainPage", {users: users});
});

app.listen(3000, function(req, res){
    console.log("Server started at port 8080");
});