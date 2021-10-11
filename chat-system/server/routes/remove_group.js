module.exports = function(db,app,ObjectID){
    // Route to delete a group
    app.post('/remove_group',function(req,res) {
        if (!req.body._id) {
            return res.sendStatus(400);
        }
        objID = req.body._id;
        // Create a new mongo Object ID from the passed in _id
        var objectid = new ObjectID(objID);
        const collection = db.collection('groups');
        collection.find({"_id":objectid}).toArray((err,data)=>{
            if (err) {
                res.send({"removed": false});
                throw err;
            }  
            var groupID = data[0].id;
            // Delete a single item based on its unique ID.
            collection.deleteOne({_id:objectid},(err,docs)=>{
                if (err) {
                    res.send({"removed": false});
                    throw err;
                }  
                // Decrement the group.id's above the removed id.
                collection.updateMany({id:{$gt:groupID}}, {$inc: {id: -1}},(err,docs)=>{
                    if (err) {
                        res.send({"removed": false});
                        throw err;
                    }  
                    res.send({"removed": true});
                });
            });
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
//             res.send({"removed": false});
//             throw err;
//         }  
//         let groupsArray = JSON.parse(data);
//         let i = groupsArray.findIndex(group =>
//             (group.name == req.body.groupName));
//         if (i == -1) {
//             console.log("Failed to find group");
//             res.send({"removed": false});
//         }
//         else {
//             groupsArray.splice(i, 1);
//         }
//         for (let i = 0; i < groupsArray.length; i++) {
//             groupsArray[i].id = i;
//         }
//         fs.writeFile('./data/groups.json', JSON.stringify(groupsArray), 'utf-8', function(err) {
//             if (err) {
//                 res.send({"removed": false});
//                 throw err;
//             }
//             res.send({"removed": true});
//         });
//     });
// }