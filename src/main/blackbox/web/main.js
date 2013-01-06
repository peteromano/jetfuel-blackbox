(function(context) {
    'use strict';

    var config;

    try {

        config = JSON.parse(context.document.getElementById('application-conf').innerHTML);

    } catch(e) {

        config = {
            ENV: 'prod'
        };

    }

    // Load configuration
    require(['config/require', 'config/routing', 'config/settings.' + config.ENV], function(requireConfig, routingConfig, settingsConfig) {
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