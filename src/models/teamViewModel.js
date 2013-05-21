// Team viewmodel class
define(['knockout', 'matchViewModel'], function (ko, matchViewModel) {
    return function teamViewModel(name) {
        var self = this;

        self.name = ko.observable(name);
        self.matches = ko.observableArray();

        self.matchesPlayed = ko.computed(function () {
            return ko.utils.arrayFilter(self.matches(), function (match) {
                return match.homeScore() && match.awayScore();
            });
        }, self);
    };
});