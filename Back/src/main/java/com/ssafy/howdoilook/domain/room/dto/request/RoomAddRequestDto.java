package com.ssafy.howdoilook.domain.room.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomAddRequestDto {

    private String code;
    private String title;
    private String type;
    private Long hostId;
    private int minAge;
    private int maxAge;
    private String gender;
    private String chatCode;

}
