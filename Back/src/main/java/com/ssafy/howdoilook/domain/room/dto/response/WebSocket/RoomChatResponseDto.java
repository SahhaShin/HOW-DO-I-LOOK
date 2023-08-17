package com.ssafy.howdoilook.domain.room.dto.response.WebSocket;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomChatResponseDto {
    private long roomId;
    private String chatContent;
    private String nickName;
    private String time;
    private String badge;

    @Builder
    public RoomChatResponseDto(long roomId, String chatContent, String nickName, String time, String badge) {
        this.roomId = roomId;
        this.chatContent = chatContent;
        this.nickName = nickName;
        this.time = time;
        this.badge = badge;
    }
}
