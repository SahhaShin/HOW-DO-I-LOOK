package com.ssafy.howdoilook.domain.follow.dto.response;

import com.ssafy.howdoilook.domain.user.entity.BadgeType;
import com.ssafy.howdoilook.domain.user.entity.Gender;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FollowerResponseDto {
    private Long id;

    private String nickname;

    private String profileImg;

    private Gender gender;

    private BadgeType showBadgeType;

    @Builder
    public FollowerResponseDto(Long id, String nickname, String profileImg, Gender gender, BadgeType showBadgeType) {
        this.id = id;
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.gender = gender;
        this.showBadgeType = showBadgeType;
    }
}
