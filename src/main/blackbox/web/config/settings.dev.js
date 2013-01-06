define('config/settings.dev', function() {
    'use strict';

    return {

        'debug': true,

        'services': {

            'facebook': {
                'appId': ''
            },

            'google': {
                'analytics':{
                    'id': ''
                }
            }

        }

    };

});