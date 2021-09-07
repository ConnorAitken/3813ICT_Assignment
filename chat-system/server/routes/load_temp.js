var fs = require('fs');

module.exports = function(req,res){
    fs.readFile('./data/temp.json', 'utf8', function(err, data) {
        if (err) throw err;
        res.send(JSON.parse(data));
    });
}