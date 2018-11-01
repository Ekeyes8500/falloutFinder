var path = require("path");
var fs = require("fs")


//exported routes
module.exports = function(app) {

    //route for the survey option
    app.get("/survey", function(req, res){
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });


    //route for all other inquiries
    app.get("/", function(req, res){
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

}