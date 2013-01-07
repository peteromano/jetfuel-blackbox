define('view/todos/List', ['view/Base'], function(Base) {
    'use strict';

    var config = {
            template: 'todos/list',
            i18n: true
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
        }

    });

});