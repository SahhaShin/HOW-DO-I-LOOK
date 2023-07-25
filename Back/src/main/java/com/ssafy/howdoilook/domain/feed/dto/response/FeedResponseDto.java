package com.ssafy.howdoilook.domain.feed.dto.response;

import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FeedResponseDto {
    private Long id;
    private User user;
    private String content;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    @Builder
    public FeedResponseDto(Feed feed) {
        this.id = feed.getId();
        this.user = feed.getUser();
        this.content = feed.getContent();
        this.createdDate = feed.getCreatedDate();
        this.modifiedDate = feed.getModifiedDate();
    }
}
