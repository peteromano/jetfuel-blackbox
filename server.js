
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
  var context = {
      errors: []
    };

  if(req.xhr) {
    res.type('application/json');
    res.send(200, JSON.stringify(context));
  } else {
    context.layout = true;
    context.ENV = 'dev';
    context.TEMPLATE_ENGINE = 'dust';
    res.render('home/landing', context);
  }
});

app.get('/todos', function(req, res){
  var context = {
      errors: [],
      data: [
        { id: 0, task: 'Task 1', status: true },
        { id: 1, task: 'Task 2', status: false },
        { id: 2, task: 'Task 3', status: false }
      ]
    };

  if(req.xhr) {
    res.type('application/json');
    res.send(200, JSON.stringify(context));
  } else {
    context.layout = true;
    context.ENV = 'dev';
    context.TEMPLATE_ENGINE = 'dust';
    res.render('todos/list', context);
  }
});

app.get('/todos/:id', function(req, res){
  var context = {
      errors: [],
      data: {
        id: 0,
        task: 'Task 1',
        status: true
      }
    };

  if(req.xhr) {
    res.type('application/json');
    res.send(200, JSON.stringify(context));
  } else {
    context.layout = true;
    context.ENV = 'dev';
    context.TEMPLATE_ENGINE = 'dust';
    res.render('todos/detail', context);
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
