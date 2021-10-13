module.exports = function(db,app,ObjectID){
    // Route to delete a group
    app.post('/api/remove_group',function(req,res) {
        if (!req.body._id) {
            return res.sendStatus(400);
        }
        objID = req.body._id;
        // Create a new mongo Object ID from the passed in _id
        var objectid = new ObjectID(objID);
        const collection = db.collection('groups');
        collection.find({"_id":objectid}).toArray((err,data)=>{
            if (err) {
                res.send({"removed": false});
                throw err;
            }  
            var groupID = data[0].id;
            var groupName = data[0].name;
            // Delete a single item based on its unique ID.
            collection.deleteOne({_id:objectid},(err,docs)=>{
                if (err) {
                    res.send({"removed": false});
                    throw err;
                }  
                // Decrement the group.id's above the removed id.
                collection.updateMany({id:{$gt:groupID}}, {$inc: {id: -1}},(err,docs)=>{
                    if (err) {
                        res.send({"removed": false});
                        throw err;
                    }  
                    var collection = db.collection('rooms');
                    collection.deleteMany({"groupID":groupID},(err,docs)=>{
                        if (err) {
                            res.send({"removed": false});
                            throw err;
                        }
                        db.listCollections({name: groupName})
                            .next(function(err, collinfo) {
                                if (collinfo) {
                                    var collection = db.collection(groupName);
                                    collection.drop(function(err, delOK) {
                                        if (err) {
                                            res.send({"removed": false});
                                            throw err; 
                                        }
                                        if (delOK) {
                                            console.log("Collection deleted"); 
                                            res.send({"removed": true});
                                        }
                                    });
                                }
                            });
                    });
                });
            });
        }); 
    });
}
