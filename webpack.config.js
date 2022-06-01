const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = !isDevelopment;

const filename = (ext) => (isDevelopment ? `[name].${ext}` : `[name].[hash].${ext}`);

const optimization = () => {
  const config = {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  };
  if (isProduction) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin(),
    ];
  }
  return config;
};

const babelOptions = (preset) => {
  const options = {
    presets: ['@babel/preset-env'],
  };

  if (preset) {
    options.presets.push(preset);
  }

  return options;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.jsx',
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    open: true,
    hot: isDevelopment,
    historyApiFallback: true,
  },
  devtool: isDevelopment ? 'source-map' : false,
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProduction,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist/favicon.ico'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pcss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/[hash][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions(),
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react'),
        },
      },
    ],
  },
};
