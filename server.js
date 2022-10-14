/*********************************************************************************
*  WEB322 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Daniel Kwan Student ID: 143090207 Date: 2022-10-14
*
*  Online (Cyclic) Link: https://fine-rose-catfish-gown.cyclic.app 
*
********************************************************************************/ 

const { response } = require("express");
var express = require("express");
var app = express();
const multer = require("multer");
var path = require("path");
var data = require("./data-service.js");
app.use(express.static('public'));
var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on port " + HTTP_PORT);
}

const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function(req, file, cb) {
     cb(null, Date.now() + path.extname(file.originalname));
 }
})
const upload = multer({storage:storage});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.post("/images/add", upload.single("imageFile"), 
(req, res) => { res.redirect("/images");
})

app.get("/students/add", function(req, res) {
    res.render('addStudents');
});

app.get("/images/add", function(req, res) {
    res.render('addImage');
});

app.get("/about", function(req, res) {
    res.sendFile(path.join(__dirname, '/views/about.html'));
});

app.get("/students", function(req, res) {
    data.getAllStudents()
    .then(function(routeSet) {res.json(routeSet)})
    .catch(function(rejectMsg) {
        response.json('("message":${rejectMsg}}');
    })
});

app.get("/internationalstudents", function(req, res) {
    data.getInternationalStudents()
    .then(function(routeSet) {res.json(routeSet)})
    .catch(function(rejectMsg) {
        response.json('("message":${rejectMsg}}');
    })
});

app.get("/programs", function(req, res) {
    data.getPrograms()
    .then(function(routeSet) {res.json(routeSet)})
    .catch(function(rejectMsg) {
        response.json('("message":${rejectMsg}}');
    })
});

app.get("*", function(req, res) {
    res.status(404).send("Page Not Found");
})

data.initialize().then(() => {
    app.listen(HTTP_PORT, onHttpStart)
})
.catch((err) => {
    res.json({message: err})
  });
