const webpack = require('webpack')
const path = require('path')
module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/resume-process' : '/',
  publicPath:'/resume-process',
  lintOnSave: false,//禁用eslint
  configureWebpack: {
    output: {
      sourcePrefix: ' '
    },
    amd: {
      toUrlUndefined: true
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve('src'),
        'assets': path.resolve('src/assets')
      }
    },

    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })

    ]
  },
    css: {
      loaderOptions: {
        postcss: {
          plugins: [
            require('postcss-pxtorem')({
              rootValue: 75,
              selectorBlackList: ['van'],
              propList: ['*'],
            }),
          ]
        }
      }
    }
  }
