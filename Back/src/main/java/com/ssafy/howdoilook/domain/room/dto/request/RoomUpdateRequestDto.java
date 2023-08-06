package com.ssafy.howdoilook.domain.room.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomUpdateRequestDto {

    private String title;
    private String type;
    private int minAge;
    private int maxAge;
    private String gender;

}
