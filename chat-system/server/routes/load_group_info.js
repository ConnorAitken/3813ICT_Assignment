module.exports = function(db,app){
    // Route to get list of all groups from the database.
    app.post('/api/group_info',function(req,res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        const collection = db.collection('rooms');
        collection.find({groupID:req.body.id}).toArray().then(function(data) {
            res.send(data);
        });
    });
}
