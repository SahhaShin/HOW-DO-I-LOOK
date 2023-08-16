package com.ssafy.howdoilook.domain.blacklist.dto.response;

import com.ssafy.howdoilook.domain.user.entity.BadgeType;
import com.ssafy.howdoilook.domain.user.entity.Gender;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class BlackListSelectResponseDto {
    private Long id;

    private String nickname;

    private String profileImg;

    private Long targetUserId;

    private Gender gender;

    private BadgeType showBadgeType;

    @Builder
    public BlackListSelectResponseDto(Long id, String nickname, String profileImg, Long targetUserId, Gender gender, BadgeType showBadgeType) {
        this.id = id;
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.targetUserId = targetUserId;
        this.gender = gender;
        this.showBadgeType = showBadgeType;
    }
}
