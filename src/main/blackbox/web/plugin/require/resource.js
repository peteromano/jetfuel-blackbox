define(function(){
    'use strict';

    return {

        load : function(name, req, onLoad, config){
            var modifiers, pluginName;
            name = name.split('?');
            modifiers = name.pop().split(',');
            require([pluginName = modifiers[0]], function(plugin) {
                plugin.load.call(plugin, name.pop().replace(
                    /^(\w)/,
                    (config.config[pluginName == 'css' ? 'css' : 'resource'].baseUrl + '$1')
                ) + (modifiers[1] == 'sync' ? '?sync' : ''), req, onLoad, config);
            });
        }

    };

});
