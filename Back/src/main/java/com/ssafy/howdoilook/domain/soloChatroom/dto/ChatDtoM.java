package com.ssafy.howdoilook.domain.soloChatroom.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatDtoM {
    private long roomId;
    private String userNickName;
    private String userProfile;
    private String time;
    private String content;

    @Builder
    public ChatDtoM(long roomId, String userNickName, String userProfile, String time, String content) {
        this.roomId = roomId;
        this.userNickName = userNickName;
        this.userProfile = userProfile;
        this.time = time;
        this.content = content;
    }
}
