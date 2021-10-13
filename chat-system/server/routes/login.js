module.exports = function(db,app){
    // Route to authorise user.
    app.post('/api/auth',function(req,res) {
        var User = require('../models/User.js');
        var newUser = new User.User('', req.body.uname, req.body.password, '', '');
        const collection = db.collection('users');
        collection.find({"uname":newUser.uname, "password":newUser.password}).toArray((err,data)=>{
            if (data.length == 1) {
                newUser = new User.User(data[0].id, data[0].uname, data[0].password, data[0].email, data[0].role);
                newUser.valid = true;
            }
            // console.log(newUser);
            res.send(newUser);
        });
    });
}