package com.ssafy.howdoilook.domain.follow.repository;


import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.follow.entity.QFollow;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;


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
}
