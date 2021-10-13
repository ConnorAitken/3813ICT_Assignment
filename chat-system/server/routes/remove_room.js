module.exports = function(db,app,ObjectID){
    // Route to delete a room from a group.
    app.post('/api/remove_room',function(req,res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        const collection = db.collection('rooms');
        collection.find({groupID:req.body.groupID}).toArray().then(function(rooms) {
            let i = rooms.findIndex(r =>
                (r.name == req.body.roomName));
            if (i == -1) {
                res.send({"removed": false});
                console.log("Failed to Find Room")
            }
            else {
                var roomID = rooms[i].roomID;
                var objectid = new ObjectID(rooms[i]._id);
                // Delete a single item based on its unique ID.
                collection.deleteOne({_id:objectid},(err,docs)=>{
                    if (err) {
                        res.send({"removed": false});
                        throw err;
                    }  
                    // Decrement the room.id's above the removed id.
                    collection.updateMany({groupID:req.body.groupID, roomID:{$gt:roomID}}, {$inc: {roomID: -1}},(err,docs)=>{
                        if (err) {
                            res.send({"removed": false});
                            throw err;
                        }  
                        var collection = db.collection(req.body.groupName);
                        collection.deleteMany({"roomID":roomID},(err,docs)=>{
                            if (err) {
                                res.send({"removed": false});
                                throw err;
                            }
                            res.send({"removed": true});
                        });
                    });
                });
            }
        });
    });
}
