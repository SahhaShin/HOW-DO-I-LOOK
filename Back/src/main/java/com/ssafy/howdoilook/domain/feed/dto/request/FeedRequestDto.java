package com.ssafy.howdoilook.domain.feed.dto.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FeedRequestDto {
    private Long userId;
    private String content;
    private List<PhotoDto> photoDtoList;
}
