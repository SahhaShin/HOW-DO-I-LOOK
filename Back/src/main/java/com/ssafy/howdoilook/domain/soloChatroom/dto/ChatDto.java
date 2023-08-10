package com.ssafy.howdoilook.domain.soloChatroom.dto;

import lombok.*;



@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatDto {
    private long chatRoomId;
    private String userNickName;
    private String userProfile;
    private String time;
    private String content;

    @Builder
    public ChatDto(long chatRoomId, String userNickName, String userProfile, String time, String content) {
        this.chatRoomId = chatRoomId;
        this.userNickName = userNickName;
        this.userProfile = userProfile;
        this.time = time;
        this.content = content;
    }
}
