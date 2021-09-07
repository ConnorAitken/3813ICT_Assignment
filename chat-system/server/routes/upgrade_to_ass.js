var fs = require('fs');

module.exports = function(req,res){
    var User = require('../User.js');
    if (!req.body) {
        return res.sendStatus(400);
    }
    var customer = new User.User('', req.body.uname, '', '');
    fs.readFile('./data/users.json', 'utf8', function(err, data) {
        if (err) {
            res.send({"success": false});
            throw err;
        } 
        let usersArray = JSON.parse(data);
        let i = usersArray.findIndex(user =>
            (user.uname == customer.uname));
        if (i == -1) {
            res.send({"success": false, "exists": false});
        }
        else {
            if (usersArray[i].role == "stdUser") {
                usersArray[i].role = "GroupAssis";
                fs.writeFile('./data/users.json', JSON.stringify(usersArray), 'utf-8', function(err) {
                    if (err) {
                        res.send({"success": false});
                        throw err;
                    } 
                });
                res.send({"success": true});
            }
            else {
                res.send({"success": false, "User": false, "exists": true});
                console.log("User already GroupAssis or above!!")
            }
        }
    });
}