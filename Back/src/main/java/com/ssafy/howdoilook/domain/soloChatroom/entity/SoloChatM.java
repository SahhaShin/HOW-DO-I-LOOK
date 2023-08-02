package com.ssafy.howdoilook.domain.soloChatroom.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.persistence.Id;
import java.sql.Timestamp;

@Getter
@Document(collation = "chat")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SoloChatM {
    @Id
    private String id;
    private Long roomId;
    private Long userId;
    private String content;
    private String time;

    @Builder
    public SoloChatM(Long roomId, Long userId, String content) {
        this.roomId = roomId;
        this.userId = userId;
        this.content = content;
        this.time = new Timestamp(System.currentTimeMillis()).toString();
    }
}
