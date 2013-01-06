define('core/Renderer', function() {
    'use strict';

    var engines = {
            dust: Dust,
            plate: Plate
        };

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

    /**
     * @constructor
     * @name manero.web.core.Renderer
     * @version 2.1
     */
    function Renderer() {}

    return {
        /**
         * @name render
         * @methodOf manero.web.core.Renderer
         * @static
         * @param {String} template
         * @param {Object} context
         * @param {Function} callback
         * @returns {blackbox.web.core.Renderer}
         */
        render: function(template, config, callback) {
            require(['core/Application'], function(Application) {
                new engines[Application.getInstance().config('templating').engine](template, config, callback);
            });

            return this;
        }

    };

});