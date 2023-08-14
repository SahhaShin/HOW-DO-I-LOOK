package com.ssafy.howdoilook.domain.feed.repository;


import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.blacklist.entity.BlackList;
import com.ssafy.howdoilook.domain.blacklist.entity.QBlackList;
import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.feed.entity.QFeed;
import com.ssafy.howdoilook.domain.feedLike.entity.QFeedLike;
import com.ssafy.howdoilook.domain.feedPhoto.entity.QFeedPhoto;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.entity.QFeedPhotoHashtag;
import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.hashtag.entity.QHashtag;
import com.ssafy.howdoilook.domain.user.entity.QUser;
import com.ssafy.howdoilook.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.Querydsl;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;



public class FeedCustomRepositoryImpl implements FeedCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;
    QFeed feed = QFeed.feed;
    QUser user = QUser.user;
    QFeedPhoto feedPhoto = QFeedPhoto.feedPhoto;
    QFeedPhotoHashtag feedPhotoHashtag = QFeedPhotoHashtag.feedPhotoHashtag;
    QHashtag hashtag = QHashtag.hashtag;
    QFeedLike feedLike = QFeedLike.feedLike;
    QBlackList blackList = QBlackList.blackList;

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
                .orderBy(feed.id.desc())
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
                .orderBy(feed.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();
        return new PageImpl(results.getResults(), pageable, results.getTotal());
    }

    @Override
    public Page<Feed> selectByUserId(Long userId, Pageable pageable) {
        QueryResults<Feed> results = jpaQueryFactory.selectFrom(feed)
                .where(feed.user.id.eq(userId))
                .orderBy(feed.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();
        return new PageImpl(results.getResults(), pageable, results.getTotal());
    }

    @Override
    public Page<Feed> selectLikedFeed(Long userId, Pageable pageable) {
        JPAQuery<Feed> query = jpaQueryFactory
                .select(feed)
                .distinct()
                .from(feedLike)
                .leftJoin(feedLike.feed, feed)
                .on(feedLike.user.id.eq(userId));


        QueryResults<Feed> results = query
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(feed.id.desc())
                .fetchResults();

        return new PageImpl<>(results.getResults(), pageable, results.getTotal());
    }

    @Override
    public List<Feed> selectFeedExceptBlackList(User user) {
        List<BlackList> blackListList = user.getBlackList();
        List<User> blackListTargetUser = new ArrayList<>();
        for (BlackList blackList : blackListList) {
            blackListTargetUser.add(blackList.getTargetUser());
        }
        List<Feed> feedList = jpaQueryFactory.select(feed)
                .from(feed)
                .distinct()
                .where(feed.user.notIn(blackListTargetUser))
                .fetch();
        return feedList;
    }
}
