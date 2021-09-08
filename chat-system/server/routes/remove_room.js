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
        let i = roomsArray.findIndex(room =>
            (room.groupID == req.body.groupID && room.name == req.body.roomName));
        if (i == -1) {
            console.log("Failed to find room");
            res.send({"removed": false});
        }
        else {
            var roomID = roomsArray[i].roomID;
            roomsArray.splice(i, 1);
        }
        fs.writeFile('./data/rooms.json', JSON.stringify(roomsArray), 'utf-8', function(err) {
            if (err) {
                res.send({"removed": false});
                throw err;
            }  
        });
        var file = './data/assignments/'+req.body.groupID+'-'+roomID+'.json';
        fs.unlinkSync(file);
        res.send({"removed": true});
    });
}