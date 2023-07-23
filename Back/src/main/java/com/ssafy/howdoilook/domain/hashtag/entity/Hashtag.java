package com.ssafy.howdoilook.domain.hashtag.entity;

import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class Hashtag extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hashtag_no")
    private Long id;

    @Column(name = "hashtag_content")
    private String content;
}
