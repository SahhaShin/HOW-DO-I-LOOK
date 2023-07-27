package com.ssafy.howdoilook.domain.ootd.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.clothesOotd.entity.QClothesOotd;
import com.ssafy.howdoilook.domain.ootd.entity.QOotd;
import com.ssafy.howdoilook.domain.user.repository.UserCustomRepository;

import javax.persistence.EntityManager;
import java.util.List;

public class OotdCustomRepositoryImpl implements OotdCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;

    public OotdCustomRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Long> findClothesIdList(Long userId) {
        QClothesOotd co = QClothesOotd.clothesOotd; // Q 클래스 가져오기
        QOotd o = QOotd.ootd; // Q 클래스 가져오기
        return jpaQueryFactory
                .select(co.clothes.id)
                .from(co)
                .leftJoin(o)
                .on(co.ootd.id.eq(o.id))
                .where(o.user.id.eq(userId))
                .fetch();
    }
}
