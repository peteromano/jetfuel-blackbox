define('view/Base', ['$', '_', 'Backbone'], function($, _, Backbone) {
    'use strict';

    var /**
         * @private
         * @constant
         * @name DEFAULT_CONTENT
         * @type String
         * @fieldOf blackbox.web.view.Base.prototype
         * @description Value: (empty string)
         */
        DEFAULT_CONTENT = '';

    var /**
         * @name self
         * @private
         * @type blackbox.web.view.Base
         * @fieldOf blackbox.web.view.Base.prototype
         */
        self,

        /**
         * @name content
         * @private
         * @type String
         * @fieldOf blackbox.web.view.Base.prototype
         */
        content;

    var /**
         * @private
         * @name config
         * @type Object
         * @fieldOf blackbox.web.view.Base.prototype
         * @description
         * <strong>{String} <code>template</code>:</strong> The default template to load for the view. <em>Defaults to </em><code>"error/404"</code><em>.</em><br />
         * <strong>{Boolean} <code>css</code>:</strong> Flag to decide whether to load the CSS for the view. <em>Defaults to </em><code>false</code><em>.</em><br />
         * <strong>{Boolean} <code>i18n</code>:</strong> Flag to decide whether to load the i18n bundle for the view. <em>Defaults to </em><code>false</code><em>.</em><br />
         * <strong>{Object} <code>data</code>:</strong> The context data to render the view template.<br />
         * <strong>{String} <code>data.layout</code>:</strong> The layout to extend for the template. <em>Defaults to </em><code>"ajax"</code><em>.</em>
         */
        config = {
            template: 'error/404',
            css: false,
            i18n: false,
            data: {
                layout: 'ajax'
            }
        };

    /**
     * @private
     * @methodOf blackbox.web.view.Base.prototype
     * @returns {Array}
     * @description
     * Decides which modules to load based on the current configuration.
     */
    function getModules() {
        var templatePath = config.template,
            modules = ['Handlebars', 'resource!templates/' + templatePath + '.html?text'],
            base = templatePath.split('/').shift();

        config.i18n && modules.push('resource!nls/' + base + '.js?i18n');
        config.css && modules.push('resource!' + base + '.css?css');

        return modules;
    }

    /**
     * @private
     * @param {String} content
     * @methodOf blackbox.web.view.Base.prototype
     */
    function setContent(c) {
        c && (content = c);
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
         * <code>load:fail</code>,
         * <code>load:success</code>,
         * <code>load</code>,
         * <code>render:before</code>,
         * <code>render</code>,
         * <code>destroy:before</code>,
         * <code>destroy</code>
         */
        initialize: function(cfg) {
            self = this;
            this.config(cfg);
        },

        /**
         * @param {Object} config
         * @returns {Object}
         */
        config: function(cfg) {
            if(typeof cfg == 'object') {
                return _.clone(config = $.extend(true, config, cfg || {}));
            } else {
                return _.clone(config[cfg]);
            }
        },

        /**
         * @returns {blackbox.web.view.Base}
         * @description
         * Publishes:
         * <code>load:before</code>,
         * <code>load:fail</code>,
         * <code>load:success</code>,
         * <code>load</code>
         */
        load: function() {
            var trigger = _.bind(this.trigger, this);

            trigger('load:before');

            require(getModules(), function(Handlebars, template, i18n) {
                /*new plate.Template(template).render($.extend({ locale: i18n || {} }, config.data), function(error, content) {
                    if(error) {
                        trigger('load:fail');
                        throw error;
                    } else {
                        setContent(content);
                        trigger('load:success');
                    }
                });*/
            });

            return trigger('load');
        },

        /**
         * @param {String} content
         * @returns {blackbox.web.view.Base}
         * @see blackbox.web.view.Base#load
         * @description
         * Publishes: <code>render:before</code>, <code>render</code>
         * <br /><br />
         * Render a template to the view.
         * <br /><br />
         * If <code>template</code> is <code>undefined</code>, then this method will
         * try to use the stored <code>content</code> (which gets set on the <code>load:success</code> event),
         * otherwise it will fallback to {@link blackbox.web.view.Base#DEFAULT_CONTENT}
         */
        render: function(content) {
            this.trigger('render:before');
            content && setContent(content);
            this.$el.html(this.getContent());
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
        getContent: function() {
            return content || DEFAULT_CONTENT;
        }

    });
    
});