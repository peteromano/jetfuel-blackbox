define('plugin/backbone/sync', ['_', 'Backbone'], function(_, Backbone) {

    var DEFAULT_ERROR_ROUTE = 'error';

    var errorRoutesMap = {
            '404': 'error/not-found',
            '500': DEFAULT_ERROR_ROUTE
        };

    var ajax = Backbone.ajax;

    Backbone.Model.prototype.fetch = function(options) {
        var model = this, success;

        options = options ? _.clone(options) : {};

        if (options.parse === void 0) options.parse = true;

        success = options.success;

        options.success = function(resp, status, xhr) {
            // TODO Process and handle response meta data (i.e., errors, etc.)
            if (!model.set(model.parse(resp.data), options)) return false;
            if (success) success(model, resp.data, options);
        };

        return this.sync('read', this, options);
    };

    Backbone.Collection.prototype.fetch = function(options) {
        var collection = this, success;

        options = options ? _.clone(options) : {};

        if (options.parse === void 0) options.parse = true;

        success = options.success;

        options.success = function(resp, status, xhr) {
            // TODO Process and handle response meta data (i.e., errors, etc.)
            var method = options.update ? 'update' : 'reset';
            collection[method](resp.data, options);
            if (success) success(collection, resp.data, options);
        };

        return this.sync('read', this, options);
    };

    Backbone.ajax = function(request) {
        request.error = function(response) {
            require(['model/Application'], function(Application) {
                Application.getInstance().get('router').navigate(errorRoutesMap[response.status] || DEFAULT_ERROR_ROUTE, { replace: true });
            });
        };

        return ajax(request);
    };

    return Backbone;

});