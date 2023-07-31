package com.ssafy.howdoilook.domain.soloChatroom.entity;

import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import com.ssafy.howdoilook.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Solo_chat")
public class SoloChat extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id")
    private SoloChatRoom room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "chat_content")
    private String content;

    @Builder
    public SoloChat(SoloChatRoom room, User user, String content) {
        this.room = room;
        this.user = user;
        this.content = content;
    }
}
