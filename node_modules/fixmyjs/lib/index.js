var fs = require('fs');
var finder = require('findit');
var commander = require('commander');
var jshint = require('jshint').JSHINT;
var EventEmitter = require('events').EventEmitter;

var shouldIgnore = require('./ignore');
var mergeConfigs = require('./config');
var c = require('./constants');
var File = require('./file');

function fix(filepath, config, event) {
  config.maxerr = Infinity;

  fs.readFile(filepath, 'utf-8', function (err, buffer) {
    if (err) {
      event.emit('error', err, filepath);
      return;
    }

    // Remove potential Unicode Byte Order Mark.
    buffer = buffer.replace(/^\uFEFF/, '');

    var data;
    var file = Object.create(File);

    file.contents = buffer;
    file.fileName = filepath;

    file.options = {
      auto_indent: commander.indent,
      indentpref: commander.indentPref
    };

    if (!jshint(buffer, config)) {
      data = jshint.data();
      event.emit('lint', filepath, data);
      event.emit('fixed', file.fix(data));
    }
  });
}

function getConfig() {
  if (commander.config) {
    return mergeConfigs(commander.config, {});
  }

  return mergeConfigs(c.HOME_CONFIG, c.PROJECT_CONFIG);
}

function getIgnore() {
  if (fs.existsSync(c.PATH_TO_IGNORE)) {
    return fs.readFileSync(c.PATH_TO_IGNORE, 'utf-8')
      .split('\n')
      .filter(function (line) {
        return !!line;
      });
  }

  return null;
}

function interpret(targets) {
  var event = new EventEmitter();
  var config = getConfig();
  var ignore = getIgnore();

  targets.forEach(function (target) {
    var walk = finder.find(target);

    walk.on('file', function (file) {
      if (ignore && shouldIgnore(file, ignore)) {
        return;
      }

      if (file.match(/\.js$/)) {
        fix(file, config, event);
      }
    });
  });

  return event;
}

module.exports = interpret;
