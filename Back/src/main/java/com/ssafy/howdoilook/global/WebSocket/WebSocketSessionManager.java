package com.ssafy.howdoilook.global.WebSocket;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

//웹소켓 통신은 인터셉터와 컨트롤러 단의 트랜잭션이 유지되지 않음.
// 그렇기 때문에 bean으로 관리되는 Security Context를 유지하는 세션매니저 사용
@Component
public class WebSocketSessionManager {
    private Map<String, SecurityContext> sessionMap = new ConcurrentHashMap<>();

    public void put(String sessionId, SecurityContext context){
        sessionMap.put(sessionId,context);
    }

    public SecurityContext get(String sessionId){
        return sessionMap.get(sessionId);
    }

    public void remove(String sessionId){
        sessionMap.remove(sessionId);
    }

}
