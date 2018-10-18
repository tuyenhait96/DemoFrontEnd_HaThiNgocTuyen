module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      //Define Path
      dirs: {
          input         : 'development',
          inputSCSS             : 'development/sass',
          inputJS               : 'development/js',
          inputHTMLELements     : 'development/html-elements',
          output      : 'production',
          outputCSS             : 'production/css',
          outputJS              : 'production/js'
      },

      // Plugin 01: CSSmin
      cssmin: {
        options: {
        },
        target: {
          files: {
            '<%= dirs.outputCSS %>/main.css' : '<%= dirs.outputCSS %>/main.css'
          }
        }
      },

      // Plugin 02: Uglify : minify lai cac tap tin JS
      uglify: {
        options: {
          beautify: false, // làm cho js đọc dễ hơn nhưng dung luong van lớn nên k bật
          compress: {
            drop_console: false // bỏ console.log
          }
        },
        my_target: {
          files: {
            '<%= dirs.outputJS %>/menu.js' : ['<%= dirs.inputJS %>/menu.js']
          }
        }
      },

    // Plugin 03: Sass : dịch tập tin trong folder inputSCC sang outputSCSS
    sass: {                           
        options: {                       
          style: 'expanded'
        },
        files: {                         
          src: '<%= dirs.inputSCSS %>/main.scss',
          dest:'<%= dirs.outputCSS %>/main.css',
        }
    },
    
    // Plugin 04: Watch: quan sat sự thay đổi hay không, xem nếu filters thay đổi thì biên dịch lại sass, va thay đổi includes
      watch: {
        scripts: {
          files: [
            '<%= dirs.inputSCSS %>/*.scss',     //development/sass/*.sass
            '<%= dirs.inputSCSS %>/*/*.scss',     //development/sass/*/*.sass
            '<%= dirs.inputJS %>/*.js', // nếu như có sự thay đổi ta thực hiện task o phia dưới 
            '<%= dirs.input %>/index.html',
            '<%= dirs.inputHTMLELements %>/*.html',
            '<%= dirs.inputHTMLELements %>/*/*.html',
          ],
          tasks: ['sass','includes', 'uglify'],
          options: {
            spawn: false,
            livereload: true
          },  
        },
      },

    // Plugin 05: Connect
      connect: {
        server: {
          options: {
            hostname: 'localhost',
            port: 3069,
            base: '<%= dirs.output %>/',
            livereload: true
          }
        }
      },

    // Plugin 06: Includes : quan sát tập tin html nào 
      includes: {
        files: {
          src: [
            '<%= dirs.input %>/index.html'
          ], // Source files
          dest: '<%= dirs.output %>/', // hiển thị kết quả ở folder này
          flatten: true,
          cwd: '.',
          options: {
            silent: true,
            banner: ''
          }
        }
      },

    // Plugin 07: HTML Minify
      htmlmin: {                                     // Task
        dist: {                                      // Target
          options: {                                 // Target options
            removeComments: false,
            collapseWhitespace: true
          },
          files: {                                   // Dictionary of files
            '<%= dirs.output %>/index-min.html': '<%= dirs.output %>/index.html',        // dist, dest: tập tin kết quả
          }
        }
      }
    });
    
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    //03 Register tesk
    grunt.registerTask('default', 'Log some stuff.', function() {
      grunt.log.write('Logging some stuff... ').ok();
    });
    // Task Developer 
    grunt.registerTask('dev', [
      'includes', // include các file html được tách ra
      'sass',     // biên dịch các tập tin sass,
      'uglify', // vi trí pluin này rất quan trọng  
      'connect',  // nó chạy webserver ảo
      'watch',    // quan sat sự thay đổi cac tập tin
    ]);
  
    // Task Publish Project 
    grunt.registerTask('publish', [
      'cssmin',
      'uglify',
      'htmlmin'
    ]);
  }