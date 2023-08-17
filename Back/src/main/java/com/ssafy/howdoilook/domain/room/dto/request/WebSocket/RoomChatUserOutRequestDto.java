package com.ssafy.howdoilook.domain.room.dto.request.WebSocket;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomChatUserOutRequestDto {
    private long roomId;
}
