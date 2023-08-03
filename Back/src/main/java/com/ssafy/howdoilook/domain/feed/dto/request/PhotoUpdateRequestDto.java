package com.ssafy.howdoilook.domain.feed.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@ToString
public class PhotoUpdateRequestDto {
    private Long id;
    private String link;
    private List<String> hashtagList;

    @Builder

    public PhotoUpdateRequestDto(Long id, String link, List<String> hashtagList) {
        this.id = id;
        this.link = link;
        this.hashtagList = hashtagList;
    }
}
