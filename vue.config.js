const path = require('path')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end()
        config.plugins.delete('prefetch')
      }
    }
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('@components', resolve('src/components'))
  },
  // configureWebpack(config) {
  //       config.externals = {
  //           'AMap': 'AMap' // 高德地图配置
  //       }
  //  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8087, // 端口号
    proxy: {
      '/nypt': {
        target: 'http://10.80.50.53:8080/nypt/', // 正式
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/nypt': '/', // 重写接口
        },
      },
    },
  },
}
