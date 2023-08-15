package com.ssafy.howdoilook.domain.room.repository.RoomRepository;

import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.room.dto.response.RoomListResponseDto;
import com.ssafy.howdoilook.domain.room.dto.response.RoomListResponseWithTotalPageDto;
import com.ssafy.howdoilook.domain.room.entity.Room;
import com.ssafy.howdoilook.domain.room.entity.RoomType;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RoomCustomRepository {

    RoomListResponseWithTotalPageDto findFollowingRoomList(List<Follow> followingList, String type, String search, Pageable pageable);

    List<Room> selectAllExceptBlackList(Long userId);
}
