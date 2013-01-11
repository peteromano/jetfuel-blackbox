define('config/routing', function() {
    'use strict';

    return {

        // Home
        '': 'home/Landing',

        // Todos
        'todos':        'todos/List',
        'todos/:id':    'todos/Detail',

        // Errors
        'error':            'error/Generic',
        'error/not-found':  'error/NotFound',

        // CMS Pages
        '*path': 'cms/Page'

    };

});