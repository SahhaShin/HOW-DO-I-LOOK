package com.ssafy.howdoilook.domain.clothesOotd.entity;

import com.ssafy.howdoilook.domain.clothes.entity.Clothes;
import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import com.ssafy.howdoilook.domain.ootd.entity.Ootd;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "clothes_ootd")
public class ClothesOotd extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clothes_ootd_no")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clothes_no")
    private Clothes clothes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ootd_no")
    private Ootd ootd;

    @Builder
    public ClothesOotd(Long id, Clothes clothes, Ootd ootd) {
        this.id = id;
        this.clothes = clothes;
        this.ootd = ootd;
    }
}
