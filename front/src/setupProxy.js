const { createProxyMiddleware } = require('http-proxy-middleware');


// 채팅을 위한 소켓 연결을 위한 ws 변경
module.exports = (app) => {
  app.use(
    '/api', //proxy가 필요한 path parameter
    createProxyMiddleware({
      target: 'http://localhost:8081', //타겟이 되는 api url
      changeOrigin: true, // 서버 구성에 따른 호스트 헤더 변경 여부 설정
    })
  );
};