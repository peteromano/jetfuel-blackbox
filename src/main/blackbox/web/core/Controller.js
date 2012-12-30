define('core/Controller', ['$', '_', 'Backbone'], function($, _, Backbone) {
    'use strict';

    var /**
         * @constant
         * @private
         * @type String
         * @fieldOf blackbox.web.core.Controller
         * @description Value: "view"
         */
        ROOT_VIEW_PATH = 'view';

    var /**
         * @name currentView
         * @private
         * @fieldOf blackbox.web.core.Controller
         * @type blackbox.web.view.Base
         * @description Field to keep track of the current page. A falsy value indicates the initial page load.
         */
        currentView;

    /**
     * @name dispatch
     * @methodOf blackbox.web.core.Controller
     * @private
     * @static
     * @param {mixed} ...
     * @description
     * Dispatches a route pattern to a {@link blackbox.web.view.Base} class.
     * <br /><br />
     * If <code>currentView</code> is unset (<code>undefined</code>), then we assume that this is the first dispatch event,
     * indicating our initial page load. In this case, we <em>DO NOT</em> call the {@link blackbox.web.view.Base#load()} method - the only thing to do
     * is to instantiate the view class.
     * <br /><br />
     * If, however, <code>currentView</code> has been set, then we can assume this is a subsequent page request, so
     * we <em>DO</em> call {@link blackbox.web.view.Base#load()} to request whichever resources we need to render the Page.
     */
    function dispatch() {
        var args = arguments;

        require([ROOT_VIEW_PATH + '/' + this], function(View) {
            var view = new View(), bind = _.bind;

            if(currentView) {

                view
                    .on('load', bind(load, this, view))
                    .on('load:complete', bind(render, this, view))
                    .on('render:before', bind(prerender, this, view))
                    .load.apply(view, args);

            } else {

                setCurrentView(view);
                
            }
        });
    }

    /**
     * @private
     * @static
     * @methodOf blackbox.web.core.Controller
     * @param {blackbox.web.view.Base} view
     * TODO Scroll to top of the page or whatever we gotta do...
     */
    function load(view) {

    }

    /**
     * @private
     * @static
     * @methodOf blackbox.web.core.Controller
     * @param {blackbox.web.view.Base} view
     * TODO Finish whatever #load() did...
     */
    function complete() {

    }

    /**
     * @private
     * @static
     * @methodOf blackbox.web.core.Controller
     * @param {blackbox.web.view.Base} view
     */
    function prerender(view) {
        currentView && currentView.destroy();
    }

    /**
     * @private
     * @static
     * @methodOf blackbox.web.core.Controller
     * @param {blackbox.web.view.Base} view
     */
    function render(view) {
        setCurrentView(view.render());
        complete();
    }

    /**
     * @private
     * @static
     * @methodOf blackbox.web.core.Controller
     * @param {blackbox.web.view.Base} view
     */
    function setCurrentView(view) {
        currentView = view;
    }

    /**
     * @constructor
     * @name blackbox.web.core.Controller
     * @version 2.0
     */
    function Controller() {}

    return {
        /**
         * @name createRouter
         * @methodOf blackbox.web.core.Controller
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
         * @methodOf blackbox.web.core.Controller
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