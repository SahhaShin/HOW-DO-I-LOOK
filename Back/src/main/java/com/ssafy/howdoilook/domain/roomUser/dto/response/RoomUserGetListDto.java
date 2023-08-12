package com.ssafy.howdoilook.domain.roomUser.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomUserGetListDto {

    private Long userId;

    private String userNickname;

    private String userProfileImg;

    @Builder
    public RoomUserGetListDto(Long userId, String userNickname, String userProfileImg) {
        this.userId = userId;
        this.userNickname = userNickname;
        this.userProfileImg = userProfileImg;
    }
}
