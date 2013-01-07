
/**
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , path = require('path')
  , dust = require('klei-dust')
  , app = express();

var tasks = [
      { id: 0, task: 'Take Out Trash', status: true, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel odio massa, vel pulvinar nibh. Morbi mollis, lorem ac tempor pellentesque, erat est pharetra sapien, at egestas magna mi et.' },
      { id: 1, task: 'Call Mom', status: false, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel odio massa, vel pulvinar nibh. Morbi mollis, lorem ac tempor pellentesque, erat est pharetra sapien, at egestas magna mi et.' },
      { id: 2, task: 'Fix Bugs', status: false, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel odio massa, vel pulvinar nibh. Morbi mollis, lorem ac tempor pellentesque, erat est pharetra sapien, at egestas magna mi et.' }
    ];
  
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
      data: tasks
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
      data: tasks[req.param('id')]
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
