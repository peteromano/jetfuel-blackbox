define('view/Layout', ['_', 'Backbone'], function(_, Backbone) {
    'use strict';

    var /**
         * @name $
         * @private
         * @type jQuery
         * @fieldOf blackbox.web.Layout.prototype
         */
        $,

        /**
         * @name $controlsNavUl
         * @private
         * @type jQuery
         * @fieldOf blackbox.web.Layout.prototype
         */
        $controlsNavUl;

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
         * <code>destroy</code>,
         * <code>navigate:external:before({String} route)</code>,
         * <code>navigate:external({String} route)</code>,
         * <code>navigate:before({String} route)</code>,
         * <code>navigate({String} route)</code>
         */
        initialize: function() {
            $ = _.bind(this.$, this);
        },

        /**
         * @param {jQuery.Event} e
         * @returns {Boolean}
         * @description
         * Publishes:
         * <code>navigate:external:before({String} route)</code>,
         * <code>navigate:external({String} route)</code>,
         * <code>navigate:before({String} route)</code>,
         * <code>navigate({String} route)</code>
         * <br/><br/>
         * TODO Handle external links better (simulate default browser behavior)
         */
        navigate: function(e) {
            var $link = $(e.currentTarget),
                route = $link.attr('href'),
                target = $link.attr('target'),
                trigger = _.bind(this.trigger, this);

            e.preventDefault();
            e.stopPropagation();

            require(['core/Application', 'util/URLParser'], function(Application, URLParser) {
                var app = Application.getInstance();

                if(!URLParser.isXDomain(route)) {
                    trigger('navigate:before', route);
                    app.getRouter().navigate(route);
                    trigger('navigate', route);
                } else {
                    trigger('navigate:external:before', route);

                    /*if(target){
                        
                    } else {
                        app.config('context').location.replace(route);
                    }*/
                    app.config('context').location.replace(route);

                    trigger('navigate:external', route);
                }
            });

            return false;
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