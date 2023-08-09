package com.ssafy.howdoilook.domain.room.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.redis.core.index.Indexed;

import javax.persistence.Id;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Document
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@CompoundIndex(def = "{'roomId' : 1, 'time' : 1}")
public class RoomChat {
    @Id
    private String id;
    @Indexed
    private long roomId;
    private String nickName;
    private LocalDateTime time;
    private String content;


    @Builder
    public RoomChat(long roomId, String nickName, String content, LocalDateTime time) {
        this.roomId = roomId;
        this.nickName = nickName;
        this.content = content;
        this.time = time;
    }
}
