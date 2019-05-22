
//const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    lintOnSave: false,
    // lintOnSave: process.env.NODE_ENV !== 'production',
    devServer: {
        disableHostCheck: true,
        overlay: {
            warnings: false,
            errors: false
        },
      // host: "localhost",
      // port: 1111, // 端口号
      // https: false, // https:{type:Boolean}
      // open: true, //配置自动启动浏览器
    },
    productionSourceMap: true,
    pages: {
        index: {
            entry: "src/pages/index/main.js",
            template: "public/index.html",
            filename: "index.html",
            title: "首页"
        },
        bgSettings: {
            entry: "src/pages/bgSettings/main.js",
            template: "public/bgSettings.html",
            filename: "bgSettings.html",
            title: "后台设置"
        },
        resetPassword: {
          entry: "src/pages/resetPassword/main.js",
          template: 'public/reset_password.html',
          filename: 'reset_password.html',
          title: '重置密码'
        }
    },
    chainWebpack: config => {
      // ...your other webpack config overrides here

    // if (process.env.NODE_ENV === "production")
    //     config.plugin("webpack-report")
    //         .use(BundleAnalyzerPlugin, [{
    //             // ...webpack-bundle-analyzer options here
    //         }]);
  }

}
