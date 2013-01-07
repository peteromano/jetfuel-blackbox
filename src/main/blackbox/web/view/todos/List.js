define('view/todos/List', ['view/Base', 'collection/Todos'], function(Base, Todos) {
    'use strict';

    var config = {
            template: 'todos/list',
            i18n: true,
            css: true
        };

    /**
     * @lends blackbox.web.view.todos.List.prototype
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

            new Todos().fetch({
                success: function(todos) {
                    console.log(todos);
                    self.config({ data: { data: todos.toJSON() } });
                    Base.prototype.load.call(self);
                }
            });

            return this;
        }

    });

});