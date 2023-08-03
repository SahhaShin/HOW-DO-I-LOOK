package com.ssafy.howdoilook.domain.room.dto.response;

import com.ssafy.howdoilook.domain.user.entity.Gender;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomDetailResponseDto {

    private String title;
    private int hostAge;
    private String hostGender;
    private int roomMinAge;
    private int roomMaxAge;
    private String roomGender;

    @Builder
    public RoomDetailResponseDto(String title, int hostAge, String hostGender, int roomMinAge, int roomMaxAge, String roomGender) {
        this.title = title;
        this.hostAge = hostAge;
        this.hostGender = hostGender;
        this.roomMinAge = roomMinAge;
        this.roomMaxAge = roomMaxAge;
        this.roomGender = roomGender;
    }
}
