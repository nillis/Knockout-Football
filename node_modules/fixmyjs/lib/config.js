var fs = require('fs');
var path = require('path');

function removeJsComments(str) {
  str = str || '';
  str = str.replace(/\/\*[\s\S]*(?:\*\/)/g, ''); //everything between "/* */"
  str = str.replace(/\/\/[^\n\r]*/g, ''); //everything after "//"
  return str;
}

function loadAndParseConfig(filePath) {
  if (typeof filePath === 'object') {
    return filePath;
  }

  var config = {};
  var fileContent;

  try {
    if (fs.existsSync(filePath)) {
      fileContent = fs.readFileSync(filePath, "utf-8");
      config = JSON.parse(removeJsComments(fileContent));
    }
  } catch (e) {
    process.stdout.write("Error opening config file " + filePath + '\n');
    process.stdout.write(e + "\n");
    process.exit(1);
  }

  return config;
}

function mergeConfigs(homerc, cwdrc) {
  var homeConfig = loadAndParseConfig(homerc);
  var cwdConfig = loadAndParseConfig(cwdrc);

  var prop;

  Object.keys(cwdConfig).forEach(function (key) {
    var prop = cwdConfig[key];

    if (key === 'predef') {
      homeConfig.predef = (homeConfig.predef || []).concat(cwdConfig.predef);
    } else {
      homeConfig[key] = cwdConfig[key];
    }
  });

  return homeConfig;
}

module.exports = mergeConfigs;
