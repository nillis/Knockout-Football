requirejs.config({
    include: [
        'bootstrap'     
    ],          
    paths: {
        // Lib             
        'jquery': '../libs/jquery/jquery-2.0.0.min',
        'knockout': '../libs/knockout/knockout-2.2.1',
        'bootstrap': '../libs/bootstrap/bootstrap.min',    
        'domReady': '../libs/require/domReady',

        // Utils
        'combinations': 'utils/combinations.utils',

        // Models
        'appViewModel': 'models/appViewModel',

        'categoryViewModel': 'models/categoryViewModel',
        'matchViewModel': 'models/matchViewModel',
        'teamViewModel': 'models/teamViewModel'
    },
    shim: {
        'bootstrap': ['jquery'],
        'appViewModel': ['categoryViewModel'],
        'categoryViewModel': ['teamViewModel','matchViewModel', 'combinations'],
        'teamViewModel': ['matchViewModel']
    }
});

require(['jquery', 'knockout', 'appViewModel', 'domReady!'], function ($, ko, appViewModel) {
    ko.applyBindings(new appViewModel());

    $('.nav-tabs li:first-child').addClass('active');
    $('.tab-pane:first-child').addClass('active');
});