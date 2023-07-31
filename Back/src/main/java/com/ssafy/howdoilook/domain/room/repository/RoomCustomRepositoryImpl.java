package com.ssafy.howdoilook.domain.room.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.follow.entity.QFollow;
import com.ssafy.howdoilook.domain.room.dto.response.FollowingRoomResponseDto;
import com.ssafy.howdoilook.domain.room.dto.response.QFollowingRoomResponseDto;
import com.ssafy.howdoilook.domain.room.entity.QRoom;
import com.ssafy.howdoilook.domain.room.entity.Room;
import com.ssafy.howdoilook.domain.room.entity.RoomType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
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
    public Page<FollowingRoomResponseDto> findByFollowingList(List<Follow> followingList, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();
        for (Follow follow : followingList) {
            builder.or(room.host.id.eq(follow.getFollowee().getId()));
        }
        QueryResults<FollowingRoomResponseDto> queryResults = jpaQueryFactory.select(new QFollowingRoomResponseDto(room))
                .from(room)
                .leftJoin(follow)
                .on(room.host.id.eq(follow.followee.id))
                .where(builder)
                .offset(pageable.getOffset()) // 페이지 번호를 0부터 시작하므로 offset 설정
                .limit(pageable.getPageSize()) // 페이지 크기 설정
                .orderBy(room.id.desc())
                .fetchResults();

        List<FollowingRoomResponseDto> content = queryResults.getResults();
        long total = queryResults.getTotal();

        return new PageImpl<>(content, pageable, total);
    }

    @Override
    public Page<FollowingRoomResponseDto> findByHost_IdAndType(List<Follow> followingList, RoomType type, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();
        for (Follow follow : followingList) {
            builder.or(room.host.id.eq(follow.getFollowee().getId()));
        }
        QueryResults<FollowingRoomResponseDto> queryResults = jpaQueryFactory.select(new QFollowingRoomResponseDto(room))
                .from(room)
                .leftJoin(follow)
                .on(room.host.id.eq(follow.followee.id))
                .where(builder, room.type.eq(type))
                .offset(pageable.getOffset()) // 페이지 번호를 0부터 시작하므로 offset 설정
                .limit(pageable.getPageSize()) // 페이지 크기 설정
                .orderBy(room.id.desc())
                .fetchResults();

        List<FollowingRoomResponseDto> content = queryResults.getResults();
        long total = queryResults.getTotal();

        return new PageImpl<>(content, pageable, total);
    }

}
