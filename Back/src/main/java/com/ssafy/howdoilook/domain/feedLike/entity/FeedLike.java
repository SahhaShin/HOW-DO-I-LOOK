package com.ssafy.howdoilook.domain.feedLike.entity;

import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.util.Lazy;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "feed_like")
public class FeedLike extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="feed_like_no")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_no")
    private Feed feed;

    @Enumerated(EnumType.STRING)
    @Column(name = "feed_like_type")
    private FeedLikeType type;

    @Builder
    public FeedLike(Long id, User user, Feed feed, FeedLikeType type) {
        this.id = id;
        this.user = user;
        this.feed = feed;
        this.type = type;
    }
}
