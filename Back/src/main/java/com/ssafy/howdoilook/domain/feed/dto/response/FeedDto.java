package com.ssafy.howdoilook.domain.feed.dto.response;

import com.ssafy.howdoilook.domain.feed.dto.PhotoDto;
import com.ssafy.howdoilook.domain.feedLike.dto.response.FeedLikeCountResponseDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
@Data
public class FeedDto {
    private Long userId;
    private Long feedId;
    private String feedContent;
    private LocalDateTime feedCreatedDate;
    private LocalDateTime feedUpdateDate;
    private List<PhotoDto> photoDtoList;
    private FeedLikeCountResponseDto feedLikeCountResponseDto;

    @Builder
    public FeedDto(Long userId, Long feedId, String feedContent, LocalDateTime feedCreatedDate, LocalDateTime feedUpdateDate, List<PhotoDto> photoDtoList, FeedLikeCountResponseDto feedLikeCountResponseDto) {
        this.userId = userId;
        this.feedId = feedId;
        this.feedContent = feedContent;
        this.feedCreatedDate = feedCreatedDate;
        this.feedUpdateDate = feedUpdateDate;
        this.photoDtoList = photoDtoList;
        this.feedLikeCountResponseDto = feedLikeCountResponseDto;
    }
}
