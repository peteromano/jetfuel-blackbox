
/**
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , path = require('path')
  , hbs = require('hbs')
  , app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/src/resources/blackbox/web/templates');
  app.set('view engine', 'html');
  app.engine('html', hbs.__express);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
  var data = {};

  if(req.xhr) {
    res.type('application/json');
    res.send(200, JSON.stringify(data));
  } else {
    data.env = req.param('env') || 'prod';
    hbs.registerPartial('content', fs.readFileSync(app.get('views') + '/home/landing.html', 'utf8'));
    res.render('layout', data);
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
