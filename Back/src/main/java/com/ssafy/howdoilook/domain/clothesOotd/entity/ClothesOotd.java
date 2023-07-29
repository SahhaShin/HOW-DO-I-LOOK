package com.ssafy.howdoilook.domain.clothesOotd.entity;

import com.ssafy.howdoilook.domain.clothes.entity.Clothes;
import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import com.ssafy.howdoilook.domain.ootd.entity.Ootd;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "clothes_ootd")
public class ClothesOotd extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clothes_ootd_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clothes_id")
    private Clothes clothes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ootd_id")
    private Ootd ootd;

    @Enumerated(EnumType.STRING)
    @Column(name = "slot_type")
    private SlotType type;

    @Builder
    public ClothesOotd(Long id, Clothes clothes, Ootd ootd, SlotType type) {
        this.id = id;
        this.clothes = clothes;
        this.ootd = ootd;
        this.type = type;
    }

}
