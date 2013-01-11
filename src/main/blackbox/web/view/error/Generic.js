define('view/error/Generic', ['view/Base'], function(Base) {
    'use strict';

    var /**
         * @name config
         * @private
         * @type {Object}
         * @fieldOf blackbox.web.view.error.Generic.prototype
         * @description
         * <strong>{String} <code>template</code>:</strong> <code>'error/generic'</code>.</em>
         */
        config = {
            template: 'error/generic',
            css: true,
            i18n: true
        };

    /**
     * @lends blackbox.web.view.error.Generic.prototype
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