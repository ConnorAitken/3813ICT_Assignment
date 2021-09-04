var fs = require('fs');

module.exports = function(req,res){
    if (!req.body) {
        return res.sendStatus(400);
    }
    fs.readFile('./data/rooms.json', 'utf8', function(err, data) {
        if (err) throw err;
        let roomsArray = JSON.parse(data);
        let groupRooms = [];
        for (let i = 0; i < roomsArray.length; i++) {
            if (req.body.id == roomsArray[i].groupID) {
                groupRooms.push(roomsArray[i]);
            }
        }
        // if (groupRooms.length == 0) {

        // }
        // else {

        // }
        res.send(groupRooms);
    });
}