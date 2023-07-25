package com.ssafy.howdoilook.domain.clothes.entity;

import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import com.ssafy.howdoilook.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "clothes")
public class Clothes extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clothes_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "clothes_type")
    private ClothesType type;

    @Column(name = "clothes_photo_link")
    private String photoLink;

    @Column(name = "clothes_name")
    private String name;

    @Column(name = "clothes_brand")
    private String brand;

    @Column(name = "clothes_info")
    private String info;

    @Builder
    public Clothes(Long id, User user, ClothesType type, String photoLink, String name, String brand, String info) {
        this.id = id;
        this.user = user;
        this.type = type;
        this.photoLink = photoLink;
        this.name = name;
        this.brand = brand;
        this.info = info;
    }
}
