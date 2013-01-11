define('model/User', ['$', 'Backbone'], function($, Backbone) {
    'use strict';

    /**
     * @lends blackbox.web.model.User.prototype
     */
    return Backbone.Model.extend({
        /**
         * @type String
         * @description "/user"
         */
        urlRoot: '/user',

        defaults: {
            loggedIn: false
        },

        /**
         * @constructs
         * @version 2.0
         * @augments Backbone.Model
         */
        initialize: function() {
            
        }

    });

});