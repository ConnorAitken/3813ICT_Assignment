var fs = require('fs');

module.exports = function(req,res){
    if (!req.body) {
        return res.sendStatus(400);
    }
    let rooms = req.body;
    let userList = [];
    for (let i = 0; i < rooms.length; i++) {
        var file = './data/assignments/'+rooms[i].groupID+'-'+rooms[i].roomID+'.json';
        fs.readFile(file, 'utf8', function(err, data) {
            if (err) {
                res.send({"success": false});
                throw err;
            } 
            let temp = JSON.parse(data);
            for (let x = 0; x < temp.length; x++) {
                let y = userList.findIndex(user =>
                    (user.uname == temp[x].uname));
                if (y == -1) {
                    userList.push(temp[x]);
                }
            }
            fs.writeFile('./data/temp.json', JSON.stringify(userList), 'utf-8', function(err) {
                if (err) {
                    res.send({"success": false});
                    throw err;
                } 
            });
        });
    }
    res.send({"success": true});
}