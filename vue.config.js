const copyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  // 配置popup.html页面
  pages: {
    popup: {
      entry: "src/popup/main.js",
      template: "src/popup/index.html",
      filename: "popup.html",
    },
    newTabPage: {
      entry: "src/popup/newTabPage.js",
      template: "src/popup/newTabPage.html",
      filename: "newTabPage.html",
    },
  },
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    entry: {
      background: "./src/background/main.js",
    },
    output: {
      filename: "js/[name].js",
    },
    plugins: [
      // 复制文件到指定目录
      new copyWebpackPlugin({
        patterns: [
          {
            from: path.resolve("src/manifest.json"),
            to: `${path.resolve("dist")}/manifest.json`,
          },
          {
            from: path.resolve("src/assets"),
            to: path.resolve("dist/assets"),
          },
          {
            from: path.resolve("src/plugins/inject.js"),
            to: path.resolve("dist/js"),
          },
        ],
      }),
    ],
  },
  chainWebpack (config) {
    if (process.env.NODE_ENV === 'production') {
      config.output.filename('js/[name].js').end()
      config.output.chunkFilename('js/[name].js').end()
    }
    config.optimization.minimize(false);
  },
  css: {
    extract: {
      filename: "css/[name].css",
    },
  },
};
