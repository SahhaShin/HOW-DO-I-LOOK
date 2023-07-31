package com.ssafy.howdoilook.domain.room.repository;

import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.room.dto.response.FollowingRoomResponseDto;
import com.ssafy.howdoilook.domain.room.entity.Room;
import com.ssafy.howdoilook.domain.room.entity.RoomType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RoomCustomRepository {

    Page<FollowingRoomResponseDto> findByFollowingList(List<Follow> followingList, Pageable pageable);

    Page<FollowingRoomResponseDto> findByHost_IdAndType(List<Follow> followingList, RoomType type, Pageable pageable);
}
