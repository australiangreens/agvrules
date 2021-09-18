module.exports = function(context, options) {
  return {
    name: 'webpack-overrides',
    configureWebpack: function (config, isServer, utils) {
      console.log(Object.keys(config));
      return {
        externals : { canvas: {} }
      };
    },
  }
};