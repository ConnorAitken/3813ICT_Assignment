module.exports = function(app){
    const MongoClient = require('mongodb').MongoClient;
    var ObjectID = require('mongodb').ObjectID;
    const formidable = require('formidable');

    const url = 'mongodb://localhost:27017'; // Connection URL

    MongoClient.connect(url, {maxPoolSize:10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
        // Callback funciton code. When we have a connection start the rest of the app.
        if (err) {return console.log(err);}
        const dbName = 'chat-system';
        const db = client.db(dbName);
        
        require('./routes/login.js')(db,app);
        require('./routes/load_groups.js')(db,app);
        require('./routes/create_group.js')(db,app);
        require('./routes/remove_group.js')(db,app,ObjectID);
        require('./routes/load_group_info.js')(db,app);
        require('./routes/create_room.js')(db,app);
        require('./routes/remove_room.js')(db,app,ObjectID);
        require('./routes/invite_users.js')(db,app);
        require('./routes/remove_users.js')(db,app);
        require('./routes/upgrade_to_ass.js')(db,app,ObjectID);
        require('./routes/create_user.js')(db,app);
        require('./routes/upgrade_user.js')(db,app,ObjectID);
        require('./routes/load_group_users.js')(db,app);
        require('./routes/save_chat.js')(db,app);
        require('./routes/load_chat.js')(db,app);
        require('./routes/upload_img.js')(app,formidable);
    });
}

