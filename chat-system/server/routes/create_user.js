module.exports = function(db,app){
    // Route to manage adding a user
    app.post('/api/create_user',function(req,res) {
        var User = require('../models/User.js');
        if (!req.body) {
            return res.sendStatus(400);
        }
        const collection = db.collection('users');
        collection.find({"uname":req.body.userName}).count((err,count)=>{
            if (err) res.send({"success": false, "exists": false});
            if (count == 0) {
                collection.find({}).count((err,count)=>{
                    if (err) res.send({"success": false, "exists": false});
                    var newUser = new User.User(count, req.body.userName, req.body.password, req.body.email, req.body.role);
                    collection.insertOne({"id":newUser.id, "uname":newUser.uname, "password":newUser.password, "email":newUser.email, "role":newUser.role},(err,dbres)=>{
                        if (err) res.send({"success": false, "exists": false});
                        res.send({"success": true});
                    });
                });
            }  
            else {
                res.send({"success": false, "exists": true});
            } 
        });
    });
}
