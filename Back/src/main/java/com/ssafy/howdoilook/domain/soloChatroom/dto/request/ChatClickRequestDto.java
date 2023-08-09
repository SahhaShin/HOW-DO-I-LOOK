package com.ssafy.howdoilook.domain.soloChatroom.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatClickRequestDto {
    private Long userId;
    private Long roomId;
}
