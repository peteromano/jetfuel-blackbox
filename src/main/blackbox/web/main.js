(function(context) {
    'use strict';

    var config;

    try {

        config = JSON.parse(context.document.getElementById('data-application').innerHTML);

    } catch(e) {

        config = {
            SETTINGS: 'settings.prod'
        };

    }

    // Load configuration
    require(['config/require', 'config/routing', 'config/' + config.SETTINGS], function(requireConfig, routingConfig, settingsConfig) {
        // Set RequireJS config and require the Application
        require.config(requireConfig).call(require, ['core/Application'], function(Application) {
            // Initialize the application
            Application.getInstance().initialize({
                context: context,
                routing: routingConfig,
                settings: settingsConfig
            });
        });

    });

})(this);