var fs = require('fs');

module.exports = function(req,res){
    var User = require('../User.js');
    if (!req.body) {
        return res.sendStatus(400);
    }
    var userToUpgrade = new User.User('', req.body.userName, '', req.body.role);
    fs.readFile('./data/users.json', 'utf8', function(err, data) {
        if (err) {
            res.send({"success": false});
            throw err;
        } 
        let usersArray = JSON.parse(data);
        let i = usersArray.findIndex(user =>
            (user.uname == userToUpgrade.uname));
        if (i == -1) {
            res.send({"success": false, "exists": false});
        }
        else {
            if (userToUpgrade.role == "SuperAdmin") {
                if (usersArray[i].role != "SuperAdmin") {
                    usersArray[i].role = userToUpgrade.role;
                    fs.writeFile('./data/users.json', JSON.stringify(usersArray), 'utf-8', function(err) {
                        if (err) {
                            res.send({"success": false});
                            throw err;
                        } 
                    });
                    res.send({"success": true});
                }
                else {
                    res.send({"success": false, "exists": true});
                }
            }
            else {
                if (usersArray[i].role == "SuperAdmin" || usersArray[i].role == "GroupAdmin") {
                    res.send({"success": false, "exists": true});
                }
                else {
                    usersArray[i].role = userToUpgrade.role;
                    fs.writeFile('./data/users.json', JSON.stringify(usersArray), 'utf-8', function(err) {
                        if (err) {
                            res.send({"success": false});
                            throw err;
                        } 
                    });
                    res.send({"success": true});
                }
            }
        }
    });
}