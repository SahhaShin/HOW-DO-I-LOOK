package com.ssafy.howdoilook.domain.hashtag.entity;

import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.entity.FeedPhotoHashtag;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "hashtag")
public class Hashtag extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hashtag_id")
    private Long id;

    @Column(name = "hashtag_content")
    private String content;

    @OneToMany(mappedBy = "hashtag")
    private List<FeedPhotoHashtag> list = new ArrayList<>();

    @Builder
    public Hashtag(Long id, String content) {
        this.id = id;
        this.content = content;
    }

}
