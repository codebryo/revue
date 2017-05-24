var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: "Revue",
    libraryTarget: "umd"
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        options: {
          presets: ["es2015"]
        },
      }
    ]
  },

  externals: ['vue/dist/vue.common', 'vuex']
};
