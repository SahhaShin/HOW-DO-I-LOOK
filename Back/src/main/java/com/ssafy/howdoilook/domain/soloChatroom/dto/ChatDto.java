package com.ssafy.howdoilook.domain.soloChatroom.dto;

import com.ssafy.howdoilook.domain.user.entity.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatDto {
    private long chatRoomId;
    private User user;
    private String context;

    @Builder
    public ChatDto(long chatRoomId, User user, String context) {
        this.chatRoomId = chatRoomId;
        this.user = user;
        this.context = context;
    }
}
