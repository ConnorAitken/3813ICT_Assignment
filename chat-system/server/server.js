var express = require('express'); //used for routing
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
const path = require('path')

app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../dist/my-app'));
app.use('/images', express.static(path.join('userimages')));
console.log(__dirname);

var http = require('http').Server(app);
const io = require('socket.io')(http,{
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
});
const sockets = require('./socket.js');

// Define port used for the server
const PORT = 3000;

// Setup Socket
sockets.connect(io,PORT);

// Setup Database Connection and Routes
const mongo = require('./mongo.js');
mongo(app);

// Setup server listening on port 3000
const server = require('./listen.js');
server.listen(http,PORT);

// var server = http.listen(PORT, function() {
//     var d = new Date();
//     var n = d.getHours();
//     var m = d.getMinutes();
//     console.log('Server has been started at: ' + n + ':' + m);
//     console.log("Server listening on http://localhost:3000/");
// });

// MongoClient.connect(url, {maxPoolSize:10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
//     // Callback funciton code. When we have a connection start the rest of the app.
//     if (err) {return console.log(err);}
//     const dbName = 'chat-system';
//     const db = client.db(dbName);

//     // Routing
    // require('./routes/login.js')(db,app);
    // require('./routes/load_groups.js')(db,app);
    // require('./routes/create_group.js')(db,app);
    // require('./routes/remove_group.js')(db,app,ObjectID);
    // require('./routes/load_group_info.js')(db,app);
    // require('./routes/create_room.js')(db,app);
    // require('./routes/remove_room.js')(db,app,ObjectID);
    // require('./routes/invite_users.js')(db,app);
    // require('./routes/remove_users.js')(db,app);
    // require('./routes/upgrade_to_ass.js')(db,app,ObjectID);
    // require('./routes/create_user.js')(db,app);
    // require('./routes/upgrade_user.js')(db,app,ObjectID);
    // require('./routes/load_group_users.js')(db,app);
    // require('./routes/save_chat.js')(db,app);
    // require('./routes/load_chat.js')(db,app);
    // require('./routes/upload_img.js')(app,formidable);

    // // Start the server listening on port 3000. Output message to console once server has started. (Diagnostic only)
    // var server = http.listen(PORT, function() {
    //     var d = new Date();
    //     var n = d.getHours();
    //     var m = d.getMinutes();
    //     console.log('Server has been started at: ' + n + ':' + m);
    //     console.log("Server listening on http://localhost:3000/");
    // });
// }); 
