package com.ssafy.howdoilook.domain.room.dto.response;

import com.ssafy.howdoilook.domain.room.dto.ImageChatDto;
import lombok.*;

import java.sql.Timestamp;
import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomChatImageResponseDto {
    private ArrayList<ImageChatDto>image;
    private String nickName;
    private String time;
    private String badge;
    private long roomId;

    @Builder
    public RoomChatImageResponseDto(ArrayList<ImageChatDto> image, String nickName, String time, long roomId, String badge) {
        this.image = image;
        this.nickName = nickName;
        this.time = time;
        this.roomId = roomId;
        this.badge = badge;
    }
}
