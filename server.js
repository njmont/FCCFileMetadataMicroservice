var express = require('express');
var path = require('path');
var app = express();

var multer = require("multer");
var upload = multer({ dest: 'uploads/' });

//Body parser is needed to read values from submitted forms
var bodyParser = require("body-parser");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Setup for public folder where scripts/stylesheets/fonts kept
app.use(express.static(path.join(__dirname, 'public')));

//Body parser is needed to read values from submitted forms
app.use(bodyParser.urlencoded({
  extended: true
}));

//Needed for port on heroku
var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Example app listening on port: ' + port + '!');
})

/* GET home page. */
app.get("/", function(req, res, next) {
    res.render("index", {});
})

//Page with form on it.
app.get("/submit", function(req, res, next) {
    res.render("submit", {});
})

//Post method for returning file size if file submitted or error if no file.
app.post("/submit", upload.single("uploaded_file"), function(req, res, next) {
    "use strict";
    let return_json = {};
    if (req.file) {
        return_json.size = req.file["size"];
    } else {
        return_json.error = "Please provide a file.";
    }
    res.json(return_json);
})
