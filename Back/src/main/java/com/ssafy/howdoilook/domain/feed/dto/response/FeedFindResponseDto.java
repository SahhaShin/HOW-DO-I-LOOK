package com.ssafy.howdoilook.domain.feed.dto.response;

import com.ssafy.howdoilook.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FeedFindResponseDto {
    private Long id;
    private User user;
    private String content;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    @Builder
    public FeedFindResponseDto(Long id, User user, String content, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.id = id;
        this.user = user;
        this.content = content;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }
}
