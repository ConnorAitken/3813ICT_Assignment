var fs = require('fs');

module.exports = function(req,res){
    var User = require('../User.js');
    if (!req.body) {
        return res.sendStatus(400);
    }
    let users = [];
    let rooms = [];
    let room = [];
    fs.readFile('./data/users.json', 'utf8', function(err, data) {
        if (err) {
            res.send({"success": false});
            throw err;
        }  
        users = JSON.parse(data);
    
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
                var file = './data/assignments/'+req.body.groupID+'-'+roomsID+'.json';
                fs.readFile(file, 'utf8', function(err, data) {
                    if (err) {
                        res.send({"success": false});
                        throw err;
                    } 
                    room = JSON.parse(data);
                    let check = room.findIndex(r =>
                        (r.uname == req.body.userName));
                    if (check != -1) {
                        console.log("User already in Channel");
                        res.send({"success": false, "exists": true});
                    }
                    else {
                        let x = users.findIndex(user =>
                            (user.uname == req.body.userName));
                        if (x == -1) {
                            console.log("No User Found");
                            var id = users[users.length-1].id + 1;
                            var user = new User.User(id, req.body.userName, '', 'stdUser');
                            users.push(user);
                            fs.writeFile('./data/users.json', JSON.stringify(users), 'utf-8', function(err) {
                                if (err) {
                                    res.send({"success": false});
                                    throw err;
                                } 
                            });
                        }
                        else {
                            var user = users[x];
                        }
                        if (room.length == 0) {var roomID = 0;}
                        else {var roomID = room[room.length-1].id + 1;}
                        var roomUser = {
                            id:roomID,
                            userID:user.id, 
                            uname:user.uname
                        }
                        room.push(roomUser);
                        fs.writeFile(file, JSON.stringify(room), 'utf-8', function(err) {
                            if (err) {
                                res.send({"success": false});
                                throw err;
                            } 
                        });
                        rooms[i].numOfUsers = rooms[i].numOfUsers + 1;
                        fs.writeFile('./data/rooms.json', JSON.stringify(rooms), 'utf-8', function(err) {
                            if (err) {
                                res.send({"success": false});
                                throw err;
                            } 
                        });
                        var groupfile = './data/groups/'+req.body.groupName+'.json';
                        fs.readFile(groupfile, 'utf8', function(err, data) {
                            if (err) {
                                res.send({"success": false});
                                throw err;
                            }
                            let groupUsrs = JSON.parse(data);
                            var usr = {
                                roomID:roomsID,
                                userID:user.id, 
                                uname:user.uname
                            };
                            groupUsrs.push(usr);
                            fs.writeFile(groupfile, JSON.stringify(groupUsrs), 'utf-8', function(err) {
                                if (err) {
                                    res.send({"success": false});
                                    throw err;
                                } 
                                res.send({"success": true});
                            });
                        });
                    }
                });
            }
        });
    });
}