(function($, espresso, ctx) {
    var Application, app, context;

    /**
     * @constructor
     */
    ctx.Application = Application = function(_context) {
        context = _context;
    };

    Application.prototype.getInstance = function(context) {
        return app = app || new Application(context || ctx);
    };

    Application.prototype.getContext = function() {
        return context;
    };

}(this.jQuery, this.espresso, this));