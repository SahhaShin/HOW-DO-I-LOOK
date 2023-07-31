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
@RequestMapping("/api/soloChat")
public class SoloWebSocketController {
    private SoloChatRoomService soloChatRoomService;

    @MessageMapping("/{roomCode}")
    @SendTo("/sub/soloChat/{roomCode}")
    public ChatRecodRequestDto broadcasting(ChatRecodRequestDto requestDto){
        return soloChatRoomService.recordChat(requestDto);
    }

}
