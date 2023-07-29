package com.ssafy.howdoilook.domain.ootd.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OotdSaveRequestDto {
    private Long userId;
    private Long order;
    private Long topId;
    private Long bottomId;
    private Long shoeId;
    private Long accessory1Id;
    private Long accessory2Id;
    private Long accessory3Id;
}
