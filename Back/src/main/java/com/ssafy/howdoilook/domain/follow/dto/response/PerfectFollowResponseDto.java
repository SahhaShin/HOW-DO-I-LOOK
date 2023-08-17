package com.ssafy.howdoilook.domain.follow.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.howdoilook.domain.user.entity.BadgeType;
import com.ssafy.howdoilook.domain.user.entity.Gender;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PerfectFollowResponseDto {

    Long userIdA;

    Long userIdB;

    String nicknameA;

    String nicknameB;

    String profileImgA;

    String profileImgB;

    Gender genderA;

    Gender genderB;

    private BadgeType showBadgeTypeA;

    private BadgeType showBadgeTypeB;

    @QueryProjection
    @Builder
    public PerfectFollowResponseDto(Long userIdA, Long userIdB, String nicknameA, String nicknameB, String profileImgA, String profileImgB, Gender genderA, Gender genderB, BadgeType showBadgeTypeA, BadgeType showBadgeTypeB) {
        this.userIdA = userIdA;
        this.userIdB = userIdB;
        this.nicknameA = nicknameA;
        this.nicknameB = nicknameB;
        this.profileImgA = profileImgA;
        this.profileImgB = profileImgB;
        this.genderA = genderA;
        this.genderB = genderB;
        this.showBadgeTypeA = showBadgeTypeA;
        this.showBadgeTypeB = showBadgeTypeB;
    }
}
