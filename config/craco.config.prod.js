/* craco.config.js */
const path = require('path');
const rootPath = path.join(__dirname, '..');
const srcPath = path.join(rootPath, 'src');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
  babel: {},
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.entry = {
        main: [env === 'development' &&
          // Hot Reload
          require.resolve('react-dev-utils/webpackHotDevClient'),
        // Entry Point
        paths.appIndexJs].filter(Boolean),
        background: path.join(srcPath, 'background_script', 'index.ts'),
      }
      webpackConfig.output = {
        ...webpackConfig.output,
        ...{
          filename: 'static/js/[name].js',
        },
      }

      //webpackConfig.devtool = false,

      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        ...{
          runtimeChunk: false,
        },
      }
      return webpackConfig
    },

    plugins: [
      // Generates an new file 'popup.html' with the <script> injected.
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            chunks: ['main'],
            template: path.resolve(__dirname, '../public/index.html'),
            filename: "popup.html",
          },
        )
      ),
      new Dotenv({
        path: path.join(__dirname, '..', '.env'),
      }),
      new webpack.DefinePlugin({
        // eslint-disable-next-line no-undef
        'process.env.FREELANCER_TOKEN': JSON.stringify(process.env.FREELANCER_TOKEN),
      }),
    ],
  }
}

