package com.ssafy.howdoilook.domain.room.dto.response.WebSocket;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomChatUserInitResponseDto {
    private long userId;
    private String nickName;
    private String badge;
    private String profileImage;

    @Builder
    public RoomChatUserInitResponseDto(long userId, String nickName, String badge, String profileImage) {
        this.userId = userId;
        this.nickName = nickName;
        this.badge = badge;
        this.profileImage = profileImage;
    }
}
