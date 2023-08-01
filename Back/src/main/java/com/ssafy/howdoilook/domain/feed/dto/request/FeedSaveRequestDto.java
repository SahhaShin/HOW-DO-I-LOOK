package com.ssafy.howdoilook.domain.feed.dto.request;

import com.ssafy.howdoilook.domain.feed.dto.PhotoDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FeedSaveRequestDto {
    private Long userId;
    private String content;
    private List<PhotoDto> photoDtoList;
}
