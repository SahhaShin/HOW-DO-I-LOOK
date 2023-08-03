package com.ssafy.howdoilook.domain.soloChatroom.api;

import com.ssafy.howdoilook.domain.soloChatroom.dto.request.ChatRecodRequestDto;
import com.ssafy.howdoilook.domain.soloChatroom.service.SoloChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
public class SoloWebSocketController {
    private final SoloChatRoomService soloChatRoomService;

    @MessageMapping("/soloChat/{roomCode}")
    @SendTo("/sub/soloChat/{roomCode}")
    public ChatRecodRequestDto broadcasting(ChatRecodRequestDto requestDto){
        soloChatRoomService.recordChat(requestDto);
        return requestDto;
    }

}
