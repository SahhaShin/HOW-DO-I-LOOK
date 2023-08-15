package com.ssafy.howdoilook.domain.room.dto.request.WebSocket;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomChatUserKickRequestDto {
    private long userId;
    private long roomId;

}
