package com.ssafy.howdoilook.domain.room.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.follow.entity.QFollow;
import com.ssafy.howdoilook.domain.room.dto.response.QRoomListResponseDto;
import com.ssafy.howdoilook.domain.room.dto.response.RoomListResponseDto;
import com.ssafy.howdoilook.domain.room.entity.QRoom;
import com.ssafy.howdoilook.domain.room.entity.RoomType;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import java.util.List;

public class RoomCustomRepositoryImpl implements RoomCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QRoom room = QRoom.room;
    QFollow follow = QFollow.follow;

    public RoomCustomRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<RoomListResponseDto> findFollowingRoomList(List<Follow> followingList, String type, String search, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();
        for (Follow follow : followingList) {
            builder.or(room.host.id.eq(follow.getFollowee().getId()));
        }

        /**
         * 타입이 설정되어 있을 때 where 절 해당 필터링 추가
         */
        if (type != null) {
            builder.and(room.type.eq(RoomType.valueOf(type)));
        }

        /**
         * 검색어 입력이 있을 때 where 절 해당 필터링 추가
         */
        if (search != null) {
            // search 값을 사용하여 필터링 (제목에 search 값이 포함되어야 함)
            builder.and(room.title.like("%" + search + "%"));
        }

        List<RoomListResponseDto> queryResults = jpaQueryFactory.select(new QRoomListResponseDto(room))
                .from(room)
                .leftJoin(follow)
                .on(room.host.id.eq(follow.followee.id))
                .where(builder)
                .offset(pageable.getOffset()) // 페이지 번호
                .limit(pageable.getPageSize()) // 페이지 사이즈
                .orderBy(room.id.desc())
                .fetch();

        List<RoomListResponseDto> content = queryResults;

        return content;
    }
}
