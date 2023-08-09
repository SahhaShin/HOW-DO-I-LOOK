package com.ssafy.howdoilook.domain.room.dto.request;

import com.ssafy.howdoilook.domain.room.dto.ImageChatDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomChatImageRequestDto {
    private ArrayList<String>imageURL;
    private String token;
    private long roomId;
    private String type;

    @Builder
    public RoomChatImageRequestDto(ArrayList<String> imageURL, String token, String type, long roomId) {
        this.imageURL = imageURL;
        this.token = token;
        this.type = type;
        this.roomId = roomId;
    }
}
