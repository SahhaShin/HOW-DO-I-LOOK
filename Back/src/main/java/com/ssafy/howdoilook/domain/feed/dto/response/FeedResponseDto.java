package com.ssafy.howdoilook.domain.feed.dto.response;


import com.ssafy.howdoilook.domain.feedLike.dto.response.FeedLikeCountResponseDto;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
@Data
@NoArgsConstructor
public class FeedResponseDto {
    private Long userId;
    private String userNickname;
    private Long feedId;
    private String feedContent;
    private Long commentCount;
    private LocalDateTime feedCreatedDate;
    private LocalDateTime feedUpdateDate;
    private List<PhotoResponseDto> photoResponseDtoList;
    private FeedLikeCountResponseDto feedLikeCountResponseDto;

    @Builder
    public FeedResponseDto(Long userId, String userNickname, Long feedId, String feedContent, Long commentCount, LocalDateTime feedCreatedDate, LocalDateTime feedUpdateDate, List<PhotoResponseDto> photoResponseDtoList, FeedLikeCountResponseDto feedLikeCountResponseDto) {
        this.userId = userId;
        this.userNickname = userNickname;
        this.feedId = feedId;
        this.feedContent = feedContent;
        this.commentCount = commentCount;
        this.feedCreatedDate = feedCreatedDate;
        this.feedUpdateDate = feedUpdateDate;
        this.photoResponseDtoList = photoResponseDtoList;
        this.feedLikeCountResponseDto = feedLikeCountResponseDto;
    }
}
