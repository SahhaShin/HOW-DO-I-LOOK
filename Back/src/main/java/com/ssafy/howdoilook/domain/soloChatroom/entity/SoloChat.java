package com.ssafy.howdoilook.domain.soloChatroom.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.redis.core.index.Indexed;

import java.sql.Timestamp;

@Getter
@Document
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@CompoundIndex(def = "{'roomId' : 1, 'time' : 1}")
public class SoloChat {
    @Id
    private String id;
    @Indexed
    private long roomId;
    private long userId;
    private String content;
    private String time;

    @Builder
    public SoloChat(long roomId, long userId, String content) {
        this.roomId = roomId;
        this.userId = userId;
        this.content = content;
        time = new Timestamp(System.currentTimeMillis()).toString();
    }
}

