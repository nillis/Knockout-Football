// Poule viewmodel class
define(['knockout', 'teamViewModel', 'matchViewModel', 'combinations'], function (ko, teamViewModel, matchViewModel) {
    return function pouleViewModel(date, homeAndAway, drawWithGoalsTwoPoints) {
        var self = this;

        self.date = date;
        self.homeAndAway = homeAndAway;
        self.drawWithGoalsTwoPoints = drawWithGoalsTwoPoints;

        // Matches

        self.matches = ko.observableArray();

        self.removeMatch = function (match) {
            self.matches.remove(match);
        };

        self.addMatch = function () {
            self.matches.push(new matchViewModel(self.teams()[0], self.teams()[1], self.date(), '12:00:00'));
        };

        // Teams

        self.teams = ko.observableArray([new teamViewModel(self.matches, self.drawWithGoalsTwoPoints), new teamViewModel(self.matches, self.drawWithGoalsTwoPoints)]);

        self.removeTeam = function (team) {
            var temp = self.matches().slice();

            ko.utils.arrayForEach(temp, function (match) {
                if (match.homeTeam().name() === team.name() || match.awayTeam().name() === team.name()) self.matches.remove(match);
            });

            self.teams.remove(team);
        };

        self.addTeam = function () {
            self.teams.push(new teamViewModel(self.matches, self.drawWithGoalsTwoPoints));
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
                var match = new matchViewModel(teamCombination[0], teamCombination[1], self.date(), '12:00:00');
                self.matches.push(match);
            });

            if (self.homeAndAway()) {
                ko.utils.arrayForEach(teamCombinations, function (teamCombination) {
                    var match = new matchViewModel(teamCombination[1], teamCombination[0], self.date(), '12:00:00');
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

        // Mapping

        self.toJS = function () {
            var obj = {};
            obj.date = self.date();
            obj.homeAndAway = self.homeAndAway();
            obj.drawWithGoalsTwoPoints = self.drawWithGoalsTwoPoints();

            var matches = [];

            ko.utils.arrayForEach(self.matches(), function (match) {
                matches.push(match.toJS());
            });

            obj.matches = matches;  

            var teams = [];

            ko.utils.arrayForEach(self.teams(), function (team) {
                teams.push(team.toJS());
            });

            obj.teams = teams;         
            return obj;
        };

        self.map = function (obj) {
            self.drawWithGoalsTwoPoints(obj.drawWithGoalsTwoPoints);

            self.teams.removeAll();

            ko.utils.arrayForEach(obj.teams, function (team) {
                self.teams.push(new teamViewModel(self.matches, self.drawWithGoalsTwoPoints, team.name));
            });

            ko.utils.arrayForEach(obj.matches, function (match) {
                var homeTeam = ko.utils.arrayFirst(self.teams(), function(team) {
                    return team.name() === match.homeTeamName;
                });

                var awayTeam = ko.utils.arrayFirst(self.teams(), function(team) {
                    return team.name() === match.awayTeamName;
                });

                self.matches.push(new matchViewModel(homeTeam, awayTeam, match.date, match.time, match.homeScore, match.awayScore));
            });

            return self;
        };
    };
});