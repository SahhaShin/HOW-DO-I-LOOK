package com.ssafy.howdoilook.domain.feed.dto.request;

import com.ssafy.howdoilook.domain.feed.dto.PhotoDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FeedUpdateRequestDto {
    private Long userId;
    private Long feedId;
    private String content;
    private List<PhotoDto> photoDtoList;
}
