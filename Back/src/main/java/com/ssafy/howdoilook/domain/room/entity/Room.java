package com.ssafy.howdoilook.domain.room.entity;

import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Room extends BaseTimeEntity {
    @Id@GeneratedValue
    @Column(name = "romm_no")
    private Long id;

    @Column(name = "room_code")
    private String code;

    @Column(name = "room_title")
    private String title;

    @Column(name = "room_type")
    private Type type;

    @Column(name = "room_host")
    private Long host;

    @Column(name = "room_min_age")
    private int minAge;

    @Column(name = "room_max_age")
    private int maxAge;

    @Column(name = "room_gender")
    private Gender gender;

    @Column(name = "ended_date")
    private LocalDateTime endedDate;

    @Column(name = "chatroom_code")
    private String chatCode;

}
