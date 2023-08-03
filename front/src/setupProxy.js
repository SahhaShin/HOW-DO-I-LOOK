const { createProxyMiddleware } = require('http-proxy-middleware');


// 채팅을 위한 소켓 연결을 위한 ws 변경
module.exports = (app) => {
  app.use(
    //proxy가 필요한 path parameter
    createProxyMiddleware('/api',{
      target: 'http://localhost:8081', //타겟이 되는 api url
      changeOrigin:true,
      ws:true
    })
  );
};