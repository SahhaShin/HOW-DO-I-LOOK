package com.ssafy.howdoilook.domain.feedPhotoHashtag.entity;

import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import com.ssafy.howdoilook.domain.feedPhoto.entity.FeedPhoto;
import com.ssafy.howdoilook.domain.hashtag.entity.Hashtag;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "feed_photo_hashtag")
public class FeedPhotoHashtag extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="feed_photo_hashtag_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "feed_photo_id")
    private FeedPhoto feedPhoto;


    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "hashtag_id")
    private Hashtag hashtag;

    @Builder
    public FeedPhotoHashtag(Long id, FeedPhoto feedPhoto, Hashtag hashtag) {
        this.id = id;
        this.feedPhoto = feedPhoto;
        this.hashtag = hashtag;
    }
}
