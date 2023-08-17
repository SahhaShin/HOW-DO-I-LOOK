package com.ssafy.howdoilook.domain.feedPhoto.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.feedPhoto.entity.FeedPhoto;
import com.ssafy.howdoilook.domain.feedPhoto.entity.QFeedPhoto;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.entity.QFeedPhotoHashtag;
import com.ssafy.howdoilook.domain.hashtag.entity.QHashtag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import java.util.List;

public class FeedPhotoCustomRepositoryImpl implements FeedPhotoCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;
    QFeedPhoto feedPhoto = QFeedPhoto.feedPhoto;
    QFeedPhotoHashtag feedPhotoHashtag = QFeedPhotoHashtag.feedPhotoHashtag;
    QHashtag hashtag = QHashtag.hashtag;
    public FeedPhotoCustomRepositoryImpl(EntityManager em) {this.jpaQueryFactory = new JPAQueryFactory(em);}

    @Override
    public List<String> selectLinkListByFeedId(Long id) {
        List<String> linkList = jpaQueryFactory
                .select(feedPhoto.link)
                .from(feedPhoto)
                .where(feedPhoto.feed.id.eq(id))
                .fetch();
        return linkList;
    }

    @Override
    public Page<FeedPhoto> selectPhotoByHashtag(List<String> hashtagList, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();
        for (String s : hashtagList) {
            builder.or(hashtag.content.eq(s));
        }
        QueryResults<FeedPhoto> results = jpaQueryFactory.select(feedPhoto)
                .from(feedPhoto)
                .leftJoin(feedPhoto.feedPhotoHashtagList, feedPhotoHashtag)
                .leftJoin(feedPhotoHashtag.hashtag, hashtag)
                .where(builder)
                .distinct()
                .orderBy(feedPhoto.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();
        return new PageImpl<>(results.getResults(), pageable, results.getTotal());
    }

    @Override
    public Page<FeedPhoto> selectPhoto(Pageable pageable) {
        QueryResults<FeedPhoto> results = jpaQueryFactory.select(feedPhoto)
                .from(feedPhoto)
                .orderBy(feedPhoto.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();
        return new PageImpl<>(results.getResults(), pageable, results.getTotal());
    }
}
