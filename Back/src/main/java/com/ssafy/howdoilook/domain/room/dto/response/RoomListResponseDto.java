package com.ssafy.howdoilook.domain.room.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.howdoilook.domain.room.entity.Room;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomListResponseDto {

    private Long roomId;
    private String type;
    private String title;
    private int minAge;
    private int maxAge;
    private Long hostId;
    private String hostNickname;

    @Builder @QueryProjection
    public RoomListResponseDto(Room room) {
        this.roomId = room.getId();
        this.type = String.valueOf(room.getType());
        this.title = room.getTitle();
        this.minAge = room.getMinAge();
        this.maxAge = room.getMaxAge();
        this.hostId = room.getHost().getId();
        this.hostNickname = room.getHost().getNickname();
    }
}
