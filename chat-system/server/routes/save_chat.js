module.exports = function(db,app){
    // Route to manage adding a user
    app.post('/api/save_chat',function(req,res) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        var coll = req.body.groupName + '_' + req.body.roomName;
        const messages = req.body.messages;
        const collection = db.collection(coll);
        collection.deleteMany({},(err,docs)=>{
            if (err) {
                res.send({"success": false});
                throw err;
            }  
            collection.insertOne({"messages":messages},(err,dbres)=>{
                if (err) {
                    res.send({"success": false});
                    throw err;
                }  
                res.send({"success": true});
            });;
        });
    });
}
