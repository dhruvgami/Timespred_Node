var express = require('express'),
    path = require('path'),
    http = require('http'),
    wine = require('./routes/wines');
    timespred = require('./routes/timespred');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3030);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);


app.get('/time', timespred.home);
app.get('/time/summary', timespred.summary);
app.post('/time', timespred.addTime);
app.put('/time', timespred.addTime);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
