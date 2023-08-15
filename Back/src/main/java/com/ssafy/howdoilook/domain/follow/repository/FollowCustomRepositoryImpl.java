package com.ssafy.howdoilook.domain.follow.repository;


import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.follow.dto.response.PerfectFollowResponseDto;
import com.ssafy.howdoilook.domain.follow.dto.response.QPerfectFollowResponseDto;
import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.follow.entity.QFollow;
import com.ssafy.howdoilook.domain.user.entity.QUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;


import javax.persistence.EntityManager;
import java.util.List;


public class FollowCustomRepositoryImpl implements FollowCustomRepository{
    private final JPAQueryFactory jpaQueryFactory;

    QFollow follow = QFollow.follow;

    public FollowCustomRepositoryImpl(EntityManager em) {this.jpaQueryFactory = new JPAQueryFactory(em);}


    @Override
    public Follow findFollowIdByFollowerAndFollowee(Long followerId, Long followeeId) {
        Follow findFollow = jpaQueryFactory.select(follow)
                .from(follow)
                .where(follow.follower.id.eq(followerId).and(follow.followee.id.eq(followeeId)))
                .fetchOne();
        return findFollow;
    }

    @Override
    public Page<Follow> findFolloweeByUserId(Long followerId, Pageable page) {
        QueryResults<Follow> results = jpaQueryFactory.select(follow)
                .from(follow)
                .where(follow.follower.id.eq(followerId))
                .offset(page.getOffset())
                .limit(page.getPageSize())
                .fetchResults();
        return new PageImpl<>(results.getResults(), page, results.getTotal());
    }
    @Override
    public Page<Follow> findFollowerByUserId(Long followeeId, Pageable page) {
        QueryResults<Follow> results = jpaQueryFactory.selectFrom(follow)
                .where(follow.followee.id.eq(followeeId))
                .offset(page.getOffset())
                .limit(page.getPageSize())
                .fetchResults();
        return new PageImpl<>(results.getResults(), page, results.getTotal());
    }

    @Override
    public List<Follow> findAllFolloweeByUserId(Long userId) {

        return jpaQueryFactory.selectFrom(follow)
                .where(follow.follower.id.eq(userId))
                .fetch();
    }

    @Override
    public List<Follow> findAllFollowerByUserId(Long userId) {

        return jpaQueryFactory.selectFrom(follow)
                .where(follow.followee.id.eq(userId))
                .fetch();
    }

    // 맞팔로우 상태인 정보 조회
    @Override
    public List<PerfectFollowResponseDto> findPerfectFollowers() {
        QFollow follow = QFollow.follow;
        QUser follower = QUser.user;
        QUser followee = new QUser("followee");

        return jpaQueryFactory
                .select(Projections.constructor(PerfectFollowResponseDto.class,
                        follower.id, followee.id, follower.nickname, followee.nickname,
                        follower.profileImg, followee.profileImg, follower.gender, followee.gender,
                        follower.showBadgeType, followee.showBadgeType))
                .from(follow)
                .innerJoin(follower).on(follow.follower.id.eq(follower.id))
                .innerJoin(followee).on(follow.followee.id.eq(followee.id))
                .where(
                        follow.follower.id.in(
                                JPAExpressions.select(followee.id)
                                        .from(followee)
                                        .innerJoin(follow).on(followee.id.eq(follow.followee.id))
                                        .innerJoin(follower).on(follow.followee.id.eq(follower.id))
                        ),
                        follow.followee.id.in(
                                JPAExpressions.select(follower.id)
                                        .from(follower)
                                        .innerJoin(follow).on(follower.id.eq(follow.follower.id))
                                        .innerJoin(followee).on(follow.follower.id.eq(followee.id))
                        )
                )
                .fetch();
    }
}
