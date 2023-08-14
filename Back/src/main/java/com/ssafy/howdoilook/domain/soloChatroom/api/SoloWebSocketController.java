package com.ssafy.howdoilook.domain.soloChatroom.api;

import com.ssafy.howdoilook.domain.soloChatroom.dto.request.ChatClickRequestDto;
import com.ssafy.howdoilook.domain.soloChatroom.dto.request.ChatRecordRequestDto;
import com.ssafy.howdoilook.domain.soloChatroom.dto.response.ChatClickResponseDto;
import com.ssafy.howdoilook.domain.soloChatroom.service.SoloChatMQService;
import com.ssafy.howdoilook.domain.soloChatroom.service.SoloChatRoomService;
import com.ssafy.howdoilook.global.WebSocket.WebSocketSessionManager;
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
public class SoloWebSocketController {
    private final SoloChatRoomService soloChatRoomService;
    private final SoloChatMQService soloChatMQService;
    private final WebSocketSessionManager webSocketSessionManager;

    @MessageMapping("/soloChat/click/{roomCode}")
    @SendTo("/sub/soloChat/click/{roomCode}")
    public ChatClickResponseDto clickEvent(ChatClickRequestDto requestDto){
        return soloChatRoomService.clickEvent(requestDto);
    }

    @MessageMapping("/soloChat/{roomCode}")
    @SendTo("/sub/soloChat/{roomCode}")
    public ChatRecordRequestDto broadCasting(ChatRecordRequestDto requestDto, SimpMessageHeaderAccessor accessor){
        /*
        1. 무결성 체크 => jwt, json 데이터 무결성 검사진행
        2. 메시지큐에 저장 ( 추후 데이터 저장 및 알림 추가 )
        3. return을 통해 데이터 송신
         */

        //헤더의 토큰을 통한 무결성 체크
        String sessionId = accessor.getSessionId();
        SecurityContext context = webSocketSessionManager.get(sessionId);

        Authentication authentication = context.getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        requestDto.setSenderEmail(userDetails.getUsername());

        soloChatRoomService.authorizeChat(requestDto); // 채팅방이 있는지 확인
        // 메시지큐에 저장
        soloChatMQService.enqueue(requestDto);

        // 채팅 뿌리기
        return requestDto;
    }


}
