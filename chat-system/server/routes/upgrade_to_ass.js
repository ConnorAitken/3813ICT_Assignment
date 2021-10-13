module.exports = function(db,app,ObjectID){
    // Route to manage inviting a user to a group room
    app.post('/api/upgrade_to_ass',function(req,res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        var collection = db.collection('users');
        collection.find({"uname":req.body.userName}).toArray((err,data)=>{
            if (data.length == 1) {
                var userID = data[0].id
                collection = db.collection(req.body.groupName);
                collection.find({"userID":userID}).toArray((err,data)=>{
                    if (data.length >= 1) {
                        collection.updateMany({"userID":userID}, {$set: {"groupAssis":true}},(err,docs)=>{
                            if (err) {
                                res.send({"success": false});
                                throw err;
                            }  
                            res.send({"success": true});
                        });
                    }
                    else res.send({"success": false, "exists": false})
                });
            }
            else res.send({"success": false, "exists": false})
        });
    });
}
