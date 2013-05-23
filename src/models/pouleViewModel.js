// Poule viewmodel class
define(['knockout', 'teamViewModel', 'matchViewModel', 'combinations'], function (ko, teamViewModel, matchViewModel) {
    return function pouleViewModel(date, homeAndAway) {
        var self = this;

        self.date = date;
        self.homeAndAway = homeAndAway;
        // Teams

        self.teams = ko.observableArray([new teamViewModel()]);

        self.removeTeam = function (team) {
            self.teams.remove(team);
        };

        self.addTeam = function () {
            self.teams.push(new teamViewModel());
        };

        // Fixture

        self.matches = ko.observableArray();

        self.fixture = ko.computed(function () {
            return self.matches();
        }, self).extend({ throttle: 1 });

        self.generateFixture = function () {
            self.matches.removeAll();

            ko.utils.arrayForEach(self.teams(), function (team) {
                team.matches.removeAll();
            });

            var teamCombinations = getCombinations(self.teams(), 2);

            ko.utils.arrayForEach(teamCombinations, function (teamCombination) {
                var match = new matchViewModel(teamCombination[0], teamCombination[1], self.date());
                teamCombination[0].matches.push(match);
                teamCombination[1].matches.push(match);
                self.matches.push(match);
            });

            if (self.homeAndAway()) {
                ko.utils.arrayForEach(teamCombinations, function (teamCombination) {
                    var match = new matchViewModel(teamCombination[1], teamCombination[0], self.date());
                    teamCombination[0].matches.push(match);
                    teamCombination[1].matches.push(match);
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