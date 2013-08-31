module.exports = function(grunt) {

  var paths = {
      src: 'src',
      deploy: 'deploy'
  };

  // Project configuration.
  grunt.initConfig({

    appPaths: paths,

    watch: {
      files: ['<%=appPaths.src%>/js/**/*', '<%=appPaths.src%>/template/**/*'],
      tasks: ['requirejs']
    },

    // Clean deploy folder //
    clean: {
       dist:{
          files: [{
            dot: true,
            src: [
              '.tmp',
              '<%= appPaths.deploy %>*//*',
              '!<%= appPaths.deploy %>/.git*'
            ]
          }]
        }
    },

    // Copy jsLibs, images and css to deploy //
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%=appPaths.src%>',
          dest: '<%=appPaths.deploy%>',
          src: [
              'js/lib/jquery-1.7.2.min.js',
              'js/lib/require.js',
              'img/**/*',
              'index.html'
          ]
        }]
      },
      // Copy un-minified scripts to deploy //
      dev: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%=appPaths.src%>',
          dest: '<%=appPaths.deploy%>',
          src: [
            'js/**/*',
            'img/**/*',
            'css/**/*',
            'index.html'
          ]
        }]
      }
    },

    // Prepend versioning identifiers onto filenames //
    rev: {
      dist: {
        files: {
          src: [
            '<%= appPaths.deploy %>/js/{,*/}*.js',
            '<%= appPaths.deploy %>/css/{,*/}*.css'/*,
            '<%= appPaths.deploy %>/img/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'*/
          ]
        }
      }
    },

    // Replace script/css paths with minified names //
    useminPrepare: {
      html: '<%= appPaths.src %>/index.html',
      options: {
         dest: '<%= appPaths.deploy %>'
      }
    },
    usemin: {
      html: ['<%= appPaths.deploy %>/{,*/}*.html'],
        css: ['<%= appPaths.deploy %>/css/{,*/}*.css'],
        options: {
          dirs: ['<%= appPaths.deploy %>']
        }
    },

    // Concat and minify css //
    cssmin: {
      dist: {
        files: {
          '<%= appPaths.deploy %>/css/main.css': [
            /*'.tmp/css/{,*//*}*.css',*/
            '<%= appPaths.src %>/css/{,*/}*.css'
          ]
        }
      }
    },

    // Compile
    requirejs: {
      compile: {
        options: {
          name: 'main',
          baseUrl: '<%=appPaths.src%>/js/',
          mainConfigFile: "<%=appPaths.src%>/js/main.js",
          out: "<%=appPaths.deploy%>/js/main.js"
        }
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('build', [
    'clean',
    'useminPrepare',
    'cssmin',
    'copy:dist',
    'requirejs',
    'rev',
    'usemin'
  ]);

  // Default task.
  grunt.registerTask('default', ['build']);
};