package com.ssafy.howdoilook.domain.userLike.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ScoreSaveRequestDto {

    private Long userId;
    private Long roomId;
    private String type;
    private int score;

}
