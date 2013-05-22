// App viewmodel class
define(['knockout', 'categoryViewModel'], function (ko, categoryViewModel) {
    return function appViewModel() {
        var self = this;

        self.categories = ko.observableArray([new categoryViewModel('Category 1')]);

        self.addCategory = function () {
            self.categories.push(new categoryViewModel('Category ' + (self.categories().length + 1)));
        };

        $('#addCategory').on('click', function () {
            self.addCategory();
        });
    };
});