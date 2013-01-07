define('config/routing', function() {
    'use strict';

    return {

        // Home
        '': 'home/Landing',

        // Todos
        'todos':        'todos/List',
        'todos/:id':    'todos/Detail'

    };

});