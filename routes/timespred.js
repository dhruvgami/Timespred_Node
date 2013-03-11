var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('timespred', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'timespred' database");
        db.collection('usertime', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'timespred' collection doesn't exist.");
            }
        });
    }
});

exports.summary = function(req, res) {
    db.collection('usertime', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.home = function(req, res) {
	res.send("Home page");
}
