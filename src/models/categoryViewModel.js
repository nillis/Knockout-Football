// Category viewmodel class
define(['knockout', 'pouleViewModel'], function (ko, pouleViewModel) {
    return function categoryViewModel(name) {
        var self = this;

        self.name = ko.observable(name);

        self.id = ko.computed(function () {
            return self.name().replace(' ', '');
        }, self);

        self.date = ko.observable(new Date().toJSON().slice(0, 10));
        self.homeAndAway = ko.observable(false);
        self.poules = ko.observableArray([new pouleViewModel(self.date, self.homeAndAway)]);

        self.removePoule = function (poule) {
            self.poules.remove(poule);
        };

        self.addPoule = function () {
            self.poules.push(new pouleViewModel(self.date, self.homeAndAway));
        };

        self.generateFixture = function () {
            ko.utils.arrayForEach(self.poules(), function (poule) {
                poule.generateFixture();
            });
        };
    };
});