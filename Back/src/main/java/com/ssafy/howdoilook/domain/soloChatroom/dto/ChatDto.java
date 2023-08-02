package com.ssafy.howdoilook.domain.soloChatroom.dto;

import com.ssafy.howdoilook.domain.user.entity.User;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatDto {
    private long chatRoomId;
    private long chatId;
    private String userNickName;
    private String userProfile;
    private LocalDateTime createTime;
    private String content;

    @Builder
    public ChatDto(long chatRoomId, long chatId, String userNickName, String userProfile, LocalDateTime createTime, String content) {
        this.chatRoomId = chatRoomId;
        this.chatId = chatId;
        this.userNickName = userNickName;
        this.userProfile = userProfile;
        this.createTime = createTime;
        this.content = content;
    }
}
