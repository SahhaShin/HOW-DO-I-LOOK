package com.ssafy.howdoilook.domain.soloChatroom.entity;

import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import com.ssafy.howdoilook.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "solo_chatroom")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SoloChatRoom extends BaseTimeEntity {

    @Id @GeneratedValue
    @Column(name = "solo_chatroom_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userA_no")
    private User userA;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userB_no")
    private User userB;

    @Column(name = "solo_chatroom_code")
    private String roomCode;

    @Builder
    public SoloChatRoom(Long id, User userA, User userB, String roomCode) {
        this.id = id;
        this.userA = userA;
        this.userB = userB;
        this.roomCode = roomCode;
    }
}
