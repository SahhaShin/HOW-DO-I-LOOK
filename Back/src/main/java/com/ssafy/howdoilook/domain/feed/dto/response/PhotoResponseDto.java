package com.ssafy.howdoilook.domain.feed.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PhotoResponseDto {
    private Long id;
    private String link;
    private List<String> hashtagList;

    @Builder
    public PhotoResponseDto(Long id, String link, List<String> hashtagList) {
        this.id = id;
        this.link = link;
        this.hashtagList = hashtagList;
    }
}
