module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js']
    },

    jasmine: {
      pivotal: {
        src: 'src/**/*.js',
        options: {
          specs: 'spec/*-spec.js',
          keepRunner: true
        }
      }
    },

    complexity: {
      generic: {
        src: ['src/**/*.js'],
        options: {
          breakOnErrors: true,
          errorsOnly: false,               // show only maintainability errors
          cyclomatic: [3, 7, 12],          // or optionally a single value, like 3
          halstead: 10,           // or optionally a single value, like 8
          maintainability: 100,
          hideComplexFunctions: false,     // only display maintainability
          broadcast: false                 // broadcast data over event-bus
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('ci:local', ['jshint', 'complexity', 'jasmine']);
  grunt.registerTask('ci:dev', ['jshint', 'complexity', 'jasmine']);

  grunt.registerTask('default', ['ci:local']);
};