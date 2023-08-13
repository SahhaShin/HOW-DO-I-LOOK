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

    private String userGender;

    private String userBadgeType;

    @Builder
    public RoomUserGetListDto(Long userId, String userNickname, String userProfileImg, String userGender, String userBadgeType) {
        this.userId = userId;
        this.userNickname = userNickname;
        this.userProfileImg = userProfileImg;
        this.userGender = userGender;
        this.userBadgeType = userBadgeType;
    }
}
