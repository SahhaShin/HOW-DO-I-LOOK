package com.ssafy.howdoilook.domain.room.dto.request.WebSocket;

import com.ssafy.howdoilook.domain.room.dto.ImageChatDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.lang.reflect.Array;
import java.util.ArrayList;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomChatImageRequestDto {
    ArrayList<ImageChatDto> image;
    private String token;
    private long roomId;

    @Builder
    public RoomChatImageRequestDto(ArrayList imageURL, String token, long roomId) {
        this.image = imageURL;
        this.token = token;
        this.roomId = roomId;
    }
}
