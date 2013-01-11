define('model/Controller', ['$', '_', 'Backbone'], function($, _, Backbone) {
    'use strict';

    var /**
         * @constant
         * @private
         * @type String
         * @fieldOf blackbox.web.core.Controller
         * @description <code>"view"</code>
         */
        ROOT_VIEW_PATH = 'view';

    var /**
         * @name currentView
         * @private
         * @fieldOf blackbox.web.core.Controller
         * @type blackbox.web.view.Base
         * @description Field to keep track of the current page view.
         */
        currentView,

        /**
         * @name $content
         * @private
         * @fieldOf blackbox.web.core.Controller
         * @type jQuery
         */
         $content;

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
            var view = new View(), bind = _.bind, done = bind(complete, this, view);

            if(isInitialPageLoad()) {

                setCurrentView(view.trigger('render:success'));

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
     * @methodOf blackbox.web.core.Controller
     * @param {blackbox.web.view.Base} view
     */
    function load(view) {
        ($content = $content || $('main')).stop(true, true).fadeOut(250);
    }

    /**
     * @private
     * @static
     * @methodOf blackbox.web.core.Controller
     * @param {blackbox.web.view.Base} view
     */
    function render(view) {
        currentView && currentView.destroy();
        setCurrentView(view);
    }

    /**
     * @private
     * @static
     * @methodOf blackbox.web.core.Controller
     * @param {blackbox.web.view.Base} view
     */
    function complete(view) {
        $content.stop(true, true).fadeIn(250);
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

    return _.extend(new Backbone.Model(), {
        /**
         * @name createRouter
         * @methodOf blackbox.web.model.Controller
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
         * @methodOf blackbox.web.model.Controller
         * @static
         * @description Wrapper utility for Backbone.History#start()
         * @param {Boolean} silent
         * @returns {Boolean}
         */
        startSession: function(silent) {
            return Backbone.history.start({ pushState: history.pushState, silent: silent });
        },

        /**
         * @static
         * @constructs
         * @augments Backbone.Model
         * @version 2.0
         */
        initialize: function() {

        }

    });

});