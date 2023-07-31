package com.ssafy.howdoilook.domain.feed.repository;


import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.feed.dto.response.FeedResponseDto;
import com.ssafy.howdoilook.domain.feed.dto.response.QFeedResponseDto;
import com.ssafy.howdoilook.domain.feed.entity.QFeed;
import com.ssafy.howdoilook.domain.feedPhoto.entity.QFeedPhoto;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.entity.QFeedPhotoHashtag;
import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.hashtag.entity.QHashtag;
import com.ssafy.howdoilook.domain.user.entity.QUser;
import com.ssafy.howdoilook.domain.user.entity.User;


import javax.persistence.EntityManager;
import java.util.List;

import static com.ssafy.howdoilook.domain.user.entity.QUser.user;

public class FeedCustomRepositoryImpl implements FeedCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;
    QFeed feed = QFeed.feed;
    QUser user = QUser.user;
    QFeedPhoto feedPhoto = QFeedPhoto.feedPhoto;
    QFeedPhotoHashtag feedPhotoHashtag = QFeedPhotoHashtag.feedPhotoHashtag;
    QHashtag hashtag = QHashtag.hashtag;

    public FeedCustomRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<FeedResponseDto> selectFeedAll() {

        List<FeedResponseDto> feedSelectedList = jpaQueryFactory.select(new QFeedResponseDto(
                        feed.user.id, feed.id, feed.content, feed.createdDate, feed.modifiedDate
                        , feedPhoto.id, feedPhoto.link, hashtag.content))
                .from(feed)
                .leftJoin(feed.feedPhotoList, feedPhoto)
                .leftJoin(feedPhoto.feedPhotoHashtagList, feedPhotoHashtag)
                .leftJoin(feedPhotoHashtag.hashtag, hashtag)
                .orderBy(feed.id.desc(),feedPhoto.id.asc())
                .fetch();
        return feedSelectedList;
    }

    @Override
    public List<FeedResponseDto> selectFeedByHashTag(List<String> hashTagList) {
        BooleanBuilder builder = new BooleanBuilder();
        for (String s : hashTagList) {
            builder.or(hashtag.content.eq(s));
        }
        List<Long> findFeedIdList = jpaQueryFactory.select(feed.id)
                .from(feed)
                .leftJoin(feed.feedPhotoList, feedPhoto)
                .leftJoin(feedPhoto.feedPhotoHashtagList, feedPhotoHashtag)
                .leftJoin(feedPhotoHashtag.hashtag, hashtag)
                .where(builder)
                .distinct()
                .fetch();
        builder = new BooleanBuilder();
        for (Long aLong : findFeedIdList) {
            builder.or(feed.id.eq(aLong));
        }
        List<FeedResponseDto> feedSelectedList = jpaQueryFactory.select(new QFeedResponseDto(
                        feed.user.id, feed.id, feed.content, feed.createdDate, feed.modifiedDate
                        , feedPhoto.id, feedPhoto.link, hashtag.content))
                .from(feed)
                .leftJoin(feed.feedPhotoList, feedPhoto)
                .leftJoin(feedPhoto.feedPhotoHashtagList, feedPhotoHashtag)
                .leftJoin(feedPhotoHashtag.hashtag, hashtag)
                .where(builder)
                .distinct()
                .orderBy(feed.id.desc(),feedPhoto.id.asc())
                .fetch();
        return feedSelectedList;
    }

    @Override
    public List<FeedResponseDto> selectByUserFollowee(List<Follow> followList) {
        BooleanBuilder builder = new BooleanBuilder();
        for (Follow follow : followList) {
            builder.or(feed.user.id.eq(follow.getFollowee().getId()));
        }
        List<FeedResponseDto> feedSelectedList = jpaQueryFactory.select(new QFeedResponseDto(
                        feed.user.id, feed.id, feed.content, feed.createdDate, feed.modifiedDate
                        , feedPhoto.id, feedPhoto.link, hashtag.content))
                .from(feed)
                .leftJoin(feed.feedPhotoList, feedPhoto)
                .leftJoin(feedPhoto.feedPhotoHashtagList, feedPhotoHashtag)
                .leftJoin(feedPhotoHashtag.hashtag, hashtag)
                .where(builder)
                .distinct()
                .orderBy(feed.id.desc(),feedPhoto.id.asc())
                .fetch();
        return feedSelectedList;
    }


}
