package com.ssafy.howdoilook.domain.feed.dto.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class FeedUpdateRequestDto {
    private Long userId;
    private Long feedId;
    private String content;
    private List<PhotoUpdateRequestDto> photoUpdateRequestDtoList;
}
