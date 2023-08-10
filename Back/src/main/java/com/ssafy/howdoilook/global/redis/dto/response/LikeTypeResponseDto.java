package com.ssafy.howdoilook.global.redis.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LikeTypeResponseDto {

    private Long userId;

    private Long lovelyScore;

    private Long sexyScore;

    private Long modernScore;

    private Long naturalScore;

    @Builder
    public LikeTypeResponseDto(Long userId, Long lovelyScore, Long sexyScore, Long modernScore, Long naturalScore) {
        this.userId = userId;
        this.lovelyScore = lovelyScore;
        this.sexyScore = sexyScore;
        this.modernScore = modernScore;
        this.naturalScore = naturalScore;
    }
}
