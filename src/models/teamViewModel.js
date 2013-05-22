// Team viewmodel class
define(['knockout', 'matchViewModel'], function (ko, matchViewModel) {
    return function teamViewModel(name) {
        var self = this;

        self.name = ko.observable(name);
        self.matches = ko.observableArray();

        self.played = ko.computed(function () {
            return ko.utils.arrayFilter(self.matches(), function (match) {
                return match.homeScore() && match.awayScore();
            });
        }, self);

        self.won = ko.computed(function () {
            return 0;
        }, self);

        self.lost = ko.computed(function () {
            return 0;
        }, self);

        self.draws = ko.computed(function () {
            return 0;
        }, self);

        self.goalsFor = ko.computed(function () {
            return 0;
        }, self);

        self.goalsAgainst = ko.computed(function () {
            return 0;
        }, self);

        self.goalsDifference = ko.computed(function () {
            return 0;
        }, self);

        self.points = ko.computed(function () {
            return 0;
        }, self);
    };
});