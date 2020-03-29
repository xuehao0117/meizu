module.exports = {
    devServer: {
        port:80,
        proxy: {
            '/': {
                ws: false,
                target: "http://meizu.90star.cn/",
                changeOrigin: true//是否跨越
            }
        }
    },
    lintOnSave: false   // 取消 eslint 验证
};