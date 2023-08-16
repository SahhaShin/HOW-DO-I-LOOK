package com.ssafy.howdoilook.domain.roomUser.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomUserAddResponseDto {

    private String roomTitle;
    private String roomCode;
    private String chatCode;

    @Builder
    public RoomUserAddResponseDto(String roomTitle, String roomCode, String chatCode) {
        this.roomTitle = roomTitle;
        this.roomCode = roomCode;
        this.chatCode = chatCode;
    }
}
