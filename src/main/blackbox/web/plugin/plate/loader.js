define('plugin/plate/loader', ['plate'], function(plate) {
    /**
     * This function is required to be synchronous. This is done by
     * flagging the XMLHttpRequest instance to be synchronous.
     */
    plate.Template.Meta.registerPlugin('loader', function(templatePath) {
        var template;

        require(['resource!templates/' + templatePath + '.html?text,sync'], function(t) {
            template = t;
        });

        return new plate.Template(template);
    });

    return plate;
});