// Match viewmodel class
define(['knockout'], function (ko) {
    return function matchViewModel(homeTeam, awayTeam, date) {
        var self = this;

        self.homeTeam = ko.observable(homeTeam);
        self._homeScore = ko.observable();
        self.awayTeam = ko.observable(awayTeam);
        self._awayScore = ko.observable();

        this.homeScore= ko.computed({
            read: function(){
                return self._homeScore();
            },
            write: function(value) {
                self._homeScore(parseInt(value,10));
            }
        }); 

        this.awayScore= ko.computed({
            read: function(){
                return self._awayScore();
            },
            write: function(value) {
                self._awayScore(parseInt(value,10));
            }
        }); 

        self.date = ko.observable(date);
        self.time = ko.observable('12:00:00');
    };
});