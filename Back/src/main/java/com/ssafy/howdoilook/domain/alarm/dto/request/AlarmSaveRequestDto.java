package com.ssafy.howdoilook.domain.alarm.dto.request;


import com.ssafy.howdoilook.domain.alarm.entity.AlarmType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlarmSaveRequestDto {
    private Long alarmSenderId;
    private Long alarmreceiverId;
    private AlarmType type;
    private String content;


    @Builder
    public AlarmSaveRequestDto(Long alarmSenderId, Long alarmreceiverId, AlarmType type, String content) {
        this.alarmSenderId = alarmSenderId;
        this.alarmreceiverId = alarmreceiverId;
        this.type = type;
        this.content = content;
    }
}
