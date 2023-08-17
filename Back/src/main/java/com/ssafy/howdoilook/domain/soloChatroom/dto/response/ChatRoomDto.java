package com.ssafy.howdoilook.domain.soloChatroom.dto.response;

import com.ssafy.howdoilook.domain.user.entity.Gender;
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
    private String lastChat;
    private String anotherNickName;
    private String lastChatTime;
    private String userAProfileImg;
    private String userBProfileImg;
    private Gender userAGender;
    private Gender userBGender;

    @Builder
    public ChatRoomDto(Long id, Long userAId, Long userBId, String chatroomCode, String lastChat, String anotherNickName, String lastChatTime, String userAProfileImg, String userBProfileImg, Gender userAGender, Gender userBGender) {
        this.id = id;
        this.userAId = userAId;
        this.userBId = userBId;
        this.chatroomCode = chatroomCode;
        this.lastChat = lastChat;
        this.anotherNickName = anotherNickName;
        this.lastChatTime = lastChatTime;
        this.userAProfileImg = userAProfileImg;
        this.userBProfileImg = userBProfileImg;
        this.userAGender = userAGender;
        this.userBGender = userBGender;
    }
}
