package com.ssafy.howdoilook.domain.feedPhoto.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.feedPhoto.entity.QFeedPhoto;

import javax.persistence.EntityManager;
import java.util.List;

public class FeedPhotoCustomRepositoryImpl implements FeedPhotoCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;
    QFeedPhoto feedPhoto = QFeedPhoto.feedPhoto;
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
}
