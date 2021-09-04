var fs = require('fs');

module.exports = function(req,res){
    var Group = require('../Group.js');
    if (!req.body) {
        return res.sendStatus(400);
    }
    fs.readFile('./data/groups.json', 'utf8', function(err, data) {
        if (err) {
            res.send({"removed": false});
            throw err;
        }  
        let groupsArray = JSON.parse(data);
        let i = groupsArray.findIndex(group =>
            (group.name == req.body.groupName));
        if (i == -1) {
            console.log("Failed to find group");
            res.send({"removed": false});
        }
        else {
            groupsArray.splice(i, 1);
        }
        for (let i = 0; i < groupsArray.length; i++) {
            groupsArray[i].id = i;
        }
        fs.writeFile('./data/groups.json', JSON.stringify(groupsArray), 'utf-8', function(err) {
            if (err) {
                res.send({"removed": false});
                throw err;
            }
            res.send({"removed": true});
        });
    });
}