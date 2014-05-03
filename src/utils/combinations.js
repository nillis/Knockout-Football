define([

], function () {
    var get = function (sourceArray, n) {
        var get = function (sourceArray, n, got, all) {
            if (n === 0) {
                if (got.length > 0) {
                    all[all.length] = got;
                }
                return all;
            }

            for (var i = 0; i < sourceArray.length; i++) {
                get(sourceArray.slice(i + 1), n - 1, got.concat([sourceArray[i]]), all);
            }

            return all;
        };

        return get(sourceArray, n, [], []);
    };


    return {
        get: get
    };
});