package com.ssafy.howdoilook.domain.roomUser.entity;

import com.ssafy.howdoilook.domain.room.entity.Room;
import com.ssafy.howdoilook.domain.user.entity.User;

import javax.persistence.*;

public class RoomUser {
    @Id@GeneratedValue
    @Column(name = "room_user_no")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_no")
    private Room room;
}
