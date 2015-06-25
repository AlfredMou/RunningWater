module.exports = function(grunt) {
    // 配置
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        uglify : {
            options : {
                banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build : {
                src : 'src/javascript/runningWater.js',
                dest : 'dist/javascript/runningWater.min.js'
            }
        },
        watch: {
            js: {
                files: ['src/javascript/runningWater.js'],
                tasks: ['uglify']
            }
        }
    });
    // 载入uglify插件，分别对于合并和压缩
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 注册任务
    grunt.registerTask('default', ['uglify','watch']);
};