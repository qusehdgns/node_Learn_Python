// Proxy 사용을 위한 선언
const proxy = require('http-proxy-middleware');

// 사용자 요청이 /api 형태로 올경우 3000번의 요청이지만 5000번으로 전환
module.exports = function (app) {
    // 사용자 /api 요청 시 수행하여 포트를 변경
    app.use(
        '/api',
        proxy({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );
};