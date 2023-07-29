package com.ssafy.howdoilook.domain.alarm.dto.response;

import com.ssafy.howdoilook.domain.alarm.entity.AlarmType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlarmResponseDto {
    private Long id;
    private Long userId;
    private Long alarmSenderId;
    private String alarmSenderName;
    private String alarmSenderNickName;
    private AlarmType type;
    private String content;
    private boolean check;

    @Builder
    public AlarmResponseDto(Long id, Long userId, Long alarmSenderId, String alarmSenderName, String alarmSenderNickName, AlarmType type, String content, boolean check) {
        this.id = id;
        this.userId = userId;
        this.alarmSenderId = alarmSenderId;
        this.alarmSenderName = alarmSenderName;
        this.alarmSenderNickName = alarmSenderNickName;
        this.type = type;
        this.content = content;
        this.check = check;
    }
}
