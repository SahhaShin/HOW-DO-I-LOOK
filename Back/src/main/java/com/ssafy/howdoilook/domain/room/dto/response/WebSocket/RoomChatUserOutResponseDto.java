package com.ssafy.howdoilook.domain.room.dto.response.WebSocket;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomChatUserOutResponseDto {
    private long userId;
    private String nickName;
    private String badge;
    private String command;

    @Builder
    public RoomChatUserOutResponseDto(long userId, String nickName, String badge, String command) {
        this.userId = userId;
        this.nickName = nickName;
        this.badge = badge;
        this.command = command;
    }
}
