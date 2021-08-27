var fs = require('fs');

module.exports = function(req,res){
    var User = require('../User.js');
    if (!req.body) {
        return res.sendStatus(400);
    }
    var customer = new User.User('', req.body.uname, '', '');
    fs.readFile('./data/users.json', 'utf8', function(err, data) {
        if (err) throw err;
        let usersArray = JSON.parse(data);
        console.log(customer);
        let i = usersArray.findIndex(user =>
            (user.uname == customer.uname));
        if (i == -1) {
            customer.valid = false;
            console.log(customer);
            res.send(customer);
        }
        else {
            usersArray[i].valid = true;
            console.log(usersArray[i]);
            res.send(usersArray[i]);
        }
    });
}