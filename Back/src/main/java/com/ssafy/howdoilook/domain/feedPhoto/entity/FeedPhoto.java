package com.ssafy.howdoilook.domain.feedPhoto.entity;

import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import com.ssafy.howdoilook.domain.feed.entity.Feed;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "feed_photo")
@NoArgsConstructor
@Getter
public class FeedPhoto extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feed_photo_no")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_no")
    private Feed feed;

    @Column(name ="feed_photo_link")
    private String link;

    @Builder
    public FeedPhoto(Long id, Feed feed, String link) {
        this.id = id;
        this.feed = feed;
        this.link = link;
    }
}
