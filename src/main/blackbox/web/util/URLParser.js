/**
 * @fileOverview Parses a string into URL parts
 * @author <a href="mailto:promano@urbandaddy.com">Pete Romano</a>
 */
define('util/URLParser', function() {
    'use strict';

    var /**
         * @constant
         * @private
         * @type {RegExp}
         * @fieldOf blackbox.web.util.URLParser
         * @description Value: /^((\w+)\:)?\/\/([^\/\\]+)/
         */
        X_DOMAIN = /^((\w+)\:)?\/\/([^\/\\]+)/,
        /**
         * @constant
         * @private
         * @type {RegExp}
         * @fieldOf blackbox.web.util.URLParser
         * @description Value: /^(?:([A-Za-z]+:))?(?:\/{2})?([0-9.\-A-Za-z]*)(?::(\d+))?(?:(\/[^?#]*))?(?:\?([^#]*))?(?:#!?(.*))?$/
         */
        SEGMENTS = /^(?:([A-Za-z]+:))?(?:\/{2})?([0-9.\-A-Za-z]*)(?::(\d+))?(?:(\/[^?#]*))?(?:\?([^#]*))?(?:#!?(.*))?$/,
        /**
         * @constant
         * @private
         * @type {RegExp}
         * @fieldOf blackbox.web.util.URLParser
         * @description Value: /([^&=]+)=?([^&]*)/g
         */
        QS_PARTS = /([^&=]+)=?([^&]*)/g,
        /**
         * @constant
         * @private
         * @type {RegExp}
         * @fieldOf blackbox.web.util.URLParser
         * @description Value: /\+/g
         */
        QS_SPACE = /\+/g,
        /**
         * @private
         * @fieldOf blackbox.web.util.URLParser
         * @namespace
         */
        SegmentsEnum = {
            /**
             * @name blackbox.web.util.URLParser.SegmentsEnum.PROTOCOL
             * @constant
             * @type {int}
             * @description Value: 1
             */
            PROTOCOL:		1,
            /**
             * @name blackbox.web.util.URLParser.SegmentsEnum.DOMAIN
             * @constant
             * @type {int}
             * @description Value: 2
             */
            DOMAIN:			2,
            /**
             * @name blackbox.web.util.URLParser.SegmentsEnum.PORT
             * @constant
             * @type {int}
             * @description Value: 3
             */
            PORT:			3,
            /**
             * @name blackbox.web.util.URLParser.SegmentsEnum.PATH
             * @constant
             * @type {int}
             * @description Value: 4
             */
            PATH:			4,
            /**
             * @name blackbox.web.util.URLParser.SegmentsEnum.QUERY_STRING
             * @constant
             * @type {int}
             * @description Value: 5
             */
            QUERY_STRING:	5,
            /**
             * @name blackbox.web.util.URLParser.SegmentsEnum.HASH
             * @constant
             * @type {int}
             * @description Value: 6
             */
            HASH:			6
        };

    /**
     * @methodOf blackbox.web.util.URLParser
     * @private
     * @static
     * @param {String} url
     * @param {int} segment
     * @returns {String}
     */
    function getSegment(url, segment) {
        return [].concat(url.match(SEGMENTS) || [])[segment] || '';
    }

    /**
     * @methodOf blackbox.web.util.URLParser
     * @private
     * @static
     * @param {String} url
     * @returns {Array}
     */
    function getSegments(url) {
        return [].concat(url.match(SEGMENTS) || []);
    }

    getSegment.curry = function(segment) {
        return function(url) { return getSegment(url, segment); };
    };
    
    /**
     * @name blackbox.web.util.URLParser
     * @version 2.0
     * @constructor
     * @description
     * Parses a string into URL parts 
     */
    function URLParser() {}
    
    return {
        /**
         * @name parse
         * @methodOf blackbox.web.util.URLParser
         * @static
         * @param {String} url
         * @returns {Object}
         */
        parse: function(url) {
            var segments = getSegments(url);

            function getSegment(segment) {
                return segments[segment] || '';
            }

            return {
                port:           getSegment(SegmentsEnum.PORT),
                path:           getSegment(SegmentsEnum.PATH),
                queryString:    getSegment(SegmentsEnum.QUERY_STRING),
                protocol:       getSegment(SegmentsEnum.PROTOCOL),
                domain:         getSegment(SegmentsEnum.DOMAIN),
                hash:           getSegment(SegmentsEnum.HASH)
            };
        },

        /**
         * @name getHash
         * @methodOf blackbox.web.util.URLParser
         * @static
         * @param {String} url
         * @returns {String}
         */
        getHash: getSegment.curry(SegmentsEnum.HASH),

        /**
         * @name getDomain
         * @methodOf blackbox.web.util.URLParser
         * @static
         * @param {String} url
         * @returns {String}
         */
        getDomain: getSegment.curry(SegmentsEnum.DOMAIN),

        /**
         * @name getPort
         * @methodOf blackbox.web.util.URLParser
         * @static
         * @param {String} url
         * @returns {String}
         */
        getPort: getSegment.curry(SegmentsEnum.PORT),

        /**
         * @name getPath
         * @methodOf blackbox.web.util.URLParser
         * @static
         * @param {String} url
         * @returns {String}
         */
        getPath: getSegment.curry(SegmentsEnum.PATH),

        /**
         * @name getQueryString
         * @methodOf blackbox.web.util.URLParser
         * @static
         * @param {String} url
         * @returns {String}
         */
        getQueryString: getSegment.curry(SegmentsEnum.QUERY_STRING),

        /**
         * @name getProtocol
         * @methodOf blackbox.web.util.URLParser
         * @static
         * @param {String} url
         * @returns {String}
         */
        getProtocol: getSegment.curry(SegmentsEnum.PROTOCOL),

        /**
         * @name parseQueryString
         * @methodOf blackbox.web.util.URLParser
         * @static
         * @param {String} queryString
         * @returns {Object}
         */
        parseQueryString: function(queryString) {
            var d = function (s) { return decodeURIComponent(s.replace(QS_SPACE, ' ')); }, p = {}, e;

            while ((e = QS_PARTS.exec(queryString))) {
                p[d(e[1])] = d(e[2]);
            }

            return p;
        },

        /**
         * @name isXDomain
         * @methodOf blackbox.web.util.URLParser
         * @static
         * @param {String} url
         * @returns {Boolean}
         *
         * TODO: Add more sophisticated checks against protocol, port, domain, etc.
         */
        isXDomain: function(url) {
            return !!this.getProtocol(url);
        }

    };

});