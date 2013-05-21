var fs = require('fs');
var minimatch = require('minimatch');
var _cache = {
  directories: {}
};

function shouldIgnore(somePath, ignore) {
  function isIgnored(p) {
    var fnmatch = minimatch(somePath, p, { nocase: true });
    var lsmatch = isDirectory(p) &&
      p.match(/^[^\/]*\/?$/) &&
      somePath.match(new RegExp("^" + p + ".*"));

    return !!(fnmatch || lsmatch);
  }

  return ignore.some(function (ignorePath) {
    return isIgnored(ignorePath);
  });
}

function isDirectory(aPath) {
  var isDir;

  try {
    if (_cache.directories.hasOwnProperty(aPath)) {
      isDir = _cache.directories[aPath];
    } else {
      isDir = fs.statSync(aPath).isDirectory();
      _cache.directories[aPath] = isDir;
    }
  } catch (e) {
    isDir = false;
  }

  return isDir;
}

module.exports = shouldIgnore;
