module.exports = function(db,app,ObjectID){
    // Route to delete a group
    app.post('/remove_room',function(req,res) {
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
                    // Decrement the group.id's above the removed id.
                    collection.updateMany({groupID:req.body.groupID, roomID:{$gt:roomID}}, {$inc: {roomID: -1}},(err,docs)=>{
                        if (err) {
                            res.send({"removed": false});
                            throw err;
                        }  
                        res.send({"removed": true});
                    });
                });
            }
        });
    });
}

// var fs = require('fs');

// module.exports = function(req,res){
//     var Room = require('../Room.js');
//     if (!req.body) {
//         return res.sendStatus(400);
//     }
//     fs.readFile('./data/rooms.json', 'utf8', function(err, data) {
//         if (err) {
//             res.send({"removed": false});
//             throw err;
//         }  
//         let roomsArray = JSON.parse(data);
        // let i = roomsArray.findIndex(room =>
        //     (room.groupID == req.body.groupID && room.name == req.body.roomName));
        // if (i == -1) {
        //     console.log("Failed to find room");
        //     res.send({"removed": false});
        // }
        // else {
        //     var roomID = roomsArray[i].roomID;
        //     roomsArray.splice(i, 1);
        // }
//         fs.writeFile('./data/rooms.json', JSON.stringify(roomsArray), 'utf-8', function(err) {
//             if (err) {
//                 res.send({"removed": false});
//                 throw err;
//             }  
//         });
//         var file = './data/assignments/'+req.body.groupID+'-'+roomID+'.json';
//         fs.unlinkSync(file);
//         res.send({"removed": true});
//     });
// }