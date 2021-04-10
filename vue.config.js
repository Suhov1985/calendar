const path = require("path")

module.exports = {
  css: {
    // Enable CSS source maps.
    sourceMap: true,
    // Enable CSS modules for all CSS/pre-processor files.
    // This option does not affect *.vue files.
    modules: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": __dirname,
        "~": __dirname,
        "assets": path.resolve(__dirname, "./assets"),
        "public": path.resolve(__dirname, "./public"),
      },
    },
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Calendar"

      return args
    })
  },
}
