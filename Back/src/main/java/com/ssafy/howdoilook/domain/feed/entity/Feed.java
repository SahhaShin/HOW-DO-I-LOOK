package com.ssafy.howdoilook.domain.feed.entity;

import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import com.ssafy.howdoilook.domain.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Feed extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feed_no")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no")
    private User user;

    @Column(name = "feed_content")
    private String content;




}
