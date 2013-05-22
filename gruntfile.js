module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Debug

        clean: ['build'],

        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: {
                    'build/debug/index.html': 'src/views/index.jade'
                }
            }
        },

        stylus: {
            compile: {
                files: {
                    'build/debug/css/style.css': 'src/public/styles/style.styl'
                }
            }
        },

        copy: {
            debug: {
                files: [
                    { expand: true, cwd: 'src/public/img/', src: ['**'], dest: 'build/debug/img' },
                    { expand: true, cwd: 'libs/bootstrap/css/', src: ['**'], dest: 'build/debug/css' }
                ]
            },
            release: {
                files: [
                    { expand: true, cwd: 'src/public/img/', src: ['**'], dest: 'build/release/img' },
                    { expand: true, cwd: 'build/debug/', src: ['index.html'], dest: 'build/release/' },
                ]
            }
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src',
                    name: 'app',
                    out: 'build/debug/js/app.js',
                    mainConfigFile: 'src/app.js'
                }
            }
        },

        concat: {
            dist: {
                src: [
                  'libs/require/almond.js',
                  'build/debug/js/app.js'
                ],

                dest: 'build/debug/js/app.js',

                separator: ';'
            }
        },

        // Release

        uglify: {
            'build/release/js/app.js': [
                'build/debug/js/app.js'
            ]
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: 'build/debug/css/',
                src: ['*.css'],
                dest: 'build/release/css/'
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

    grunt.registerTask('default', ['release']);
    grunt.registerTask('debug', ['jshint', 'clean', 'jade', 'stylus', 'copy:debug', 'requirejs', 'concat']);
    grunt.registerTask('release', ['debug', 'uglify', 'cssmin', 'copy:release']);
    grunt.registerTask('test', ['jshint']);
};