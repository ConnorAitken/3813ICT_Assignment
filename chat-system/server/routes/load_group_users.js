module.exports = function(db,app){
    // Route to get list of all groups from the database.
    app.post('/api/load_group_users',function(req,res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        let group = req.body;
        var collection = db.collection(group.name);
        collection.find({}).toArray().then(function(data) {
            var groupInfo = data;
            var userIDs = [];
            for(var i = 0; i < groupInfo.length; i++) {
                userIDs.push(groupInfo[i].userID);
            }
            collection = db.collection('users');
            collection.find({"id":{"$in":userIDs}}).toArray().then(function(data) {
                var users = data;
                var returnArray = [];
                for (let x = 0; x < groupInfo.length; x++) {
                    let y = users.findIndex(user =>(user.id == groupInfo[x].userID));
                    returnArray.push({"roomID":groupInfo[x].roomID, "userID":groupInfo[x].userID, "groupAssis":groupInfo[x].groupAssis, "uname":users[y].uname})
                }
                res.send(returnArray);
            });
        });
    });
}
