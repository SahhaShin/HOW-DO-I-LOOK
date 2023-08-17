package com.ssafy.howdoilook.global.redis.dto.response;

import com.ssafy.howdoilook.domain.user.entity.BadgeType;
import com.ssafy.howdoilook.domain.user.entity.Gender;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RankingResponseDto {

    private Long userId;

    private String email;

    private String nickname;

    private Long rank;

    private String likeType;

    private Long score;

    private String profileImg;

    private Gender gender;

    private BadgeType showBadgeType;

    @Builder
    public RankingResponseDto(Long userId, String email, String nickname, Long rank, String likeType, Long score, String profileImg, Gender gender, BadgeType showBadgeType) {
        this.userId = userId;
        this.email = email;
        this.nickname = nickname;
        this.rank = rank;
        this.likeType = likeType;
        this.score = score;
        this.profileImg = profileImg;
        this.gender = gender;
        this.showBadgeType = showBadgeType;
    }
}
