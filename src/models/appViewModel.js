// App viewmodel class
define(['jquery', 'knockout', 'categoryViewModel'], function ($, ko, categoryViewModel) {
    return function appViewModel() {
        var self = this;

        self.admin = ko.observable(true);
        self.categories = ko.observableArray([new categoryViewModel('Category')]);

        self.addCategory = function () {
            self.categories.push(new categoryViewModel('Category'));
        };

        self.removeCategory = function (category) {
            self.categories.remove(category);
        };

        self.save = function () {
            var json = self.toJSON();

            window.URL = window.webkitURL || window.URL;

            var bb = new Blob([json], {
                type: 'text/plain'
            });

            var a = $('<a>', {
                text: 'Download',
                href: window.URL.createObjectURL(bb)
            })
                .attr('download', $('#savefileName').val())
                .attr('downloadurl', ['text/plain', $('#savefilename').val(), window.URL.createObjectURL(bb)].join(':'));

            $('output').html(a);
        };

        self.load = function () {
            var f = document.getElementById('loadfileName').files[0];

            var r = new FileReader();
            r.onload = function (e) {
                var json = e.target.result;
                var data = ko.utils.parseJson(json);
                console.log(data);
                self.map(data);              
            };

            r.readAsText(f);
        };

        self.toJSON = function () {

        };

        self.map = function (obj) {

        };
    };
});