package com.ssafy.howdoilook.domain.roomUser.entity;

import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import com.ssafy.howdoilook.domain.room.entity.Room;
import com.ssafy.howdoilook.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "room_user")
public class RoomUser extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_user_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @Enumerated(EnumType.STRING)
    @Column(name = "room_user_status")
    private RoomUserType status;

    @Builder
    public RoomUser(Long id, User user, Room room, RoomUserType status) {
        this.id = id;
        this.user = user;
        this.room = room;
        this.status = status;
    }
}
