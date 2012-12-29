(function(context) {
    'use strict';

    require(['config/require', 'config/routing', 'config/settings.' + (context.ENV || 'prod')], function(requireConfig, routingConfig, settingsConfig) {

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