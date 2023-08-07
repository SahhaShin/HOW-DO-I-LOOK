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

@Getter
@Document
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@CompoundIndex(def = "{'roomId' : 1, 'time' : 1}")
public class RoomChatImage {
    @Id
    private String id;
    @Indexed
    private long roomId;
    private String nickName;
    private String imageURL;
    private ImageType type;
    private String time;

    @Builder
    public RoomChatImage(long roomId, String nickName, String imageURL, ImageType type, String time) {
        this.roomId = roomId;
        this.nickName = nickName;
        this.imageURL = imageURL;
        this.type = type;
        this.time = time;
    }
}
