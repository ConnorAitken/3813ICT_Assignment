module.exports = function(db,app){
    // Route to manage loading a chat's history
    app.post('/api/load_chat',function(req,res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        var coll = req.body.groupName + '_' + req.body.roomName;
        const collection = db.collection(coll);
        collection.find({}).toArray().then(function(data) {
            res.send(data);
        });
    });
}
