define('view/error/NotFound', ['view/Base'], function(Base) {
    'use strict';

    var /**
         * @name config
         * @private
         * @type {Object}
         * @fieldOf blackbox.web.view.error.NotFound.prototype
         * @description
         * <strong>{String} <code>template</code>:</strong> <code>'error/not-found'</code>.</em>
         */
        config = {
            template: 'error/not-found',
            css: true,
            i18n: true
        };

    /**
     * @lends blackbox.web.view.error.NotFound.prototype
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