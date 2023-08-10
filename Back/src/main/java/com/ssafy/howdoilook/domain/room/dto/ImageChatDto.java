package com.ssafy.howdoilook.domain.room.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ImageChatDto {
    private String type;
    private String photoLink;

    @Builder
    public ImageChatDto(String type, String photoLink) {
        this.type = type;
        this.photoLink = photoLink;
    }
}
