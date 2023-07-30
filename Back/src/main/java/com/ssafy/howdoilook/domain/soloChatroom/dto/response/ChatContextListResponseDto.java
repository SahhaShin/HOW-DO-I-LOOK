package com.ssafy.howdoilook.domain.soloChatroom.dto.response;

import com.ssafy.howdoilook.domain.soloChatroom.dto.ChatDto;
import lombok.Data;

import java.util.List;

@Data
public class ChatContextListResponseDto {
    private List<ChatDto> chatContext;
}
