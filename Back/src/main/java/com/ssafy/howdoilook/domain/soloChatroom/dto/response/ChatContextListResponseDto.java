package com.ssafy.howdoilook.domain.soloChatroom.dto.response;

import com.ssafy.howdoilook.domain.soloChatroom.dto.ChatDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class ChatContextListResponseDto {
    private List<ChatDto> chatContext;
    private String ChatRoomCode;

    @Builder
    public ChatContextListResponseDto(List<ChatDto> chatContext, String chatRoomCode) {
        this.chatContext = chatContext;
        ChatRoomCode = chatRoomCode;
    }
}
