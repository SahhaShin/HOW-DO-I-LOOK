package com.ssafy.howdoilook.domain.room.api;

import com.ssafy.howdoilook.domain.room.dto.request.RoomChatImageRequestDto;
import com.ssafy.howdoilook.domain.room.dto.request.RoomChatRequestDto;
import com.ssafy.howdoilook.domain.room.dto.response.RoomChatImageResponseDto;
import com.ssafy.howdoilook.domain.room.dto.response.RoomChatResponseDto;
import com.ssafy.howdoilook.domain.room.service.RoomChatMQService;
import com.ssafy.howdoilook.domain.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class RoomWebSocketController {
    private final RoomService roomService;
    private final RoomChatMQService roomChatMQService;

    @MessageMapping("/roomChat/{roomCode}")
    @SendTo("/sub/roomChat/{roomCode}")
    public RoomChatResponseDto broadCastingChat(RoomChatRequestDto requestDto){
        RoomChatResponseDto responseDto = roomService.chatIntegrity(requestDto); // 데이터 무결성 검증

        return responseDto;
    }

    @MessageMapping("/roomChat/image/{roomCode}")
    @SendTo("/sub/roomChat/image/{roomCode}")
    public RoomChatImageResponseDto broadCastingImage(RoomChatImageRequestDto requestDto){
        RoomChatImageResponseDto responseDto = roomService.imageIntegrity(requestDto); // 데이터 무결성 검증

        return responseDto;
    }
}
