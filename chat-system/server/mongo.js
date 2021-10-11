const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017'; // Connection URL
const db;

MongoClient.connect(url, {maxPoolSize:10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    // Callback funciton code. When we have a connection start the rest of the app.
    if (err) {return console.log(err);}
    const dbName = 'chat-system';
    const db = client.db(dbName);
    module.exports = db, ObjectID;
});

