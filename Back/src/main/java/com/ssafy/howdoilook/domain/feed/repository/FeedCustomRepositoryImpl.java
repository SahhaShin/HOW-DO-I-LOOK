package com.ssafy.howdoilook.domain.feed.repository;


import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.feed.entity.QFeed;
import com.ssafy.howdoilook.domain.feedPhoto.entity.QFeedPhoto;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.entity.QFeedPhotoHashtag;
import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.hashtag.entity.QHashtag;
import com.ssafy.howdoilook.domain.user.entity.QUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import javax.persistence.EntityManager;
import java.util.List;



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

    //페이징한 feed
    @Override
    public Page<Feed> selectFeedAll(Pageable pageable) {
        QueryResults<Feed> results = jpaQueryFactory.selectFrom(feed)
                .orderBy(feed.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();
        List<Feed> content = results.getResults();
        return new PageImpl<>(content,pageable, results.getTotal());
    }

    @Override
    public Page<Feed> selectFeedByHashTag(List<String> hashTagList, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();
        for (String s : hashTagList) {
            builder.or(hashtag.content.eq(s));
        }
        QueryResults<Feed> results = jpaQueryFactory.select(feed)
                .from(feed)
                .leftJoin(feed.feedPhotoList, feedPhoto)
                .leftJoin(feedPhoto.feedPhotoHashtagList, feedPhotoHashtag)
                .leftJoin(feedPhotoHashtag.hashtag, hashtag)
                .where(builder)
                .distinct()
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();
        return new PageImpl(results.getResults(), pageable, results.getTotal());
    }

    @Override
    public  Page<Feed> selectByUserFollowee(List<Follow> followList, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();
        for (Follow follow : followList) {
            builder.or(feed.user.id.eq(follow.getFollowee().getId()));
        }
        QueryResults<Feed> results = jpaQueryFactory.select(feed)
                .from(feed)
                .leftJoin(feed.feedPhotoList, feedPhoto)
                .leftJoin(feedPhoto.feedPhotoHashtagList, feedPhotoHashtag)
                .leftJoin(feedPhotoHashtag.hashtag, hashtag)
                .where(builder)
                .distinct()
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();
        return new PageImpl(results.getResults(), pageable, results.getTotal());
    }


}
