package com.ssafy.howdoilook.domain.blacklist.repository;

import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.blacklist.entity.BlackList;
import com.ssafy.howdoilook.domain.blacklist.entity.QBlackList;
import com.ssafy.howdoilook.domain.user.entity.QUser;
import net.bytebuddy.dynamic.DynamicType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class BlackListCustomRepositoryImpl implements BlackListCustomRepository{
    private final JPAQueryFactory jpaQueryFactory;

    QUser user = QUser.user;
    QBlackList blackList = QBlackList.blackList;

    public BlackListCustomRepositoryImpl(EntityManager em) {jpaQueryFactory = new JPAQueryFactory(em);}



    @Override
    public Optional<BlackList> selectBlackListByUserIdTargetUserId(Long userId, Long targetUserId) {
        return Optional.ofNullable(
                jpaQueryFactory.selectFrom(blackList)
                .where(blackList.user.id.eq(userId).and(blackList.targetUser.id.eq(targetUserId)))
                .fetchOne());
    }

    @Override
    public List<BlackList> getAllBlackList(Long userId) {

        return jpaQueryFactory.selectFrom(blackList)
                .where(blackList.user.id.eq(userId))
                .fetch();
    }

    @Override
    public Page<BlackList> selectBlackListByUserId(Long userId, Pageable pageable) {
        QueryResults<BlackList> results = jpaQueryFactory.selectFrom(blackList)
                .where(user.id.eq(userId))
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetchResults();

        return new PageImpl<>(results.getResults(), pageable, results.getTotal());
    }


}
