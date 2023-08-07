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
    private String nickName;
    private long roomId;

    @Builder
    public RoomChatImageRequestDto(ArrayList<String> imageURL, String nickName, long roomId) {
        this.imageURL = imageURL;
        this.nickName = nickName;
        this.roomId = roomId;
    }
}
