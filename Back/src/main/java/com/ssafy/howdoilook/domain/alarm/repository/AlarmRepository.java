package com.ssafy.howdoilook.domain.alarm.repository;

import com.ssafy.howdoilook.domain.alarm.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlarmRepository extends JpaRepository<Alarm,Long>,AlarmCustomRepository {
}
