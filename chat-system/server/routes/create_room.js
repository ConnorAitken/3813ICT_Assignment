module.exports = function(db,app){
    // Route to manage adding a room
    app.post('/create_room',function(req,res) {
        var Room = require('../models/Room.js');
        if (!req.body) {
            return res.sendStatus(400);
        }
        const collection = db.collection('rooms');
        collection.find({groupID:req.body.groupID}).toArray().then(function(rooms) {
            console.log("Found the following records");
            console.log(rooms);
            let i = rooms.findIndex(r =>
                (r.roomName == req.body.roomName));
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

// var fs = require('fs');

// module.exports = function(req,res){
//     var Room = require('../Room.js');
//     if (!req.body) {
//         return res.sendStatus(400);
//     }
//     fs.readFile('./data/rooms.json', 'utf8', function(err, data) {
//         if (err) {
//             res.send({"saved": false});
//             throw err;
//         }  
//         let roomsArray = JSON.parse(data);
//         let groupRooms = [];
//         for (let i = 0; i < roomsArray.length; i++) {
//             if (req.body.groupID == roomsArray[i].groupID) {
//                 groupRooms.push(roomsArray[i]);
//             }
//         }
//         let roomID = 0;
//         if (groupRooms.length != 0) {
//             roomID = groupRooms[groupRooms.length - 1].roomID + 1;
//         }
//         var room = new Room.Room(req.body.groupID, roomID, req.body.roomName, 0);
//         let i = roomsArray.findIndex(rooms =>
//             (rooms.name == room.name));
//         if (i == -1) {
//             roomsArray.push(room);
//             fs.writeFile('./data/rooms.json', JSON.stringify(roomsArray), 'utf-8', function(err) {
//                 if (err) {
//                     res.send({"saved": false, "exists": false});
//                     throw err;
//                 }
//             });
//             var file = './data/assignments/'+room.groupID+'-'+room.roomID+'.json';
//             let emptyArr = [];
//             fs.writeFile(file, JSON.stringify(emptyArr), 'utf-8', function(err) {
//                 if (err) {
//                     res.send({"saved": false, "exists": false});
//                     throw err;
//                 }
//                 res.send({"saved": true});
//             });
//         }
//         else {
//             res.send({"saved": false, "exists": true});
//         }
//     });
// }