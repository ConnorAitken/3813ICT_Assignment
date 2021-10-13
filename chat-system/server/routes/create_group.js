module.exports = function(db,app){
    // Route to manage adding a group
    app.post('/create_group',function(req,res) {
        var Group = require('../models/Group.js');
        if (!req.body) {
            return res.sendStatus(400);
        }
        const collection = db.collection('groups');
        collection.find({"name":req.body.groupName}).count((err,count)=>{
            if (err) res.send({"saved": false});
            if (count == 0) {
                collection.find({}).count((err,count)=>{
                    if (err) res.send({"saved": false});
                    var group = new Group.Group(count, req.body.groupName);
                    collection.insertOne(group,(err,dbres)=>{
                        if (err) res.send({"saved": false});
                        res.send({"saved": true});
                    });
                });
            }  
            else {
                res.send({"saved": false});
            } 
        }); 
    });
}

// var fs = require('fs');

// module.exports = function(req,res){
//     var Group = require('../Group.js');
//     if (!req.body) {
//         return res.sendStatus(400);
//     }
//     fs.readFile('./data/groups.json', 'utf8', function(err, data) {
//         if (err) {
//             res.send({"saved": false});
//             throw err;
//         }  
//         let groupsArray = JSON.parse(data);
//         var groupID = groupsArray.length;
//         var groupName = req.body.groupName;
//         var group = new Group.Group(groupID, groupName, 0, 1);
//         groupsArray.push(group);

//         fs.writeFile('./data/groups.json', JSON.stringify(groupsArray), 'utf-8', function(err) {
//             if (err) {
//                 res.send({"saved": false});
//                 throw err;
//             }
//             var superUsr = [{roomID:-1,userID:0,uname:"super"}];
//             var file = './data/groups/'+groupName+'.json';
//             fs.writeFile(file, JSON.stringify(superUsr), 'utf-8', function(err) {
//                 if (err) {
//                     res.send({"saved": false});
//                     throw err;
//                 }
//                 res.send({"saved": true});
//             });
//         });
//     });
// }
