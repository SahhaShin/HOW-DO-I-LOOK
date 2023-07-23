package com.ssafy.howdoilook.domain.feedPhotoHashtag.entity;

import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import com.ssafy.howdoilook.domain.feedPhoto.entity.FeedPhoto;
import com.ssafy.howdoilook.domain.hashtag.entity.Hashtag;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "feed_photo_hashtag")
public class FeedPhotoHashtag extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="feed_photo_hashtag_no")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_photo_no")
    private FeedPhoto feedPhoto;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hashtag_no")
    private Hashtag hashtag;

}
