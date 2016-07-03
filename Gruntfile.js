module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    uglify: {
      js: {
        files: {
          'dist/js/app.js': ['src/js/app.js'],
          'dist/jasmine/lib/jasmine-2.1.2/boot.js': ['src/jasmine/lib/jasmine-2.1.2/boot.js'],
          'dist/jasmine/lib/jasmine-2.1.2/console.js': ['src/jasmine/lib/jasmine-2.1.2/console.js'],
          'dist/jasmine/lib/jasmine-2.1.2/jasmine-html.js': ['src/jasmine/lib/jasmine-2.1.2/jasmine-html.js'],
          'dist/jasmine/lib/jasmine-2.1.2/jasmine.js': ['src/jasmine/lib/jasmine-2.1.2/jasmine.js'],
          'dist/jasmine/spec/feedreader.js': ['src/jasmine/spec/feedreader.js']
        }
      }
    },

    htmlmin: {                                     // Task
      main: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'index.html': 'src/index.html'         // 'destination': 'source'
        }
      }
    },

    cssmin: {
      css: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.css'
        },
        {
          expand: true,
          cwd: 'src/jasmine/lib/jasmine-2.1.2',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/jasmine/lib/jasmine-2.1.2',
          ext: '.css'
        }]
      }
    },

    pagespeed: {
      options: {
        nokey: true,
        url: "http://aaronjuarez.github.io/feed-reader-testing/"
      },
      prod: {
        options: {
          url: "http://aaronjuarez.github.io/feed-reader-testing/",
          locale: "en_GB",
          strategy: "desktop",
          threshold: 80
        }
      },
      paths: {
        options: {
          paths: [],
          locale: "en_GB",
          strategy: "desktop",
          threshold: 80
        }
      }
    }

  });

  grunt.registerTask('default', ['uglify', 'cssmin', 'htmlmin']);
  grunt.registerTask('html', ['htmlmin']);
  grunt.registerTask('speed', ['pagespeed']);

};