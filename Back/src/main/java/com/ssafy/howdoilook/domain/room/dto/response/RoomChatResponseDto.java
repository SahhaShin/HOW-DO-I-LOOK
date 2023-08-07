package com.ssafy.howdoilook.domain.room.dto.response;

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
    private String type;
    private String time;

    @Builder
    public RoomChatResponseDto(long roomId, String chatContent, String nickName, String type, String time) {
        this.roomId = roomId;
        this.chatContent = chatContent;
        this.nickName = nickName;
        this.type = type;
        this.time = time;
    }
}
