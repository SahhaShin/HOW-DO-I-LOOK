package com.ssafy.howdoilook.domain.room.api;

import com.ssafy.howdoilook.domain.room.dto.request.RoomChatImageRequestDto;
import com.ssafy.howdoilook.domain.room.dto.request.RoomChatRequestDto;
import com.ssafy.howdoilook.domain.room.dto.response.RoomChatImageResponseDto;
import com.ssafy.howdoilook.domain.room.dto.response.RoomChatResponseDto;
import com.ssafy.howdoilook.domain.room.service.RoomService;
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
    public RoomChatResponseDto broadCastingChat(RoomChatRequestDto requestDto){
        return roomService.chatString(requestDto);
    }

    @MessageMapping("/roomChat/image/{roomCode}")
    @SendTo("/sub/roomChat/image/{roomCode}")
    public RoomChatImageResponseDto broadCastingImage(RoomChatImageRequestDto requestDto){
        return roomService.chatImage(requestDto);
    }
}
