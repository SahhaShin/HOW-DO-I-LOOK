package com.ssafy.howdoilook.domain.soloChatroom.dto.response;

import lombok.Builder;

public class ChatClickResponseDto {
    private long userId;
    private String readtime;

    @Builder
    public ChatClickResponseDto(long userId, String readtime) {
        this.userId = userId;
        this.readtime = readtime;
    }
}
