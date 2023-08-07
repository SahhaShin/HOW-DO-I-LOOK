package com.ssafy.howdoilook.domain.room.dto.request;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomChatRequestDto {
    private String chatContent;
    private String nickName;
    private long roomId;
    @Builder
    public RoomChatRequestDto(String chatContent, String nickName, long roomId) {
        this.chatContent = chatContent;
        this.nickName = nickName;
        this.roomId = roomId;
    }
}
