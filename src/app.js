requirejs.config({
    include: [
            'bootstrap'
    ],
    paths: {
        // Lib             
        'jquery': '../libs/jquery/jquery-2.0.0',
        'knockout': '../libs/knockout/knockout-2.2.1.debug',
        'mapping' : '../libs/knockout/knockout.mapping-latest.debug',
        'bootstrap': '../libs/bootstrap/bootstrap.min',
        'domReady': '../libs/require/domReady',

        // Utils
        'combinations': 'utils/combinations.utils',
        'hasher': 'utils/hasher.utils',
        'security': 'utils/security.utils',

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
        'mapping' : ['knockout'],

        'appViewModel': ['jquery','knockout','mapping','categoryViewModel'],
        'categoryViewModel': ['knockout', 'pouleViewModel'],
        'matchViewModel': ['knockout'],
        'pouleViewModel': ['knockout', 'teamViewModel', 'matchViewModel', 'combinations'],
        'teamViewModel': ['knockout']
    }
});

require(['jquery', 'knockout', 'appViewModel', 'security', 'domReady!'], function ($, ko, appViewModel) {
    if (!validateLicence(1477297797)) {
        $('body').html('');
        return;
    }

    ko.applyBindings(new appViewModel());

    $('.nav-tabs li:first-child').addClass('active');
    $('.tab-pane:first-child').addClass('active');
});