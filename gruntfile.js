module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Debug

        clean: ['dist'],

        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: {
                    'dist/debug/index.html': 'src/templates/index.jade'
                }
            }
        },

        stylus: {
            compile: {
                files: {
                    'dist/debug/css/style.css': 'src/public/styles/style.styl'
                }
            }
        },

        copy: {
            debug: {
                files: [
                    { expand: true, cwd: 'src/public/img/', src: ['**'], dest: 'dist/debug/img' },
                    { expand: true, cwd: 'libs/bootstrap/css/', src: ['**'], dest: 'dist/debug/css' }
                ]
            },
            release: {
                files: [
                    { expand: true, cwd: 'src/public/img/', src: ['**'], dest: 'dist/release/img' },
                    { expand: true, cwd: 'dist/debug/', src: ['index.html'], dest: 'dist/release/' },
                ]
            }
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src',
                    name: 'app',
                    out: 'dist/debug/js/app.js',
                    mainConfigFile: 'src/app.js',
                    optimize: 'none'
                }
            }
        },

        concat: {
            dist: {
                src: [
                  'libs/almond.js',
                  'dist/debug/js/app.js'
                ],

                dest: 'dist/debug/js/app.js',

                separator: ';'
            }
        },

        // Release

        uglify: {
            'dist/release/js/app.js': [
                'dist/debug/js/app.js'
            ]
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: 'dist/debug/css/',
                src: ['*.css'],
                dest: 'dist/release/css/'
            }
        },

        // Test

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

    // Debug
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Release
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Test
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['release', 'watch']);
    grunt.registerTask('debug', ['jshint', 'clean', 'jade', 'stylus', 'copy:debug', 'requirejs', 'concat']);
    grunt.registerTask('release', ['debug', 'uglify', 'cssmin', 'copy:release']);
    grunt.registerTask('test', ['jshint']);
};