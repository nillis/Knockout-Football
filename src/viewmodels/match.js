define([
    'knockout'
], function (ko) {
    return function match(homeTeam, awayTeam, date, time, homeScore, awayScore) {
        var self = this;

        self.homeTeam = ko.observable(homeTeam);
        self._homeScore = ko.observable(homeScore);
        self.awayTeam = ko.observable(awayTeam);
        self._awayScore = ko.observable(awayScore);

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
        self.time = ko.observable(time);

        // Mapping

        self.toJS = function () {
            var obj = {};
            obj.homeTeamName = self.homeTeam().name(); 
            obj.awayTeamName = self.awayTeam().name(); 
            obj.homeScore = self.homeScore();
            obj.awayScore = self.awayScore();  
            obj.date = self.date();  
            obj.time = self.time();       
            return obj;
        };
    };
});