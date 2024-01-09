const path = require('path');
const rootPath = path.join(__dirname, '..');
const srcPath = path.join(rootPath, 'src');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    webpack: {
      configure: (webpackConfig, {env, paths}) => {
        return {
          ...webpackConfig,
          //The "root" entry points to the application
          entry: {
            main: [env === 'development' && 
              // Hot Reload
              require.resolve('react-dev-utils/webpackHotDevClient'),
              // Entry Point
              paths.appIndexJs].filter(Boolean),
            background: path.join(srcPath, 'background_script', 'index.ts'),
          },
          output: {
            ...webpackConfig.output,
            filename: 'static/js/[name].js',
          },
          optimization: {
            ...webpackConfig.optimization,
            runtimeChunk: false,
          },
        }
      },
      plugins: [
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin(
          Object.assign(
            {},
            {
              inject: true,
              chunks: ['popup'],
              filename: 'popup.html',
              template:'./src/popup.html'
            },
          )
        )
      ],
    },

  }
  