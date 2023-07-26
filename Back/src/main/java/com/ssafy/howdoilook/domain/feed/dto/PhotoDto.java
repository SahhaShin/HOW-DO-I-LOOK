package com.ssafy.howdoilook.domain.feed.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PhotoDto {
    private Long id;
    private String link;
    private List<String> hashtagList;
}
