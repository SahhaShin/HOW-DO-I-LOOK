package com.ssafy.howdoilook.domain.soloChatroom.api;

import com.ssafy.howdoilook.domain.soloChatroom.dto.request.ChatRecodRequestDto;
import com.ssafy.howdoilook.domain.soloChatroom.service.SoloChatMQService;
import com.ssafy.howdoilook.domain.soloChatroom.service.SoloChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class SoloWebSocketController {
    private final SoloChatRoomService soloChatRoomService;
    private final SoloChatMQService soloChatMQService;

    @MessageMapping("/soloChat/{roomCode}")
    @SendTo("/sub/soloChat/{roomCode}")
    public ChatRecodRequestDto broadCasting(ChatRecodRequestDto requestDto){
        /*
        1. 무결성 체크 ( jwt 토큰 vs db 조회 )
        2. 메시지큐에 저장 ( 추후 데이터 저장 및 알림 추가 )
        3. return을 통해 데이터 송신
         */
        //1. 무결성 체크
        soloChatRoomService.check();
        //2. 메시지큐에 저장
        soloChatMQService.enqueue(requestDto);

        //3. 채팅 뿌리기
        return requestDto;
    }


}
