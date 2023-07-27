package com.ssafy.howdoilook.domain.feed.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PhotoDto {
    private Long id;
    private String link;
    private List<String> hashtagList;

    @Builder
    public PhotoDto(Long id, String link, List<String> hashtagList) {
        this.id = id;
        this.link = link;
        this.hashtagList = hashtagList;
    }
}
