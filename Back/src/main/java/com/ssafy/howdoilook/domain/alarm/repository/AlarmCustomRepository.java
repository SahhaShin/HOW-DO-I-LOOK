package com.ssafy.howdoilook.domain.alarm.repository;

import com.ssafy.howdoilook.domain.alarm.entity.Alarm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AlarmCustomRepository {
    public Page<Alarm> selectAlarmByUserId(Long userId, Pageable pageable);
}
