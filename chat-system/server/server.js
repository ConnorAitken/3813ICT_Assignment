var express = require('express'); //used for routing
var app = express();

var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../dist/my-app'));
console.log(__dirname);

// Start the server listening on port 3000. Output message to console once server has started. (Diagnostic only)
var http = require('http').Server(app);
var server = http.listen(3000, function() {
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();
    console.log('Server has been started at: ' + n + ':' + m);
    console.log("Server listening on http://localhost:3000/");
}); 

// Routing
app.post('/api/auth', require('./routes/login.js'));
app.post('/edit', require('./routes/edit_users.js'));
app.post('/groups', require('./routes/load_groups.js'));
app.post('/create_group', require('./routes/create_group.js'));
app.post('/remove_group', require('./routes/remove_group.js'));
app.post('/group_info', require('./routes/load_group_info.js'));
app.post('/create_room', require('./routes/create_room.js'));
app.post('/remove_room', require('./routes/remove_room.js'));
app.post('/invite_users', require('./routes/invite_users.js'));