(function() {
    'use strict';

    var VERSION = '2.0';

    var /**
         * @private
         * @name version
         * @type String
         * @fieldOf blackbox.web.model.Application.prototype
         * @description 2.0
         */
        version,

        /**
         * @private
         * @name router
         * @type Backbone.Router
         * @fieldOf blackbox.web.model.Application.prototype
         */
        router,

        /**
         * @private
         * @name layout
         * @type blackbox.web.view.Layout
         * @fieldOf blackbox.web.model.Application.prototype
         */
        layout,

        /**
         * @private
         * @name user
         * @type blackbox.web.model.User
         * @fieldOf blackbox.web.model.Application.prototype
         */
        user,

        /**
         * @private
         * @name app
         * @type blackbox.web.model.Application
         * @fieldOf blackbox.web.model.Application.prototype
         */
        app;

    var /**
         * @private
         * @name config
         * @type Object
         * @fieldOf blackbox.web.model.Application.prototype
         */
        config = {
            context: window,
            routing: {},
            settings: {
                debug: false,
                services: {
                    facebook: {
                        status: true,
                        cookie: true,
                        xfbml: true
                    },
                    google: {
                        analytics: {}
                    }
                }
            }
        },

        /**
         * @private
         * @name services
         * @type Array
         * @fieldOf blackbox.web.model.Application.prototype
         */
        services = [];

    services.load = function() {
        var services = this.concat(Array.prototype.slice.call(arguments)), service;

        while((service = services.shift())) {
            service.load();
        }
    };

    /**
     * @private
     * @returns {Function}
     * @methodOf blackbox.web.model.Application.prototype
     */
    function lambda(value) {
        return function() { return value; };
    }

    /**
     * @private
     * @returns {Function}
     * @methodOf blackbox.web.model.Application.prototype
     */
    function getApplicationClass() {
        return app && app.constructor;
    }

    /**
     * @static
     * @methodOf blackbox.web.model.Application
     * @returns {blackbox.web.model.Application}
     */
    function getInstance() {
        var Application = this;
        return app || (app = new Application());
    }

    /**
     * @private
     * @return {Object}
     */
    function getUserData() {
        var dataElement = config.context.document.getElementById('blackbox-user-data'),
            data = {};

        if(dataElement) {
            try {
                data = JSON.parse(dataElement.innerHTML);
            } catch(e) {

            }
        }

        return data;
    }

    /**
     * @private
     * @methodOf blackbox.web.model.Application.prototype
     */
    function unload() {
        app.get('layout').destroy();
    }

    /**
     * @private
     * @methodOf blackbox.web.model.Application.prototype
     */
    function domready() {
        app.get('layout').trigger('render:success');
    }

    define('model/Application', [
        '_',
        '$',
        'plugin/backbone/sync',
        'model/Controller',
        'model/User',
        'view/Layout',
        'util/GoogleAnalytics',
        'util/FacebookApi'
    ], function(_, $, Backbone, Controller, User, Layout, GoogleAnalytics, FacebookApi) {
        var Application = getApplicationClass();

        if(!Application) {
            /**
             * @lends blackbox.web.model.Application.prototype
             */
            (Application = lambda()).prototype = _.extend(new Backbone.Model(), {
                /**
                 * @constructs
                 * @version 2.0
                 * @augments Backbone.Model
                 * @param {Object} config
                 * @description
                 * Subscriptions: <code>domready</code>, <code>unload</code>
                 * <br />
                 * Publishes: <code>domready</code>, <code>unload</code>
                 */
                initialize: function(cfg) {
                    // Set Application#initialize() as a noop, with the same return signature
                    this.initialize = lambda(this);

                    // Set application config
                    this.config(cfg);

                    this.set({
                        // Set the Application version
                        version: VERSION,
                        // Create and store a new router instance
                        router: Controller.createRouter(config.routing),
                        // Create the user object
                        user: new User(getUserData()),
                        // Instantiate the Layout view
                        layout: new Layout()
                    })
                        // Set event handlers for Application events
                        .on({
                            'domready': domready,
                            'unload':   unload
                        });

                    // Start the history session (triggers the initial page view)
                    Controller.startSession();

                    // Trigger Application's domready event on jQuery's domready event
                    $(_.bind(this.trigger, this, 'domready'));

                    // Trigger Application's unload event on context's unload event
                    $(config.context).on('unload', _.bind(this.trigger, this, 'unload'));

                    // Load third-party services
                    services.load(GoogleAnalytics, FacebookApi);

                    // Return the Application API
                    return this;
                },

                /**
                 * @param {Object} config
                 * @returns {Object}
                 */
                config: function(cfg) {
                    if(typeof cfg == 'object') {
                        return (config = $.extend(true, config, cfg || {}));
                    } else {
                        return cfg && config[cfg] || config;
                    }
                }

            });

            Application.getInstance = _.bind(getInstance, Application);
        }

        return Application;
    });

})();