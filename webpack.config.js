const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) =>{
    const isProduction = options.mode === 'production';

    const config = {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'none' : 'source-map',
        watch: !isProduction,
        entry: ['./src/index.js', './src/sass/style.scss'],
        output: {
            filename: 'app.js',
            path: path.join(__dirname, './dist')
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['@babel/preset-env']
                      }
                    }
                  },
                  {
                    test: /\.s[ac]ss$/i,
                    use: [
                      // Creates `style` nodes from JS strings
                      MiniCssExtractPlugin.loader,
                      // Translates CSS into CommonJS
                      'css-loader',
                      // Compiles Sass to CSS
                      'sass-loader',
                    ],
                  },
                  {
                    test: /\.(png|svg|jpe?g|gif|mp3)$/i,
                    use: [
                      {
                        loader: 'file-loader',
                      },
                    ],
                  },
                  {
                    test: /\.html$/i,
                    loader: 'html-loader',
                  },
            ]
        },

        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: 'index.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
            
        ],
        devServer: {
               contentBase: './dist',
            },
    };

    return config;
};