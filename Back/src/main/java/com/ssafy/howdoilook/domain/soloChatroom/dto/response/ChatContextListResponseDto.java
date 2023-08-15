package com.ssafy.howdoilook.domain.soloChatroom.dto.response;

import com.ssafy.howdoilook.domain.soloChatroom.dto.ChatDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class ChatContextListResponseDto {
    private List<ChatDto> chatContext;
    private String ChatRoomCode;
    private Long chatRoomId;

    @Builder
    public ChatContextListResponseDto(List<ChatDto> chatContext, String chatRoomCode, Long chatRoomId) {
        this.chatContext = chatContext;
        ChatRoomCode = chatRoomCode;
        this.chatRoomId = chatRoomId;
    }
}
