var fs = require('fs');
var diff = require('diff');
var fixmyjs = require('../packages/fixmyjs/fixmyjs');

var File = Object.create(null, {
  write: {
    value: function () {
      if (this.modified) {
        fs.writeFile(this.fileName, this.modified, 'utf8');
      }
    }
  },

  fix: {
    value: function (data) {
      if (!this.contents) {
        throw new Error('Contents are missing');
      }
      this.modified = fixmyjs(data, this.contents, this.options).run();
      return this;
    }
  },

  diff: {
    value: function () {
      if (!this.contents || !this.modified) {
        return;
      }

      if (this.contents !== this.modified) {
        var df = diff.diffLines(this.contents, this.modified);
        Object.keys(df).forEach(function (n) {
          var str = "";
          var line = df[n];
          if (line.removed) {
            str = "\033[31m" + line.value + "\033[39m";
          } else if (line.added) {
            str = "\033[32m" + line.value + "\033[39m";
          } else {
            str = "\033[90m" + line.value + "\033[39m";
          }
          process.stdout.write(str);
        });
      }
    }
  },

  patch: {
    value: function () {
      if (this.contents && this.modified) {
        var df = diff.createPatch(
          this.fileName,
          this.contents,
          this.modified,
          "",
          ""
        );
        process.stdout.write(df);
      }
    }
  }
});


module.exports = File;
