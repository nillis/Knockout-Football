define(['jquery', 'knockout', 'categoryViewModel', 'mapping'], function ($, ko, categoryViewModel, mapping) {
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
            var json = mapping.toJSON(self.toJS());
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
                var appViewModel = ko.utils.parseJson(json);
                self.map(appViewModel);
            };

            r.readAsText(f);
        };

        // Mapping

        self.toJS = function () {
            var obj = {};
            obj.admin = self.admin();
            var categories = [];

            ko.utils.arrayForEach(self.categories(), function (category) {
                categories.push(category.toJS());
            });

            obj.categories = categories;
            return obj;
        };

        self.map = function (obj) {
            self.admin(obj.admin);
            self.categories.removeAll();

            ko.utils.arrayForEach(obj.categories, function (category) {
                var bla = new categoryViewModel(category.name).map(category);
                self.categories.push(bla);
            });

            return self;
        };
    };
});