// Team viewmodel class
define(['knockout'], function (ko) {
    return function teamViewModel(pouleMatches, name) {
        var self = this;

        self.name = ko.observable(name);
        self.pouleMatches = pouleMatches;

        self.matches = ko.computed(function () {
            return ko.utils.arrayFilter(self.pouleMatches(), function (match) {
                return match.homeTeam() === self || match.awayTeam() === self;
            });
        }, self).extend({ throttle: 1 });

        self.playedMatches = ko.computed(function () {
            return ko.utils.arrayFilter(self.matches(), function (match) {
                return match.homeScore() && match.awayScore();
            });
        }, self);

        self.played = ko.computed(function () {
            return self.playedMatches().length;
        }, self);

        self.won = ko.computed(function () {
            return ko.utils.arrayFilter(self.playedMatches(), function (match) {
                return match.homeTeam().name() === self.name() && match.homeScore() > match.awayScore() || match.awayTeam().name() === self.name() && match.awayScore() > match.homeScore();
            }).length;
        }, self);

        self.lost = ko.computed(function () {
            return ko.utils.arrayFilter(self.playedMatches(), function (match) {
                return match.homeTeam().name() === self.name() && match.homeScore() < match.awayScore() || match.awayTeam().name() === self.name() && match.awayScore() < match.homeScore();
            }).length;
        }, self);

        self.draws = ko.computed(function () {
            return ko.utils.arrayFilter(self.playedMatches(), function (match) {
                return match.homeScore() === match.awayScore();
            }).length;
        }, self);

        self.goalsFor = ko.computed(function () {
            var goalsFor = 0;

            ko.utils.arrayForEach(self.playedMatches(), function (match) {
                goalsFor += parseInt(match.homeTeam().name() === self.name() ? match.homeScore() : match.awayScore(), 10);
            });

            return goalsFor;
        }, self);

        self.goalsAgainst = ko.computed(function () {
            var goalsAgainst = 0;

            ko.utils.arrayForEach(self.playedMatches(), function (match) {
                goalsAgainst += parseInt(match.homeTeam().name() === self.name() ? match.awayScore() : match.homeScore(), 10);
            });

            return goalsAgainst;
        }, self);

        self.goalsDifference = ko.computed(function () {
            return self.goalsFor() - self.goalsAgainst();
        }, self);

        self.points = ko.computed(function () {
            return 3 * self.won() + 1 * self.draws();
        }, self);
    };
});