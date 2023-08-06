package com.ssafy.howdoilook.domain.feedLike.dto.response;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedLikeCountResponseDto {
    private Long LOVELY;
    private Long NATURAL;
    private Long MODERN;
    private Long SEXY;

    @Builder
    public FeedLikeCountResponseDto(Long LOVELY, Long NATURAL, Long MODERN, Long SEXY) {
        this.LOVELY = LOVELY;
        this.NATURAL = NATURAL;
        this.MODERN = MODERN;
        this.SEXY = SEXY;
    }
}
