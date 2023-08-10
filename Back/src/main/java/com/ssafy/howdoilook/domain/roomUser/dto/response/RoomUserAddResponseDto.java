package com.ssafy.howdoilook.domain.roomUser.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomUserAddResponseDto {

    private String roomCode;
    private String chatCode;

    @Builder
    public RoomUserAddResponseDto(String roomCode, String chatCode) {
        this.roomCode = roomCode;
        this.chatCode = chatCode;
    }
}
