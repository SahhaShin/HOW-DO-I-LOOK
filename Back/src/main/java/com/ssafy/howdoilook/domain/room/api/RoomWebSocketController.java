package com.ssafy.howdoilook.domain.room.api;

import com.ssafy.howdoilook.domain.room.dto.request.RoomChatImageRequestDto;
import com.ssafy.howdoilook.domain.room.dto.request.RoomChatRequestDto;
import com.ssafy.howdoilook.domain.room.dto.response.RoomChatImageResponseDto;
import com.ssafy.howdoilook.domain.room.dto.response.RoomChatResponseDto;
import com.ssafy.howdoilook.domain.room.service.RoomChatMQService;
import com.ssafy.howdoilook.domain.room.service.RoomService;
import com.ssafy.howdoilook.global.WebSocket.WebSocketSessionManager;
import com.ssafy.howdoilook.global.handler.AccessException;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;


@Controller
@RequiredArgsConstructor
public class RoomWebSocketController {
    private final RoomService roomService;
    private final RoomChatMQService roomChatMQService;
    private final WebSocketSessionManager webSocketSessionManager;

    @MessageMapping("/roomChat/{roomCode}")
    @SendTo("/sub/roomChat/{roomCode}")
    public RoomChatResponseDto broadCastingChat(RoomChatRequestDto requestDto, SimpMessageHeaderAccessor accessor)throws AccessException {
        String sessionId = accessor.getSessionId();
        SecurityContext context = webSocketSessionManager.get(sessionId);
        // 웹소켓은 인터셉터와 같은 트랜잭션이 아니다.
        // 그래서 인터셉터에서 UserDetail을 security context에 저장해도 같은 트랜잭션이 아니기 때문에 관리객체를 만들었다.

        Authentication authentication = context.getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        RoomChatResponseDto responseDto = roomService.chatIntegrity(requestDto, userDetails); // 데이터 무결성 검증
        roomChatMQService.chatEnqueue(responseDto);
        return responseDto;
    }

    @MessageMapping("/roomChat/image/{roomCode}")
    @SendTo("/sub/roomChat/image/{roomCode}")
    public RoomChatImageResponseDto broadCastingImage(RoomChatImageRequestDto requestDto, SimpMessageHeaderAccessor accessor)throws AccessException{
        String sessionId = accessor.getSessionId();
        SecurityContext context = webSocketSessionManager.get(sessionId);
        // 웹소켓은 인터셉터와 같은 트랜잭션이 아니다.
        // 그래서 인터셉터에서 UserDetail을 security context에 저장해도 같은 트랜잭션이 아니기 때문에 관리객체를 만들었다.

        Authentication authentication = context.getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        RoomChatImageResponseDto responseDto = roomService.imageIntegrity(requestDto, userDetails); // 데이터 무결성 검증
        roomChatMQService.imageEnqueue(responseDto);
        return responseDto;
    }
}
