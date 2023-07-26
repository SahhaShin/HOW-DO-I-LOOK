package com.ssafy.howdoilook.domain.hashtag.dto.response;

import com.ssafy.howdoilook.domain.hashtag.entity.Hashtag;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HashTagResponseDto {
    private Long id;
    private String content;


    @Builder
    public HashTagResponseDto(Hashtag hashtag) {
        this.id = hashtag.getId();
        this.content = hashtag.getContent();
    }
}
