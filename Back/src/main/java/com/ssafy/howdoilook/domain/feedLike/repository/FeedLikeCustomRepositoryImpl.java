package com.ssafy.howdoilook.domain.feedLike.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.feed.entity.QFeed;
import com.ssafy.howdoilook.domain.feedLike.entity.FeedLike;
import com.ssafy.howdoilook.domain.feedLike.entity.FeedLikeType;
import com.ssafy.howdoilook.domain.feedLike.entity.QFeedLike;
import com.ssafy.howdoilook.domain.user.entity.QUser;
import com.ssafy.howdoilook.domain.user.entity.User;

import javax.persistence.EntityManager;
import java.util.EmptyStackException;
import java.util.List;

public class FeedLikeCustomRepositoryImpl implements FeedLikeCustomRepository{
    private final JPAQueryFactory jpaQueryFactory;
    QFeed feed = QFeed.feed;
    QUser user = QUser.user;
    QFeedLike feedLike = QFeedLike.feedLike;

    public FeedLikeCustomRepositoryImpl(EntityManager em) {this.jpaQueryFactory = new JPAQueryFactory(em);}

    @Override
    public FeedLike findFeedLikeByUserIdAndFeedIdAndType(User user, Feed feed, String type) {
        FeedLike findFeedLike = jpaQueryFactory.selectFrom(feedLike)
                .where(feedLike.user.id.eq(user.getId()).and(
                        feedLike.feed.id.eq(feed.getId())).and(
                        feedLike.type.eq(FeedLikeType.valueOf(type)))).fetchOne();
        return findFeedLike;
    }
}
