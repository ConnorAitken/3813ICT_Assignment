module.exports = function(db,app){
    // Route to get list of all groups from the database.
    app.post('/api/groups',function(req,res) {
        const collection = db.collection('groups');
        collection.find({}).toArray().then(function(data) {
            res.send(data);
        });
    });
}