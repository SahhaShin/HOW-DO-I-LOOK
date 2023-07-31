package com.ssafy.howdoilook.domain.alarm.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.alarm.entity.Alarm;
import com.ssafy.howdoilook.domain.alarm.entity.QAlarm;

import javax.persistence.EntityManager;
import java.util.List;

public class AlarmCustomRepositoryImpl implements AlarmCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;
    QAlarm alarm = QAlarm.alarm;


    public AlarmCustomRepositoryImpl(EntityManager em) {this.jpaQueryFactory = new JPAQueryFactory(em);}

    @Override
    public List<Alarm> selectAlarmByUserId(Long userId) {
        List<Alarm> findAlarmList = jpaQueryFactory.selectFrom(alarm)
                .where(alarm.user.id.eq(userId))
                .fetch();
        return findAlarmList;
    }
}
