package com.ssafy.howdoilook.domain.alarm.repository;

import com.ssafy.howdoilook.domain.alarm.entity.Alarm;

import java.util.List;

public interface AlarmCustomRepository {
    public List<Alarm> selectAlarmByUserId(Long userId);
}
