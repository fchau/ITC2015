
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , flickr = require('./routes/flickr'),
    about = require('./routes/about')
  , bitzplz = require('./routes/bitzplz')
  , about = require('./routes/about')
  , http = require('http')
  , path = require('path');

var app = express();

var mongoose = require('mongoose');
mongoose.connect('localhost');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
});
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Define server routes used in the application
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/about', about.about);
app.get('/bitzplz', bitzplz.bitzplz);
app.get('/about', about.about)
app.get('/flickr/mostRecent', flickr.mostRecent);
app.get('/flickr/:reportId', flickr.getReport);
app.put('/flickr/:reportId/:imgId', flickr.updateImage);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
