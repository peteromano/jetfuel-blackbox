define('view/home/Landing', ['view/Base'], function(Base) {
    'use strict';

    var config = {
            template: 'home/landing',
            i18n: true
        };

    /**
     * @lends blackbox.web.view.home.Landing.prototype
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