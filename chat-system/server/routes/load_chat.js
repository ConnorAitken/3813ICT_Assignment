module.exports = function(db,app){
    // Route to manage adding a user
    app.post('/api/load_chat',function(req,res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        var coll = req.body.groupName + '_' + req.body.roomName;
        const collection = db.collection(coll);
        collection.find({}).toArray().then(function(data) {
            // console.log("Found the following records");
            // console.log(data);
            res.send(data);
        });
    });
}
