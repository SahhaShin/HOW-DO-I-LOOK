package com.ssafy.howdoilook.domain.feedLike.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.feed.entity.QFeed;
import com.ssafy.howdoilook.domain.feedLike.dto.response.FeedLikeCheckResponseDto;
import com.ssafy.howdoilook.domain.feedLike.dto.response.FeedLikeCountResponseDto;
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

    @Override
    public FeedLikeCountResponseDto countFeedLike(Long feedId) {
        Long lovelyCount = jpaQueryFactory.select(feedLike.count())
                .from(feedLike)
                .where(feedLike.feed.id.eq(feedId).and(feedLike.type.eq(FeedLikeType.LOVELY)))
                .fetchOne();
        Long naturalCount = jpaQueryFactory.select(feedLike.count())
                .from(feedLike)
                .where(feedLike.feed.id.eq(feedId).and(feedLike.type.eq(FeedLikeType.NATURAL)))
                .fetchOne();
        Long modernCount = jpaQueryFactory.select(feedLike.count())
                .from(feedLike)
                .where(feedLike.feed.id.eq(feedId).and(feedLike.type.eq(FeedLikeType.MODERN)))
                .fetchOne();
        Long sexyCount = jpaQueryFactory.select(feedLike.count())
                .from(feedLike)
                .where(feedLike.feed.id.eq(feedId).and(feedLike.type.eq(FeedLikeType.SEXY)))
                .fetchOne();
        return FeedLikeCountResponseDto.builder()
                .LOVELY(lovelyCount)
                .NATURAL(naturalCount)
                .MODERN(modernCount)
                .SEXY(sexyCount)
                .build();
    }

    /**
     * 하드코딩인데 이거 맞나? ㅜㅜ
     * @param userId
     * @param feedId
     * @return
     */
    @Override
    public FeedLikeCheckResponseDto checkFeedLike(Long userId, Long feedId) {
        List<FeedLike> feedLikeList = jpaQueryFactory.selectFrom(feedLike)
                .where(feedLike.user.id.eq(userId).and(feedLike.feed.id.eq(feedId)))
                .fetch();
        FeedLikeCheckResponseDto feedLikeCheckResponseDto = new FeedLikeCheckResponseDto();
        for (FeedLike like : feedLikeList) {
            if (like.getType()!=null) {
                switch (like.getType()){
                    case LOVELY:
                        feedLikeCheckResponseDto.setLovelyType(like.getType());
                        break;
                    case NATURAL:
                        feedLikeCheckResponseDto.setNaturalType(like.getType());
                        break;
                    case MODERN:
                        feedLikeCheckResponseDto.setModernType(like.getType());
                        break;
                    case SEXY:
                        feedLikeCheckResponseDto.setSexyType(like.getType());
                        break;
                }
            }
        }
        return feedLikeCheckResponseDto;
    }
}
