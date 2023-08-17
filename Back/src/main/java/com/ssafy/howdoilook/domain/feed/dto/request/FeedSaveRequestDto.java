package com.ssafy.howdoilook.domain.feed.dto.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class FeedSaveRequestDto {
    private Long userId;
    private String content;
    private List<PhotoSaveRequestDto> photoSaveRequestDtoList;
}
