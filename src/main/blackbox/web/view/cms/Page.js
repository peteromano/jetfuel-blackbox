define('view/cms/Page', ['view/Base', 'model/Page'], function(Base, Page) {
    'use strict';

    var /**
         * @name config
         * @private
         * @type {Object}
         * @fieldOf blackbox.web.view.cms.Page.prototype
         * @description
         * <strong>{String} <code>template</code>:</strong> <code>'cms/page'</code>.</em>
         */
        config = {
            template: 'cms/page',
            css: true,
            i18n: false
        };

    /**
     * @lends blackbox.web.view.cms.Page.prototype
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

        /**
         * @overridden
         * @returns {blackbox.web.view.cms.Page}
         */
        load: function() {
            var self = this;

            new Page({ id: location.pathname.replace(/^\//, '') }).fetch({
                success: function(page) {
                    self.config({ data: page.toJSON() });
                    Base.prototype.load.call(self);
                }
            });

            return this;
        }

    });

});