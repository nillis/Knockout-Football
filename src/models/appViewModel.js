// App viewmodel class
define(['knockout', 'categoryViewModel'], function (ko, categoryViewModel) {
    return function appViewModel() {
        var self = this;

        self.admin = ko.observable('true');
        self.categories = ko.observableArray([new categoryViewModel('Category')]);

        self.addCategory = function () {
            self.categories.push(new categoryViewModel('Category'));
        };

        self.removeCategory = function (category) {
            self.categories.remove(category);
        };
    };
});