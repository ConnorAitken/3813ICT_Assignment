var fs = require('fs');

module.exports = function(req,res){
    var User = require('../User.js');
    if (!req.body) {
        return res.sendStatus(400);
    }
    var customer = new User.User(req.body.id, req.body.uname, req.body.bdate, req.body.age, req.body.email, '');
    fs.readFile('./routes/users.json', 'utf8', function(err, data) {
        if (err) {
            res.send({"saved": false});
            throw err;
        }  
        let usersArray = JSON.parse(data);
        // console.log(usersArray[Number(customer.id)]);
        customer.upwd = usersArray[Number(customer.id)].upwd;
        usersArray[Number(customer.id)] = customer;
        // console.log(usersArray[Number(customer.id)]);

        fs.writeFile('./routes/users.json', JSON.stringify(usersArray), 'utf-8', function(err) {
            if (err) {
                res.send({"saved": false});
                throw err;
            }
            res.send({"saved": true});
        });
    });
}