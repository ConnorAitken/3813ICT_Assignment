var fs = require('fs');

module.exports = function(req,res){
    var User = require('../User.js');
    if (!req.body) {
        return res.sendStatus(400);
    }
    fs.readFile('./data/users.json', 'utf8', function(err, data) {
        if (err) {
            res.send({"success": false});
            throw err;
        }  
        let usersArray = JSON.parse(data);
        var id = usersArray[usersArray.length - 1].id + 1;
        var newUser = new User.User(id, req.body.userName, req.body.email, req.body.role);
        let i = usersArray.findIndex(user =>
            (user.uname == newUser.uname));
        if (i == -1) {
            usersArray.push(newUser);
            fs.writeFile('./data/users.json', JSON.stringify(usersArray), 'utf-8', function(err) {
                if (err) {
                    res.send({"success": false, "exists": false});
                    throw err;
                }
                res.send({"success": true});
            });
        }
        else {
            res.send({"success": false, "exists": true});
        }
    });
}