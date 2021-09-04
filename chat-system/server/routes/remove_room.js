var fs = require('fs');

module.exports = function(req,res){
    var Room = require('../Room.js');
    if (!req.body) {
        return res.sendStatus(400);
    }
    fs.readFile('./data/rooms.json', 'utf8', function(err, data) {
        if (err) {
            res.send({"removed": false});
            throw err;
        }  
        let roomsArray = JSON.parse(data);
        // let groupRooms = [];
        // for (let i = 0; i < roomsArray.length; i++) {
        //     if (req.body.groupdID == roomsArray[i].groupdID) {
        //         groupRooms.push(roomsArray[i]);
        //     }
        // }
        let i = roomsArray.findIndex(room =>
            (room.groupID == req.body.groupID && room.name == req.body.name));
        if (i == -1) {
            console.log("Failed to find room");
            res.send({"removed": false});
        }
        else {
            var roomID = roomsArray[i].roomID;
            roomsArray.splice(i, 1);
        }
        // for (let i = 0; i < roomsArray.length; i++) {
        //     roomsArray[i].id = i;
        // }
        fs.writeFile('./data/rooms.json', JSON.stringify(roomsArray), 'utf-8', function(err) {
            if (err) {
                res.send({"removed": false});
                throw err;
            }
            // res.send({"removed": true});
        });
        var file = './data/assignments/'+req.body.groupID+'-'+roomID+'.json';
        fs.unlinkSync(file);
    });
}