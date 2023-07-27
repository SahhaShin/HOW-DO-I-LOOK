package com.ssafy.howdoilook.domain.ootd.dto.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
public class OotdListResponseDto {

    private List<OotdDto> ootds;
}
