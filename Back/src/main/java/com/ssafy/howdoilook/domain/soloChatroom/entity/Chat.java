package com.ssafy.howdoilook.domain.soloChatroom.entity;

import com.mongodb.internal.connection.Time;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Document
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Chat {
    @Id
    private String id;
    private String roomId;
    private Long userId;
    private String content;
    private String time;

    @Builder
    public Chat(String id, long roomId, Long userId, String content) {
        this.id = id;
        this.roomId = Long.toString(roomId);
        this.userId = userId;
        this.content = content;
        time = new Timestamp(System.currentTimeMillis()).toString();
    }
}

