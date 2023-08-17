package com.ssafy.howdoilook.domain.soloChatroom.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import com.ssafy.howdoilook.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Entity
@Getter
@Table(name = "solo_chatroom")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SoloChatRoom extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "solo_chatroom_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userA_id")
    private User userA;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userB_id")
    private User userB;

    @Column(name = "solo_chatroom_code")
    private String roomCode;

    @Column(name = "chat_update_date")
    private LocalDateTime chatUpdateDate;
    @Builder
    public SoloChatRoom(User userA, User userB, String roomCode) {
        this.userA = userA;
        this.userB = userB;
        this.roomCode = roomCode;
        chatUpdateDate = LocalDateTime.now();
    }
}
