module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            start: ['tmp'],
            dist: ['dist'],
            end: ['tmp']
        },

        concat: {
            options: {
                stripBanners: false
            },
            js: {
                src: [
                    '_source/libs/jquery/jquery.js',
                    '_source/libs/bootstrap/dist/bootstrap.js',
                    '_source/libs/fastclick/lib/fastclick.js',
                    '_source/js/app.js'
                ],
                dest: 'dist/js/app.js'
            }
        },

        uglify: {
            options: {
                preserveComments: 'some',
                report: 'min'
            },
            dist: {
                src: ['<%= concat.js.dest %>'],
                dest: 'dist/js/app.min.js'
            }
        },

        less: {
            dist: {
                files: {
                    'dist/css/app.css': '_source/less/main.less'
                }
            },
            distMinify: {
                options: {
                    cleancss: true,
                    report: 'min'
                },
                files: {
                    'dist/css/app.min.css': 'dist/css/app.css'
                }
            }
        },

        copy: {
            fonts: {
                expand: true,
                cwd: '_source/libs/bootstrap/dist/fonts',
                src: ['*'],
                dest: 'dist/fonts'
            },
            website: {
                expand: true,
                cwd: '_source/website',
                src: ['*'],
                dest: 'dist/'
            }
        },

        imagemin: {
            options: {
                pngquant: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '_source/img',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/img'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // CSS
    grunt.registerTask('dist-css', ['less:dist', 'less:distMinify']);

    // JS
    grunt.registerTask('dist-js', ['concat:js', 'uglify:dist']);

    // Images
    grunt.registerTask('dist-images', ['imagemin:dist']);

    // Dist
    grunt.registerTask('dist', ['clean:dist', 'dist-css', 'dist-js', 'dist-images', 'copy:fonts', 'copy:website']);

    // Default task.
    grunt.registerTask('default', ['clean:start', 'dist', 'clean:end']);
};

