// Category viewmodel class
define(['knockout', 'teamViewModel', 'matchViewModel', 'combinations'], function (ko, teamViewModel, matchViewModel) {
    return function categoryViewModel(name) {
        var self = this;

        self.name = ko.observable(name);
        self.date = ko.observable(new Date().toJSON().slice(0,10));
        self.homeAndAway = ko.observable(false);
        self.teams = ko.observableArray([new teamViewModel()]);
        self.matches = ko.observableArray();

        self.removeTeam = function (team) {
            self.teams.remove(team);
        };

        self.addTeam = function () {
            self.teams.push(new teamViewModel());
        };

        self.generateFixture = function () {
            self.matches.removeAll();

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
    };
});