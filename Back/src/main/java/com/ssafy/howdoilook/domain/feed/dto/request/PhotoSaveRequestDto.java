package com.ssafy.howdoilook.domain.feed.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@ToString
public class PhotoSaveRequestDto {
    private String link;
    private List<String> hashtagList;

    @Builder
    public PhotoSaveRequestDto(String link, List<String> hashtagList) {
        this.link = link;
        this.hashtagList = hashtagList;
    }
}
