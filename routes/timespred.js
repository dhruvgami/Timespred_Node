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

exports.addTime = function(req, res) {
    var time = req.body;
    console.log('Adding time: ' + JSON.stringify(time));
    db.collection('usertime', function(err, collection) {
        collection.insert(time, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};


exports.home = function(req, res) {
	res.send("Home page");
}
