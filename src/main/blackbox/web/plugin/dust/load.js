define('plugin/dust/load', ['dust'], function(dust){
    'use strict';

    dust.onLoad = function(name, callback) {
		require(['resource!templates/' + name + '.html?text'], function(template) {
	        callback(null, template);
	    });
	};

    return dust;

});