package com.ssafy.howdoilook.domain.soloChatroom.dto;

import com.ssafy.howdoilook.domain.user.entity.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoomDto {
    private Long id;
    private User userA;
    private User userB;
    private String chatroomCode;

    @Builder
    public ChatRoomDto(Long id, User userA, User userB, String chatroomCode) {
        this.id = id;
        this.userA = userA;
        this.userB = userB;
        this.chatroomCode = chatroomCode;
    }
}
