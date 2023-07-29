package com.ssafy.howdoilook.domain.ootd.entity;

import com.ssafy.howdoilook.domain.clothesOotd.entity.ClothesOotd;
import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import com.ssafy.howdoilook.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor (access = AccessLevel.PROTECTED)
@Table(name = "ootd")
public class Ootd extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ootd_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "ootd_order")
    private Long order;

    @OneToMany(mappedBy = "ootd", cascade = CascadeType.ALL)
    List<ClothesOotd> clothesOotdList = new ArrayList<>();

    @Builder
    public Ootd(Long id, User user, Long order) {
        this.id = id;
        this.user = user;
        this.order = order;
    }
}
