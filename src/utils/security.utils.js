var validateLicence = function (licenceKey) {
    var now = new Date();
    return hashCode(now.getFullYear() + "/" + now.getMonth()) === licenceKey;
};

var hashCode = function (string) {
    var hash = 0;

    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return hash;
};