define('model/Todo', ['Backbone'], function(Backbone) {
    'use strict';

    /**
     * @lends blackbox.web.model.Todo.prototype
     */
    return Backbone.Model.extend({
        /**
         * @type String
         * @description "/todos"
         */
        urlRoot: '/todos',

        /**
         * @constructs
         * @version 2.0
         * @augments Backbone.Model
         */
        initialize: function() {
            
        }

    });

});