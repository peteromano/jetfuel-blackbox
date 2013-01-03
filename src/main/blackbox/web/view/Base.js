define('view/Base', ['$', '_', 'Backbone', 'Handlebars'], function($, _, Backbone, Handlebars) {
    'use strict';

    var /**
         * @private
         * @constant
         * @name DEFAULT_TEMPLATE
         * @type String
         * @fieldOf blackbox.web.view.Base.prototype
         * @description Value: (empty string)
         */
        DEFAULT_TEMPATE = '';

    var /**
         * @name template
         * @private
         * @type String
         * @fieldOf blackbox.web.view.Base.prototype
         */
        template;

    var /**
         * @private
         * @name config
         * @type Object
         * @fieldOf blackbox.web.view.Base.prototype
         * @description
         * <strong>{String} <code>template</code>:</strong> The default template to load for the view. <em>Defaults to </em><code>"error/404"</code><em>.</em><br />
         * <strong>{Boolean} <code>css</code>:</strong> Flag to decide whether to load the CSS for the view. <em>Defaults to </em><code>false</code><em>.</em><br />
         * <strong>{Boolean} <code>i18n</code>:</strong> Flag to decide whether to load the i18n bundle for the view. <em>Defaults to </em><code>false</code><em>.</em><br />
         * <strong>{Object} <code>data</code>:</strong> The context data to render the view template. <em>Defaults to </em><code>{}</code><em>.</em>
         */
        config = {
            template: 'error/404',
            css: false,
            i18n: false,
            data: {}
        };

    /**
     * @private
     * @methodOf blackbox.web.view.Base.prototype
     * @returns {Array}
     * @description
     * Decides which modules to load based on the current configuration.
     */
    function getConfiguredModules() {
        var templatePath = config.template,
            modules = ['resource!templates/' + templatePath + '.html?text'],
            base = templatePath.split('/').shift();

        config.i18n && modules.push('resource!nls/' + base + '.js?i18n');
        config.css && modules.push('resource!' + base + '.css?css');

        return modules;
    }

    /**
     * @private
     * @param {String} template
     * @methodOf blackbox.web.view.Base.prototype
     */
    function setTemplate(tmpl) {
        tmpl && (template = tmpl);
    }

    /**
     * @lends blackbox.web.view.Base.prototype
     */
    return Backbone.View.extend({
        /**
         * @type {String}
         */
        el: 'main',

        /**
         * @constructs
         * @version 2.0
         * @param {Object} config
         * @see blackbox.web.view.Base#config
         * @augments Backbone.View
         * @description
         * Subscriptions:
         * <code>load:before</code>,
         * <code>load:success</code>,
         * <code>load:complete</code>,
         * <code>render:before</code>,
         * <code>render</code>,
         * <code>destroy:before</code>,
         * <code>destroy</code>
         */
        initialize: function(cfg) {
            this.config(cfg);
        },

        /**
         * @param {Object} config
         * @returns {Object}
         */
        config: function(cfg) {
            if(typeof cfg == 'object') {
                return config = $.extend(true, config, cfg || {});
            } else {
                return config[cfg];
            }
        },

        /**
         * @returns {blackbox.web.view.Base}
         * @description
         * Publishes:
         * <code>load:before</code>,
         * <code>load:success</code>,
         * <code>load:complete</code>
         */
        load: function() {
            var self = this.trigger('load:before');

            require(getConfiguredModules(), function(template, i18n) {
                setTemplate(template);
                self.config({ data: { locale: i18n || {} } });
                self.trigger('load:success').trigger('load:complete');
            });

            return this;
        },

        /**
         * @param {String} template
         * @returns {blackbox.web.view.Base}
         * @see blackbox.web.view.Base#load
         * @description
         * Publishes: <code>render:before</code>, <code>render</code>
         * <br /><br />
         * Render a template to the view.
         * <br /><br />
         * If <code>template</code> is <code>undefined</code>, then this method will
         * use the stored template {@link blackbox.web.view.Base#content} (which gets set on <code>load:complete</code>),
         * otherwise it will fallback to {@link blackbox.web.view.Base#DEFAULT_TEMPLAE}
         */
        render: function(template) {
            this.trigger('render:before');
            content && setTemplate(template);
            this.$el.html(Handlebars.compile(this.getTemplate())(this.config('data')));
            return this.trigger('render');
        },

        /**
         * @returns {blackbox.web.view.Base}
         * @description
         * Publishes: <code>destroy:before</code>, <code>destroy</code>
         */
        destroy: function() {
            this.trigger('destroy:before').undelegateEvents();
            this.$el.empty();
            return this.trigger('destroy');
        },

        /**
         * @returns {String}
         */
        getTemplate: function() {
            return template || DEFAULT_TEMPLATE;
        }

    });
    
});