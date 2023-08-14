//package com.ssafy.howdoilook.global.WebSocket;
//
//import com.ssafy.howdoilook.domain.roomUser.dto.response.RoomUserGetListDto;
//import lombok.NoArgsConstructor;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.event.EventListener;
//import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContext;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Component;
//import org.springframework.web.socket.messaging.SessionConnectedEvent;
//
//@Component
//@RequiredArgsConstructor
//public class WebSocketEventListener {
//    private final WebSocketSessionManager webSocketSessionManager;
//    private String ADDRESS = "/sub/roomChat/";
//
//    @EventListener
//    public void ConnectListener(SessionConnectedEvent event){
//        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
//        String sessionId = accessor.getSessionId();
//        SecurityContext context = webSocketSessionManager.get(sessionId);
//
//        Authentication authentication = context.getAuthentication();
//        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//
//        if(isTopicStreamingChat(accessor)){
//            User user =
//            RoomUserGetListDto userDto = RoomUserGetListDto.builder()
//                    .build();
//        }
//    }
//
//    @EventListener
//    public void DisConnectListener(SessionConnectedEvent event){
//
//        if(isTopicStreamingChat(accessor)){
//
//        }
//    }
//
//    private boolean isTopicStreamingChat(StompHeaderAccessor accessor){
//        String destination = accessor.getDestination();
//        return destination != null && destination.startsWith(ADDRESS);
//    }
//}
