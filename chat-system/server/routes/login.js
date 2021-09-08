var fs = require('fs');

module.exports = function(req,res){
    var User = require('../User.js');
    if (!req.body) {
        return res.sendStatus(400);
    }
    var newUser = new User.User('', req.body.uname, '', '');
    fs.readFile('./data/users.json', 'utf8', function(err, data) {
        if (err) throw err;
        let usersArray = JSON.parse(data);
        let i = usersArray.findIndex(user =>
            (user.uname == newUser.uname));
        if (i == -1) {
            newUser.valid = false;
            res.send(newUser);
        }
        else {
            usersArray[i].valid = true;
            res.send(usersArray[i]);
        }
    });
}