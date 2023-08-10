package com.ssafy.howdoilook.domain.alarm.repository;

import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.alarm.entity.Alarm;
import com.ssafy.howdoilook.domain.alarm.entity.QAlarm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import java.util.List;

public class AlarmCustomRepositoryImpl implements AlarmCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;
    QAlarm alarm = QAlarm.alarm;


    public AlarmCustomRepositoryImpl(EntityManager em) {this.jpaQueryFactory = new JPAQueryFactory(em);}


    @Override
    public Page<Alarm> selectAlarmByUserId(Long userId, Pageable pageable) {
        QueryResults<Alarm> results = jpaQueryFactory.selectFrom(alarm)
                .where(alarm.user.id.eq(userId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();
        return new PageImpl<>(results.getResults(), pageable, results.getTotal());
    }
}
