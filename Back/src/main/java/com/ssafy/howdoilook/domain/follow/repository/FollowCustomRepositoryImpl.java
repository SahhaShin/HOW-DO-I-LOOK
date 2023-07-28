package com.ssafy.howdoilook.domain.follow.repository;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.follow.entity.QFollow;


import javax.persistence.EntityManager;


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
}
