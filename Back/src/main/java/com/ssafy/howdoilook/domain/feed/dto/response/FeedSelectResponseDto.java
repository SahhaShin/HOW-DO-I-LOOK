package com.ssafy.howdoilook.domain.feed.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.time.LocalDateTime;

@Data
public class FeedSelectResponseDto {
    private Long userId;
    private Long feedId;
    private String feedContent;
    private LocalDateTime feedCreatedDate;
    private LocalDateTime feedUpdateDate;
    private Long feedPhotoId;
    private String feedPhotoLink;
    private String hashtagContent;

    @QueryProjection
    public FeedSelectResponseDto(Long userId, Long feedId, String feedContent, LocalDateTime feedCreatedDate, LocalDateTime feedUpdateDate, Long feedPhotoId, String feedPhotoLink, String hashtagContent) {
        this.userId = userId;
        this.feedId = feedId;
        this.feedContent = feedContent;
        this.feedCreatedDate = feedCreatedDate;
        this.feedUpdateDate = feedUpdateDate;
        this.feedPhotoId = feedPhotoId;
        this.feedPhotoLink = feedPhotoLink;
        this.hashtagContent = hashtagContent;
    }
}




