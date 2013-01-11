define('view/Layout', ['_', 'Backbone', 'util/URLParser'], function(_, Backbone, URLParser) {
    'use strict';

    var /**
         * @name DEFAULT_TARGET
         * @private
         * @type String
         * @fieldOf blackbox.web.view.Layout.prototype
         * @description <code>"_self"</code>
         */
        DEFAULT_TARGET = '_self';

    var /**
         * @name $
         * @private
         * @type jQuery
         * @fieldOf blackbox.web.view.Layout.prototype
         */
        $,

        /**
         * @name app
         * @private
         * @type blackbox.web.core.Application
         * @fieldOf blackbox.web.view.Layout.prototype
         */
        app,

        /**
         * @name self
         * @private
         * @type blackbox.web.view.Layout
         * @fieldOf blackbox.web.view.Layout.prototype
         */
        self;

    /**
     * @lends blackbox.web.view.Layout.prototype
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
            require(['model/Application'], function(Application) {
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
                app.get('router').navigate(route);
                self.trigger('navigate', route);
                return false;
            } else {
                return true;
            }
        },

        /**
         * @returns {blackbox.web.view.Layout}
         * @description
         * Publishes: <code>destroy:before</code>, <code>destroy</code>
         */
        destroy: function() {
            this.trigger('destroy:before').undelegateEvents();
            return this.trigger('destroy');
        }

    });

});