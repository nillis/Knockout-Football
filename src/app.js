requirejs.config({
    include: [
        'bootstrap'
    ],
    paths: {          
        'jquery': '../libs/jquery-2.1.1',
        'knockout': '../libs/knockout-3.1.0.debug',
        'knockout.mapping' : '../libs/knockout.mapping-latest.debug',
        'bootstrap': '../libs/bootstrap/bootstrap.min',
        'domReady': '../libs/domReady'
    },
    shim: {
        'bootstrap': ['jquery'],
        'knockout' : ['jquery'],
        'knockout.mapping' : ['knockout']
    }
});

require([
    'jquery', 
    'knockout', 
    'viewmodels/app', 
    'domReady!'
], function ($, ko, app) {
    ko.applyBindings(new app());

    $('.nav-tabs li:first-child').addClass('active');
    $('.tab-pane:first-child').addClass('active');
});