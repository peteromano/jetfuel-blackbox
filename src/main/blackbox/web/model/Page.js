define('model/Page', ['Backbone'], function(Backbone) {
    'use strict';

    /**
     * @lends blackbox.web.model.Page.prototype
     */
    return Backbone.Model.extend({
        /**
         * @type String
         * @description "/pages"
         */
        urlRoot: '/pages',

        /**
         * @constructs
         * @version 2.0
         * @augments Backbone.Model
         */
        initialize: function() {
            return Backbone.Model.prototype.initialize.call(this);
        }

    });

});