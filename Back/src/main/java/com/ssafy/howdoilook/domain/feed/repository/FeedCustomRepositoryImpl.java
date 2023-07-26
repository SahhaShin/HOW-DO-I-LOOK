package com.ssafy.howdoilook.domain.feed.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.feed.dto.response.FeedSelectResponseDto;
import com.ssafy.howdoilook.domain.feed.dto.response.QFeedSelectResponseDto;
import com.ssafy.howdoilook.domain.feed.entity.QFeed;
import com.ssafy.howdoilook.domain.feedPhoto.entity.QFeedPhoto;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.entity.QFeedPhotoHashtag;
import com.ssafy.howdoilook.domain.hashtag.entity.QHashtag;




import javax.persistence.EntityManager;
import java.util.List;

public class FeedCustomRepositoryImpl implements FeedCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;
    QFeed feed = QFeed.feed;
    QFeedPhoto feedPhoto = QFeedPhoto.feedPhoto;
    QFeedPhotoHashtag feedPhotoHashtag = QFeedPhotoHashtag.feedPhotoHashtag;
    QHashtag hashtag = QHashtag.hashtag;

    public FeedCustomRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<FeedSelectResponseDto> selectFeedAll() {
        List<FeedSelectResponseDto> feedSelectedList = jpaQueryFactory.select(new QFeedSelectResponseDto(
                        feed.user.id, feed.id, feed.content, feed.createdDate, feed.modifiedDate
                        , feedPhoto.id, feedPhoto.link, hashtag.content))
                .from(feed)
                .leftJoin(feed.feedPhotoList, feedPhoto)
                .leftJoin(feedPhoto.feedPhotoHashtagList, feedPhotoHashtag)
                .leftJoin(feedPhotoHashtag.hashtag, hashtag)
                .orderBy(feed.createdDate.desc())
                .fetch();
        return feedSelectedList;
    }
}
