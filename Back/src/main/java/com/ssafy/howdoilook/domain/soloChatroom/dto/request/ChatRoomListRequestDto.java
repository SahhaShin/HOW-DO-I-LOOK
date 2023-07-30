package com.ssafy.howdoilook.domain.soloChatroom.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoomListRequestDto {
    private Long userA;
}
