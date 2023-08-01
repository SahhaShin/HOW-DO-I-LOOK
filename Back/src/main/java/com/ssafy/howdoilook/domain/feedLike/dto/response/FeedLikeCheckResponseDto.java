package com.ssafy.howdoilook.domain.feedLike.dto.response;

import com.ssafy.howdoilook.domain.feedLike.entity.FeedLikeType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FeedLikeCheckResponseDto {

    private FeedLikeType sexyType;
    private FeedLikeType lovelyType;
    private FeedLikeType modernType;
    private FeedLikeType naturalType;

    @Builder
    public FeedLikeCheckResponseDto(FeedLikeType sexyType, FeedLikeType lovelyType, FeedLikeType modernType, FeedLikeType naturalType) {
        this.sexyType = sexyType;
        this.lovelyType = lovelyType;
        this.modernType = modernType;
        this.naturalType = naturalType;
    }
}
