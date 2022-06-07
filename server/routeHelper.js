const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const dbName = "auth-simple";
const collectionName = "users";


//login func
function login(req, res) {
    console.log("/users/login is accessed");

    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        const dbo = db.db(dbName);
        // excpecting to get email and pass from user
        const queryFromUser = req.body;
        //getting user info


        //finding user by his email - maybe he has excist
        dbo.collection(collectionName).findOne(queryFromUser, function(err, userFound) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            if (userFound)
            //we already have user with this email --match with email and pass
            {
                return res.sendStatus(200); //success
            }

            // ---user not found
            return res.sendStatus(404);
        });
    });

}












//reg func
function register(req, res) {
    console.log("/users/register is accessed");
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }


        const dbo = db.db(dbName);
        // excpecting to get email and pass from user
        const queryFromUser = req.body;
        //getting user info


        //finding user by his email - maybe he has excist
        dbo.collection(collectionName).findOne({ email: queryFromUser.email }, function(err, userFound) {

            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            if (userFound)
            //we already have user with this email
            {
                return res.sendStatus(400); //success
            }

            //didnt find him --- se have to insert him to database
            dbo.collection(collectionName).insertOne(myObj, function(err, result) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }


                res.sendStatus(201);
            });

        });
    });




}
module.exports.register = register;
module.exports.login = login;