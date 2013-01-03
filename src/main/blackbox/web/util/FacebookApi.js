define('util/FacebookApi', ['_', 'Backbone', 'util/GoogleAnalytics'], function(_, Backbone, GoogleAnalytics) {
    'use strict';

    var /**
         * @fieldOf manero.web.util.FacebookApi
         * @type {enum}
         * @private
         * @static
         * @constant
         * @description
         * <strong>{String} <code>DEFAULT</code>:</strong> <code>'Facebook'</code>,<br/>
         * <strong>{String} <code>AUTH_PROMPT</code>:</strong> <code>'Facebook Auth Prompt'</code>,<br/>
         * <strong>{String} <code>AUTH_RESPONSE_CHANGE</code>:</strong> <code>'Facebook Auth Response Change'</code>,<br/>
         * <strong>{String} <code>AUTH_STATUS_CHANGE</code>:</strong> <code>'Facebook Auth Status Change'</code>,<br/>
         * <strong>{String} <code>LOGIN</code>:</strong> <code>'Facebook Login'</code>,<br/>
         * <strong>{String} <code>LOGOUT</code>:</strong> <code>'Facebook Logout'</code>
         */
        EventCategoriesEnum = {
            DEFAULT:                'Facebook',
            AUTH_PROMPT:            'Facebook Auth Prompt',
            AUTH_RESPONSE_CHANGE:   'Facebook Auth Response Change',
            AUTH_STATUS_CHANGE:     'Facebook Auth Status Change',
            LOGIN:                  'Facebook Login',
            LOGOUT:                 'Facebook Logout'
        };

    var /**
         * @fieldOf manero.web.util.FacebookApi
         * @type {Window}
         * @private
         * @static
         */
        context;

    /**
     * @name manero.web.util.FacebookApi
     * @version 2.0
     * @constructor
     */
    function FacebookApi() {}

    return _.extend({
        /**
         * @name load
         * @methodOf manero.web.util.FacebookApi
         * @static
         * @returns {manero.web.util.FacebookApi}
         */
        load: function () {
            var self = this;

            if(context && context.FB) {
                //return this.trigger('load', context.FB);
                return this;
            }

            require(['core/Application'], function(Application) {
                var app = Application.getInstance(),
                    settings = app.config('settings'),
                    config = settings.facebook;

                context = app.config('context');

                // FB configuration
                context.fbAsyncInit = function() {
                    var FB = context.FB,
                        subscribe = _.bind(FB.Event.subscribe, FB.Event),
                        trackEvent = _.bind(GoogleAnalytics.trackEvent, GoogleAnalytics);

                    // init the FB JS SDK
                    context.FB.init({
                        appId      : config.appId, // App ID from the App Dashboard
                        channelUrl : config.channelUrl, // Channel File for x-domain communication
                        status     : config.status, // check the login status upon init?
                        cookie     : config.cookie, // set sessions cookies to allow your server to access the session?
                        xfbml      : config.xfbml  // parse XFBML tags on this page?
                    });

                    /** Fires when a like button is clicked response is an URL*/
                    subscribe('edge.create',
                        function(response) {
                            trackEvent(EventCategoriesEnum.DEFAULT, 'Like', response);
                        }
                    );

                    /** Fires on unlike, response is an URL*/
                    subscribe('edge.remove',
                        function(response) {
                            trackEvent(EventCategoriesEnum.DEFAULT, 'Unlike', response);
                        }
                    );

                    /** Fires on logout, response an an object */
                    subscribe('auth.prompt',
                        function(response) {
                            trackEvent(EventCategoriesEnum.AUTH_PROMPT, 'Status', response);
                        }
                    );

                    /** Fires on logout, response an an object */
                    subscribe('auth.logout',
                        function(response) {
                            trackEvent(EventCategoriesEnum.LOGOUT, 'Status', response.status);
                        }
                    );

                    /** TODO: Consolidate auto events To One Function that takes two params */
                    /** Fires on login, response an an object */
                    subscribe('auth.login',
                        function(response) {
                            trackEvent(EventCategoriesEnum.LOGIN, 'Status', response.status);
                            trackEvent(EventCategoriesEnum.LOGIN, 'User Id', response.authResponse.userID);
                            trackEvent(EventCategoriesEnum.LOGIN, 'Signed Request', response.authResponse.signedRequest);
                            trackEvent(EventCategoriesEnum.LOGIN, 'Expires In', response.authResponse.expiresIn);
                            trackEvent(EventCategoriesEnum.LOGIN, 'Access Token', response.authResponse.accessToken);
                        }
                    );

                    /** Fires on authResponseChange, response an an object */
                    subscribe('auth.authResponseChange',
                        function(response) {
                            trackEvent(EventCategoriesEnum.AUTH_RESPONSE_CHANGE, 'Status', response.status);
                            trackEvent(EventCategoriesEnum.AUTH_RESPONSE_CHANGE, 'User Id', response.authResponse.userID);
                            trackEvent(EventCategoriesEnum.AUTH_RESPONSE_CHANGE, 'Signed Request', response.authResponse.signedRequest);
                            trackEvent(EventCategoriesEnum.AUTH_RESPONSE_CHANGE, 'Expires In', response.authResponse.expiresIn);
                            trackEvent(EventCategoriesEnum.AUTH_RESPONSE_CHANGE, 'Access Token', response.authResponse.accessToken);
                        }
                    );

                    /** Fires on authStatusChange, response an an object */
                    subscribe('auth.statusChange',
                        function(response) {
                            trackEvent(EventCategoriesEnum.AUTH_STATUS_CHANGE, 'User Id', response.authResponse.userID);
                            trackEvent(EventCategoriesEnum.AUTH_STATUS_CHANGE, 'Signed Request', response.authResponse.signedRequest);
                            trackEvent(EventCategoriesEnum.AUTH_STATUS_CHANGE, 'Expires In', response.authResponse.expiresIn);
                            trackEvent(EventCategoriesEnum.AUTH_STATUS_CHANGE, 'Access Token', response.authResponse.accessToken);
                        }
                    );

                    self.trigger('load', FB);
                };

                // Facebook Api
                (function(d, debug){
                    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
                    if (d.getElementById(id)) {return;}
                    js = d.createElement('script'); js.id = id; js.async = true;
                    js.src = '//connect.facebook.net/en_US/all' + (debug ? '/debug' : '') + '.js';
                    ref.parentNode.insertBefore(js, ref);
                }(context.document, settings.debug));
            });

            return this;
        }

    }, Backbone.Events);
});