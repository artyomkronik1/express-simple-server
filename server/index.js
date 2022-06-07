console.log("app is loading");
const express = require("express");
const app = express();
const routeHelper = require('./routeHelper');


// used for json inside body 
app.use(express.json());


//register for user ---  POST method (register function from routeHelper.js)
app.post("/users/register", (req, res) => {
    routeHelper.register(req, res);
});


//login for user ---  POST method (login function from routeHelper.js)
app.post("/users/login", (req, res) => {
    routeHelper.login(req, res);
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});