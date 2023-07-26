package com.ssafy.howdoilook.domain.room.entity;

import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import com.ssafy.howdoilook.domain.user.entity.Gender;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "room")
public class Room extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id;

    @Column(name = "room_code")
    private String code;

    @Column(name = "room_title")
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "room_type")
    private RoomType type;

    @Column(name = "room_host")
    private Long host;

    @Column(name = "room_min_age")
    private int minAge;

    @Column(name = "room_max_age")
    private int maxAge;

    @Enumerated(EnumType.STRING)
    @Column(name = "room_gender")
    private Gender gender;

    @Column(name = "ended_date")
    private LocalDateTime endedDate;

    @Column(name = "chatroom_code")
    private String chatCode;

    @Builder
    public Room(Long id, String code, String title, RoomType type, Long host, int minAge, int maxAge, Gender gender, LocalDateTime endedDate, String chatCode) {
        this.id = id;
        this.code = code;
        this.title = title;
        this.type = type;
        this.host = host;
        this.minAge = minAge;
        this.maxAge = maxAge;
        this.gender = gender;
        this.endedDate = endedDate;
        this.chatCode = chatCode;
    }
}
