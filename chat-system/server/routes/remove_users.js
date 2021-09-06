var fs = require('fs');

module.exports = function(req,res){
    if (!req.body) {
        return res.sendStatus(400);
    }
    let rooms = [];
    let room = [];
    fs.readFile('./data/rooms.json', 'utf8', function(err, data) {
        if (err) {
            res.send({"success": false});
            throw err;
        } 
        rooms = JSON.parse(data);

        let i = rooms.findIndex(room =>
            (room.groupID == req.body.groupID && room.name == req.body.roomName));
        if (i == -1) {
            console.log("Failed to find room");
            res.send({"success": false});
        }
        else {
            var roomsID = rooms[i].roomID;
        }

        var file = './data/assignments/'+req.body.groupID+'-'+roomsID+'.json';
        fs.readFile(file, 'utf8', function(err, data) {
            if (err) {
                res.send({"success": false});
                throw err;
            } 
            room = JSON.parse(data);
            let check = room.findIndex(r =>
                (r.uname == req.body.userName));
            if (check == -1) {
                console.log("User doesn't exists in Channel");
                res.send({"success": false, "exists": false});
            }
            else {
                room.splice(check, 1);
                fs.writeFile(file, JSON.stringify(room), 'utf-8', function(err) {
                    if (err) {
                        res.send({"success": false});
                        throw err;
                    } 
                });
                rooms[i].numOfUsers = rooms[i].numOfUsers - 1;
                fs.writeFile('./data/rooms.json', JSON.stringify(rooms), 'utf-8', function(err) {
                    if (err) {
                        res.send({"success": false});
                        throw err;
                    } 
                    res.send({"success": true});
                });
            }
        });
    });
}