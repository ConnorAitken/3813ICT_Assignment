module.exports = function(db,app){
    // Route to manage adding a room
    app.post('/api/create_room',function(req,res) {
        var Room = require('../models/Room.js');
        if (!req.body) {
            return res.sendStatus(400);
        }
        const collection = db.collection('rooms');
        collection.find({groupID:req.body.groupID}).toArray().then(function(rooms) {
            let i = rooms.findIndex(r =>
                (r.name == req.body.roomName));
            if (i == -1) {
                var room = new Room.Room(req.body.groupID, rooms.length, req.body.roomName);
                collection.insertOne(room,(err,dbres)=>{
                    if (err) res.send({"saved": false, "exists": false});
                    res.send({"saved": true});
                });
            }
            else {
                res.send({"saved": false, "exists": true});
            }
        });
    });
}
