package com.ssafy.howdoilook.domain.user.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserUpdateProfileImgResponseDto {

    private String profileImg;

    @Builder
    public UserUpdateProfileImgResponseDto(String profileImg) {
        this.profileImg = profileImg;
    }
}
