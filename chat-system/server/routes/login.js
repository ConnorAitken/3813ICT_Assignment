var fs = require('fs');

module.exports = function(req,res){
    var User = require('../User.js');
    if (!req.body) {
        return res.sendStatus(400);
    }
    var customer = new User.User('', '', '', '', req.body.email, req.body.upwd);
    fs.readFile('./routes/users.json', 'utf8', function(err, data) {
        if (err) throw err;
        let usersArray = JSON.parse(data);
        // console.log(usersArray[0]);
        let i = usersArray.findIndex(user =>
            ((user.email == customer.email) && (user.upwd == customer.upwd)));
        if (i == -1) {
            customer.valid = false;
            // console.log(customer);
            res.send(customer);
        }
        else {
            usersArray[i].valid = true;
            // console.log(usersArray[i]);
            res.send(usersArray[i]);
        }
    });
}