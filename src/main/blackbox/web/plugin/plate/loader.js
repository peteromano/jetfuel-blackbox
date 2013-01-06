define('plugin/plate/loader', ['plate'], function(plate) {
    /**
     * This function is required to be synchronous. This is done by
     * flagging the XMLHttpRequest instance to be synchronous.
     */
    plate.Template.Meta.registerPlugin('loader', function(templatePath) {
        var template;

        require(['resource!templates/' + templatePath + '?text,sync'], function(tmpl) {
            template = tmpl;
        });

        return new plate.Template(template);
    });

    return plate;

});