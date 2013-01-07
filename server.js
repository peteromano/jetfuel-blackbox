
/**
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , path = require('path')
  , dust = require('klei-dust')
  , app = express();
  
dust.setOptions({
  relativeToFile: false,
  extension: 'html'
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/src/resources/blackbox/web/templates');
  app.engine('html', dust.dust);
  app.set('view engine', 'html');
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
    data.layout = true;
    data.ENV = 'dev';
    data.TEMPLATE_ENGINE = 'dust';
    res.render('home/landing', data);
  }
});

app.get('/todos', function(req, res){
  var data = {};

  if(req.xhr) {
    res.type('application/json');
    res.send(200, JSON.stringify(data));
  } else {
    data.layout = true;
    data.ENV = 'dev';
    data.TEMPLATE_ENGINE = 'dust';
    res.render('todos/list', data);
  }
});

app.get('/todos/:id', function(req, res){
  var data = {};

  if(req.xhr) {
    res.type('application/json');
    res.send(200, JSON.stringify(data));
  } else {
    data.layout = true;
    data.ENV = 'dev';
    data.TEMPLATE_ENGINE = 'dust';
    res.render('todos/detail', data);
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
