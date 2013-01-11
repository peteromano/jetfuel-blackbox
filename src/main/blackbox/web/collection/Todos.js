define('collection/Todos', ['Backbone', 'model/Todo'], function(Backbone, Todo) {
    'use strict';

    /**
     * @lends blackbox.web.collection.Todos.prototype
     */
    return Backbone.Collection.extend({
        /**
         * @type Function
         * @see blackbox.web.model.Todo
         */
        model: Todo,

        /**
         * @type String
         * @description "/todos"
         */
        url: '/todos',

        /**
         * @constructs
         * @version 2.0
         * @augments Backbone.Collection
         */
        initialize: function() {
            
        }

    });

});