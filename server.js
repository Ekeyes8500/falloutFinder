var express = require("express");
var path = require("path");
var fs = require("fs")

var app = express();

//require jquery
require("jquery");

// initial port
var PORT = process.env.port || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/css', express.static('css'));
app.use('/app', express.static('app'));
app.use('/images', express.static('images'));

//routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });

