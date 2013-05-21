module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      src: ['build']
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: true
          },
          pretty : true
        },
        files: {
          'build/index.html': 'src/views/index.jade'
        }
      }
    },
    stylus: {
      compile: {
        files: {
          'build/css/style.css': 'src/public/styles/style.styl'
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src/public/img/', src: ['**'], dest: 'build/img'}, 
          {expand: true, cwd: 'libs/bootstrap/css/', src: ['**'], dest: 'build/css'}, 
          {expand: true, cwd: 'libs/require/', src: ['require.js'], dest: 'build/js/lib'}, 
        ]
      }
    },
    requirejs: {
        compile: {
            options: {               
                baseUrl: 'src',
                name: 'app',
                out: 'build/js/app.js',
                mainConfigFile: 'src/app.js'
            }               
        }
    },
    jshint: {
      files: ['gruntfile.js', 'src/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        },
        smarttabs: true
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['jshint', 'clean', 'jade','stylus', 'copy', 'requirejs']);

};