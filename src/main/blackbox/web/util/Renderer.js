define('util/Renderer', function() {
    'use strict';

    function Dust(template, config, callback) {
        var name = config.template;
        require(['plugin/dust/load'], function(dust) {
            dust.loadSource(dust.compile(template, name));
            dust.render(name, config.data, callback);
        });
    }

    function Plate(template, config, callback) {
        require(['plugin/plate/loader', function(plate) {
            new plate.Template(template).render(config.data, callback);
        }]);
    }

    var engines = {
            dust: Dust,
            plate: Plate
        };

    /**
     * @constructor
     * @name blackbox.web.util.Renderer
     * @version 2.1
     */
    function Renderer() {}

    return {
        /**
         * @name render
         * @methodOf blackbox.web.util.Renderer
         * @static
         * @param {String} template
         * @param {Object} context
         * @param {Function} callback
         * @returns {blackbox.web.core.Renderer}
         */
        render: function(template, config, callback) {
            require(['model/Application'], function(Application) {
                engines[Application.getInstance().config('templating').engine](template, config, callback);
            });

            return this;
        }

    };

});