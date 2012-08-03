(function($, espresso, ctx) {
    var Application, app, context;

    /**
     * @methodOf Application.prototype
     * @private
     */
    function hello() {
        document.write('<header>Hello, World!</header>');
    }

    /**
     * @class Application
     * @param {HTMLWindowElement} context
     * @description This class is a singleton
     * @constructor
     */
    Application = function(_context) {
        context = _context;
        hello();
    };

    /**
     *
     * @return {HTMLWindowElement}
     */
    Application.prototype.getContext = function() {
        return context;
    };

    /**
     * @static
     * @param {HTMLWindowElement} context
     * @return {Application}
     */
    Application.getInstance = function(context) {
        return app = app || new Application(context || ctx);
    };

    ctx.Application = Application;

}(this.jQuery, this.espresso, this));