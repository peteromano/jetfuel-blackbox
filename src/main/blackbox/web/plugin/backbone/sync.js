define('plugin/backbone/sync', ['_', 'Backbone'], function(_, Backbone) {

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
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var collection = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        // TODO Process and handle response meta data (i.e., errors, etc.)
        var method = options.update ? 'update' : 'reset';
        collection[method](resp.data, options);
        if (success) success(collection, resp.data, options);
      };
      return this.sync('read', this, options);
    }

    return Backbone;

});