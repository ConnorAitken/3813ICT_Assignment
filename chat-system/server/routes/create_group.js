var fs = require('fs');

module.exports = function(req,res){
    var Group = require('../Group.js');
    if (!req.body) {
        return res.sendStatus(400);
    }
    fs.readFile('./data/groups.json', 'utf8', function(err, data) {
        if (err) {
            res.send({"saved": false});
            throw err;
        }  
        let groupsArray = JSON.parse(data);
        var group = new Group.Group(groupsArray.length, req.body.groupName, '0', '0');
        groupsArray.push(group);

        fs.writeFile('./data/groups.json', JSON.stringify(groupsArray), 'utf-8', function(err) {
            if (err) {
                res.send({"saved": false});
                throw err;
            }
            res.send({"saved": true});
        });
    });
}