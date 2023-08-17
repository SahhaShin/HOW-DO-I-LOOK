package com.ssafy.howdoilook.domain.room.repository.RoomRepository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.blacklist.entity.BlackList;
import com.ssafy.howdoilook.domain.blacklist.entity.QBlackList;
import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.follow.entity.QFollow;
import com.ssafy.howdoilook.domain.room.dto.response.QRoomListResponseDto;
import com.ssafy.howdoilook.domain.room.dto.response.RoomListResponseDto;
import com.ssafy.howdoilook.domain.room.dto.response.RoomListResponseWithTotalPageDto;
import com.ssafy.howdoilook.domain.room.entity.QRoom;
import com.ssafy.howdoilook.domain.room.entity.Room;
import com.ssafy.howdoilook.domain.room.entity.RoomType;
import com.ssafy.howdoilook.domain.user.entity.User;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class RoomCustomRepositoryImpl implements RoomCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QRoom room = QRoom.room;
    QFollow follow = QFollow.follow;
    QBlackList blackList = QBlackList.blackList;

    public RoomCustomRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Override
    public RoomListResponseWithTotalPageDto findAllRoomList(List<Long> blackListIds, String type, String search, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();

        // 블랙리스트에 포함된 hostId들을 제외
        builder.and(room.host.id.notIn(blackListIds));

        // 스트리밍이 끝난 방은 제외
        builder.and(room.endedDate.isNull());

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

        long totalCount = jpaQueryFactory.selectFrom(room)
                .leftJoin(follow)
                .on(room.host.id.eq(follow.followee.id))
                .where(builder)
                .fetchCount();

        long totalPages = (totalCount + pageable.getPageSize() - 1) / pageable.getPageSize(); // 올림 연산 적용

        RoomListResponseWithTotalPageDto result = RoomListResponseWithTotalPageDto.builder()
                .totalPage((int) totalPages)
                .roomListResponseDtos(queryResults)
                .build();

        return result;
    }

    @Override
    public RoomListResponseWithTotalPageDto findFollowingRoomList(List<Follow> followingList, String type, String search, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();

        if (!followingList.isEmpty()) {
            for (Follow follow : followingList) {
                builder.or(room.host.id.eq(follow.getFollowee().getId()));
            }
        } else {
            // 팔로이가 없으면 아무런 조건을 추가하지 않음으로써 모든 값을 가져오지 않도록 처리
            builder.and(room.id.isNull()); // 무효한 조건을 추가
        }

        // 스트리밍이 끝난 방은 제외
        builder.and(room.endedDate.isNull());

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

        long totalCount = jpaQueryFactory.selectFrom(room)
                .leftJoin(follow)
                .on(room.host.id.eq(follow.followee.id))
                .where(builder)
                .fetchCount();

        long totalPages = (totalCount + pageable.getPageSize() - 1) / pageable.getPageSize(); // 올림 연산 적용

        RoomListResponseWithTotalPageDto result = RoomListResponseWithTotalPageDto.builder()
                .totalPage((int) totalPages)
                .roomListResponseDtos(queryResults)
                .build();

        return result;
    }

    @Override
    public List<Long> selectAllExceptBlackList(Long userId) {
        List<BlackList> blackListList = jpaQueryFactory.selectFrom(blackList)
                .where(blackList.user.id.eq(userId))
                .fetch();
        List<BlackList> targetblackListList= jpaQueryFactory.selectFrom(blackList)
                .where(blackList.targetUser.id.eq(userId))
                .fetch();
        Set<Long> set = new HashSet<>();
        for (BlackList blackList1 : blackListList) {
            set.add(blackList1.getTargetUser().getId());
        }
        for (BlackList blackList1 : targetblackListList) {
            set.add(blackList1.getUser().getId());
        }

        List<Long> userList = new ArrayList<>(set);
        return userList;
    }
}
