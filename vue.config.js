const webpack = require('webpack');
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin //Webpack包文件分析器
// const CompressionPlugin = require('compression-webpack-plugin') //Gzip

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: false,
  // publicPath: '/', // 部署项目路径
  outputDir:"busBrainSystem", //打包后的项目目录名称
  publicPath: "./",
  // baseUrl: process.env_NODE_ENV == 'production' ? '/vehiclerepair/' : '', // 部署项目路径
  devServer: {
    port: 8086, // 端口号
    // host: '10.1.',
    open: false, // 配置自动启动浏览器
    proxy: {
      '/busbrain/*': {
        // target: 'http://10.1.4.175:8001/traffic-investment',
        // target: 'http://10.1.30.204:50020/busbrain',
        // target: 'http://shnavi.itcics.com:3003/busbrain', // 测试
        target: 'http://180.167.126.126:3001/busbrain', // 测试
        // target: 'http://192.168.30.23:8005/busbrain', // 测试
        
        changeOrigin: true,
        pathRewrite: {
          '/busbrain': '/'
        }
      },
     
    }
  },
  // configureWebpack: {
  //   // webpack 配置项
  //   // resolve: {
  //   //   alias: {
  //   //     vue$: 'vue/dist/vue.esm.js'
  //   //     // '@': resolve('src'),
  //   //     // 'views': resolve('src/views')
  //   //   }
  //   // },
  //   plugins: [
  //     new webpack.ProvidePlugin({
  //       $: 'jquery',
  //       jQuery: 'jquery',
  //       'windows.jQuery': 'jquery'
  //     })
  //   ]
  // },

  configureWebpack: {
    // "plugins": ["@babel/plugin-syntax-dynamic-import"],
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ],

  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/css/global.scss";`
      }
    }
  }
};
