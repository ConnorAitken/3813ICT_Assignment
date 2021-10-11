var express = require('express'); //used for routing
var app = express();

const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017'; // Connection URL

var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../dist/my-app'));
console.log(__dirname);

MongoClient.connect(url, {maxPoolSize:10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    // Callback funciton code. When we have a connection start the rest of the app.
    if (err) {return console.log(err);}
    const dbName = 'chat-system';
    const db = client.db(dbName);

    // Routing
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

    // Start the server listening on port 3000. Output message to console once server has started. (Diagnostic only)
    var http = require('http').Server(app);
    var server = http.listen(3000, function() {
        var d = new Date();
        var n = d.getHours();
        var m = d.getMinutes();
        console.log('Server has been started at: ' + n + ':' + m);
        console.log("Server listening on http://localhost:3000/");
    });
}); 
