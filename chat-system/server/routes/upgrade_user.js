module.exports = function(db,app,ObjectID){
    // Route to manage upgrading a user's role
    app.post('/api/upgrade_user',function(req,res) {
        var User = require('../models/User.js');
        if (!req.body) {
            return res.sendStatus(400);
        }
        var userToUpgrade = new User.User('', req.body.userName, '', '', req.body.role);
        const collection = db.collection('users');
        collection.find({"uname":userToUpgrade.uname}).toArray((err,data)=>{
            if (data.length == 1) {
                var objectid = new ObjectID(data[0]._id);
                if (userToUpgrade.role == "SuperAdmin") {
                    if (data[0].role != "SuperAdmin") {
                        collection.updateOne({_id:objectid},{$set:{"role":userToUpgrade.role}},()=>{
                            res.send({"success": true});
                        });
                    }
                    else {
                        res.send({"success": false, "exists": true});
                    }
                }
                else {
                    if (data[0].role == "SuperAdmin" || data[0].role == "GroupAdmin") {
                        res.send({"success": false, "exists": true});
                    }
                    else {
                        collection.updateOne({_id:objectid},{$set:{"role":userToUpgrade.role}},()=>{
                            res.send({"success": true});
                        });
                    }
                }
            }
            else res.send({"success": false, "exists": false});
        });
    });
}
