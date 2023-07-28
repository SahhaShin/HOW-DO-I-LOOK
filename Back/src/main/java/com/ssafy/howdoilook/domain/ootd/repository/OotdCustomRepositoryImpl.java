package com.ssafy.howdoilook.domain.ootd.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.clothes.entity.ClothesType;
import com.ssafy.howdoilook.domain.clothes.entity.QClothes;
import com.ssafy.howdoilook.domain.clothesOotd.entity.QClothesOotd;
import com.ssafy.howdoilook.domain.ootd.dto.response.ClothesTypeListDto;
import com.ssafy.howdoilook.domain.ootd.dto.response.OotdListResponseDto;
import com.ssafy.howdoilook.domain.ootd.dto.response.QClothesTypeListDto;
import com.ssafy.howdoilook.domain.ootd.entity.QOotd;
import com.ssafy.howdoilook.domain.user.repository.UserCustomRepository;

import javax.persistence.EntityManager;
import java.util.List;

public class OotdCustomRepositoryImpl implements OotdCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;

    QClothes c = QClothes.clothes;
    QClothesOotd co = QClothesOotd.clothesOotd;

    public OotdCustomRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

//    @Override
//    public List<Long> findClothesIdList(Long userId) {
//        QClothesOotd co = QClothesOotd.clothesOotd; // Q 클래스 가져오기
//        QOotd o = QOotd.ootd; // Q 클래스 가져오기
//        return jpaQueryFactory
//                .select(co.clothes.id)
//                .from(co)
//                .leftJoin(o)
//                .on(co.ootd.id.eq(o.id))
//                .where(o.user.id.eq(userId))
//                .fetch();
//    }

//    @Override
//    public List<ClothesTypeListDto> findClothesIdList(Long userId, String type) {
//
//
//         List<ClothesTypeListDto> ootdList = jpaQueryFactory.select(new QClothesTypeListDto(
//                 c.clothes.id, c.photoLink, co.ootd.id))
//                .from(c)
//                .leftJoin(co)
//                .on(c.id.eq(co.id))
//                .where(c.user.id.eq(userId), c.type.eq(ClothesType.valueOf(type)))
//                 .orderBy(co.ootd.id.desc(), co.id.asc())
//                 .fetch();
//
//        return ootdList;
//    }

    @Override
    public List<ClothesTypeListDto> findOotdIdList(Long userId, String type, Long ootdId) {

        List<ClothesTypeListDto> ootdList = jpaQueryFactory.select(new QClothesTypeListDto(
                        c.clothes.id, c.photoLink, co.id))
                .from(c)
                .leftJoin(c.clothesOotdList, co)
//                .on(c.id.eq(co.id))
                .where(
                        c.user.id.eq(userId),
                        c.type.eq(ClothesType.valueOf(type)),
                        co.ootd.id.eq(ootdId)
                )
                .fetch();

        return ootdList;
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
