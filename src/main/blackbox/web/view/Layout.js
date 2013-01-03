define('view/Layout', ['_', 'Backbone', 'util/URLParser'], function(_, Backbone, URLParser) {
    'use strict';

    var /**
         * @name DEFAULT_TARGET
         * @private
         * @type {String}
         * @fieldOf manero.web.view.Layout.prototype
         */
        DEFAULT_TARGET = '_self';

    var /**
         * @name $
         * @private
         * @type jQuery
         * @fieldOf manero.web.view.Layout.prototype
         */
        $,

        /**
         * @name app
         * @private
         * @type {manero.web.core.Application}
         * @fieldOf manero.web.view.Layout.prototype
         */
        app,

        /**
         * @name self
         * @private
         * @type {manero.web.view.Layout}
         * @fieldOf manero.web.view.Layout.prototype
         */
        self;

    /**
     * @lends manero.web.view.Layout.prototype
     */
    return Backbone.View.extend({

        el: 'body',

        events: {
            'click a': 'navigate'
        },

        /**
         * @constructs
         * @version 2.0
         * @augments Backbone.View
         * @description
         * Subscriptions:
         * <code>destroy:before</code>,
         * <code>destroy</code>,
         * <code>navigate:before({String} route)</code>,
         * <code>navigate({String} route)</code>
         */
        initialize: function() {
            self = this;
            $ = _.bind(this.$, this);

            // For some reason, using Application as a module dependency doesn't work,
            // so include it her in the constructor as a work around. The Application
            // module should be cached in memory anyway.
            require(['core/Application'], function(Application) {
                app = Application.getInstance();
            });
        },

        /**
         * @param {jQuery.Event} e
         * @returns {Boolean}
         * @description
         * Publishes:
         * <code>navigate:before({String} route)</code>,
         * <code>navigate({String} route)</code>
         */
        navigate: function(e) {
            var $link = $(e.currentTarget),
                route = $link.attr('href'),
                target = $link.attr('target') || DEFAULT_TARGET;

            if(!URLParser.isXDomain(route) && target == DEFAULT_TARGET) {
                e.preventDefault();
                e.stopPropagation();
                self.trigger('navigate:before', route);
                app.getRouter().navigate(route);
                self.trigger('navigate', route);
                return false;
            } else {
                return true;
            }
        },

        /**
         * @returns {manero.web.view.Layout}
         * @description
         * Puyblishes: <code>destroy:before</code>, <code>destroy</code>
         */
        destroy: function() {
            this.trigger('destroy:before').undelegateEvents();
            return this.trigger('destroy');
        }

    });

});