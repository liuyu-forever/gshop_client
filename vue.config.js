module.exports = {
  devServer: {
    //配置代理
    proxy: {
      "/api": {
        target: "http://182.92.128.115", // 目标地址
        changeOrigin: true,  //是否跨域
        // pathRewrite: {
        //   '^/api': '', // 该路径在请求时是否删除
        // }
      },
    },
  },
};
