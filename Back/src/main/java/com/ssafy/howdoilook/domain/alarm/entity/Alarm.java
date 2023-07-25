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
public class Alarm extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_no")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_no")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "alarm_type")
    private AlarmType type;

    @Column(name = "alarm_content")
    private String content;

    @Column(name = "alarm_check")
    private Boolean check;

    @Builder
    public Alarm(Long id, User user, AlarmType type, String content, Boolean check) {
        this.id = id;
        this.user = user;
        this.type = type;
        this.content = content;
        this.check = check;
    }
}
