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

    Long rank;

    String likeType;

    Long score;

    @Builder
    public RankingResponseDto(Long userId, String email, Long rank, String likeType, Long score) {
        this.userId = userId;
        this.email = email;
        this.rank = rank;
        this.likeType = likeType;
        this.score = score;
    }
}
