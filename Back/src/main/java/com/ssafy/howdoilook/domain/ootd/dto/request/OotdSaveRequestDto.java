package com.ssafy.howdoilook.domain.ootd.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OotdSaveRequestDto {
    private Long userId;
    private List<OotdSaveSlotDto> slots;
}
