package com.ssafy.howdoilook.domain.blacklist.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.blacklist.entity.QBlackList;
import com.ssafy.howdoilook.domain.user.entity.QUser;

import javax.persistence.EntityManager;

public class BlackListCustomRepositoryImpl implements BlackListCustomRepository{
    private final JPAQueryFactory jpaQueryFactory;

    QUser user = QUser.user;
    QBlackList blackList = QBlackList.blackList;

    public BlackListCustomRepositoryImpl(EntityManager em) {jpaQueryFactory = new JPAQueryFactory(em);}

    @Override
    public void deleteBlackList(Long userId, Long targetUserId) {
        long execute = jpaQueryFactory.delete(blackList)
                .where(blackList.user.id.eq(userId).and(blackList.targetUser.id.eq(targetUserId)))
                .execute();
    }
}
