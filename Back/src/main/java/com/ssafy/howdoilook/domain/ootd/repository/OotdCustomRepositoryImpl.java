package com.ssafy.howdoilook.domain.ootd.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.clothes.entity.ClothesType;
import com.ssafy.howdoilook.domain.clothes.entity.QClothes;
import com.ssafy.howdoilook.domain.clothesOotd.entity.QClothesOotd;
import com.ssafy.howdoilook.domain.clothesOotd.entity.SlotType;
import com.ssafy.howdoilook.domain.ootd.dto.response.ClothesTypeListDto;
import com.ssafy.howdoilook.domain.ootd.dto.response.QClothesTypeListDto;

import javax.persistence.EntityManager;
import java.util.List;

public class OotdCustomRepositoryImpl implements OotdCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;

    QClothes c = QClothes.clothes;
    QClothesOotd co = QClothesOotd.clothesOotd;

    public OotdCustomRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Override
    public ClothesTypeListDto findOotdClothes(Long ootdId, SlotType slotType) {

        ClothesTypeListDto ootdClothes = jpaQueryFactory.select(new QClothesTypeListDto(
                        co.clothes.id, c.photoLink))
                .from(co)
                .leftJoin(co.clothes, c)
                .where(
                        co.ootd.id.eq(ootdId),
                        co.type.eq(slotType)
                )
                .fetchOne();

        return ootdClothes;
    }

    @Override
    public List<ClothesTypeListDto> findClothesList(Long clothesId, Long userId, String type, Long ootdId) {

         List<ClothesTypeListDto> ootdList = jpaQueryFactory.select(new QClothesTypeListDto(
                 c.clothes.id, c.photoLink))
                .from(c)
                .where(
                        c.user.id.eq(userId),
                        c.type.eq(ClothesType.valueOf(type)),
                        c.id.notIn(clothesId)
                )
                 .orderBy(c.id.desc())
                 .fetch();

        return ootdList;
    }

    @Override
    public List<ClothesTypeListDto> findByTypeAndUser_Id(ClothesType type, Long userId) {

        List<ClothesTypeListDto> ootdList = jpaQueryFactory.select(new QClothesTypeListDto(
                c.clothes.id, c.photoLink))
                .from(c)
                .where(c.type.eq(type), c.user.id.eq(userId))
                .fetch();

        return ootdList;

    }
}
