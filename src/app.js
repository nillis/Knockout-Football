requirejs.config({
    include: [
            'bootstrap'
    ],
    paths: {
        // Lib             
        'jquery': '../libs/jquery/jquery-2.0.0',
        'knockout': '../libs/knockout/knockout-2.2.1.debug',
        'bootstrap': '../libs/bootstrap/bootstrap.min',
        'domReady': '../libs/require/domReady',

        // Utils
        'combinations': 'utils/combinations.utils',

        // Models
        'appViewModel': 'models/appViewModel',
        'categoryViewModel': 'models/categoryViewModel',
        'matchViewModel': 'models/matchViewModel',
        'pouleViewModel': 'models/pouleViewModel',
        'teamViewModel': 'models/teamViewModel'
    },
    shim: {
        'tablesorter': ['jquery'],
        'bootstrap': ['jquery'],

        'appViewModel': ['jquery','knockout','mapping','categoryViewModel'],
        'categoryViewModel': ['knockout', 'pouleViewModel'],
        'matchViewModel': ['knockout'],
        'pouleViewModel': ['knockout', 'teamViewModel', 'matchViewModel', 'combinations'],
        'teamViewModel': ['knockout']
    }
});

require(['jquery', 'knockout', 'appViewModel', 'domReady!'], function ($, ko, appViewModel) {
    ko.applyBindings(new appViewModel());

    $('.nav-tabs li:first-child').addClass('active');
    $('.tab-pane:first-child').addClass('active');
});