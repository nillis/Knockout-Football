// Match viewmodel class
define(['knockout'], function (ko) {
    return function matchViewModel(homeTeam, awayTeam, date) {
        var self = this;

        self.homeTeam = ko.observable(homeTeam);
        self.homeScore = ko.observable();
        self.awayTeam = ko.observable(awayTeam);
        self.awayScore = ko.observable();

        self.date = ko.observable(date);
        self.time = ko.observable('12:00:00');
    };
});