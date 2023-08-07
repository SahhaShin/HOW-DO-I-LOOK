package com.ssafy.howdoilook.domain.room.dto.response;

import lombok.*;

import java.sql.Timestamp;
import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomChatImageResponseDto {
    private ArrayList<String>imageURL;
    private String nickName;
    private String time;
    private String type;

    @Builder

    public RoomChatImageResponseDto(ArrayList<String> imageURL, String nickName, String time, String type) {
        this.imageURL = imageURL;
        this.nickName = nickName;
        this.time = time;
        this.type = type;
    }
}
