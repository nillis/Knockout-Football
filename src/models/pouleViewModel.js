// Poule viewmodel class
define(['knockout', 'teamViewModel', 'matchViewModel', 'combinations'], function (ko, teamViewModel, matchViewModel) {
    return function pouleViewModel(date, homeAndAway) {
        var self = this;

        self.date = date;
        self.homeAndAway = homeAndAway;

        // Matches

        self.matches = ko.observableArray();

        self.removeMatch = function (match) {
            self.matches.remove(match);
        };

        self.addMatch = function () {
            self.matches.push(new matchViewModel(self.teams()[0], self.teams()[1], self.date()));
        };

        // Teams

        self.teams = ko.observableArray([new teamViewModel(self.matches), new teamViewModel(self.matches)]);

        self.removeTeam = function (team) {
            var temp = self.matches().slice();

            ko.utils.arrayForEach(temp, function (match) {
                if (match.homeTeam().name() === team.name() || match.awayTeam().name() === team.name()) self.matches.remove(match);
            });

            self.teams.remove(team);
        };

        self.addTeam = function () {
            self.teams.push(new teamViewModel(self.matches));
        };

        // Fixture
        self.teamOptions = ko.computed(function () {
            return self.teams();
        }, self).extend({ throttle: 10 });

        self.fixture = ko.computed(function () {
            return self.matches();
        }, self).extend({ throttle: 10 });

        self.generateFixture = function () {
            self.matches.removeAll();

            var teamCombinations = getCombinations(self.teams(), 2);

            ko.utils.arrayForEach(teamCombinations, function (teamCombination) {
                var match = new matchViewModel(teamCombination[0], teamCombination[1], self.date());
                self.matches.push(match);
            });

            if (self.homeAndAway()) {
                ko.utils.arrayForEach(teamCombinations, function (teamCombination) {
                    var match = new matchViewModel(teamCombination[1], teamCombination[0], self.date());
                    self.matches.push(match);
                });
            }
        };

        self.sortFixture = function () {
            self.matches.sort(function (left, right) {
                return left.date() == right.date() && left.time() == right.time() ? 0 :
                    left.date() != right.date() ?
                    (left.date() > right.date() ? 1 : -1) : (left.time() > right.time() ? 1 : -1);
            });
        };

        // Leaderboard

        self.leaderboard = ko.computed(function () {
            return self.teams().slice().sort(function (left, right) {
                if (left.points() > right.points()) return -1;
                else if (left.points() < right.points()) return 1;
                else {
                    if (left.goalsDifference() > right.goalsDifference()) return -1;
                    else if (left.goalsDifference() < right.goalsDifference()) return 1;
                    else {
                        if (left.goalsFor() > right.goalsFor()) return -1;
                        else if (left.goalsFor() < right.goalsFor()) return 1;
                        else {
                            return 0;
                        }
                    }
                }
            });
        }, self).extend({ throttle: 1 });
    };
});