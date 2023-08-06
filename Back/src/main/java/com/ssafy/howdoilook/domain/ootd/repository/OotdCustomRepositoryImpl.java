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
    public List<ClothesTypeListDto> findOotdClothes(Long ootdId, SlotType slotType) {

        List<ClothesTypeListDto> ootdClothes = jpaQueryFactory.select(new QClothesTypeListDto(
                        co.clothes.id, c.photoLink, co.id))
                .from(co)
                .leftJoin(co.clothes, c)
//                .on(c.id.eq(co.id))
                .where(
                        co.ootd.id.eq(ootdId),
                        co.type.eq(slotType)
                )
                .fetch();

        return ootdClothes;
    }

    @Override
    public List<ClothesTypeListDto> findClothesList(Long userId, String type, Long ootdId) {

         List<ClothesTypeListDto> ootdList = jpaQueryFactory.select(new QClothesTypeListDto(
                 c.clothes.id, c.photoLink, co.id))
                .from(c)
                .leftJoin(c.clothesOotdList, co)
//                .on(c.id.eq(co.id))
                .where(
                        c.user.id.eq(userId),
                        c.type.eq(ClothesType.valueOf(type)),
                        co.ootd.id.notIn(ootdId).or(co.id.isNull())
                )
                 .orderBy(co.ootd.id.desc())
                 .fetch();

        return ootdList;
    }
}
