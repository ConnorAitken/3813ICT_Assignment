module.exports = function(db,app){
    // Route to manage adding a group
    app.post('/api/create_group',function(req,res) {
        var Group = require('../models/Group.js');
        if (!req.body) {
            return res.sendStatus(400);
        }
        const collection = db.collection('groups');
        collection.find({"name":req.body.groupName}).count((err,count)=>{
            if (err) res.send({"saved": false});
            if (count == 0) {
                collection.find({}).count((err,count)=>{
                    if (err) res.send({"saved": false});
                    var group = new Group.Group(count, req.body.groupName);
                    collection.insertOne(group,(err,dbres)=>{
                        if (err) res.send({"saved": false});
                        res.send({"saved": true});
                    });
                });
            }  
            else {
                res.send({"saved": false});
            } 
        }); 
    });
}
