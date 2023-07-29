package com.ssafy.howdoilook.domain.alarm.entity;

import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import com.ssafy.howdoilook.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "alarm")
public class Alarm extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "alarm_sender_id")
    private User senderUser;

    @Enumerated(EnumType.STRING)
    @Column(name = "alarm_type")
    private AlarmType type;

    @Column(name = "alarm_content")
    private String content;

    @Column(name = "alarm_check")
    private Boolean check;

    @Builder
    public Alarm(Long id, User user, User senderUser, AlarmType type, String content, Boolean check) {
        this.id = id;
        this.user = user;
        this.senderUser = senderUser;
        this.type = type;
        this.content = content;
        this.check = check;
    }
    public boolean readAlarm(){
        return check=true;
    }
}
