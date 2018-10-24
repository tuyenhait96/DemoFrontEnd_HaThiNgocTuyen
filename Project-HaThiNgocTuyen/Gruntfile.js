module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      //Define Path
      dirs: {
          input                 : 'editor',
          inputSCSS             : 'editor/sass',
          inputJS               : 'editor/js',
          inputHTMLELements     : 'editor/html-elements',
          output                : 'project',
          outputCSS             : 'project/css',
          outputJS              : 'project/js'
      },

      // Plugin 01: Uglify : minify lai cac tap tin JS
      uglify: {
        options: {
          beautify: false, // làm cho js đọc dễ hơn nhưng dung luong van lớn nên k bật
          compress: {
            drop_console: false // bỏ console.log
          }
        },
        my_target: {
          files: {
            // '<%= dirs.outputJS %>/menu.js' : ['<%= dirs.inputJS %>/menu.js']
          }
        }
      },

    // Plugin 02: Sass : dịch tập tin trong folder inputSCC sang outputSCSS
    sass: {                           
        options: {                       
          style: 'expanded'
        },
        files: {                         
          src: '<%= dirs.inputSCSS %>/main.scss',
          dest:'<%= dirs.outputCSS %>/main.css',
        }
    },
    
    // Plugin 03: Watch: quan sat sự thay đổi hay không, xem nếu filters thay đổi thì biên dịch lại sass, va thay đổi includes
      watch: {
        scripts: {
          files: [
            '<%= dirs.inputSCSS %>/*.scss',     //development/sass/*.sass
            '<%= dirs.inputSCSS %>/*/*.scss',     //development/sass/*/*.sass
            '<%= dirs.inputJS %>/*.js', // nếu như có sự thay đổi ta thực hiện task o phia dưới 
            '<%= dirs.input %>/*.html',
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

    // Plugin 04: Connect
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

    // Plugin 05: Includes : quan sát tập tin html nào 
      includes: {
        files: {
          src: [
            '<%= dirs.input %>/*.html'
          ], // Source files
          dest: '<%= dirs.output %>/', // hiển thị kết quả ở folder này
          flatten: true,
          cwd: '.',
          options: {
            silent: true,
            banner: ''
          }
        }
      }

    });
    
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-includes');

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
  
}