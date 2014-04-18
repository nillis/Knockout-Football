// Team viewmodel class
define(['knockout'], function (ko) {
    return function teamViewModel(pouleMatches, drawWithGoalsTwoPoints, name) {
        var self = this;

        self.name = ko.observable(name);
        self.pouleMatches = pouleMatches;
        self.drawWithGoalsTwoPoints = drawWithGoalsTwoPoints;

        self.matches = ko.computed(function () {
            return ko.utils.arrayFilter(self.pouleMatches(), function (match) {
                return match.homeTeam() === self || match.awayTeam() === self;
            });
        }, self).extend({ throttle: 50 });

        self.playedMatches = ko.computed(function () {
            return ko.utils.arrayFilter(self.matches(), function (match) {
                return self.isNumber(match.homeScore()) && self.isNumber(match.awayScore());
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

        self.drawsWithGoals = ko.computed(function () {
            return ko.utils.arrayFilter(self.playedMatches(), function (match) {
                return match.homeScore() === match.awayScore() && match.homeScore() !== 0;
            }).length;
        }, self);

        self.drawsWithoutGoals = ko.computed(function () {
            return ko.utils.arrayFilter(self.playedMatches(), function (match) {
                return match.homeScore() === match.awayScore() && match.homeScore() === 0;
            }).length;
        }, self);

        self.goalsFor = ko.computed(function () {
            var goalsFor = 0;

            ko.utils.arrayForEach(self.playedMatches(), function (match) {
                goalsFor += match.homeTeam().name() === self.name() ? match.homeScore() : match.awayScore();
            });

            return goalsFor;
        }, self);

        self.goalsAgainst = ko.computed(function () {
            var goalsAgainst = 0;

            ko.utils.arrayForEach(self.playedMatches(), function (match) {
                goalsAgainst += match.homeTeam().name() === self.name() ? match.awayScore() : match.homeScore();
            });

            return goalsAgainst;
        }, self);

        self.goalsDifference = ko.computed(function () {
            return self.goalsFor() - self.goalsAgainst();
        }, self);

        self.points = ko.computed(function () {
            if(self.drawWithGoalsTwoPoints()) {
                return 3 * self.won() + 2 * self.drawsWithGoals() + 1 * self.drawsWithoutGoals();
            }

            return 3 * self.won() + 1 * self.draws();
        }, self);

        // Helper

        self.isNumber = function (o) {
            return typeof o === 'number' && isFinite(o);
        };

        // Mapping

        self.toJS = function () {
            return { name: self.name(), drawWithGoalsTwoPoints: self.drawWithGoalsTwoPoints() };
        };
    };
});