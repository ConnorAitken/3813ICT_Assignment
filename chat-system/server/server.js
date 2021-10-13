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

module.exports = app;
