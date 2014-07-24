module.exports = (grunt) ->

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  src =
    less: [
      'app/less/**/*.less'
    ]
    css: [
      'bower_components/normalize-css/normalize.css',
      'app/less/compiled.css'
    ]
    js: [
      'bower_components/angular/angular.js',
      'app/js/**/*.js'
    ]

  watchTasks = ['less', 'cssmin', 'uglify']

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    connect:
      options:
        base: 'app/'
      webserver:
        options:
          port: 8000
          keepalive: true
      devserver:
        options:
          port: 8000
      testserver:
        options:
          port: 9000
      coverage:
        options:
          base: 'coverage/'
          port: 5000
          keepalive: true

    less:
      development:
        files:
          'app/less/compiled.css': src.less

    cssmin:
      minify:
        src: src.css
        dest: 'app/assets/app.css'

    uglify:
      assets:
        files:
          'app/assets/app.js': src.js

    watch:
      assets:
        files: src.less.concat src.js
        tasks: watchTasks

  grunt.registerTask('default', ['dev']);
  grunt.registerTask('dev', watchTasks.concat ['connect:devserver', 'watch:assets']);
