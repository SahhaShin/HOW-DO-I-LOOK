package com.ssafy.howdoilook.domain.soloChatroom.dto.response;

import com.ssafy.howdoilook.domain.user.entity.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoomDto {
    private Long id;
    private Long userAId;
    private Long userBId;
    private String chatroomCode;

    @Builder
    public ChatRoomDto(Long id, long userAId, long userBId, String chatroomCode) {
        this.id = id;
        this.userAId = userAId;
        this.userBId = userBId;
        this.chatroomCode = chatroomCode;
    }
}
