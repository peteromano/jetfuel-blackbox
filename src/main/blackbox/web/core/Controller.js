define('core/Controller', ['$', '_', 'Backbone'], function($, _, Backbone) {
    'use strict';

    var /**
         * @constant
         * @private
         * @type String
         * @fieldOf manero.web.core.Controller
         * @description Value: "view"
         */
        ROOT_VIEW_PATH = 'view';

    var /**
         * @name currentView
         * @private
         * @fieldOf manero.web.core.Controller
         * @type manero.web.view.Base
         * @description Field to keep track of the current page view.
         */
        currentView,

        /**
         * @name $content
         * @private
         * @fieldOf manero.web.core.Controller
         * @type {jQuery}
         */
         $content;

    /**
     * @name dispatch
     * @methodOf manero.web.core.Controller
     * @private
     * @static
     * @param {mixed} ...
     * @description
     * Dispatches a route pattern to a {@link manero.web.view.Base} class.
     * <br /><br />
     * If <code>currentView</code> is unset (<code>undefined</code>), then we assume that this is the first dispatch event,
     * indicating our initial page load. In this case, we <em>DO NOT</em> call the {@link manero.web.view.Base#load()} method - the only thing to do
     * is to instantiate the view class.
     * <br /><br />
     * If, however, <code>currentView</code> has been set, then we can assume this is a subsequent page request, so
     * we <em>DO</em> call {@link manero.web.view.Base#load()} to request whichever resources we need to render the Page.
     */
    function dispatch() {
        var args = arguments;

        require([ROOT_VIEW_PATH + '/' + this], function(View) {
            var view = new View(), bind = _.bind, done = bind(complete, this, view);

            if(isInitialPageLoad()) {

                setCurrentView(view);

            } else {

                view
                    .on('load:before', bind(load, this, view))
                    .on('load:success', bind(view.render, view))
                    .on('load:error', done)
                    .on('render:success', bind(render, this, view))
                    .on('render:complete', done)
                    .load.apply(view, args);
                
            }
        });
    }

    /**
     * @private
     * @static
     * @methodOf blackbox.web.core.Controller
     * @returns {Boolean}
     */
    function isInitialPageLoad() {
        return !currentView;
    }

    /**
     * @private
     * @static
     * @methodOf manero.web.core.Controller
     * @param {manero.web.view.Base} view
     */
    function load(view) {
        ($content = $content || $('main')).stop(true, true).fadeOut(500);
    }

    /**
     * @private
     * @static
     * @methodOf manero.web.core.Controller
     * @param {manero.web.view.Base} view
     */
    function render(view) {
        currentView && currentView.destroy();
        setCurrentView(view);
    }

    /**
     * @private
     * @static
     * @methodOf manero.web.core.Controller
     * @param {manero.web.view.Base} view
     */
    function complete(view) {
        $content.stop(true, true).fadeIn(500);
    }

    /**
     * @private
     * @static
     * @methodOf manero.web.core.Controller
     * @param {manero.web.view.Base} view
     */
    function setCurrentView(view) {
        currentView = view;
    }

    /**
     * @constructor
     * @name manero.web.core.Controller
     * @version 2.0
     */
    function Controller() {}

    return {
        /**
         * @name createRouter
         * @methodOf manero.web.core.Controller
         * @static
         * @param {Object} routes
         * @returns {Backbone.Router}
         * @description
         * Factory for creating Backbone.Router instances with support for our custom routing config.
         * <br /><br />
         * Backbone.Router#navigate() has been overridden so that, by default, <code>{ trigger: true }</code>.
         */
        createRouter: function(routes) {
            var Router = {

                    navigate: function(fragment, options) {
                        return Backbone.Router.prototype.navigate.call(this, fragment, _.extend({ trigger: true }, options || {}));
                    }

                };

            _.each(routes, function(view) {
                Router[view] = _.bind(dispatch, view);
            });

            return new (Backbone.Router.extend(Router))({ routes: routes });
        },

        /**
         * @name startSession
         * @methodOf manero.web.core.Controller
         * @static
         * @description Wrapper utility for Backbone.History#start()
         * @param {Boolean} silent
         * @returns {Boolean}
         */
        startSession: function(silent) {
            return Backbone.history.start({ pushState: history.pushState, silent: silent });
        }

    };

});