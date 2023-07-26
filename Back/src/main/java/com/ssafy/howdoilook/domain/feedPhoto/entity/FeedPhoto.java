package com.ssafy.howdoilook.domain.feedPhoto.entity;

import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.entity.FeedPhotoHashtag;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "feed_photo")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class FeedPhoto extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feed_photo_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "feed_id")
    private Feed feed;

    @Column(name = "feed_photo_link")
    private String link;

    @OneToMany(mappedBy ="feedPhoto")
    List<FeedPhotoHashtag> list = new ArrayList<>();

    @Builder
    public FeedPhoto(Long id, Feed feed, String link) {
        this.id = id;
        this.feed = feed;
        this.link = link;
    }
}
