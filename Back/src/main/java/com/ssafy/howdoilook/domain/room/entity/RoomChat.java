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
public class RoomChat {
    @Id
    private String id;
    private long roomId;
    @Indexed
    private String nickName; //스트리밍 채팅방의 데이터 조회는 고소 관련 협조에서만 발생
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
