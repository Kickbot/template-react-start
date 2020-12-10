/* eslint-disable import/no-nodejs-modules, import/no-commonjs */

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const Webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 3000

const paths = {
  src: path.resolve(__dirname, 'src'),
  output: path.resolve(__dirname, 'build'),
  public: path.resolve(__dirname, 'public'),
  modules: path.resolve(__dirname, 'node_modules'),
  html: path.resolve(__dirname, 'public/index.ejs'),
}
const filenameSuffix = isProduction ? '.[contenthash]' : ''
const filenames = {
  js: `[name]${filenameSuffix}.js`,
  css: `[name]${filenameSuffix}.css`,
  chunkFilename: '[name].bundle.js',
}
const svgoOptions = {
  plugins: [
    {
      removeTitle: true,
      convertColors: { shorthex: true },
      cleanupIDs: true,
      convertPathData: true,
    },
  ],
  floatPrecision: 2,
}
const loaders = {
  babel: {
    loader: 'babel-loader',
    options: {
      sourceMap: true,
    },
  },
  style: {
    loader: 'style-loader',
  },
  css: {
    loader: 'css-loader',
    /** @type {CSSLoaderConfig} */
    options: {
      sourceMap: true,
      importLoaders: 1,
      modules: false,
    },
  },
  postcss: {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      plugins: [
        require('postcss-nested')(),
        require('postcss-import')({}),
        /**
         * @see https://preset-env.cssdb.org/features
         */
        require('postcss-preset-env')({
          stage: 1,
        }),
      ],
    },
  },
  svg: {
    /**
     * @see https://github.com/boopathi/react-svg-loader/tree/master/packages/react-svg-loader
     */
    loader: 'react-svg-loader',
    options: {
      jsx: true, // true outputs JSX tags
      svgo: svgoOptions,
    },
  },
  svgAsImage: {
    loader: 'svgo-loader',
    options: svgoOptions,
  },
  url: {
    loader: 'url-loader',
    options: {
      name: '[path][name].[ext]',
      // outputPath: 'assets/',
    },
  },
  file: {
    loader: 'file-loader',
    options: {
      name: '[path][name].[ext]',
      outputPath: 'assets/',
    },
  },
}

module.exports = {
  context: paths.src,

  mode: isProduction ? 'production' : 'development',

  entry: path.resolve(paths.src, 'index.js'),
  // entry: {
  //   main: path.resolve(paths.src, 'index.js'),
  // issuer: path.resolve(paths.src, 'pages/issuer/index.js'),
  // investor: path.resolve(paths.src, 'pages/investor/index.js'),
  // admin: path.resolve(paths.src, 'pages/admin/index.js'),
  // signup: path.resolve(paths.src, 'pages/signup/index.js'),
  // editor: path.resolve(paths.src, 'components/content-editor/index.js'),
  // },

  output: {
    path: paths.output,
    filename: filenames.js,
    publicPath: '/',
    // chunkFilename: filenames.chunk,
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [loaders.babel],
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : loaders.style,
          loaders.css,
          loaders.postcss,
        ],
      },
      {
        test: /\.(png|jpeg|jpg|gif|webp|pdf)$/,
        use: [loaders.file],
      },
      {
        test: /\.svg$/,
        include: [/img/],
        use: [loaders.file],
      },
      {
        test: /\.svg$/,
        // test: /icons(\/|\\).*\.svg$/,
        include: [/icons/],
        use: [loaders.babel, loaders.svg],
      },
    ],
  },

  plugins: [
    isProduction && new CleanWebpackPlugin(),
    new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
      filename: filenames.css,
    }),
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new CopyWebpackPlugin([{ context: path.resolve(__dirname, 'public'), from: '**/*' }]),
    process.env.ANALYZER === 'true' && new BundleAnalyzerPlugin(),
  ].filter(Boolean),

  devtool: isProduction ? 'source-map' : 'inline-source-map',

  devServer: {
    proxy: {
      '/api/**': {
        target: process.env.API_HOST,
        secure: true,
        changeOrigin: true,
      },
      '/images/**': {
        target: process.env.API_HOST,
        secure: true,
        changeOrigin: true,
      },
    },
    port: PORT,
    //host: 'http://localhost',
    public: `localhost:${PORT}`,
    historyApiFallback: true,
    contentBase: [paths.public, paths.output],
    watchOptions: {
      ignored: /node_modules/,
    },
  },

  optimization: isProduction
    ? {
        minimize: true,
        minimizer: [
          new OptimizeCSSAssetsPlugin({}),
          new TerserPlugin({
            sourceMap: true,
          }),
        ],
        splitChunks: {
          cacheGroups: {
            editor: {
              test: /[\\/]@editorjs[\\/]/,
              name: 'editor',
              priority: 10,
              chunks: 'all',
            },
            core_vendors: {
              test: /[\\/](react|react-dom|redux|react-redux|reselect|react-router-dom)[\\/]/,
              name: 'core_vendors',
              priority: 2,
              chunks: 'all',
            },
            other_vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'other_vendors',
              priority: 1,
              chunks: 'all',
            },
            moment: {
              test: /[\\/]moment[\\/]/,
              name: 'moment',
              priority: 5,
              chunks: 'all',
            },
          },
        },
      }
    : {},
}

/**
 * @typedef {Object} CSSLoaderConfig
 * @prop {Boolean|Function}	[url=true]	Enable/Disable url() handling
 * @prop {Boolean\/Function} [import=true]	Enable/Disable @import handling
 * @prop {Boolean|String}	[modules=false]	Enable/Disable CSS Modules and setup mode
 * @prop {String}	[localIdentName="hash:base64"]	Configure the generated ident
 * @prop {Boolean} [sourceMap=false]	Enable/Disable Sourcemaps
 * @prop {Boolean|String} [camelCase=false]	Export Classnames in CamelCase
 * @prop {Number} [importLoaders=0]	Number of loaders applied before CSS loader
 * @prop {Boolean} [exportOnlyLocals=false]	Export only locals
 */
