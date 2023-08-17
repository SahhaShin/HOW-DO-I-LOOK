
package com.ssafy.howdoilook.global.WebSocket;


import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;


@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    @EventListener
    public void ConnectListener(SessionConnectedEvent event){
        System.out.println("웹소켓 연결 성공");
    }

    @EventListener
    public void DisConnectListener(SessionDisconnectEvent event){
        System.out.println("웹소켓 연결 종료");
    }


}

