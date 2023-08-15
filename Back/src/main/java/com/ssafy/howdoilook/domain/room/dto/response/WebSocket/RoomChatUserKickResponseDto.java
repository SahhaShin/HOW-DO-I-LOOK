package com.ssafy.howdoilook.domain.room.dto.response.WebSocket;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomChatUserKickResponseDto {
    private long userId;
    private String nickName;

    @Builder
    public RoomChatUserKickResponseDto(long userId, String nickName) {
        this.userId = userId;
        this.nickName = nickName;
    }
}
