const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');


const config = {
   entry: path.resolve('src', 'index.tsx'),
   output: {
      path: path.resolve(__dirname, 'docs'),
      filename: 'bundle.js'
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/
         },
         {
            test: /\.ts|tsx$/,
            loader: 'ts-loader',
            exclude: /node_modules/
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
            exclude: /node_modules/
         }
      ]
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: path.join(__dirname, 'src', 'index.html'),
         filename: 'index.html'
      })
   ],
   resolve: {
      extensions: ['.tsx', '.ts', '.js']
   }
};


module.exports = config;
