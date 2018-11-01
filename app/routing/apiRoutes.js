var userData = require("../data/friends.js")

//route to the user data API
module.exports = function(app) {

    app.get("/api/users", function(req, res){
        res.json(userData)
    })

    app.post("/api/users", function(req, res) {
        userData.push(req.body)
      });
}