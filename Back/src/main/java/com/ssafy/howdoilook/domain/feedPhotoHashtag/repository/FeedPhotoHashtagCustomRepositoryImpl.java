package com.ssafy.howdoilook.domain.feedPhotoHashtag.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.entity.FeedPhotoHashtag;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.entity.QFeedPhotoHashtag;

import javax.persistence.EntityManager;
import java.util.List;

public class FeedPhotoHashtagCustomRepositoryImpl implements FeedPhotoHashtagCustomRepository{
    private final JPAQueryFactory jpaQueryFactory;
    QFeedPhotoHashtag feedPhotoHashtag = QFeedPhotoHashtag.feedPhotoHashtag;
    public FeedPhotoHashtagCustomRepositoryImpl(EntityManager em) {this.jpaQueryFactory = new JPAQueryFactory(em);}

    @Override
    public List<FeedPhotoHashtag> selectFeedPhotoHashtagByFeedPhotoId(Long feedPhotoId) {
        List<FeedPhotoHashtag> feedPhotoHashtagList = jpaQueryFactory.selectFrom(feedPhotoHashtag)
                .where(feedPhotoHashtag.feedPhoto.id.eq(feedPhotoId))
                .fetch();
        return feedPhotoHashtagList;
    }
}
