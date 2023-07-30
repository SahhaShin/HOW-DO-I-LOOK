package com.ssafy.howdoilook.domain.soloChatroom.dto.request;

import com.ssafy.howdoilook.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatContextRequestDto {
    private User userA;
    private User userB;
}
