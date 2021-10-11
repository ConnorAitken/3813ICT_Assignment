module.exports = function(db,app,ObjectID){
    // Route to manage inviting a user to a group room
    app.post('/upgrade_to_ass',function(req,res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        var collection = db.collection('users');
        collection.find({"uname":req.body.userName}).toArray((err,data)=>{
            if (data.length == 1) {
                var userID = data[0].id
                collection = db.collection(req.body.groupName);
                collection.find({"userID":userID}).toArray((err,data)=>{
                    if (data.length >= 1) {
                        collection.updateMany({"userID":userID}, {$set: {"groupAssis":true}},(err,docs)=>{
                            if (err) {
                                res.send({"success": false});
                                throw err;
                            }  
                            res.send({"success": true});
                        });
                    }
                    else res.send({"success": false, "exists": false})
                });
            }
            else res.send({"success": false, "exists": false})
        });
    });
}

// var fs = require('fs');

// module.exports = function(req,res){
//     var User = require('../User.js');
//     if (!req.body) {
//         return res.sendStatus(400);
//     }
//     var upgradedUser = new User.User('', req.body.uname, '', '');
//     fs.readFile('./data/users.json', 'utf8', function(err, data) {
//         if (err) {
//             res.send({"success": false});
//             throw err;
//         } 
//         let usersArray = JSON.parse(data);
//         let i = usersArray.findIndex(user =>
//             (user.uname == upgradedUser.uname));
//         if (i == -1) {
//             res.send({"success": false, "exists": false});
//         }
//         else {
//             if (usersArray[i].role == "stdUser") {
//                 usersArray[i].role = "GroupAssis";
//                 fs.writeFile('./data/users.json', JSON.stringify(usersArray), 'utf-8', function(err) {
//                     if (err) {
//                         res.send({"success": false});
//                         throw err;
//                     } 
//                 });
//                 res.send({"success": true});
//             }
//             else {
//                 res.send({"success": false, "User": false, "exists": true});
//                 console.log("User already GroupAssis or above!!")
//             }
//         }
//     });
// }