module.exports = function(db,app){
    // Route to manage inviting a user to a group room
    app.post('/api/invite_user',function(req,res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        var collection = db.collection('users');
        collection.find({"uname":req.body.userName}).toArray((err,data)=>{
            if (data.length == 1) {
                var userID = data[0].id
                collection = db.collection(req.body.groupName);
                collection.find({"roomID":req.body.roomID, "userID":userID}).count((err,count)=>{
                    if (count == 0) {
                        collection.find({"userID":userID}).toArray((err,data)=>{
                            if (data.length >= 1) var groupAssis = data[0].groupAssis;
                            else var groupAssis = false;
                            collection.insertOne({"roomID":req.body.roomID, "userID":userID, "groupAssis":groupAssis},(err,dbres)=>{
                                if (err) res.send({"success": false, "exists": false});
                                res.send({"success": true});
                            });
                        });
                    }
                    else res.send({"success": false, "exists": true});
                });
            }
            else res.send({"success": false});
        });
    });
}
