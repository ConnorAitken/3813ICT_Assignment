module.exports = function(db,app){
    // Route to remove a user from a group room
    app.post('/api/remove_user',function(req,res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        var collection = db.collection('users');
        collection.find({"uname":req.body.userName}).toArray((err,data)=>{
            if (data.length == 1) {
                var userID = data[0].id
                collection = db.collection(req.body.groupName);
                collection.deleteOne({"roomID":req.body.roomID, "userID":userID},(err,docs)=>{
                    if (err) {
                        res.send({"success": false});
                        throw err;
                    }
                    if (docs.deletedCount == 0) res.send({"success": false, "exists": false});
                    else res.send({"success": true});
                });
            }
            else res.send({"success": false, "exists": false});
        });
    });
}
