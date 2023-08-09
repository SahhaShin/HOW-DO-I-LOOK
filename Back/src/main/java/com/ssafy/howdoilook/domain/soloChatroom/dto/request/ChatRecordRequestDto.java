package com.ssafy.howdoilook.domain.soloChatroom.dto.request;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRecodRequestDto {
    private String chatContent;
    private long roomId;
    private long userId;

    @Builder
    public ChatRecodRequestDto(String chatContent, long roomId, long userId) {
        this.chatContent = chatContent;
        this.roomId = roomId;
        this.userId = userId;
    }
}
