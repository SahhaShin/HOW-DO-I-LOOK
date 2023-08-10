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
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Document
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomChatImage {
    @Id
    private String id;
    private long roomId;
    @Indexed
    private String nickName; // 스트리밍 채팅방에서 데이터 조회는 고소관련이기 때문에 nickName에 index 설정
    private String imageURL;
    private ImageType type;
    private LocalDateTime time;

    @Builder
    public RoomChatImage(long roomId, String nickName, String imageURL, ImageType type, LocalDateTime time) {
        this.roomId = roomId;
        this.nickName = nickName;
        this.imageURL = imageURL;
        this.type = type;
        this.time = time;
    }
}
