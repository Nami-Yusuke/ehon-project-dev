const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
// ==============================================
// 設定
// ==============================================
const dir = {
  src: "src",
  dist: "public",
  assets: "assets",
};
const settings = {
  pug: true,
  sass: true,
  ts: true,
  php: false,
};
// ==============================================
// BrowserSync の設定
// ==============================================
const browserOptions = {
  host: "localhost",
  port: 3000,
  online: true,
  open: "external",
};
browserOptions.server = { baseDir: [`${dir.dist}`] };
// ==============================================
// エントリーポイント設定
// ==============================================
const entryPoints = {
  main: [`./${dir.src}/${dir.assets}/js/main.js`, `./${dir.src}/${dir.assets}/css/common.css`],
};
if (settings.sass) {
  entryPoints.main[1] = `./${dir.src}/${dir.assets}/sass/common.scss`;
}

module.exports = {
  entry: {
    ...entryPoints,
  },
  output: {
    path: path.resolve(__dirname, dir.dist),
    filename: `./${dir.assets}/js/[name].bundle.js`,
    // assetModuleFilename: `${dir.assets}/img/[name][ext]`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          "postcss-loader",
          "sass-loader",
          "import-glob-loader",
        ],
      },
    ],
  },
  plugins: [
    new BrowserSyncPlugin(browserOptions),
    new MiniCssExtractPlugin({
      filename: `./${dir.assets}/css/common.css`,
    }),
    new StyleLintPlugin({
      fix: true,
      failOnError: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: `${dir.src}/${dir.assets}/img`,
          to: `${dir.assets}/img`,
          noErrorOnMissing: true,
        },
        {
          from: `${dir.src}/html/`,
          noErrorOnMissing: true,
        },
        {
          from: ".htaccess",
          context: `${dir.src}/`,
          noErrorOnMissing: true,
        },
        {
          from: "*.txt",
          context: `${dir.src}/`,
          noErrorOnMissing: true,
        },
        {
          from: "*.json",
          context: `${dir.src}/`,
          noErrorOnMissing: true,
        },
        {
          from: `${dir.src}/${dir.assets}/font`,
          to: `${dir.assets}/font`,
          noErrorOnMissing: true,
        },
        {
          from: "*.xml",
          context: `${dir.src}/`,
          noErrorOnMissing: true,
        },
        {
          from: "*.png",
          context: `${dir.src}/`,
          noErrorOnMissing: true,
        },

        {
          from: "*.icon",
          context: `${dir.src}/`,
          noErrorOnMissing: true,
        },
        {
          from: "*.html",
          to: `${dir.src}/html/`,
          noErrorOnMissing: true,
        },
        {
          from: "style.css",
          from: `${dir.src}/${dir.assets}/css`,
          context: `${dir.src}/`,
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
};
