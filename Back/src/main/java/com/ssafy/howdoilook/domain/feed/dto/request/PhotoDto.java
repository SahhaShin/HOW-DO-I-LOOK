package com.ssafy.howdoilook.domain.feed.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PhotoDto {
    private String link;
    private List<String> hashtagList;
}
