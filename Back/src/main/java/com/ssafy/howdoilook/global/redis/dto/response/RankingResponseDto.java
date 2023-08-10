package com.ssafy.howdoilook.global.redis.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RankingResponseDto {

    Long userId;

    String email;

    String nickname;

    Long rank;

    String likeType;

    Long score;

    String profileImg;

    @Builder
    public RankingResponseDto(Long userId, String email, String nickname, Long rank, String likeType, Long score, String profileImg) {
        this.userId = userId;
        this.email = email;
        this.nickname = nickname;
        this.rank = rank;
        this.likeType = likeType;
        this.score = score;
        this.profileImg = profileImg;
    }
}
