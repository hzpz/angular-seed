module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    var globalConfig = {
        temp: "tmp",
        app: "app",
        dist: "dist"
    };

    grunt.initConfig({
        config: globalConfig,

        clean: {
            temp: {
                src: ['<%= config.temp %>']
            },
            dist: {
                src: ['<%= config.dist %>']
            }
        },

        wiredep: {
            bower: {
                src: ['<%= config.app %>/index.html']
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.html',
                        'view*/*.html'
                    ]
                }]
            }
        },

        useminPrepare: {
            html: '<%= config.app %>/index.html',
            options: {
                staging: '<%= config.temp %>',
                dest: '<%= config.dist %>'
            }
        },

        usemin: {
            html: ['<%= config.dist %>/**/*.html'],
            css: ['<%= config.dist %>/styles/**/*.css'],
            assetsDirs: [
                'bower_components/html5-boilerplate/js/vendor'
            ]
        }

    });

    grunt.registerTask('default', [
        'clean',
        'wiredep',
        'copy',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'usemin'
    ]);

};