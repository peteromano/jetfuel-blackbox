/**
 * @fileOverview Parses directive syntax into an object.
 * @author <a href="mailto:promano@urbandaddy.com">Pete Romano</a>
 */
define('util/DirectiveParser', function() {
    'use strict';

    var /**
         * @constant
         * @private
         * @type {RegExp}
         * @fieldOf blackbox.web.util.DirectiveParser
         * @description Value: /<(.*)>/
         */
        DIRECTIVE = /<(.*)>/;

    /**
     * @methodOf blackbox.web.util.DirectiveParser
     * @private
     * @static
     * @param {String} directive
     * @returns {Array|null}
     */
    function getDirectiveArray(directive) {
        var d = directive.match(/<(.*)>/);
        return d && d[1] ? d[1].split(':') : d;
    }

    /**
     * @name blackbox.web.util.DirectiveParser
     * @version 2.0
     * @constructor
     * @description
     * The directive syntax is as follows:
     * <pre>&lt;<em>method</em>[:<em>arg1</em>][:<em>arg2</em>][<em>...</em>]&gt;</pre>
     *
     *
     */
    function DirectiveParser() {}

    return {
        /**
         * @name parse
         * @methodOf blackbox.web.util.DirectiveParser
         * @static
         * @param {String} directive
         * @returns {Object|Boolean}
         *
         * @example
         * var app = Application.getInstance(),
         *     parsed = DirectiveParser.parse('&lt;execute:Navigator:reload&gt;');
         *
         * // parsed == { method: 'execute', args: ['Navigator', 'reload'] }
         * app[parsed.method].apply(app, parsed.args);
         *
         * @description
         * The method name to invoke is the first segment, followed by the argument list. The context to invoke the
         * method is up to you after you parse the directive, OR use the utility method {@link blackbox.web.util.DirectiveParser.invoke}
         * to automatically invoke the method with the supplied context.
         *
         * Returns false if the supplied directive cannot be parsed.
         */
        parse: function(directive) {
            if(!(directive = getDirectiveArray(directive))) {
                return false;
            } else {
                return {
                    method: directive.shift(),
                    args: directive
                };
            }
        },

        /**
         * @name invoke
         * @methodOf blackbox.web.util.DirectiveParser
         * @static
         * @param {String} directive
         * @param {Object} context
         * @param {int} delay
         * @returns {mixed|Boolean|int}
         *
         * @example
         * // Translates to setTimeout(function() { Application.getInstance().execute('Navigator', 'reload'); }, 2500);
         * DirectiveParser.invoke('&lt;execute:Navigator:reload&gt;', Application.getInstance(), 2500);
         *
         * @description
         * Returns false if the supplied directive cannot be parsed.<br />
         * Returns the return value of the invocation if <pre style="display:inline;">delay</pre> is not specified (the call is synchronous).<br />
         * Returns the reference ID from the setTimeout call if <pre style="display:inline;">delay</pre> is specified (the call is asynchronous).
         */
        invoke: function(directive, context, delay) {
            var d = this.parse(directive);

            function invoke() {
                return context[d.method].apply(context, d.args);
            }

            if(!d) {
                return false;
            } else if(delay > 0) {
                setTimeout(invoke, delay);
            } else {
                return invoke();
            }
        }

    };

});