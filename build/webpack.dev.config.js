/**
 * webpack的配置及其说明 #后面值是默认值
*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 入口  #/src/index.js
    entry: {
        app: './src/index.js'
    },

    // 出口 #/dist/main.js 
    output: {
        path: path.resolve(__dirname, '../dist'), // 指定输出文件的路径
        /**
         * 决定输出文件的名称，对于多个入口，有多种指定名称方式。 
         * 内部名称：[name] / chunk id: [id] / 构建过程的hash: [hash]  
         */
        filename: '[name].[hash].js',
    },

    /**
     *  提供了简单的web服务器, 并具有实时重载功能。
     *  webpack-dev-server编译后不会输出到任何文件，而是将bundle文件放在内存中
     *  然后把它们放在server的服务下面
    */
    devServer: {
        host: 'localhost',  // 指定要访问的主机， #localhost
        port: '8090', // 指定访问的端口号 #8080
        /**
         * 告诉服务器从哪里获取资源，当提供静态资源的时候才需要。publicPath优先级比较高。
         * 可以将值设置为false关闭它。  #默认使用当前工作目录提供内容
         */
        contentBase:  './dist',
        contentBasePublicPath: '/static/',  // 告诉服务器访问contentBase配置的静态资源的url前缀  

        compress: true, // 为所有服务设置gzip压缩  
        hot: true, // 开启webpack模块热替换功能
        open: true, // 自动打开浏览器

        // publicPath: '/threejs-demo/',
        /**
         *  以下选项只能通过运行时添加命令参数使用
         *  color: false, // 启用或者禁用控制台颜色 
         */
    },

    module: {
        rules: [
            {
                test: /\.(scss)|(css)$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            }, 
            {
                test: /\.(png)|(jpe?g)/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets',
                    name: '[name].[ext]',
                }
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            // template: 'index.html',
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'app.html',
        //     template: 'index.html',
        //     chunks: ['app']
        // })
    ],

    /**
     *  resolve选项用于配置webpack解析的一些规则
     */
    resolve: {
        extensions: ['.js', 'jsx'], // 自动确定解析的扩展名，能够使得用户在引入模块的时候不需要带扩展名
        alias: {
            '@': path.resolve(__dirname, '../src'),
        }
    }
}