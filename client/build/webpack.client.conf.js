const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')
const vueConfig = require('./vue-loader.conf')
const HTMLPlugin = require('html-webpack-plugin')

const config = merge(base, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest']
    }),

    new HTMLPlugin({
      template: 'src/index.template.html'
    })
  ]
})

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}

module.exports = config