package com.ssafy.howdoilook.domain.feedPhoto.dto.response;

import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.feedPhoto.entity.FeedPhoto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FeedPhotoResponseDto {
    private Long id;
    private Feed feed;
    private String link;

    @Builder
    public FeedPhotoResponseDto(FeedPhoto feedPhoto) {
        this.id = feedPhoto.getId();
        this.feed = feedPhoto.getFeed();
        this.link = feedPhoto.getLink();
    }
}
