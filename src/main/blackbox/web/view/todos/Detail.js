define('view/todos/Detail', ['view/Base', 'model/Todo'], function(Base, Todo) {
    'use strict';

    var config = {
            template: 'todos/detail',
            i18n: true,
            css: true
        };

    /**
     * @lends blackbox.web.view.todos.Detail.prototype
     */
    return Base.extend({
        /**
         * @constructs
         * @version 2.0
         * @augments blackbox.web.view.Base
         */
        initialize: function() {
            return Base.prototype.initialize.call(this, config);
        },

        load: function(id) {
            var self = this;

            new Todo({ id: id }).fetch({
                success: function(todo) {
                    self.config({ data: { data: todo.toJSON() } });
                    Base.prototype.load.call(self);
                }
            });

            return this;
        }

    });

});