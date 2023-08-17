package com.ssafy.howdoilook.domain.room.repository.RoomRepository;

import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.room.dto.response.RoomListResponseDto;
import com.ssafy.howdoilook.domain.room.dto.response.RoomListResponseWithTotalPageDto;
import com.ssafy.howdoilook.domain.room.entity.Room;
import com.ssafy.howdoilook.domain.room.entity.RoomType;
import com.ssafy.howdoilook.domain.user.entity.User;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RoomCustomRepository {

    RoomListResponseWithTotalPageDto findAllRoomList(List<Long> blackListIds, String type, String search, Pageable pageable);

    RoomListResponseWithTotalPageDto findFollowingRoomList(List<Follow> followingList, String type, String search, Pageable pageable);

    List<Long> selectAllExceptBlackList(Long userId);
}
