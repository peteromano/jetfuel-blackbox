define('util/GoogleAnalytics', function() {
    'use strict';

    var /**
         * @fieldOf manero.web.util.GoogleAnalytics
         * @type {Window}
         * @private
         * @static
         */
        context;

    /**
     * @name manero.web.util.GoogleAnalytics
     * @version 2.0
     * @constructor
     */
    function GoogleAnalytics() {}

    return {
        /**
         * @name load
         * @methodOf manero.web.util.GoogleAnalytics
         * @static
         * @returns {manero.web.util.GoogleAnalytics}
         */
        load: function(){
            if(context && context._gaq) {
                return this;
            }

            require(['core/Application'], function(Application) {
                var app = Application.getInstance(),
                    config = app.config('settings').google.analytics;

                context = app.config('context');

                // Google Analytics
                (function (d, w) {
                    w._gaq = w._gaq || [];
                    w._gaq.push(['_setAccount', config.id]);
                    w._gaq.push(['_trackPageview']);
                    var ga, s = d.getElementsByTagName('script')[0];
                    ga = d.createElement('script');
                    ga.type = 'text/javascript';
                    ga.async = true;
                    ga.src = ('https:' === d.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                    ga.async = true;
                    s.parentNode.insertBefore(ga, s);
                })(context.document, context);
            });

            return this;
        },

        /**
         * @name trackEvent
         * @methodOf manero.web.util.manero.web.util.GoogleAnalytics
         * @static
         * @returns {manero.web.util.GoogleAnalytics}
         * @description Wrapper for the <code>_gaq</code> queue for event tracking.
         */
        trackEvent: function() {
            context._gaq.push.apply(context._gaq, ['_trackEvent'].concat(Array.prototype.slice.call(arguments)));
            return this;
        }

    };
});