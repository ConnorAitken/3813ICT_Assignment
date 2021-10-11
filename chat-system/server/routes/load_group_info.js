module.exports = function(db,app){
    // Route to get list of all groups from the database.
    app.post('/group_info',function(req,res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        const collection = db.collection('rooms');
        collection.find({groupID:req.body.id}).toArray().then(function(data) {
            console.log("Found the following records");
            console.log(data);
            res.send(data);
        });
    });
}

// var fs = require('fs');

// module.exports = function(req,res){
//     if (!req.body) {
//         return res.sendStatus(400);
//     }
//     fs.readFile('./data/rooms.json', 'utf8', function(err, data) {
//         if (err) throw err;
//         let roomsArray = JSON.parse(data);
//         let groupRooms = [];
//         for (let i = 0; i < roomsArray.length; i++) {
//             if (req.body.id == roomsArray[i].groupID) {
//                 groupRooms.push(roomsArray[i]);
//             }
//         }
//         res.send(groupRooms);
//     });
// }