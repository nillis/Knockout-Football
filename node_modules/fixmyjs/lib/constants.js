var path = require('path');

module.exports = Object.freeze({
  PATH_TO_IGNORE: path.join(process.cwd(), '.jshintignore'),
  HOME_CONFIG: path.join(process.env.HOME, '.jshintrc'),
  PROJECT_CONFIG: path.join(process.cwd(), '.jshintrc')
});
