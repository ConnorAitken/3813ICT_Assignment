var fs = require('fs');

module.exports = function(req,res){
    if (!req.body) {
        return res.sendStatus(400);
    }
    let group = req.body;
    var file = './data/groups/'+group.name+'.json';
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) throw err;
        let groupUsrs = JSON.parse(data);
        res.send(groupUsrs);
    });
}