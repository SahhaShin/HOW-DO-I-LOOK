package com.ssafy.howdoilook.domain.room.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ImageChatDto {
    private String type;
    private long imageId;
    private long userId;
    private String photoLink;

@Builder

    public ImageChatDto(String type,long imageId, long userId, String photoLink) {
        this.type = type;
        this.imageId = imageId;
        this.userId = userId;
        this.photoLink = photoLink;
    }
}
