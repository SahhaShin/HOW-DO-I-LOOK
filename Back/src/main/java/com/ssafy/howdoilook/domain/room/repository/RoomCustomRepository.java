package com.ssafy.howdoilook.domain.room.repository;

import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.room.dto.response.RoomListResponseDto;
import com.ssafy.howdoilook.domain.room.entity.RoomType;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RoomCustomRepository {

    List<RoomListResponseDto> findFollowingRoomList(List<Follow> followingList, String type, String search, Pageable pageable);

}
