package com.ssafy.howdoilook.domain.soloChatroom.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRecordRequestDto {
    private String chatContent;
    private long roomId;
    private long userId;
    private String senderEmail;

    @Builder
    public ChatRecordRequestDto(String chatContent, long roomId, long userId) {
        this.chatContent = chatContent;
        this.roomId = roomId;
        this.userId = userId;
    }
}
