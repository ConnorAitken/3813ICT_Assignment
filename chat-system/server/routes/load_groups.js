module.exports = function(db,app){
    // Route to get list of all groups from the database.
    app.post('/groups',function(req,res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        const collection = db.collection('groups');
        collection.find({}).toArray().then(function(data) {
            console.log("Found the following records");
            console.log(data);
            console.log(typeof(data));
            res.send(data);
        });
    });
}