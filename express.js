
/**
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , path = require('path')
  , app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/src/resources/blackbox/web/templates');
  app.set('view engine', 'html');
  app.engine('html', require('hbs').__express);
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

app.get(/(^.*(\.|\/)(?!(js|css|html|htm|handlebars|gif|jpg|jpeg|png|swf|txt)$)(?![^\.\/]*(\.|\/)))|(^[^\.]+$)/i, function(req, res){
  res.type('text/html');
  res.render('home/landing', {
    layout: req.xhr ? 'ajax' : 'layout',
    env: req.param('env') || 'prod'
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
