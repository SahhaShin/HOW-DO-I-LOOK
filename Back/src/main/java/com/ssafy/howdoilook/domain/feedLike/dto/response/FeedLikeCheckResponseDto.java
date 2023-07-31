package com.ssafy.howdoilook.domain.feedLike.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FeedLikeCheckResponseDto {
    private Boolean LOVELY;
    private Boolean NATURAL;
    private Boolean MODERN;
    private Boolean SEXY;

    @Builder
    public FeedLikeCheckResponseDto(Boolean LOVELY, Boolean NATURAL, Boolean MODERN, Boolean SEXY) {
        this.LOVELY = LOVELY;
        this.NATURAL = NATURAL;
        this.MODERN = MODERN;
        this.SEXY = SEXY;
    }
}
