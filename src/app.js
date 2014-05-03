requirejs.config({
    include: [
            'bootstrap'
    ],
    paths: {
        // Lib             
        'jquery': '../libs/jquery-2.1.1',
        'knockout': '../libs/knockout-3.1.0.debug',
        'koMapping' : '../libs/knockout.mapping-latest.debug',
        'bootstrap': '../libs/bootstrap/bootstrap.min',
        'domReady': '../libs/domReady',

        // Utils
        'combinations': 'utils/combinations',

        // Models
        'appViewModel': 'viewmodels/appViewModel',
        'categoryViewModel': 'viewmodels/categoryViewModel',
        'matchViewModel': 'viewmodels/matchViewModel',
        'pouleViewModel': 'viewmodels/pouleViewModel',
        'teamViewModel': 'viewmodels/teamViewModel'
    },
    shim: {
        'tablesorter': ['jquery'],
        'bootstrap': ['jquery'],
        'koMapping' : ['knockout'],

        'appViewModel': ['jquery','knockout','koMapping','categoryViewModel'],
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