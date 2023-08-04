package com.ssafy.howdoilook.domain.room.api;

import com.ssafy.howdoilook.domain.room.service.RoomService;
import com.ssafy.howdoilook.domain.soloChatroom.dto.request.ChatRecodRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class RoomWebSocketController {
    private final RoomService roomService;
    @MessageMapping("/roomChat/{roomCode}")
    @SendTo("/sub/roomChat/{roomCode}")
    public ChatRecodRequestDto broadCasting(ChatRecodRequestDto requestDto){
        roomService.recordChat(requestDto);
        return requestDto;
    }
}
